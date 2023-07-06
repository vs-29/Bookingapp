
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { useContext, useState } from 'react';
import './register.css';
import { AuthContext } from '../../context/AuthContext';
import axiosInstance from '../../hooks/api';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


export const Register = () => {
  const [file, setFile] = useState("");
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    country: undefined,
    img: undefined,
    city: undefined,
    phone: undefined,
    password: undefined,
  });
  const navigate = useNavigate();

  const { loading, error, dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    console.log(credentials);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const data=new FormData()
    data.append("file",file)
    data.append("upload_preset","upload")
    dispatch({ type: 'REGISTER_START' });
    try {
   
     const uploadRes = await axiosInstance.post(
        "https://api.cloudinary.com/v1_1/dm6pqxeop/image/upload",
        data
      );
      const {url}=uploadRes.data
      const newUser={
        ...credentials,
        img:url,
      }
  
      await axiosInstance.post("/auth/register",newUser);

      dispatch({ type: 'REGISTER_SUCCESS', payload: newUser });
      alert("User created successfully")
      navigate('/');
    } catch (err) {
      console.log('error aa raha');
      dispatch({ type: 'REGISTER_FAILURE', payload: err.response?.data });
    }
  };

  return (
   
    <div className="rmain">
    <div className="rnewContainer">

      <div className="rbottom">
          <div className="rleft">
              <img src={ file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt=""/>
          </div>

          <div className="rright">
                <div className="rtitle">
                    Register
                </div>

              <form>
                <div className="rformInput">
                  <label htmlFor="file"> Image: <DriveFolderUploadOutlinedIcon className="icon" /> </label>
                  <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} style={{ display: "none" }}
                  />
                </div>
                <label> Username: <br /> <input type="text" name="username" onChange={handleChange} required/> </label>
                <label> Email: <br /> <input type="email" name="email" onChange={handleChange}  required/> </label>
                <label> Country: <br /> <input type="text" name="country" onChange={handleChange} required/></label>
                <label> City: <br /> <input type="text" name="city" onChange={handleChange} required/></label>
                <label>Phone Number: <br /> <input type="tel" name="phone" onChange={handleChange} required/></label>
                <label>Password: <br /> <input type="password" name="password" onChange={handleChange} required /> </label>
            <button onClick={(e)=>handleClick(e)}>Send</button>
              </form>
              <br />
              <Link to="/login" style={{color:"red",textDecoration:"none"}}>
                <span className="logo1">If already user then click here to login</span>
              </Link>
          </div>
      </div>
<br />
      
    </div>
  </div>
  );
};

