const userService = require("../service/userService");

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
    login: async (req, res) => {
        try {
            const { emailOrUsername, password, rememberMe } = req.body;
            const existingUser = await userService.loginUser(emailOrUsername, password);

            if (rememberMe) {
                // Set session cookie max age to 7 days (in milliseconds)
                req.session.cookie.maxAge = 7 * 24 * 60 * 60 * 1000;
            }

            // Store user information in the session
            req.session.user = existingUser._id;

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
            req.session.user = setUser._id;
            return res.status(200).json({ success: true, msg: "Successfully registered user" });
        } catch (err) {
            handleControllerError(err, res);
        }
    },

    requestPasswordReset: async (req, res) => {
        try {
            const { email } = req.body;
            const info = await userService.requestPasswordReset(email);
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
            return res.status(200).redirect('/login');
        } catch (err) {
            handleControllerError(err, res);
        }
    }
};
