import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { enAtbash } from "../utils/enAtbash.js";

const JWT_SECRET = process.env.JWT_SECRET;

export function signToken(userId, role) {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: "1h" });
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
    token: signToken(user._id, user.role),
  };
}

export async function createUser(agentCode,fullName,role, password) {
    console.log(fullName)
  const nweUser = {
    agentCode,
    fullName,
    passwordHash: password || enAtbash(fullName),
    role,
  };
  const existing = await User.findOne({ agentCode: nweUser.agentCode });
  if (existing) {
    const err = new Error("agentCode already taken");
    err.status = 409;
    throw err;
  }
  const newUser = await User.create(nweUser);
  return {
    status: "ok",
    newUser,
  };
}
