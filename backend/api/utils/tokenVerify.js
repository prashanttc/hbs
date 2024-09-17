import jwt from "jsonwebtoken";
import { createError } from "./error.js";

// Token verification middleware
export const verifyToken = (req, res, next) => {
      console.log("Cookies:", req.cookies); 
    const token = req.cookies.access_token;
    if (!token) return next(createError(401, "Authentication token is missing"));
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(createError(403, "Invalid token"));
        req.user = user;
        console.log(req.user)  // Attach decoded user data to request object
        next();  // Proceed if the token is valid
    });
};

// User verification middleware (checks if user is owner or admin)
export const verifyUser = (req, res, next) => {
    verifyToken(req, res, (err) => {
        if (err) return next(err);  // Handle errors from verifyToken
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();  // Proceed if user is the owner or admin
        } else {
            return next(createError(403, "Unauthorized access"));
        }
    });
};

// Admin verification middleware (checks if user is admin)
export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, (err) => {
        if (err) return next(err);  // Handle errors from verifyToken
        if (req.user.isAdmin) {
            next();  // Proceed if user is an admin
        } else {
            return next(createError(403, "Admin privileges required"));
        }
    });
};
