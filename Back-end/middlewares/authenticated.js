import jwt from "jsonwebtoken";

/**
 * Middleware function to verify the authentication token.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} - The response object.
 */
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

/**
 * Middleware function to authorize user roles.
 *
 * @param {Array} roles - An array of roles that are authorized to access the route.
 * @returns {Function} - Middleware function that checks if the user's role is authorized.
 */
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
