import {createContext} from "react";

type TUser = {
    full_name:string;
    email:string;
    _id:string;
    profile_image?:string;
}
type TAuthContext = {
    user:TUser | null;
    logout:()=>void;
    login:(user:TUser)=>void;
    register:(user:TUser)=>void;
    isLoading:boolean;
}
const initialvalues:TAuthContext={
    user:null,
    isLoading:false,
    logout:()=>{},
    login:()=>{},
    register:()=>{}
}

const AuthContext = createContext(initialvalues);

export default AuthContext;