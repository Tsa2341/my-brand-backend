import { uploadFile } from "../helpers/fileUpload.js";
import { generateToken } from "../helpers/jwtFunctions.js";
import { comparePassword, hashPassword } from "../helpers/passwordSecurity";
import { userExist, createUser } from "../services/userServices.js";

export class UserControllers {
  async register(req, res, next) {
    try {
      const exist = await userExist(req.body.email);
      if (exist) {
        res
          .status(409)
          .json({
            message: "User with this email already exist. use different one",
          });
      } else {
        if (req.file) {
          req.body.image = await uploadFile(req);
        } else {
          req.body.image =
            "https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png";
        }
        const user = {
          username: req.body.username,
          email: req.body.email,
          password: await hashPassword(req.body.password),
          image: req.body.image,
        };
        const createdUser = await createUser(user);
        res
          .status(201)
          .json({
            message: "user registered successfully",
            user: createdUser,
          });
      }
    } catch (error) {
      res
        .status(500)
        .json({
          message: error.message || "can't register the user",
        });
    }
  }
  async login(req, res, next) {
    try {
      const exist = await userExist(req.body.email);

      if (exist && exist.username === req.body.username) {
        const valid = await comparePassword(req.body.password, exist.password);
        if (!valid) {
          res.status(403).json({ message: "Invalid credentials" });
        }
        const token = await generateToken({ id: exist._id });
        res
          .header("authorization", token)
          .status(200)
          .json({ message: "Logged in successfully", accessToken: token });
      } else {
        res.status(403).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      res
        .status(500)
        .json({
          message: error.message || "can't login the user",
        });
    }
  }
}
