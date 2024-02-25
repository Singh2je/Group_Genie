// index.js

// app.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const kmeans = require("ml-kmeans");
const QuizResult = require("./Models/QuizResult"); // Update the path as necessary

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Example connection string for MongoDB Atlas
const connectionString = 'mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority';

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB Atlas:', error);
    });

// Clustering endpoint
app.post("/cluster-students", async (req, res) => {
  try {
    const k = req.body.k; // Number of clusters
    const quizResults = await QuizResult.find({});

    const data = quizResults.map((result) => result.responses);
    const { indices, centroids } = kmeans(data, k);

    // Group students based on cluster indices
    const groups = Array.from({ length: k }, () => []);
    indices.forEach((clusterIndex, i) => {
      groups[clusterIndex].push(quizResults[i].studentName);
    });

    res.json({ groups, centroids });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error during clustering");
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
