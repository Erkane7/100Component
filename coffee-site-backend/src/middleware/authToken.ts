import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

type DecodedUser = {
  userId: string;
  email: string;
};
export interface AuthRequest extends Request {
  user?: DecodedUser;
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.error("JWT_SECRET is not defined.");
    return res.status(500).json({ message: "JWT secret not configured" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

    if (
      typeof decoded === "object" &&
      "userId" in decoded &&
      "email" in decoded
    ) {
      req.user = {
        userId: decoded.userId,
        email: decoded.email,
      };
      return next();
    }

    return res.status(403).json({ message: "Invalid token payload" });
  } catch (err) {
    console.error("JWT verification error:", err);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
