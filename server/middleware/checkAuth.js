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

    if (!mongoose.Types.ObjectId.isValid(sessionID)) {
      return res.status(400).json({ message: "Invalid session ID" });
    } else {
        next();
    }
  },
};