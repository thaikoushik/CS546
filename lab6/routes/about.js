const express = require('express');
const router = express.Router();
let about = {
                 "name": "Koushik Thai",
                 "biography": ["I'm a graduate student from stevens institute of technology pursuing master's degree in computer science.  I have worked for 2 years as a Software Engineer at virtusa software services. I performed several Software Engineering tasks and developed skills in Java, Oracle ATG web commerce, SQL, other UI Technologies ( javascript, bootstrap, CSS, HTML).",
                        "I'm passionate about developing applications. I love to take new challenging projects. I always have the hunger to learn new things."],
                  "favoriteShows": ["Game of Thrones","Friends","The Big Bang Theory", "Narcos", "How I met your Mother"],
                  "hobbies": ["Reading Fiction", "Solving Rubiks Cubs", "Movies"]
};

router.get("/about", (req, res) => {
    if (!about) {
        res.status(404).json({ error: "Not found" });
    } else {
        res.status(200).json({ about: about });
    }
});

module.exports = router;