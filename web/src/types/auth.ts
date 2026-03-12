export interface User{
    id:string;
    agentCode:string;
    fullName:string;
    role:'admin'|'agent';
}

export interface AuthResponse{
    token:string;
    user:User;
}