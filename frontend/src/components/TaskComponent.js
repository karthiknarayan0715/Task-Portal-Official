import { Button } from '@mantine/core';
import axios from 'axios';
const Task = ({task,setRefresh,refresh})=>{
    return (
        <div>
            <div>
                {task.name}
            </div>
            <div>
                {task.description}
            </div>
            <div>
                {task.state}
            </div>
            <center>
                {task.state ==="OPEN" && <Button onClick={()=>
                    {axios.put(process.env.REACT_APP_SERVER_URL+"/api/employee/assign/"+task._id).then((res)=>{
                        if(res.status ===200) setRefresh(!refresh)
                    })}
                }>Take</Button>}
            </center>
        </div>
    )
}

export default Task