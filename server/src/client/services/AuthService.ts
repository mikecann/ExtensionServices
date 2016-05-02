import * as axios from "axios";

export function isAuthenticated()
{
    return false;
}

export async function authenticate(email:string, password:string)
{
    console.log("Authenticating ", email);    
    var resp = await axios.post("/api/authenticate", { email, password });
    console.log(resp);    
}