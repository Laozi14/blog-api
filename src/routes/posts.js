const express = require('express');
const authenticate = require('../middleware/auth');
const { getPosts, createPost, updatePost, togglePublish, deletePost } = require('../controllers/posts');
const router = express.Router();

router.get('/', getPosts);
router.post('/', authenticate, createPost);
router.put('/:id', authenticate, updatePost);
router.patch('/:id/publish', authenticate, togglePublish);
router.delete('/:id', authenticate, deletePost); // Delete a post by ID

module.exports = router;
