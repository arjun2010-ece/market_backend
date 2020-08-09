const app = require("express");
const router = app.Router();

const signup = require("../controllers/auth");

console.log("ROUTESSS");
router.post("/signup", signup);

module.exports = router;