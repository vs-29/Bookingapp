import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewHotel = () => {
  const [files, setFiles] = useState("");
  const [info,setInfo]=useState({})
  const [rooms, setRooms] = useState([]);

  const {data,loading,error}=useFetch("/rooms");

  const handleChange= (e)=>{
     setInfo(prev=>({...prev,[e.target.id]:e.target.value}))
  }
  console.log(info);
  const handleSelect=(e)=>{
    console.log(e.target.selectedOptions)
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
    console.log(value)
  }


  const handleClick= async(e)=>{
    e.preventDefault();
    try {
      const list =await Promise.all(Object.values(files).map(async(file)=>{
        const data=new FormData()
        console.log("hi formdata here")
        console.log(data)
        data.append("file",file)
        data.append("upload_preset","upload")
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dm6pqxeop/image/upload",
          data
        );
        const {url}=uploadRes.data;
        console.log("hi,i am images url")
        console.log(url);
        return url;
       }));
      
      const newHotel={
        ...info,
        rooms,
        photos:list,
      };
      console.log("hi,i am new hotel")
      console.log(newHotel)
      await axios.post("/hotels",newHotel)
      alert("Hotel Added Successfully");
    } catch (err) {
      console.log("ERROR")
      console.log(err)
    }
  }

  console.log(files)
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Hotel</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} onChange={(e)=>handleChange(e)} type={input.type} placeholder={input.placeholder} />
                </div>
              ))}
                <div className="formInput">
                  <label>Featured</label>
                 <select id="featured" onChange={(e)=>handleChange(e)}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                 </select>
                </div>
                <div className="selectRooms">
                <label>Rooms</label>
                <select id="rooms" multiple onChange={handleSelect}>
                  {loading
                    ? "loading"
                    : data &&
                      data.map((room) => (
                        <option key={room._id} value={room._id}>
                          {room.title}
                        </option>
                      ))}
                </select>
              </div>
             
              <button onClick={(e)=>handleClick(e)}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;
