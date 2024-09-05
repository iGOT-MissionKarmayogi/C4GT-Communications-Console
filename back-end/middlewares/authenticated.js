import jwt from "jsonwebtoken";

const verify = async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ 
        success: false,
        message: "Not authorized, token failed" 
      });
    }
  } else {
    return res.status(401).json({ 
      success: false,
      message: "Not authorized, no token" 
    });
  }
};

const roleAuthorization = (roles) => {
  return (req, res, next) => {
      if (roles.includes(req.user.role) ) {
          next();
      } else {
          return res.status(403).json({ 
            success: false,
            message: "Not authorized to access this route" 
          });
      }
  };
};

export { verify, roleAuthorization };
