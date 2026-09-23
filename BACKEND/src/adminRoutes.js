const express = require("express");

const { getAllUsers, 
        updateUserRole,
 } = require("../controllers/adminController");
const protect = require("../middleware/auth");
const adminOnly = require("../middleware/admin");

const router = express.Router();

router.get("/users", protect, adminOnly, getAllUsers);
router.put("/users/:userId/role", protect, adminOnly, updateUserRole);

module.exports = router;