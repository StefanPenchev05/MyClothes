const userService = require("../service/userService");
const { generateToken, resolveToken } = require("../utils/tokenUserIdUtils");

function handleControllerError(err, res) {
    if (!(err instanceof Object)) {
        // Handle non-object errors as server errors
        return res.status(500).json({
            success: false,
            type: "ServerError",
            msg: "Server Error. Please try again in a bit!"
        });
    }

    return res.status(401).json({
        success: false,
        type: err.typeOfError,
        msg: err.message
    });
}

module.exports = {
    getUsersData: async (req, res) => {
        try {
            // Get the user ID from the session
            const sessionID = resolveToken(req.session.user);

            // Get the user data from the navBarService
            const userData = await userService.getUsersData(sessionID);

            // If the user data is not found, return an error
            if (!userData) {
                return res.status(404).json({ message: "User data not found" });
            }

            // If everything is OK, return the user data
            return res.status(200).json(userData);
        } catch (err) {
            // If there's an error, return it
            return res.status(500).json({ message: err.message });
        }
    },
    login: async (req, res) => {
        try {
            const { emailOrUsername, password, rememberMe } = req.body;
            const existingUser = await userService.loginUser(emailOrUsername, password);

            if (rememberMe) {
                // Set session cookie max age to 7 days (in milliseconds)
                req.session.cookie.maxAge = 7 * 24 * 60 * 60 * 1000;
            }

            // Store user information in the session
            req.session.user = generateToken(existingUser._id);

            return res.status(200).json({ success: true, msg: "Successfully loged in user!" });
        } catch (err) {
            handleControllerError(err, res);
        }
    },

    googleLogin: async (req, res) => {



    },

    register: async (req, res) => {
        try {
            const { email, password, username, firstName, lastName, selectedDate, gender, country, city, address, phone, picOne, picTwo, picThree, picFour } = req.body.data;
            const setUser = await userService.registerUser(email, password, username, firstName, lastName, selectedDate, gender, country, city, address, phone, picOne, picTwo, picThree, picFour);

            // Store user information in the session
            req.session.user = generateToken(setUser._id);
            return res.status(200).json({ success: true, msg: "Successfully registered user" });
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
            // Clear the user session to log them out
            req.session.destroy();
            return res.status(200).json({ success: true, msg: "Successfully logged out user!" });
        } catch (err) {
            console.log(err);
            handleControllerError(err, res);
        }
    },

    /**
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     */

    getUserSettingsData: async (req, res) => {
        try {
            // Get the user ID from the session
            const sessionID = resolveToken(req.session.user);

            // Get the user data from the navBarService
            const userData = await userService.getUserSettingsData(sessionID);

            // If the user data is not found, return an error
            if (!userData) {
                return res.status(404).json({ message: "User data not found" });
            }

            // If everything is OK, return the user data
            return res.status(200).json(userData);
        } catch (err) {
            // If there's an error, return it
            return res.status(500).json({ message: err.message });
        }
    },
};
