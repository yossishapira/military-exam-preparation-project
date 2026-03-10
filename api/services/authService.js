import User from "../models/User.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function signToken(user) {
  return jwt.sign( {user} , JWT_SECRET, { expiresIn: "1h" });
}

export async function login(agentCode, password) {
  const user = await User.findOne({ agentCode });
  if (!user) {
    const err = new Error("Invalid agentCode or password");
    err.status = 401;
    throw err;
  }
  const ok = await user.comparePassword(password);
  if (!ok) {
    const err = new Error("Invalid agentCode or password");
    err.status = 401;
    throw err;
  }
  return {
    user: { id: user._id, agentCode: user.agentCode, role: user.role },
    token: signToken(user),
  };
}
