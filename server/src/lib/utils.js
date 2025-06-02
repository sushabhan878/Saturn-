import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d", // Fixed typo from 'expiaresIn' to 'expiresIn'
    });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
      sameSite: "strict", // Prevent CSRF attacks
    });

    return token;
  } catch (error) {
    console.error("Token generation error:", error);
    throw new Error("Failed to generate token");
  }
};
