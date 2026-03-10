import * as authService from "../services/authService.js";


export async function login(req, res, next) {
  try {
    const { agentCode, password } = req.body;
    if (!agentCode || !password) {
      return res
        .status(400)
        .json({ error: "Agent code and password are required" });
    }
    const result = await authService.login(agentCode, password);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export function me(req, res) {
    const reqUser = {
        id:req.user._id,
        agentCode:req.user.agentCode,
        fullName:req.user.fullName,
        role:req.user.role,
        createdAt:req.user.createdAt,
        
    }
  return res.status(200).json(reqUser );
}