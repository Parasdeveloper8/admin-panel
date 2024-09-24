const express = require("express");
const router = express.Router();
const { pool } = require("../configuration/databasecon");

router.delete("/:id", async (req, res) => {
    try {
        console.log('Delete request received for ID:', req.params.id);
        const userId = req.params.id;

        const query = 'DELETE FROM Admin.data WHERE id = ?';
        const [result] = await pool.query(query, [userId]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Data deleted successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error deleting data:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

module.exports = router;
