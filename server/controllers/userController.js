const userService = require("../service/userService");

function handleControllerError(err, res) {
  if (!(err instanceof Object)) {
    return res.status(500).json({
      success: false,
      type: "ServerError",
      msg: "Server Error. Please try again in a bit!",
    });
  }

  return res.status(401).json({
    success: false,
    type: err.typeOfError,
    msg: err.message,
  });
}

module.exports = {
  login: async (req, res) => {
    try {
      const { emailOrUsername, password, rememberMe } = req.body;
      const existingUser = await userService.loginUser(
        emailOrUsername,
        password
      );

      if (rememberMe) {
        req.session.cookie.maxAge = 7 * 24 * 60 * 60 * 1000;
      }

      req.session.user = existingUser._id;

      return res
        .status(200)
        .json({ success: true, msg: "Successfully logged in user!" });
    } catch (err) {
      handleControllerError(err, res);
    }
  },

  register: async (req, res) => {
    try {
      const {
        email,
        password,
        username,
        firstName,
        lastName,
        selectedDate,
        gender,
        country,
        city,
        address,
        phone,
        picOne,
        picTwo,
        picThree,
        picFour,
      } = req.body.data;
      const setUser = await userService.registerUser(
        email,
        password,
        username,
        firstName,
        lastName,
        selectedDate,
        gender,
        country,
        city,
        address,
        phone,
        picOne,
        picTwo,
        picThree,
        picFour
      );

      req.session.user = setUser._id;
      return res
        .status(200)
        .json({ success: true, msg: "Successfully registered user" });
    } catch (err) {
      handleControllerError(err, res);
    }
  },

  checkSession: async (req, res) => {
    try {
      const sessionID = req.session.user;
      const user = await userService.getUsersData(sessionID);
      if (user) {
        req.user = user;
        res.status(200).json(user);
      } else {
        res.status(401).json({ message: "Invalid session" });
      }
    } catch (err) {
      handleControllerError(err, res);
    }
  },

  getUsersData: async (req, res) => {
    try {
      const sessionID = req.params.token;
      const userData = await userService.getUsersData(sessionID);

      if (!userData) {
        return res.status(404).json({ message: "User data not found" });
      }

      return res.status(200).json(userData);
    } catch (err) {
      handleControllerError(err, res);
    }
  },

  requestPasswordReset: async (req, res) => {
    try {
      const { email } = req.body;
      await userService.requestPasswordReset(email);
      return res.status(200).json({ success: true });
    } catch (err) {
      handleControllerError(err, res);
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { token } = req.params;
      const { newPassword } = req.body;
      const msg = await userService.resetPassword(token, newPassword);
      return res.status(200).json({ success: true, msg });
    } catch (err) {
      handleControllerError(err, res);
    }
  },

  logout: (req, res) => {
    try {
      req.session.destroy();
      return res
        .status(200)
        .json({ success: true, msg: "Successfully logged out user!" });
    } catch (err) {
      handleControllerError(err, res);
    }
  },

  getUserGeneralSettingsData: async (req, res) => {
    try {
      const sessionID = req.session.user;
      const userData = await userService.getUserGeneralSettingsData(sessionID);

      if (!userData) {
        return res.status(404).json({ message: "User data not found" });
      }

      return res.status(200).json(userData);
    } catch (err) {
      handleControllerError(err, res);
    }
  },

  changeAvatar: async (req, res) => {
    try {
      const { avatar, fileName } = req.body;
      const sessionID = req.session.user;
      const response = await userService.changeAvatar(
        sessionID,
        avatar,
        fileName
      );
      return res.status(200).json({ success: true, data: response });
    } catch (err) {
      handleControllerError(err, res);
    }
  },
};
