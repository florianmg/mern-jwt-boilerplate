const { Router } = require("express");
const router = Router();
const {
  login,
  register,
  isAuthenticated,
  logout,
} = require("../controllers/auth.controller");

router.post("/api/login", login);
router.post("/api/register", register);
router.get("/api/authenticated", isAuthenticated);
router.post("/api/logout", logout);

module.exports = router;
