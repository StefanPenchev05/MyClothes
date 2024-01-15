const express = require('express');
const router = express.Router();

const messageController = require('../controllers/messageContoller')

// Delete Chat 
router.delete('/delete/:ID', messageController.deleteChat);

//Start a conversation
router.post('/newChat', messageController.createChat);

module.exports = router;