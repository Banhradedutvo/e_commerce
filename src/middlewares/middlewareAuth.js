const jwt = require("jsonwebtoken");

const middlewareAuth = {
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accessToken = token;
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (error, user) => {
        if (error) {
          res.status(403).json({ error: "Mã thông báo không hợp lệ" });
        } else {
          req.user = user;
          next();
        }
      });
    } else {
      res.status(401).json({ error: "Bạn chưa được xác thực" });
    }
  },

  verifyOwnerAndAdmin: (req, res, next) => {
    middlewareAuth.verifyToken(req, res, () => {
      if (req.user.id == req.params.id || req.user.role == "admin") {
        next();
      } else {
        res.status(403).json({ error: "Hành động này không được ủy quyền" });
      }
    });
  },

  verifyAdmin: (req, res, next) => {
    middlewareAuth.verifyToken(req, res, () => {
      if (req.user.role == "admin") {
        next();
      } else {
        res.status(403).json({ error: "Hành động này không được ủy quyền" });
      }
    });
  },
  
  success: (req, res) => {
    res.status(200).json({ message: "Thành công" });
  },

  notFound: (req, res) => {
    res.status(404).json({ error: "Không tìm thấy" });
  },

  invalidRequest: (req, res) => {
    res.status(400).json({ error: "Yêu cầu không hợp lệ" });
  },

  serverError: (req, res) => {
    res.status(500).json({ error: "Lỗi máy chủ" });
  },

  accessDenied: (req, res) => {
    res.status(403).json({ error: "Truy cập bị từ chối" });
  },

  sessionExpired: (req, res) => {
    res.status(401).json({ error: "Phiên đăng nhập đã hết hạn" });
  },

  databaseError: (req, res) => {
    res.status(503).json({ error: "Lỗi cơ sở dữ liệu" });
  }
};

module.exports = middlewareAuth;