import * as userSerbise from "../services/userService.js";

export async function createUser(req, res, next) {
  try {
    const { agentCode, fullName, role, password } = req.body;
    if (!agentCode || !fullName || !role) {
      return res.status(400).json({ error: "Username and password required" });
    }

    const result = await userSerbise.createUser(
      agentCode,
      fullName,
      role,
      password,
    );
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}


export async function listUsers(req,rez){
   try {
     const users = await userSerbise.listUsers();
     return rez.status(200).json({users})
   } catch (err) {
     const status = err.status ?? 500;
    return rez.status(status).json({error: err.message })
   }

}