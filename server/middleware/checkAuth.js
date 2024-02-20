const mongoose = require("mongoose");

module.exports = {
  checkSession: async (req, res, next) => {
    const sessionID = req.session.user;

    if (!mongoose.Types.ObjectId.isValid(sessionID)) {
      return res.status(400).json({ message: "Invalid session ID" });
    } else {
        next();
    }
  },
};

// const allowedUrls = [
//     "/user/login",
//     "/user/register",
//     "/user/requestPasswordReset",
//     "/user/resetPassword"
// ];
