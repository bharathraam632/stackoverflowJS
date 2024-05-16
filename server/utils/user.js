const User = require("../models/users");

const addUser = async ({ userObject }) => {
    const { userName, userEmail } = userObject;
    const existingUserName = await User.findOne({ userName }).exec();
    const existingUserEmail = await User.findOne({ userEmail }).exec();

    if (existingUserName) {
      throw new Error("User Name already exists");
    }
    if (existingUserEmail) {
      throw new Error("User Email already exists");
    }

    const newUser = new User(userObject);
    const savedUser = await newUser.save();
    return savedUser;
 
};

module.exports = {
  addUser,
};
