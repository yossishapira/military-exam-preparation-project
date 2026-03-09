import * as authService from "../services/authService.js";

export async function createUser(req, res, next) {
  try {
    const { agentCode, fullName, password, role } = req.body;
    if (!agentCode || !fullName || !role) {
      return res.status(400).json({ error: "Username and password required" });
    }

    
    const result = await authService.createUser(agentCode,fullName,password,role);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }
    const result = await authService.login(username, password);
    res.json(result);
  } catch (err) {
    next(err);
  }
}
