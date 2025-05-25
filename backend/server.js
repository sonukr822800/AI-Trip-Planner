const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const users = [];

app.post("/signup", (req, res) => {
    const { email, password } = req.body;
    const token = jwt.sign({ email }, "secretkey", { expiresIn: "1h" });
    users.push({ email, password });
    res.json({ token });
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));

app.post("/generate-trip", (req, res) => {
    const { destination, days, budget } = req.body;
    const trip = { destination, days, budget };
    db.run("INSERT INTO trips (destination, days, budget) VALUES (?, ?, ?)", [destination, days, budget], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Trip generated successfully!", trip });
    });
});
app.get("/protected", (req, res) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ error: "Access Denied" });

    jwt.verify(token.split(" ")[1], "secretkey", (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid Token" });
        res.json({ message: "Protected content accessed", user });
    });
});


app.get("/", (req, res) => {
    res.send("Welcome to AI Trip Planner Backend!");
});