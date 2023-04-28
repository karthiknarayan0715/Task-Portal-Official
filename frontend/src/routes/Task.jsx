import { useDisclosure } from "@mantine/hooks"
import { Button, Modal } from '@mantine/core';
import { useEffect, useState } from "react";
import Container from "../components/Container"
import TaskComponent from '../components/TaskComponent';
import axios from 'axios';
import { useMantineTheme } from '@mantine/core';
import { cool_800, cool_900, secondary } from "../themes/main_theme";
import Cookies from "universal-cookie";



const Task = ({admin})=>{

    const [tasks, setTasks] = useState([]);
    const [refresh,setRefresh] = useState(false);
    const [opened, { open, close }] = useDisclosure(false);
    
    const [taskName, setTaskName] = useState("")
    const [taskDesc, setTaskDesc] = useState("")
    const cookies = new Cookies()

    const AddTask = async ()=>{
        const admincode = localStorage.getItem("admin")
        console.log(admincode)
        const req = {
            method: "POST",
            headers: 
            {
                'content-type': 'application/json',
                admincode
            },
            body: JSON.stringify({
                name: taskName,
                description: taskDesc,
            })
        }
        const res = await fetch(process.env.REACT_APP_SERVER_URL+"/api/tasks/create", req)
        if(res.status == 200){
            const tasksRes = await fetch(process.env.REACT_APP_SERVER_URL + "/api/tasks/")
            const tasks = await tasksRes.json()
            setTasks(tasks.tasks)
            close()           
        }
    }

    const GetTasks = async ()=>{
        const res = await axios.get(process.env.REACT_APP_SERVER_URL+"/api/tasks")
        setTasks(res.data.tasks)
    } 
    const DeleteTask = async (id)=>{
        const admincode = localStorage.getItem("admin")
        await axios.delete(process.env.REACT_APP_SERVER_URL + "/api/tasks/" + id, {
            headers: {admincode}
        })
        const res = await axios.get(process.env.REACT_APP_SERVER_URL+"/api/tasks/")
        setTasks(res.data.tasks)

    }
    const AcceptTask = async (id,task)=>{
        if(task.state != "OPEN") return
        //const admincode = localStorage.getItem("admin")
        const token = cookies.get("jwt")

        await axios.put(process.env.REACT_APP_SERVER_URL + "/api/employee/assign/" + id, {
            token
        })
        let res = await axios.get(process.env.REACT_APP_SERVER_URL+"/api/tasks/")
        setTasks(res.data.tasks)
    }

    useEffect(()=>{
        GetTasks()
    }, [refresh])

    return (
        
        <div style={{
            width: "100vw",
            height: "90vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: cool_900
        }}>
            <div className="container">
                <Modal opened={opened} onClose={close} title="Create Task" centered>
                    <div className="container" style={{
                        display: "block",
                        textAlign: "center",
                        width: "100%",
                        height: "100%",
                    }}>
                        <div className="input"><input type="text" placeholder="Task Name" onChange={(e)=>{setTaskName(e.target.value)}}/></div><br></br>
                        <div className="input"><input type="text" placeholder="Task Desc" onChange={(e)=>{setTaskDesc(e.target.value)}}/></div>
                        <div className="center">
                        <div className="submit" style={{
                            backgroundColor: secondary
                        }} onClick={()=>AddTask()}>Add Task</div></div>
                    </div>
                </Modal>
                {admin &&
                    <div className="center">
                    <Button onClick={open}>
                        Create Task
                    </Button>
                    </div>
                }
            <div className="tasks" style={{
                marginTop: "50px"
            }}>
                {tasks && tasks.map((task)=>{return (<TaskComponent task={task} key={task._id} setRefresh={setRefresh} onDelete={()=>DeleteTask(task._id)} refresh={refresh} acceptTask={AcceptTask} admin={admin}/>)})}
            </div>
            </ div>
        </div>
    )
}
export default Task