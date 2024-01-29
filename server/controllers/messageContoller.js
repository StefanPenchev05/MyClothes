const MessageService = require("../service/messageService");

module.exports = {
  // Function to delete a chat
  deleteChat: async (req, res) => {
    try {
      // Resolve the user ID from the session token
      const userID = req.session.user;
      // Get the chat ID from the request parameters
      const chatID = req.params.ID;

      // If the user ID or chat ID is not provided, return a 400 status code with an error message
      if (!userID || !chatID) {
        return res.status(400).json({ success: false, msg: "Empty ID" });
      }

      // Delete the chat
      await MessageService.deleteChat(userID, chatID);

      // Return a success message
      res.status(200).json({ success: true, msg: "Chat deleted successfully" });
    } catch (err) {
      // If an error occurs, return a 500 status code with the error message
      return res.status(500).json({ success: false, msg: err });
    }
  },

  // Function to create a new chat
  createChat: async (req, res) => {
    try {
      // Resolve the user ID from the session token
      const userID = req.session.user;
      // Resolve the ID of the person to chat with from the request body
      const personToChatID = req.body.personToChat;

      // Create a new chat
      const data = await MessageService.createNewChat(userID, personToChatID);

      // If the chat creation was not successful, return a 400 status code with the error message
      if (data.success === false) {
        return res.status(400).json(data);
      }

      // Return the data of the new chat
      return res.status(200).json(data);
    } catch (err) {
      // If an error occurs, return a 500 status code with the error message
      return res.status(500).json({ success: false, msg: err });
    }
  },
};
