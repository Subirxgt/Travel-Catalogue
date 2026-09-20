const multer = require("multer");
const Destination = require("../models/destination");
const cloudinary = require("../config/cloudinary");


// ===============================
// MULTER CONFIGURATION
// ===============================

// Store uploaded image temporarily in memory
// We will send it directly to Cloudinary
const storage = multer.memoryStorage();


const fileFilter = (req, file, cb) => {

    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp"
    ];

    if (allowedTypes.includes(file.mimetype)) {

        cb(null, true);

    } else {

        cb(
            new Error(
                "Only JPG, JPEG, PNG and WEBP images are allowed."
            ),
            false
        );

    }
};


const upload = multer({

    storage: storage,

    limits: {
        fileSize: 10 * 1024 * 1024
    },

    fileFilter: fileFilter

});


// ===============================
// CLOUDINARY UPLOAD HELPER
// ===============================

const uploadToCloudinary = (fileBuffer) => {

    return new Promise((resolve, reject) => {

        const uploadStream = cloudinary.uploader.upload_stream(

            {
                folder: "travel-catalogue"
            },

            (error, result) => {

                if (error) {

                    reject(error);

                } else {

                    resolve(result);

                }

            }

        );

        uploadStream.end(fileBuffer);

    });

};


// ===============================
// SHOW ADD FORM
// ===============================

const showAddForm = (req, res) => {

    res.render("add");

};


// ===============================
// ADD DESTINATION
// ===============================

const addDestination = async (req, res) => {

    try {

        const {
            name,
            country,
            category,
            budget,
            bestSeason,
            rating,
            description
        } = req.body;


        // ===============================
        // UPLOAD IMAGE TO CLOUDINARY
        // ===============================

        let imageUrl = "";

        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer);

            // Cloudinary image transformation
            imageUrl = cloudinary.url(result.public_id, {
                secure: true,
                transformation: [
                    {
                        width: 800,
                        height: 500,
                        crop: "fill",
                        quality: "auto",
                        fetch_format: "auto"
                    }
                ]
            });

            console.log("Image uploaded to Cloudinary");
            console.log("Cloudinary Public ID:", result.public_id);
            console.log("Optimized Image URL generated");
        }


        // ===============================
        // SAVE DESTINATION TO MONGODB
        // ===============================

        await Destination.create({

            name,
            country,
            category,
            budget,
            bestSeason,
            rating,
            description,
            imageUrl

        });


        // Redirect to catalogue
        res.redirect("/");


    } catch (error) {

        console.error(
            "Error adding destination:",
            error.message
        );


        // ===============================
        // MONGOOSE VALIDATION ERROR
        // ===============================

        if (error.name === "ValidationError") {

            const errors =
                Object.values(error.errors)
                    .map(err => err.message);


            return res.status(400).render("error", {

                title: "Invalid Input",

                message:
                    "Please fix the following errors:",

                errors

            });

        }


        // ===============================
        // CLOUDINARY / OTHER ERROR
        // ===============================

        res.status(500).render("error", {

            title: "Server Error",

            message:
                "Something went wrong while adding the destination.",

            errors: []

        });

    }

};


// ===============================
// LIST + FILTER
// ===============================

const listDestinations = async (req, res) => {

    try {

        const {
            category,
            country,
            budget,
            bestSeason
        } = req.query;


        const filter = {};


        // Category filter
        if (category) {

            filter.category = category;

        }


        // Country filter
        if (country) {

            filter.country = {

                $regex: country,

                $options: "i"

            };

        }


        // Budget filter
        if (budget) {

            filter.budget = budget;

        }


        // Season filter
        if (bestSeason) {

            filter.bestSeason = bestSeason;

        }


        // Fetch destinations
        const destinations =
            await Destination
                .find(filter)
                .sort({ createdAt: -1 });


        // Render catalogue
        res.render("index", {

            destinations,

            filters: {

                category: category || "",

                country: country || "",

                budget: budget || "",

                bestSeason: bestSeason || ""

            }

        });


    } catch (error) {

        console.error(
            "Error fetching destinations:",
            error
        );


        res.status(500).render("error", {

            title: "Server Error",

            message:
                "Unable to load destinations.",

            errors: []

        });

    }

};


// ===============================
// EXPORT CONTROLLERS
// ===============================

module.exports = {

    showAddForm,

    addDestination,

    listDestinations,

    upload

};