const http = require('http');
const jwt = require('jsonwebtoken');  // Import the jsonwebtoken library

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

  try {
    // Decode the JWT (without verifying its signature here for simplicity)
    const decoded = jwt.decode(token);

    // Log or destructure the payload (the data part of the JWT)
    console.log('Decoded JWT Payload:', decoded);

    // Destructure the token payload as needed (assuming you know the structure)
    const { userId } = decoded;
    console.log(`User ID: ${userId}`);

    // Optionally, you can verify the token's signature here if needed
    // jwt.verify(token, 'your-secret-key'); // This should be done for security!

    // Attach the decoded user info to the request object for later use in the handler
    req.user = { userId };

    // Call next to continue to the next middleware/handler if token is valid
    next();

  } catch (error) {
    res.statusCode = 401;
    return res.end('Invalid or expired token');
  }
}

module.exports = tokenAuthMiddleware;
