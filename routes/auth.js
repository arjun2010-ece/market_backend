const app = require("express");
const router = app.Router();

const {signup, signin, signout, requireSignIn} = require("../controllers/auth");
const {signupValidator, signupValidation} = require("../validators/user");

router.post("/signup", signupValidator, signupValidation, signup);
router.post("/signin", signin);
router.get("/signout", signout);

//protected route
// for protected routes need token in headers....
// router.get("/fullstack", requireSignIn, checkR);



module.exports = router;