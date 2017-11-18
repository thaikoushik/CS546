const express = require('express');
const router = express.Router();
var endOfLine = require('os').EOL;
let story = {
                "Story Title": "What motivated me to pursue in the field of Computer Science",
                "Story": "I was very good at Math from a very young age and loved to solve problems.When I was 12 my dad bought a PC to our house, that was the very first time I encountered with a PC. Initially I used system just to play games and one day I thought how come when I press something on keyboard is reflecting on monitor. That made me very fascinated about computers. I began to investigate the tech world and learnt a great deal of little things.  In any case, I'm happy I'm doing this. It has turned into my enthusiasm and I'll seek after it as long as it takes.",
};

router.get("/story", (req, res) => {
    if (!story) {
        res.status(404).json({ error: "Not found" });
    } else {
        res.status(200).json({ story: story });
    }
});

module.exports = router;