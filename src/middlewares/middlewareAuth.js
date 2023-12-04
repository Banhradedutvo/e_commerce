const jwt = require("jsonwebtoken");

const middlewareAuth = {
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accessToken = token;
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (error, user) => {
        if (error) {
          res.status(403).json("Mã thông báo không hợp lệ");
        } else {
          req.user = user;
          next();
        }
      });
    } else {
      res.status(401).json("Bạn chưa xác thực");
    }
  },

  verifyOwnerAndAdmin: (req, res, next) => {
    middlewareAuth.verifyToken(req, res, () => {
      if (req.user.id == req.params.id || req.user.role == "admin") {
        next();
      } else {
        res.status(403).json("Hành động này không được ủy quyền.");
      }
    });
  },

  verifyAdmin: (req, res, next) => {
    middlewareAuth.verifyToken(req, res, () => {
      if (req.user.role == "admin") {
        next();
      } else {
        res.status(403).json("Hành động này không được ủy quyền.");
      }
    });
  },
  
  success: (req, res) => {
    res.status(200).json("Thành công");
  }
};

module.exports = middlewareAuth;