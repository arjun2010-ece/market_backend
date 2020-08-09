const signup = function(req, res) {
    console.log("req ", req.body);
    res.send("Response received...");
}

module.exports = signup;