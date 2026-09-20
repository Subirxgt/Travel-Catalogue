# ✈ Travel Catalogue

A cloud-based Travel Catalogue web application where users can explore travel destinations, add new destinations, and filter destinations based on different attributes.

The application is built using Node.js, Express.js, MongoDB Atlas, EJS, and Cloudinary, and is deployed publicly on Render.

---

## 🌐 Live Application

**Live URL:**

https://travel-catalogue.onrender.com

**Health Check:**

https://travel-catalogue.onrender.com/health

---

## 📌 Project Overview

Travel Catalogue is a web application designed to maintain and explore a collection of travel destinations.

Users can:

- View all available destinations
- Add new destinations
- Upload destination images
- Filter destinations by category
- Filter by country
- Filter by budget
- Filter by best season
- View ratings and descriptions
- Access the application through a public cloud URL

The application uses cloud services for database storage, image storage and processing, hosting, logging, and health monitoring.

---

## 🏗️ Architecture

```text
                         USER
                           |
                           | HTTPS
                           v
                  +-------------------+
                  |      RENDER       |
                  | Node.js + Express |
                  |       + EJS       |
                  +---------+---------+
                            |
              +-------------+-------------+
              |                           |
              v                           v
       +-------------+              +-------------+
       |  MongoDB    |              | Cloudinary  |
       |    Atlas    |              |             |
       |             |              | Image       |
       | Destination |              | Storage     |
       |    Data     |              |     +       |
       +-------------+              | Transformation
                                    +-------------+

                         |
                         v
                  Render Logs
                  & Health Checks