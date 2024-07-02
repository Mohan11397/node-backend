const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "moderator"], // Define user roles
      default: "user",
    },
    profileImage: {
      type: String, // URL to the profile image
    },
    bio: {
      type: String,
      trim: true,
    },
    address: {
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    socialLinks: {
      facebook: String,
      twitter: String,
      linkedin: String,
      instagram: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
    },
  },
  { timestamps: true }
);

// // Pre-save middleware to hash password if it's modified
// UserSchema.pre('save', function (next) {
//   const user = this;
//   if (!user.isModified('password')) return next();
//   // Hash password here using bcrypt or any other library
//   // bcrypt.hash(user.password, saltRounds, function (err, hash) {
//   //   if (err) return next(err);
//   //   user.password = hash;
//   //   next();
//   // });
// });

module.exports = mongoose.model("User", UserSchema);
