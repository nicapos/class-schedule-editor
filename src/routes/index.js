const { Router } = require("express");

const router = Router();

router.use("/api", require('./common.routes'));
router.use("/api/auth", require('./auth.routes'));
router.use("/api/user", require('./user.routes'));
router.use("/api/class", require('./class.routes'));
router.use("/api/schedule", require('./schedule.routes'));

module.exports = router;
