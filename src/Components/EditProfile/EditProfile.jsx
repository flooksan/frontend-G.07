import * as React from "react";
import { editProfile } from '../Functions/auth'
import FileUpload from "../Register/FileUpload";
import Swal from 'sweetalert2'
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../Register/Register.css";

const EditProfile = () => {

  const getData = () => {
    // e.preventDefault();
    axios
      .get(`${import.meta.env.VITE_APP_API}/users/` + localStorage.user)
      .then((response) => {
        // console.log(response.data);
        // setPost(response.data);
        // console.log(response.data.images);
        setValue('firstname', response.data.firstname);
        setValue('lastname', response.data.lastname);
        setValue('displayname', response.data.displayname);
        setValue('height', response.data.height);
        setValue('weight', response.data.weight);
        setValue('address', response.data.address);
        setId(response.data._id)
        setImg(response.data)
      });
  };


  useEffect(() => {
    getData();
  }, []);


  const navigate = useNavigate();

  const [id, setId] = useState('')


  const [img, setImg] = useState({
    images: ""
  })
  const {
    register,
    setValue,
    handleSubmit,
  } = useForm({});
  const onSubmit = (data) => {
    // console.log(value.images);
    data.images = img.images
    data._id = id
    // console.log('ยิงจริงๆนะ', data);
    editProfile(data)
    Swal.fire(
      'Edit Success!',
      'You clicked the button!',
      'success'
    )
    localStorage.setItem('images', data.images[0].secure_url)
    localStorage.setItem('displayName', data.displayname)
    navigate('/profile');
  }
  // const onSubmit = (data) => /แสดงข้อมูลให้ดู

  return (
    <form className="boxs" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-register">
        <h1>EditProfile</h1>
        <div className="f-input">
          <label>Fisrt Name:</label>
          <br />
          <TextField
            required
            name="firstname"
            {...register("firstname", { required: true })}
          />
        </div>
        <div className="f-input">
          <label>Last Name:</label>
          <br />
          <TextField
            required
            name="lastname"
            {...register("lastname", { required: true })}
          />
        </div>
        <div className="f-input">
          <label>Display Name:</label>
          <br />
          <TextField
            required
            name="displayname"
            {...register("displayname", { required: true })}
          />
        </div>
        <div className="f-input">
          <label>Height:</label>
          <br />
          <TextField
            required
            name="height"
            type="number"
            {...register("height", { required: true })}
          />
          <label>Cm.</label>
        </div>
        <div className="f-input">
          <label>Weight:</label>
          <br />
          <TextField
            required
            name="weight"
            type="number"
            {...register("weight", { required: true })}
          />
          <label>Kg.</label>
        </div>
        <div className="f-input">
          <label>Address:</label>
          <br />
          <TextField
            name="address"
            aria-label="minimum height"
            style={{ width: 200 }}
            {...register("address")}
          />
        </div>
        <div className="f-button">
          <Button
            variant="contained"
            type="submit"
            onSubmit="handleSubmit"
            style={{
              backgroundColor: "#50A5B1",
              width: "100px",
              height: "30px",
            }}
          >
            Save
          </Button>
          <Button
            variant="contained"
            href="/profile"
            style={{
              backgroundColor: "#C32B42",
              width: "100px",
              height: "30px",
              color: "white",
            }}
          >
            Cancel
          </Button>
        </div>
      </div>

      <div className="form-register-image">
        <FileUpload key={img} value={img} setValue={setImg} />
      </div>
    </form>
  );
};

export default EditProfile;

