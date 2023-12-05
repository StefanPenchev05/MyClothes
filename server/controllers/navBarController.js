// Import the navBarService
const navBarService = require('../service/navBarService')

module.exports = {
    // Function to send user data
    sendUserData: async (req, res) => {
        try {
            // Get the user ID from the session
            const userId = req.session.user;

            // If the user ID is not found, return an error
            if (!userId) {
                return res.status(400).json({ message: "User not found in session" });
            }

            // Get the user data from the navBarService
            const userData = await navBarService.getUsersData(userId);

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

    // Function to send search data
    sendSearchData: async (req, res) => {
        try {
            // Get the username from the request parameters
            const username = req.params.username;

            // If the username is not provided, return an error
            if (!username) {
                return res.status(400).json({ message: "Username not provided" });
            }

            // Get the search data from the navBarService
            const searchData = await navBarService.sendSearchData(username);

            // If the search data is not found, return an error
            if (!searchData) {
                return res.status(404).json({ message: "Search data not found" });
            }

            // If everything is OK, return the search data
            return res.status(200).json(searchData);
        } catch (err) {
            // If there's an error, return it
            return res.status(500).json({ message: err.message });
        }
    }
}