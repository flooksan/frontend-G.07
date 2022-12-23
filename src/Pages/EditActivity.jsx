
import React, { useState, useCallback, useEffect } from 'react'
import EditActivity from "../Components/Activity/EditActivity"
import '../Components/Activity/Activity.css'
import { useLocation, useNavigate } from 'react-router-dom'

const editActivity = () => {

    const [location,setLocation] = useState(useLocation())
    const id = location.pathname.slice(14);


    // const [activity, setActivity] = useState({
    //     activityName: "test",
    //     activityType: "walk",
    //     decripttion: "test",
    //     duration: "02:21:00",
    //     endDate: "2022-12-16T22:30",
    //     startDate: "2022-12-16T20:09",
    //     userId: "1",
    //     _id: "1"
    // });
   

    return (

        <div className='activity-card'>
            <EditActivity  id={id} />

        </div>
    )
}

export default editActivity