const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Destination name is required"],
            trim: true,
            minlength: [2, "Destination name must be at least 2 characters"],
            maxlength: [100, "Destination name cannot exceed 100 characters"]
        },

        country: {
            type: String,
            required: [true, "Country is required"],
            trim: true
        },

        category: {
            type: String,
            required: [true, "Category is required"],
            enum: {
                values: ["Mountain", "Beach", "Heritage", "Adventure", "Wildlife", "City"],
                message: "Invalid destination category"
            }
        },

        budget: {
            type: String,
            required: [true, "Budget is required"],
            enum: {
                values: ["Low", "Medium", "High"],
                message: "Budget must be Low, Medium, or High"
            }
        },

        bestSeason: {
            type: String,
            required: [true, "Best season is required"],
            enum: {
                values: ["Spring", "Summer", "Monsoon", "Autumn", "Winter"],
                message: "Invalid season"
            }
        },

        rating: {
            type: Number,
            required: [true, "Rating is required"],
            min: [0, "Rating cannot be less than 0"],
            max: [5, "Rating cannot be greater than 5"]
        },

        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
            minlength: [10, "Description must be at least 10 characters"],
            maxlength: [1000, "Description cannot exceed 1000 characters"]
        },

        imageUrl: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

const Destination = mongoose.model("Destination", destinationSchema);

module.exports = Destination;