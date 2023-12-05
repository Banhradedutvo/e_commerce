const { User } = require("../models/user/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userValidator = require("../middlewares/validators/userValidator");
const RefreshToken = require("../models/user/refreshToken");

const authController = {
  createAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "12h" }
    );
  },

  createAccessTokenRefresh: (user) => {
    return jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_ACCESS_KEY_REFRESH,
      { expiresIn: "1d" }
    );
  },

  registerUser: async (req, res) => {
    try {
      const { error } = userValidator.validateUser(req.body);
      if (error) {
        return res.status(400).json(error.details[0].message);
      }

      const { password, confirmPassword } = req.body;
      if (password !== confirmPassword) {
        return res.status(400).json("Mật khẩu xác nhận không khớp");
      }

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);

      const newUser = new User({
        user_name: req.body.user_name,
        email: req.body.email,
        password: hashed,
        full_name: req.body.full_name,
        address_detail: req.body.address_detail,
        phone: req.body.phone,
      });

      const user = await newUser.save();

      res.status(200).json("Đăng ký thành công");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ user_name: req.body.user_name });
      if (!user) {
        return res.status(404).json("Tên người dùng không đúng");
      }

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!validPassword) {
        return res.status(404).json("Mật khẩu không đúng");
      }

      if (user && validPassword) {
        const accessToken = authController.createAccessToken(user);
        const refreshToken = authController.createAccessTokenRefresh(user);

        await RefreshToken.create({ token: refreshToken, user: user._id });

        res.cookie("refresh_token", refreshToken, {
          httpOnly: true,
          secure: true,
          path: "/",
          sameSite: "strict",
        });

        const { password, ...others } = user._doc;
        const successMessage = "Đăng nhập thành công";
        res.status(200).json({ ...others, access_token: accessToken, message: successMessage });
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  logoutUser: async (req, res) => {
    try {
      await RefreshToken.deleteOne({ token: req.cookies.refresh_token });

      res.clearCookie("refresh_token");
      res.status(200).json("Đăng xuất thành công");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  refreshToken: async (req, res) => {
    try {
      const refresh_token = req.cookies.refresh_token;
      if (!refresh_token)
        return res.status(401).json("Hành động này không được ủy quyền");

      const tokenInDb = await RefreshToken.findOne({ token: refresh_token });
      if (!tokenInDb) {
        return res.status(403).json("Refresh token không hợp lệ");
      }

      jwt.verify(
        refresh_token,
        process.env.JWT_ACCESS_KEY_REFRESH,
        (error, user) => {
          if (error) {
            console.log(error);
          }

          res.clearCookie("refresh_token");

          const newAccessToken = authController.createAccessToken(user);
          const newRefreshToken = authController.createAccessTokenRefresh(user);

          tokenInDb.token = newRefreshToken;
          tokenInDb.save();

          res.cookie("refresh_token", newRefreshToken, {
            httpOnly: true,
            secure: false,
            path: "/",
            sameSite: "strict",
          });

          const successMessage = "Refresh token thành công";
          res.status(200).json({ access_token: newAccessToken, message: successMessage });
        }
      );
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = authController;