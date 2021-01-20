const jwt = require("jsonwebtoken");
const User = require("../model/user");

exports.createUser = (req, res, next) => {
  let newUser = new User();
  newUser.email = req.body.email;

  newUser.setPassword(req.body.password);

  newUser
    .save()
    .then(result => {
      res.status(201).json({
        message: "User Created!",
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
          message: "Invalid authentication credentials!"
      });
    });
}

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user === null) {
        return res.status(400).json({
          message: "User not found."
        });
      }
      fetchedUser = user;
      return user.validPassword(req.body.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth Failed"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Invalid Authentication Credentials!"
      });
    });
}
