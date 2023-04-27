
const is_admin = ()=>{
    return localStorage.getItem("admin") !=null
}

export default is_admin