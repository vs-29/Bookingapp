import { useContext,useState } from "react";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import axiosInstance from "../../hooks/api";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [credentials, setCredentials] = useState({
        username:undefined,
        password:undefined,
    })
    const navigate = useNavigate()

    const {loading,error,dispatch}=useContext(AuthContext)

    const handleChange=(e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value});
        console.log(credentials);
    };

    const handleClick= async (e)=>{
        e.preventDefault();

        dispatch({type:"LOGIN_START"})
        try {
           const  res= await axiosInstance.post("auth/login",credentials);
           console.log(res);
           console.log('in try block after api call');
           dispatch({type:"LOGIN_SUCCESS",payload: res?.data}) 
           alert("logged In successfully")
           navigate("/")
        } catch (err) {
            console.log('error aa raha');
            dispatch({type:"LOGIN_FAILURE",payload:err.response?.data})
        }
    };

    //console.log(user)
  return (
    <div className="login">
        <div className="lContainer">
            <span>Login</span>
           
            <input type="text" placeholder="Username" id="username"  name="username" onChange={(e)=>handleChange(e)} className="lInput" />
            <input type="password" placeholder="Password" id="password" name="password" onChange={(e)=>handleChange(e)} className="lInput" />
            <button disabled={loading} onClick={(e)=>handleClick(e)} className="lButton">Login</button> 
            {error && <span>{error.message}</span>}
            
        </div>
    </div>
  )
}
