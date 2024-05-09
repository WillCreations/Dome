const { model, models, Schema } = require("mongoose");
const bycrpt = require("bcrypt");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.statics.Signup = async function (name, email, password) {
  try {
    if (!email || !password || !name) {
      throw Error("failed to enter name or email or Password");
    }

    const exist = await this.findOne({ email: email });
    if (exist) {
      throw Error("User already exists");
    } else {
      const salt = await bycrpt.genSalt(10);
      console.log("salt: ", salt);
      const hash = await bycrpt.hash(password, salt);

      const user = await this.create({
        name,
        email,
        password: hash,
        admin: false,
      });

      user.save();

      return user;
    }
  } catch (error) {
    throw Error(error.message);
  }
};

userSchema.statics.Login = async function (email, password) {
  try {
    if (!email || !password) {
      throw Error("failed to enter email or Password");
    }

    const user = await this.findOne({ email: email });
    if (!user) {
      throw Error("User dose not exists");
    } else {
      const hash = await bycrpt.compare(password, user.password);
      if (!hash) {
        throw Error("incorrect password");
      } else {
        return user;
      }
    }
  } catch (error) {
    console.log(error);
    throw Error(error.message);
  }
};

const User = models.Users || model("Users", userSchema);

module.exports = User;
