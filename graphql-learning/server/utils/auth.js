import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// JWT secret key (in production, this should be in environment variables)
const JWT_SECRET = 'your-secret-key-here';
const JWT_EXPIRES_IN = '24h';

// Generate JWT token
export const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// Verify JWT token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

// Hash password
export const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Compare password
export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Get user from context (for protected resolvers)
export const getAuthenticatedUser = (context) => {
  if (!context.user) {
    throw new Error('Authentication required. Please log in to access this resource.');
  }
  return context.user;
};

// Check if user has required role
export const requireRole = (user, requiredRole) => {
  if (user.role !== requiredRole) {
    throw new Error(`Access denied. ${requiredRole} role required.`);
  }
};
