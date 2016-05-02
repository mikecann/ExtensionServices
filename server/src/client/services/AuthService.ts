import * as axios from "axios";

export function isAuthenticated()
{
    return localStorage.getItem("token") && 
        parseInt(localStorage.getItem("token_exprire")) > Date.now();
}

export async function authenticate(email:string, password:string)
{
    console.log("Authenticating ", email);    
    var resp = await axios.post<any>("/api/authenticate", { email, password });
    console.log("Got auth response", resp);
    localStorage.setItem("token", resp.data.token);
    localStorage.setItem("token_exprire", (Date.now() + resp.data.expiresInMinutes * 60 * 1000) + "");
}