const jwt = require("jsonwebtoken");

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    try {
      const token = req.header("Authorization")?.replace("Bearer ", "");
      if (!token) {
        res
          .status(401)
          .json({ success: false, message: "No token, Authorization denied" });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded) {
        req.user = decoded;
        if (roles.length > 0 && !roles.includes(req.user.role)) {
          return res
            .status(403)
            .json({ success: false, message: "Access Denied." });
        }
        next();
      }
    } catch (error) {
      console.log("here auth");
      res.status(500).json({ sucess: false, message: "Internal server error" });
    }
  };
};
module.exports = authMiddleware;
