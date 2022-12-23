import React,{ useState, useEffect} from "react";
import './Dashboard.css'
import profilePicture from '../../assets/man.png'
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MainCard from "../Card/MainCard";
import {Link} from "react-router-dom"
import axios from 'axios'

function BackToTopButton() {
   
  
    
  
    return (
      <button className="back-to-top" style={{ display: showButton ? 'block' : 'none' }}>
        Back to top
      </button>
    );
  }
  

const Dashboard = () => {

    const user = localStorage.user
    const [chartData, setChartData] = useState([])
    // console.log(chartData)

    ChartJS.register(ArcElement, Tooltip, Legend);
    const data = { 
        labels: chartData.map(item => item._id),
        
        datasets: [
          { 
            
            data: chartData.map(item => item.totalscore),
            label: 'Activity Total',
            backgroundColor: [
            //   '#355070',
            //   '#6d597a',
            //   '#b56576',
            //   '#e56b6f',
            //   '#eaac8b',

                '#8ecae6',
                '#219ebc',
                '#023047',
                '#ffb703',
                '#fb8500',
              
            ],
            borderColor: [
                '#8ecae6',
                '#219ebc',
                '#023047',
                '#ffb703',
                '#fb8500',
              
            ],
            borderWidth: 1,
          },
        ],
      };
    
    const [card,setCard] =useState([]);

    // 0=Pending,1 =  Completed , 9 = Incomplete
    const [totalStatus,setTotalStatus] = useState([
        { _id: 9, totalscore: 0 },
        { _id: 0, totalscore: 0 },
        { _id: 1, totalscore: 0 }
      ])

    let total = 0;
    let inProgress = 0;
    let complete = 0;
    let incomplete = 0;
    for ( let i in totalStatus) {
        total += totalStatus[i].totalscore
        if(totalStatus[i]._id==9){
            incomplete = totalStatus[i].totalscore
        }else if(totalStatus[i]._id==1){
            complete = totalStatus[i].totalscore
        }else{
            inProgress = totalStatus[i].totalscore
        }
    }
    

    // /chart-activity, /card-activity /total-status/

    // const {_id,activity,decripttion,endDate,startDate} = card;
    const fetchData = (path) => {
        axios.get(`${import.meta.env.VITE_APP_API}/${path}`,{ params: { user } })
        .then(response => {
            // console.log(response.data)
            if(path == "card-activity") {
                setCard(response.data)
            } else if(path == "chart-activity") {
                    setChartData(response.data)
                    // console.log(`i'm chart`,response.data)
            }
            else if(path == "total-status") {
                    setTotalStatus(response.data)
                    // console.log(`i'm total`,response.data)
                }
            // console.log(card)
        }).catch(err => console.log(err))
    }

    // async function fetchData2 (path) {
    //     try {
    //         const response = await axios.get(`${import.meta.env.VITE_APP_API}/${path}`,{ params: { user } })
    //         (path == "/card-activity") ? setCard(response) :console.log(response);
                
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
    // const [styleSidebar, setStayleSidebar] = useState();
    useEffect(()=>{
        fetchData("card-activity")
        fetchData("chart-activity")
        fetchData("total-status")
        function handleScroll() {
            const element = document.querySelector('.right');
            if (window.scrollY >= 64) {
                element.style.top = '0';
            } else {
                element.style.top = 'initial';
            }
          }
      
          window.addEventListener('scroll', handleScroll);
          return () => window.removeEventListener('scroll', handleScroll);
    },[])

    
      
    return(
   
    <div className="container">
            
            <div className="left">

                <div className='left-top'>
                    <span>Activities Dashboard</span>
                    <a href="/addactivity"><button type="button" className="addActivity">Add Activity</button></a>
                </div>

                <div className='left-bottom'>
                    <div className='left-bottom-background'>
                        <div className="grid-container">
                            <Grid container 
                            direction="row"
                            justifyContent="center" 
                            alignItems="center"
                             spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }} >
                            
                            { card.length >0 && card.map((carditem,index) => 
                                <Grid item xs={2} sm={4} md={4} key={index}>
                                    <MainCard key={carditem._id} card={carditem}/>
                                </Grid>
                            )}
                            
                            {/* {Array.from(Array(6)).map((_, index) => (
                                <Grid item xs={2} sm={4} md={4} key={index}>
                                    <SwimCard props={card} />
                                </Grid>
                            ))} */}

                            </Grid>
                        </div>

                    </div>                  
                    
                    
                    
                </div>

            </div>
            <div className="right" >
                     <div className="display-card">
                        <span>Hello, </span>
                        <h2 className="profile-name">{localStorage.displayName}</h2>
                        {/* <Link to="/profile" className="picture-link">
                            <img src={localStorage.images} alt="profile-picture" className="profile-picture" />
                        </Link> */}
                        <a href="/profile">
                            <img src={localStorage.images} alt="profile-picture" className="profile-picture" />
                        </a>


                        <div className="box">
                            <span className="summary-header">Completed Activities</span>
                        </div>
                        <Box className="graph"> 
                            <Doughnut data={data} />
                        </Box>
    
                        <div className="box">
                            <span className="summary-header">Summary</span>
                            <div className="activity-container">
                                <div className="activity">
                                    <p>Total activity:</p>
                                    <span className="gray">|</span>
                                    <span>{total}</span>
                                </div>
                                <div className="activity">
                                    <p>Completed:</p>
                                    <span className="green">|</span>
                                    <span>{complete}</span>
                                </div>
                            </div>
                            <div className="activity-container">
                                <div className="activity">
                                    <p>In progress:</p>
                                    <span className="yellow">|</span>
                                    <span>{inProgress}</span>
                                </div>
                                <div className="activity">
                                    <p>Incomplete:</p>
                                    <span className="red">|</span>
                                    <span>{incomplete}</span>
                                </div>
                            </div>
                        </div>
                        

                        

                    </div>
                
            </div>
        
    </div>
    )
}
export default Dashboard