// index.js
const http = require('http');

/**
 * Token authorization middleware to check for Authorization header and Bearer token.
 * @param {http.IncomingMessage} req - The incoming request object.
 * @param {http.ServerResponse} res - The response object.
 * @param {function} next - The callback to call the next middleware in the chain.
 */
function tokenAuthMiddleware(req, res, next) {
  // Check for the Authorization header
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    res.statusCode = 401;
    return res.end('Authorization header missing');
  }

  // Extract the token (assuming it's a Bearer token)
  const token = authHeader.split(' ')[1];

  if (!token) {
    res.statusCode = 401;
    return res.end('Token missing');
  }

  console.log('Token:', token);

  // Here you can add validation logic for the token (e.g., JWT verification)
  
  // Call next to continue to the next middleware/handler if token is valid
  next();
}

module.exports = tokenAuthMiddleware;
