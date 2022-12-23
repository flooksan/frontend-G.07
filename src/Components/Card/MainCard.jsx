import React, { useEffect, useState } from "react";
import "./maincard.css";
import {
    Box,
    Typography,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    createTheme,
    Modal,
    Alert,
    Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CloseIcon from "@mui/icons-material/Close";
import { flexbox } from "@mui/system";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

// Icon
import PoolIcon from "@mui/icons-material/Pool";
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import HikingIcon from '@mui/icons-material/Hiking';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import AlarmOffIcon from '@mui/icons-material/AlarmOff';
// const themeCard = createTheme({
//     palette: {
//       pending: {
//         light: '#757ce8',
//         main: '#3f50b5',
//         dark: '#002884',
//         contrastText: '#fff',
//       },
//       success: {
//         light: '#A8E890',
//         main: '#f44336',
//         dark: '#ba000d',
//         contrastText: '#000',
//         gradient: 'linear-gradient(to right top, #e5d9b6, #dcd3a9, #d1ce9d, #c5c992, #b8c487, #a6b97c, #94ae71, #82a367, #6a8f59, #537b4b, #3d673d, #285430)',
//       },
//       delay: {
//         light: '#ff7961',
//         main: '#f44336',
//         dark: '#ba000d',
//         contrastText: '#000',
//       },
//     },
//   });

const bgcolor = {
    // https://stackoverflow.com/questions/48849340/how-to-add-linear-gradient-color-to-mui-chip-background
    pending:
        "linear-gradient(to bottom, #eaeaea, #eceaeb, #f0e9ea, #f2eae6, #f0ebe3);",
    sucesss:
        "linear-gradient(to right top, #fffbc1, #eef5b7, #ddeeae, #cae8a7, #b6e2a1);",
    delay:
        "linear-gradient(to right top, #fffbc1, #f8d67e, #f9ac42, #fc780c, #ff1e00);",
};

const MainCard = ({ card }) => {
    const navigate = useNavigate();

    const bgcolor2 = "#fef2cc";
    const bgcolorDone = "#d9ead3";
    const bgcolorFail = "#f4cccd";
    let color = "";
    let bgcolor = "";
    let visibility = "visible";
    let iconActivityType = "";
    const {
        username,
        activityName,
        activityType,
        startActivity,
        endActivity,
        detailActivity,
        status,
        duration,
    } = card;
    const { _id: id } = card;

    const options = {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    const startActivityFormat = new Date(startActivity);
    const startFormattedDate = startActivityFormat.toLocaleString(
        "en-US",
        options
    );

    const endActivityFormat = new Date(endActivity);
    const endFormattedDate = endActivityFormat.toLocaleString("en-US", options);

    if (status == 1) {
        bgcolor = bgcolorDone;
        visibility = "hidden";
        color = "#ffffff";
    } else if (status == 9) {
        bgcolor = bgcolorFail;
        visibility = "hidden";
        color = "#ffffff";
    } else {
        bgcolor = bgcolor2;
    }
    
    if (activityType == 'walk') {
        iconActivityType = <DirectionsWalkIcon />
    } else if (activityType == 'hiking') {
        iconActivityType = <HikingIcon />
    } else if (activityType == 'run') {
        iconActivityType = <DirectionsRunIcon />
    } else if (activityType == 'bike') {
        iconActivityType = <DirectionsBikeIcon />
    } else if (activityType == 'swim') {
        iconActivityType = <PoolIcon /> 
    } 

    const [dateStart, setDateStart] = useState(new Date());
    const [dateEnd, setdateEnd] = useState(new Date());

    const time = new Date();
    const timeHrMin = `${time.getHours()}:${time.getMinutes()}`;
    const [timeRemain, setTimeRemain] = useState(timeHrMin);

    const [state, setState] = useState({
        activity: "",
        startDate: "",
        endDate: "",
        decripttion: "",
        statusActivity: 0,
    });
    const { activity, startDate, endDate, decripttion, statusActivity } = state;

    const setStatusActivityCompleted = () => {
        setState({ ...state, statusActivity: 1 });
        // ไปเรียก axios เปลี่ยนสถานนะcard
        axios
            .put(`${import.meta.env.VITE_APP_API}/change-status/${id}`, { status: 1 })
            .then((response) => {
                // window.alert(`Done success !!`)
                window.location.reload()
            }).catch(err => console.log(err))
    }


    const setStatusActivityIncompleted = () => {
        setState({ ...state, statusActivity: 9 });
        // ไปเรียก axios เปลี่ยนสถานนะcard
        axios
            .put(`${import.meta.env.VITE_APP_API}/change-status/${id}`, { status: 9 })
            .then((response) => {
                // window.alert(`Fail success !!`)
                window.location.reload();
            })
            .catch((err) => console.log(err));
    };

    const confirmDelete = (id) => {
        const deleteCard = window.confirm(`You want to delete :${activityName} !!`);
        if (deleteCard) {
            axios
                .delete(`${import.meta.env.VITE_APP_API}/card-activity/${id}`)
                .then((response) => {
                    // window.alert(`Delete success !!`)
                    window.location.reload();
                })
                .catch((err) => console.log(err));
        }
    };

    // modal state
    const [modalState, setModalState] = useState(false);
    useEffect(() => {
        // ไปเปลี่ยนสีี
    }, [statusActivity]);
    return (
        <Card
            className="zoomOut"
            // bgcolor={bgcolor}
            visibility={visibility}
            color={color}
            sx={{
                // maxWidth: 400,
                //  bgcolor status
                // bgcolor: colorStatus,
                background: `${bgcolor}`,
                

                "border-radius": `10px`,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    m: 2,
                }}
            >
                <div className="activity-name" >
                <Typography
                        component="p"
                        variant="h5"
                        sx={{
                            // marginLeft: "10px",
                            // marginRight: "2px",
                            fontWeight: "bold"
                        }}
                    >
                       {activityName}
                    </Typography>
                {/* <span style={{fontWeight: "bold"}}>{activityName}</span>  */}
                    
                </div>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        component="p"
                        variant="h5"
                        sx={{
                            marginLeft: "10px",
                            marginRight: "2px",
                        }}
                    >
                        {activityType}
                    </Typography>
                    {iconActivityType}
                    {/* <PoolIcon /> */}
                </Box>
            </Box>

            {/* Date-Time */}
            <Box className="ml">
                <Typography
                    component="div"
                    sx={{
                        textAlign: "start",
                        marginLeft: "10px",
                        color: "#434242",
                        fontSize: "14px",
                        
                    }}
                >
                    <span style={{fontWeight: "bold"}}>Start:</span> {startFormattedDate}
                    {/* Start: {dateStart.toLocaleString()} */}
                </Typography>
                <Typography
                    component="div"
                    sx={{
                        textAlign: "start",
                        marginLeft: "10px",
                        marginBottom: "5px",
                        fontSize: "14px",
                        

                        // color: "#434242",
                    }}
                >
                    <span style={{fontWeight: "bold"}}>End:</span> {endFormattedDate}
                    {/* End: {dateEnd.toLocaleString()} */}
                </Typography>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    ml:2,
                    }}
                >
                <AccessTimeIcon />
                <Typography variant="h7" component="div" sx={{ml:1}}>
                    {duration}
                </Typography>
            </Box>

            {/* Description */}
            <Box
                sx={{
                    width: "95%",
                    // set div or another tag to center https://www.freecodecamp.org/news/how-to-center-anything-with-css-align-a-div-text-and-more/
                    margin: "0 auto",
                    padding: "10px",
                }}
            >
                <Card
                    sx={{
                        minWidth: "100%",
                        
                    }}
                >
                    <CardContent>
                        <Typography
                            sx={{ fontSize: 14,  }}
                            color="text.secondary"
                            gutterBottom
                        >
                            Activity Details
                        </Typography>
                    </CardContent>
                    <CardActions
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Button
                            size="small"
                            onClick={() => setModalState(true)}
                            sx={{  }}
                        >
                            See more
                        </Button>
                    </CardActions>
                    {setModalState && (
                        <Modal
                            open={modalState}
                            onClose={() => setModalState(false)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box
                                sx={{
                                    position: "relative",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    width: 500,
                                    bgcolor: "background.paper",
                                    border: "2px solid #000",
                                    boxShadow: 24,
                                    p: 4,
                                }}
                            >
                                <div className="container-text-button">
                                    <div>
                                        <Typography
                                            id="modal-modal-title"
                                            variant="h6"
                                            component="h2"
                                        >
                                            What's today
                                            <hr />
                                        </Typography>
                                    </div>
                                    <div className="btn-exit">
                                        <Button onClick={() => setModalState(false)}>
                                            <CloseIcon sx={{ color: "red" }} />
                                        </Button>
                                    </div>
                                </div>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    {detailActivity}
                                </Typography>
                            </Box>
                        </Modal>
                    )}
                </Card>
            </Box>
            {/* remain time */}
            <CardContent>
                <Stack
                    
                    spacing={2}
                    direction="row"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={setStatusActivityCompleted}
                        endIcon={<CheckIcon />}
                        style={{
                            backgroundColor: "#50A5B1",
                            width: "100px",
                            height: "30px",
                            visibility: `${visibility}`,
                        }}
                    >
                        Done
                    </Button>
                    <Button
                        variant="contained"
                        onClick={setStatusActivityIncompleted}
                        endIcon={<AlarmOffIcon />}
                        style={{
                            backgroundColor: "grey",
                            width: "100px",
                            height: "30px",
                            visibility: `${visibility}`,
                        }}
                    >
                        Fail
                    </Button>
                </Stack>

               
            </CardContent>
                      
            <CardActions
            sx={{
              display: "flex",
              gap: "1px",
              justifyContent: "flex-end",
            }}
          >
            
              <Link to={`/editActivity/${id}`} id={id}>
                <Button size="small" href="/editActivity">
                  <EditIcon />
                </Button>
              </Link>
              <Button size="small">
                <DeleteIcon
                  sx={{ color: "red" }}
                  onClick={() => confirmDelete(id)}
                />
              </Button>
            
          </CardActions>

        </Card>
    );
};

export default MainCard;
