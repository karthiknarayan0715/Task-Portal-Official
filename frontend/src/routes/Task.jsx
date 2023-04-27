import { Button} from '@mantine/core';
import { useEffect, useState } from "react";
import TaskComponent from '../components/TaskComponent';
import axios from 'axios';


const Task = ({admin})=>{

    const [tasks, setTasks] = useState([]);
    const [refresh,setRefresh] = useState(false);

    const GetTasks = async ()=>{
        const res = await axios.get(process.env.REACT_APP_SERVER_URL+"/api/tasks")
        setTasks(res.data.tasks)
    } 

    useEffect(()=>{
        GetTasks()
    }, [refresh])

    return (
        <>
        <br></br>
        <center>
            {admin &&
                <Button>
                    Create Task
                </Button>}
        </center>
        <center style={{width:"50%"}}>
            {[...tasks].map((task)=>{return (<TaskComponent task={task} key={task._id} setRefresh={setRefresh} refresh={refresh}/>)})}
        </center>
        </>
    )
}
export default Task