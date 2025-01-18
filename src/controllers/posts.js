const prisma = require('../prisma');

const getPosts = async (req, res) => {
    const posts = await prisma.post.findMany({ where: { published: true } });
    res.json(posts);
};

const createPost = async (req, res) => {
    const { title, content } = req.body;
    const post = await prisma.post.create({
        data: { title, content, authorId: req.user.id },
    });
    res.status(201).json(post);
};

const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const post = await prisma.post.update({
        where: { id: parseInt(id) },
        data: { title, content },
    });
    res.json(post);
};

const togglePublish = async (req, res) => {
    const { id } = req.params;

    try {
        // Fetch the current post
        const existingPost = await prisma.post.findUnique({
            where: { id: parseInt(id) },
        });

        if (!existingPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Toggle the published status
        const updatedPost = await prisma.post.update({
            where: { id: parseInt(id) },
            data: { published: !existingPost.published },
        });

        res.json(updatedPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error toggling publish status', error: err.message });
    }
};

const deletePost = async (req, res) => {
    const { id } = req.params;

    try {
        // Check if the post exists
        const existingPost = await prisma.post.findUnique({
            where: { id: parseInt(id) },
        });

        if (!existingPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Delete the post
        await prisma.post.delete({
            where: { id: parseInt(id) },
        });

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting post', error: err.message });
    }
};

module.exports = { getPosts, createPost, updatePost, togglePublish, deletePost };