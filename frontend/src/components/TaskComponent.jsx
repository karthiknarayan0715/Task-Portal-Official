import { CloseButton } from '@mantine/core';
import axios from 'axios';
import { cool_200, cool_400, cool_50, cool_500, cool_600, secondary } from '../themes/main_theme';
const Task = ({task,setRefresh,refresh, onDelete, acceptTask,admin})=>{
    return (
        <div className="task" style={{
            width: "500px",
            height: "60px",
            padding: "30px",
            margin: "10px",
            borderRadius: "10px",
            border: `1px solid ${cool_400}`,
            display: "flex"
        }}>
            <div>
            <div className="task-name" style={{
                color: cool_50,
                marginBottom: "20px"
            }}>{task.name}</div>
            <div className='task-desc' style={{
                color: cool_500
            }}>{task.description}</div>
            </div>
            <div style={{
                marginLeft: "auto",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
            <div className='AssignButton' style={{
                height: "100%",
                width: "40%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "auto",
                backgroundColor: secondary,
                borderRadius: "40px",
                cursor: "pointer",
            }}
            
            onClick={()=>acceptTask(task._id,task)}
            >
                {task.state}
            </div>
            {admin&&<CloseButton title="Delete Item" size="xl" iconSize={20} onClick={onDelete}/>}
            </div>
        </div>
    )
}

export default Task