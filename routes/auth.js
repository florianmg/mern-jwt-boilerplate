const { Router } = require("express");
const router = Router();
const { login, register } = require("../controllers/auth");

router.post("/api/login", login);
router.post("/api/register", register);

module.exports = router;
