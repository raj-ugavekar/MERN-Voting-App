const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./Models/user");

passport.use(
  new LocalStrategy(async (aadharCardNumber, password, done) => {
    try {
      const user = await User.findOne({ aadharCardNumber: aadharCardNumber });
      if (!user) {
        return done(null, false, { message: "Incorrect aadharCardNumber" });
      }
      const isPasswordMatch = await user.comparePassword(password);
      if (!isPasswordMatch) {
        return done(null, false, { message: "Incorect Password" });
      } else {
        done(null, user);
      }
    } catch (error) {
      return done(error);
    }
  })
);

module.exports = passport;
