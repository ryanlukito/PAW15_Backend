import jwt from "jsonwebtoken";

export const verify = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ msg: "anda tidak memiliki token, tolong login lagi." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(req.user);
    req.superAccess = req.user.role === "admin";
    next();

  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ msg: "Session expired. Tolong login lagi." });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ msg: "Invalid token. Tolong login ulang" });
    }
    return res.status(500).json({ msg: error.message });
  }
};