const { Router } = require("express");
const router = Router();
const {
  login,
  register,
  isAuthenticated,
} = require("../controllers/auth.controller");

router.post("/api/login", login);
router.post("/api/register", register);
router.get("/api/authenticated", isAuthenticated);

module.exports = router;
