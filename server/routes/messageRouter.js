const express = require('express');
const router = express.Router();

const messageController = require('../controllers/messageContoller')

// Get the chats for the user
router.get('/getChatList', messageController.getChatList);

// Delete Chat 
router.delete('/delete/:ID', messageController.deleteChat);

//Start a conversation
router.post('/newChat', messageController.createChat);

module.exports = router;