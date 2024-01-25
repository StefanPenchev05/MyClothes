const bcrypt = require("bcrypt");

const { generateToken, verifyToken } = require("../utils/tokenEmailUtils");
const { SendPassResetMail } = require("../utils/mailUtils");

const UserModel = require("../model/User");
const DesignerMOdel = require("../model/Designer")
const Address = require("../model/Address");
const Image = require("../model/ProfileImages");

require('dotenv').config();

// Custom error class for better error handling
class CustomError extends Error {
    constructor(message, typeOfError) {
        super(message);
        this.typeOfError = typeOfError;
    }
}

module.exports = {
    getUsersData: async (sessionID) => {
        try {
            // Fetch user data and populate profileImages
            const userData = await UserModel.findOne({ _id: sessionID }).populate("profileImages");
            // If user data is not found, return a message
            if (!userData) {
                return { message: 'User not found!' };
            }

            // Common data for all users
            const commonData = {
                id:userData._id,
                firstName: userData.firstName,
                lastName: userData.lastName,
                username:userData.username,
                gender:userData.gender,
                avatar: userData.avatar || userData.profileImages[0]?.url,
                profileImages:userData.profileImages,
                role: userData.role,
            };

            // If user is a designer, return designer info
            if (userData.role === 'designer') {
                const designerInfo = await DesignerMOdel.findOne({user:userData._id})
                console.log(designerInfo)
                return {
                    ...commonData,
                   designerInfo
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



    loginUser: async (emailOrUsername, password) => {
        // Find the user based on email or username
        const existingUser = await UserModel.findOne({
            $or: [
                { email: emailOrUsername },
                { username: emailOrUsername },
            ],
        });

        // If no user is found, throw a custom error
        if (!existingUser) {
            throw new CustomError("User does not exist!", "UserNotFound");
        }

        // Compare the provided password with the stored hashed password
        const matchedPassword = await bcrypt.compare(password, existingUser.password);
        if (!matchedPassword) {
            throw new CustomError("The password for this user is not correct!", "IncorrectPassword");
        }

        return existingUser;
    },

    googleLoginUser: async (tokenID) => {


    },

    registerUser: async (email, password, username, firstName, lastName, selectedDate, gender, country, city, address, phoneNumber, picOne, picTwo, picThree, picFour) => {
        // Check if a user with the same email or username already exists
        const existingUser = await UserModel.findOne({ $or: [{ email }, { username }] });

        // If a user with the same email or username is found, throw a custom error
        if (existingUser) {
            throw new CustomError("This user already exists!", "UserAlreadyExists");
        }

        if (address) {
            address = new Address({
                country,
                city,
                address
            });

            address = await address.save();
        }

        const images = [picOne, picTwo, picThree, picFour];
        const imagesPromises = images.map((image) => {
            if (image) {
                const imageInstance = new Image({
                    url: image
                });
                return imageInstance.save();
            }
        });

        const imagesResults = await Promise.all(imagesPromises);

        const hashPassword = await bcrypt.hash(password, 12);
        const userInstance = new UserModel({
            email,
            password: hashPassword,
            username,
            firstName,
            lastName,
            dateOfBirth: selectedDate,
            gender,
            address: address ? address._id : undefined,
            phone: phoneNumber,
            profileImages: imagesResults ? imagesResults.filter(image => image).map((image) => image._id) : undefined
        });

        try {
            const savedUser = await userInstance.save();
            console.log('User saved successfully');
            return savedUser;
        } catch (error) {
            console.error('Error saving user:', error);
            throw error;
        }
    },

    googleSignUpUser: async () => {

    },

    editProfile: async ()=>{

    },

    // Function for requesting a password reset
    requestPasswordReset: async (email) => {
        // Find the user based on the provided email
        const existingUser = await UserModel.findOne({ email });

        // If no user is found, throw a custom error
        if (!existingUser) {
            throw new CustomError("User not found for password reset!", "UserNotFound");
        }

        // Generate a token for password reset
        const token = generateToken(existingUser);
        const currentTime = Date.now();

        // Update the user document with the reset token and expiration date
        const updateResult = await existingUser.updateOne({
            $set: {
                resetPasswordToken: token,
                resetPasswordExpires: new Date(currentTime + 5 * 60 * 1000),
            },
        });

        // If the update fails, throw a custom error
        if (!updateResult) {
            throw new CustomError("An error occurred while sending the email! Please try again later", "MailError");
        }

        // Send a password reset email and return information about it
        const info = SendPassResetMail(email, token);
        return info;
    },

    resetPassword: async (token, newPassword) => {
        const payload = await verifyToken(token);
        const { email } = payload;

        const existingUser = await UserModel.findOne({ email });

        const hashPassword = await bcrypt.hash(newPassword, 12);
        const updateResult = await existingUser.updateOne({ $set: { password: hashPassword } });

        if (updateResult.nModified === -1) {
            throw new CustomError("An error occurred while updating the new password. Please try again later.", "MailError");
        }
        return { msg: "Password successfully changed!" }
    }
};
