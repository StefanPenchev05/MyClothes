const UserModel = require('../model/User')

module.exports = {
    getUsersData: async (userId) => {
        try {
            // Fetch user data and populate profileImages
            const userData = await UserModel.findById(userId).populate("profileImages");

            // If user data is not found, return a message
            if (!userData) {
                return { message: 'User not found!' };
            }

            // Common data for all users
            const commonData = {
                firstName: userData.firstName,
                lastName: userData.lastName,
                avatar: userData.avatar || userData.profileImages[0]?.url,
                role: userData.role,
            };

            // If user is a designer, return designer info
            if (userData.role === 'designer') {
                return {
                    ...commonData,
                    designerInfo: userData.designerInfo
                };
            }

            // If user is not a designer, return purchased products count
            return {
                ...commonData,
                purchasedProducts: userData.purchasedProducts.length
            };
        } catch (err) {
            throw new Error(err.message);
        }
    },
    sendSearchData: async (searchQuery) => {
        try {
            // Fetch users matching the search query and populate profileImages
            const searchData = await UserModel.find({
                username: { $regex: new RegExp(searchQuery), $options: 'i' }
            }).populate('profileImages');

            // If no users are found, return a message
            if (searchData.length === 0) {
                return { message: 'User not found!' };
            }

            // Map over the search data and return the required fields
            return searchData.map(user => ({
                username: user.username,
                avatar: user.avatar || user.profileImages[0]?.url
            }));
        } catch (err) {
            throw new Error(err.message);
        }
    }
}