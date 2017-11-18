const express = require('express');
const router = express.Router();
let education = 
                [{
                    "School Name" : "Stevens Institute of Technology",
                    "Degree": "Master of Science",
                    "Favorite Class": "Humar Computer Interaction",
                    "Memorable Moment": "Received appreciation from Professor for the final project."
                },
                {
                    "School":"SRM University",
                    "Degree": "Bachelor of Technology",
                    "Favorite Class": "Database Management System",
                    "Memorable moment": "Received my first paycheck" 
                }]

router.get("/education", (req, res) => {
    if (!education) {
        res.status(404).json({ error: "Not found" });
    } else {
        res.status(200).json({ education: education });
    }
});

module.exports = router;