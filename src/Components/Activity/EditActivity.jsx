import React, { useState, useCallback, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { InputLabel, Select, MenuItem } from '@mui/material';
import './Activity.css'
import Grid from '@mui/material/Grid'; // Grid version 1';
import editheader from '../../assets/edit.png'
import axios from 'axios';

//activityPicture
import runimg from '../../assets/activityPicture/editrun.jpg'
import bikeimg from '../../assets/activityPicture/bike2.jpg'
import walkimg from '../../assets/activityPicture/walk.jpg'
import hikingimg from '../../assets/activityPicture/hiking2.jpg'
import swimimg from '../../assets/activityPicture/swim2.jpg'

const EditActivity = (props) => {
    const navigate = useNavigate();
    const id = props.id
    // State of activity
    const [state, setState] = useState({
        activityName: "",
        activityType: "",
        startActivity: "",
        endActivity: "",
        duration: "",
        status: "",
        detailActivity: "",
    })
    const { activityName, activityType, startActivity, endActivity, duration, detailActivity } = state
    const [img, setImg] = useState(walkimg)
    async function getCardActivity() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_API}/card-activity/${id}`);
            const { activityName, activityType, startActivity, endActivity, duration, detailActivity } = response.data
            setState({ activityName, activityType, startActivity, endActivity, duration, detailActivity })
            // console.log(state);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getCardActivity()
    }, [])

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

    useEffect(() => {
        setState({ ...state, duration: getDateDifference() })
        // This function will be called whenever the value of date1 or date2 changes
        // console.log('The difference between the selected dates has changed');
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

    const submitForm = (e) => {
        e.preventDefault();
        axios.put(`${import.meta.env.VITE_APP_API}/edit-activity/${id}`, { activityName, activityType, startActivity, endActivity, detailActivity, duration })
            .then(response => {
                // alert('Edit Activity')
                // console.log('after edit', response.data)
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
                            <img src={editheader} />
                        </div>

                        <Grid container spacing={0} margin={2} >
                            <Grid item xs={12} md={4}>
                                <label className=''>Activity Name: </label>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <TextField style = {{width: 250}} id="activity_name" label="Activity Name" variant="outlined" value={activityName} validators={["required"]} onChange={setActivityName} required />
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

export default EditActivity