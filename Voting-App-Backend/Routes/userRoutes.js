const express = require("express");
const User = require("./../Models/user");
const { generateToken, jwtAuthMiddleware } = require("../jwt");
const router = express.Router();

const checkAdminRole = async (userID) => {
  try {
    const user = await User.findById(userID);
    return user.role === "admin";
  } catch (error) {
    return false;
  }
};

router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    if (!(await checkAdminRole(userId))) {
      return res.status(403).json({ message: "Unauthorized Access" });
    }
    const usersData = await User.find();
    const userList = usersData.map((data) => {
      return {
        id: data.id,
        name: data.name,
        aadharCardNumber : data.aadharCardNumber,
        age: data.age,
        address: data.address,
        email : data.email,
        mobile: data.mobile,
        role: data.role,
        isVoted: data.isVoted
      };
    });
    res.status(200).json({ response: userList, message: "Users fetched successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/", jwtAuthMiddleware, async (req, res) => {
  const userId = req.user.id;
  if (!(await checkAdminRole(userId))) {
    return res.status(403).json({ message: "Unauthorized Access" });
  }
  const userData = req.body;
  try {
    const newUser = new User(userData);
    if (newUser.role === "admin") {
      const checkAdmin = await newUser.checkAdminRole();
      if (!checkAdmin) {
        return res.status(404).json({ message: "Only Admin User is Allowed" });
      }
    }

    const user = await newUser.save();
    const response = {
      id: user.id,
      name: user.name,
      aadharCardNumber : user.aadharCardNumber,
      age: user.age,
      address: user.address,
      email : user.email,
      mobile: user.mobile,
      role: user.role,
      isVoted: user.isVoted
    };

    return res.status(200).json({ response: response, message: "User registered successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  const userData = req.user;
  const userid = userData.id;
  // const userid = req.body;
  try {
    const user = await User.findById(userid);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//USER SIGNUP
router.post("/signup", async (req, res) => {
  const userData = req.body;
  try {
    const newUser = new User(userData);
    if (newUser.role === "admin") {
      const checkAdmin = await newUser.checkAdminRole();
      if (!checkAdmin) {
        return res.status(404).json({ message: "Only Admin User is Allowed" });
      }
    }

    const user = await newUser.save();

    payload = { id: user.id };
    const token = generateToken(payload);

    return res.status(200).json({ response: { user, token }, message: "User registered successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//USER LOGIN
router.post("/login", async (req, res) => {
  const { aadharCardNumber, password } = req.body;
  try {
    const user = await User.findOne({ aadharCardNumber: aadharCardNumber });
    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(401)
        .json({ message: "Incorrect AadharCard Number or Password" });
    }
    payload = { id: user.id };
    const token = generateToken(payload);
    res.status(200).json({ response: { user, token }, message: "Login successful." });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//USER VIEW PROFILE
router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  const userData = req.user;
  const userid = userData.id;
  // const userid = req.body;
  try {
    const user = await User.findById(userid);
    if (!user) return res.status(404).json({ message: "User not found." });
    res.status(200).json({ response: user, message: "User profile fetched successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/:userid", jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const userID = req.params.userid;
    const userData = req.body;

    if(!(await checkAdminRole(userId)) && (userID != userId)){
      return res.status(403).json({ message: "Unauthorized Access" });
    }

    const user = await User.findByIdAndUpdate(
      userID,
      userData,
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const updatedUserData = {
      id: user.id,
      name: user.name,
      aadharCardNumber : user.aadharCardNumber,
      age: user.age,
      address: user.address,
      email : user.email,
      mobile: user.mobile,
      role: user.role,
      isVoted: user.isVoted
    }
    res.status(200).json({ response: updatedUserData, message: "User updated successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//USER CHANGE PASSWORD
router.post("/profile/password", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    const userid = userData.id;
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(userid);

    if (!user) {
      return res.status(401).json({ message: "User Not Found" });
    }
    const checkPassword = await user.comparePassword(currentPassword);
    if (!checkPassword) {
      return res.status(401).json({ message: "Incorrect Previous Password" });
    }

    user.password = newPassword;
    const response = await user.save();

    if (!response) {
      return res.status(500).json({ message: "Failed to Update the Password" });
    }
    return res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//UPDATE PASSWORD USING PUT
// router.put("/profile/password", jwtAuthMiddleware, async (req, res) => {
//   try {
//     const userData = req.user;
//     const userid = userData.id;
//     const { currentPassword, newPassword } = req.body;

//     const user = await User.findById(userid);

//     if (!user) {
//       return res.status(401).json({ error: "User Not Found" });
//     }
//     const checkPassword = await user.comparePassword(currentPassword);
//     if (!checkPassword) {
//       return res.status(401).json({ error: "Incorrect Previous Password" });
//     }
//     const response = await user.updateOne({ password: newPassword });

// const response = await User.findByIdAndUpdate(userid, newPassword, {
//   new: true,
//   runvlidators: true,
// });
//     if (!response) {
//       res.status(500).json({ error: "Failed to Update the Password" });
//     }
//     res.status(500).json(response);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

router.delete("/:userId", jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    if (!(await checkAdminRole(userId))) {
      return res.status(403).json({ message: "Unauthorized Access" });
    }
    const userID = req.params.userId;
    const response = await User.findByIdAndDelete(userID);
    if (!response) {
      return res.status(404).json({ message: "User Not Found" });
    }
    res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
