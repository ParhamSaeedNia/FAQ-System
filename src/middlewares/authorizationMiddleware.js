// Sample authorization middleware
const authorize = (req, res, next) => {
  // Check if the user has the required permissions (you need to implement your own logic)
  const hasPermission = /* Your authorization logic */ true;

  if (hasPermission) {
    next(); // User has the required permissions, proceed to the next middleware or route handler
  } else {
    res.status(403).json({ error: "Forbidden" });
  }
};

module.exports = authorize;
