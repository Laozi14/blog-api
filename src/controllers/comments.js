const prisma = require('../prisma');

const createComment = async (req, res) => {
    const { postId } = req.params;
    const { content, authorName } = req.body;

    try {
        const comment = await prisma.comment.create({
            data: { content, postId: parseInt(postId), authorName },
        });
        res.status(201).json(comment);
    } catch (err) {
        res.status(500).json({ message: 'Error creating comment', error: err.message });
    }
};

const deleteComment = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.comment.delete({ where: { id: parseInt(id) } });
        res.json({ message: 'Comment deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting comment', error: err.message });
    }
};

module.exports = { createComment, deleteComment };
