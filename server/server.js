const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");

const connectToDb = require("./config/db");
const PORT = process.env.PORT || 8000;

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ limit: "25mb", extended: true  }));
app.use(cookieParser());
app.use(express.static("public"));
app.use("/files", express.static("./files")); // Read pdf 

app.use(cors({
    // origin: process.env.LOCALHOST_ORIGIN,
    origin: process.env.HOSTED_ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    exposedHeaders: [process.env.CORS_EXPOSED_HEADER],
    cookie: {
        sameSite: process.env.CORS_SAME_SITE,
        secure: true,
    },
}));

// Routes
app.use("/", routes);

// Listening server
app.listen(PORT, () => {
    connectToDb();
    console.log(`Server is running on http://localhost:${PORT}`);
});

