import React, { useState, useCallback, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { InputLabel, Select, MenuItem } from '@mui/material';
import './Activity.css'
import Grid from '@mui/material/Grid'; // Grid version 1';
import addheader from '../../assets/add.png'
import axios from 'axios';

import runimg from '../../assets/activityPicture/run.jpg'
import bikeimg from '../../assets/activityPicture/bike.jpg'
import walkimg from '../../assets/activityPicture/walk.jpg'
import hikingimg from '../../assets/activityPicture/hiking.jpg'
import swimimg from '../../assets/activityPicture/swim.jpg'


const Activity = (props) => {
    const navigate = useNavigate();
    const id = props.id
    // console.log(props.id)

    // State of activity
    // const {id} = props.id
    const [state, setState] = useState({
        username: localStorage.user,
        activityName: "",
        activityType: "walk",
        startActivity: Date.now(),
        endActivity: Date.now(),
        duration: "",
        status: "",
        detailActivity: "",
    })
    const { username, activityName, activityType, startActivity, endActivity, duration, detailActivity } = state
    const [img, setImg] = useState(walkimg)
    // async function getCardActivity() {
    //     try {
    //         const response = await axios.get(`${import.meta.env.VITE_APP_API}/card-activity/${id}`);
    //         const { activityName, activityType, startDate, endDate, duration, detailActivity } = response.data
    //         setState({ activityName, activityType, startDate, endDate, duration, detailActivity })
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // useEffect(() => {
    //     getCardActivity()
    // }, [])


    // Function

    const setActivityName = (e) => {
        setState({ ...state, activityName: e.target.value })
    }
    const selectActivity = (e) => {
        setState({ ...state, activityType: e.target.value })

    }
    const setDescriptiton = (e) => {
        setState({ ...state, detailActivity: e.target.value })
    }
    const selectstartdate = (e) => {
        setState({ ...state, startActivity: e.target.value })
    }
    const selectenddate = (e) => {
        setState({ ...state, endActivity: e.target.value })
    }
    const setDuration = (e) => {
        setState({ ...state, duration: e.target.value })
    }
    useEffect(() => {
        setState({ ...state, duration: getDateDifference() })
    }, [startActivity, endActivity]);

    useEffect(() => {
        // console.log('activityType',state.activityType);
        if(state.activityType == 'walk'){
            setImg(walkimg)
        }else if(state.activityType == 'run'){
            setImg(runimg)
        }else if(state.activityType == 'hiking'){
            setImg(hikingimg)
        }else if(state.activityType == 'swim'){
            setImg(swimimg)
        }else if(state.activityType == 'bike'){
            setImg(bikeimg)
        }
       
    }, [state.activityType]);

    // console.log(img);
    function getDateDifference() {
        const tempStartDate = new Date(startActivity);
        const tempEndDate = new Date(endActivity);
        const timeDifference = Math.abs(tempEndDate - tempStartDate);
        const diffHours = Math.floor(timeDifference / (1000 * 3600));
        const diffMinutes = Math.floor((timeDifference % (1000 * 3600)) / (1000 * 60));
        const diffSeconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        const formattedTimeDifference = `${diffHours.toString().padStart(2, '0')}:${diffMinutes.toString().padStart(2, '0')}:${diffSeconds.toString().padStart(2, '0')}`;
        return formattedTimeDifference;
    }

    const submitForm = (e) => {
        e.preventDefault();
        axios.post(`${import.meta.env.VITE_APP_API}/add-activity`, { username, activityName, activityType, startActivity, endActivity, detailActivity, duration })
            .then(response => {
                // alert('Add Activity')
                // console.log('after Add', response.data)
                setState(response.data)
                // console.log(state)
                onBackClick()
            }).catch(err => console.log(err))
    }

    const onBackClick = useCallback(() => {
        navigate('../dashboard')
    }, [navigate])

    const minDate = new Date().toISOString().substr(0, 16);


    return (
        (state &&
            <div className='form-activity' style={{ margin: "32px" }}>
                <div className="flex">
                    <div className="form-pic">
                        <img src={img} className="run-picture" />
                    </div>

                    <form className='form-add' onSubmit={submitForm}>
                        <div className="add-header">
                            <img src={addheader} />
                        </div>

                        <Grid container spacing={0} margin={2} >
                            <Grid item xs={12} md={4}>
                                <label className=''>Activity Name: </label>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <TextField id="activity_name" label="Activity Name" variant="outlined" value={activityName} validators={["required"]} onChange={setActivityName} style = {{width: 250}} required />
                                {/* <input type="text" className='form-control' onChange={setActivityName} /> */}
                            </Grid>
                        </Grid>

                        <Grid container spacing={0} margin={2}>
                            <Grid item xs={12} md={4}>
                                <label id="activity_type">Activity Type: </label>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Select style = {{width: 250}}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={activityType}
                                    label="Activity Type"
                                    onChange={selectActivity}
                                >
                                    <MenuItem value="" disabled>Activity Type</MenuItem>
                                    <MenuItem value="walk">Walk</MenuItem>
                                    <MenuItem value="run">Run</MenuItem>
                                    <MenuItem value="hiking">Hiking</MenuItem>
                                    <MenuItem value="swim">Swim</MenuItem>
                                    <MenuItem value="bike">Bike</MenuItem>
                                </Select>
                                {/* <label className=''>Select Activity: </label>
                    <select className='form-select mb-3' onChange={selectActivity}>
                        <option value="walk">Walk</option>
                        <option value="run">Run</option>
                        <option value="hiking">Hiking</option>
                        <option value="swim">Swim</option>
                        <option value="bike">Bike</option>
                    </select> */}
                            </Grid>
                        </Grid>

                        {/* date start */}
                        <Grid container spacing={0} margin={2}>
                            <Grid item xs={12} md={4}>
                                <label className=''>Start : </label>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <TextField style = {{width: 250}} 
                                    id="start_date"
                                    label="Start :"
                                    type="datetime-local"
                                    value={startActivity}
                                    min={minDate}
                                    // defaultValue="2022-12-07T09:30"
                                    onChange={selectstartdate}
                                    sx={{ width: 250 }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    required
                                />
                            </Grid>
                        </Grid>

                        {/* date end */}
                        <Grid container spacing={0} margin={2}>
                            <Grid item xs={12} md={4}>
                                <label className=''>End : </label>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <TextField style = {{width: 250}}
                                    id="end_date"
                                    label="End :"
                                    type="datetime-local"
                                    value={endActivity}
                                    // defaultValue="2022-12-28T10:30"
                                    min={startActivity}
                                    onChange={selectenddate}
                                    sx={{ width: 250 }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    required
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={0} margin={2}>
                            <Grid item xs={12} md={4}>
                                <label className=''>Duration : </label>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <TextField style = {{width: 250}} id="duration" label="" variant="outlined" value={duration} onChange={setDuration} disabled />
                            </Grid>
                        </Grid>

                        <Grid container spacing={0} margin={2}>
                            <Grid item xs={12} md={4}>
                                <label className=''>Description: </label>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <TextField style = {{width: 250}}
                                    sx={{ borderRadius: '40%' }}
                                    id="Decripttion"
                                    aria-label="minimum height"
                                    minRows={3}
                                    placeholder="Minimum 3 rows"
                                    multiline
                                    label="Description"
                                    onChange={setDescriptiton}
                                    name="Decripttion"
                                    value={detailActivity}
                                // validators={["required"]}
                                // errorMessages={["this field is required"]}
                                />
                            </Grid>
                        </Grid>


                        {/* Button */}
                        <div className="btn">
                            <button type="cancle" onClick={onBackClick} className="" style={{ backgroundColor: "#C32B42", marginRight: "16px" }}>Cancle</button>
                            <button type="submit" value="submit" className="">Save</button>
                        </div>



                    </form>
                </div>
            </div>
        )
    )
}

export default Activity