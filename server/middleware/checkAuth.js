const mongoose = require("mongoose");

const allowedUrls = [
    "/user/login",
    "/user/register",
    "/user/requestPasswordReset",
    "/user/resetPassword"
];

module.exports = {
  checkSession: async (req, res, next) => {
    if (allowedUrls.includes(req.originalUrl)) {
      return next();
    }

    const sessionID = req.session.user;
    console.log(sessionID)

    if (!mongoose.Types.ObjectId.isValid(sessionID)) {
      console.log(sessionID)
      return res.status(400).json({ message: "Invalid session ID" });
    } else {
        next();
    }
  },
};