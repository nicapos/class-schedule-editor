const { Router } = require("express");

const router = Router();

router.use("/api", require('./common.routes'));
router.use("/api/auth", require('./auth.routes'));
router.use("/api/user", require('./user.routes'));

module.exports = router;
