import Cookies from "universal-cookie"

const is_logged_in = ()=>{
    const cookies = new Cookies()
    const jwt = cookies.get("jwt")
    console.log(jwt != undefined)
    return jwt != undefined
}

export default is_logged_in