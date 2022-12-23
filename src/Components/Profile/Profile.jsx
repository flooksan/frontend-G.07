import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import "../Register/Register.css";

const Profile = () => {

  const getData = () => {
    // e.preventDefault();
    axios
      .get(`${import.meta.env.VITE_APP_API}/users/` + localStorage.user)
      .then((response) => {
        // console.log(response.data);
        setPost(response.data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const [post, setPost] = useState({
    firstname: "",
    lastname: "",
    displayname: "",
    height: 0,
    weight: 0,
    images: [],
  });
  // console.log(post);
  return (
    <form className="boxs">
      <div className="form-register">
        <h1>Profile</h1>
        <div className="f-input">
          <label>Email:</label>
          <br />
          <TextField
            name="email"
            type="email"
            value={post.username}
            InputProps={{ readOnly: true }}
            disabled="true"
          />
        </div>
        <div className="f-input">
          <label>First Name:</label>
          <br />
          <TextField
            name="firstname"
            value={post.firstname}
            InputProps={{ readOnly: true }}
            disabled="true"
          />
        </div>
        <div className="f-input">
          <label>Last Name:</label>
          <br />
          <TextField
            name="lastname"
            value={post.lastname}
            InputProps={{ readOnly: true }}
            disabled="true"
          />
        </div>
        <div className="f-input">
          <label>Display Name:</label>
          <br />
          <TextField
            name="displayname"
            value={post.displayname}
            InputProps={{ readOnly: true }}
            disabled="true"
          />
        </div>
        <div className="f-input">
          <label>Height:</label>
          <br />
          <TextField
            name="height"
            value={post.height}
            InputProps={{ readOnly: true }}
            disabled="true"
          />
          <label>Cm.</label>
        </div>
        <div className="f-input">
          <label>Weight:</label>
          <br />
          <TextField
            required
            value={post.weight}
            name="weight"
            InputProps={{ readOnly: true }}
            disabled="true"
          />
          <label>Kg.</label>
        </div>
        <div className="f-input">
          <label>Address:</label>
          <br />
          <TextField
            name="address"
            value={post.address}
            InputProps={{ readOnly: true }}
            disabled="true"
          />
        </div>
        <div className="f-button" >
          <Button
            href="/dashboard"
            style={{
              backgroundColor: "#C32B42",
              width: "100px",
              height: "30px",
              color: "white",
              marginRight:"10px"
            }}
          >

            Back
          </Button>
          <Button
            variant="contained"
            
            style={{
              backgroundColor: "#50A5B1",
              width: "100px",
              height: "30px",
              color: "white"
            }}
          >
            <a className="editbtn" href="/editProfile">Edit</a> 
          </Button>
        </div>
      </div>

      <div className="form-register-image">
        <img src={localStorage.images} width="240" height="260" />
      </div>
    </form>
  );
};

export default Profile;