const dotenv = require("dotenv");

dotenv.config();

const express = require("express");
const path = require("path");

const connectDB = require("./config/db");

const {
    listDestinations
} = require("./controllers/destinationController");

const destinationRoutes = require("./routes/destinationRoutes");

const app = express();

const PORT = process.env.PORT || 3000;


// ===============================
// DATABASE
// ===============================

connectDB();


// ===============================
// EJS
// ===============================

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// ===============================
// MIDDLEWARE
// ===============================

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Request logging
app.use((req, res, next) => {
    console.log(
        `${new Date().toISOString()} - ${req.method} ${req.url}`
    );
    next();
});


// ===============================
// STATIC FILES
// ===============================

app.use(express.static(path.join(__dirname, "public")));


// ===============================
// ROUTES
// ===============================

// Homepage
app.get("/", listDestinations);

// Destination routes
app.use("/destinations", destinationRoutes);


// ===============================
// HEALTH CHECK
// ===============================

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        service: "Travel Catalogue"
    });
});


// ===============================
// 404 HANDLER
// ===============================

app.use((req, res) => {
    res.status(404).render("error", {
        title: "Page Not Found",
        message: "The page you are looking for does not exist.",
        errors: []
    });
});


// ===============================
// GLOBAL ERROR HANDLER
// ===============================

app.use((err, req, res, next) => {
    console.error("Unhandled application error:", err);

    res.status(500).render("error", {
        title: "Server Error",
        message: "Something went wrong on the server.",
        errors: []
    });
});


// ===============================
// START SERVER
// ===============================

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});