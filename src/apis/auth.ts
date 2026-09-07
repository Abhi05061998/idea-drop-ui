import api from "@/lib/axios";

export const registerUser=async({
    name,email,password
}:{
    name:string;
    email:string;
    password:string;
})=>{
    try {
        const res=await api.post("/auth/register",{name,email,password})
        return res.data;
    } catch (err:any) {
        throw new Error(err.response?.data?.message || "Failed to register");
    }
}
export const loginUser=async({
    email,password
}:{
    email:string;
    password:string;
})=>{
    try {
        const res=await api.post("/auth/login",{email,password})
        return res.data;
    } catch (err:any) {
        throw new Error(err.response?.data?.message || "Failed to login");
    }
}
export const logoutUser=async()=>{
    try {
        const res=await api.post("/auth/logout")
        return res.data;
    } catch (err:any) {
        throw new Error(err.response?.data?.message || "Failed to logout");
    }
}
export const refreshAccessToken =async()=>{
    try {
        const res=await api.post(`${import.meta.env.VITE_API_PRODUCTION_URL}/auth/refresh`)
        return res.data
    } catch (error:any) {
        throw new Error(error.response?.data?.message || "Failed to refresh access token");
    }
}
