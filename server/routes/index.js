const express = require("express");
const router = express.Router();
const passport = require("passport");

/* GET Google Authentication API. */
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  function(req, res) {
    var token = req.user.token;
    res.redirect("http://localhost:8080?token=" + token);
  }
);

router.use("/api", require("./api"));

module.exports = router;
