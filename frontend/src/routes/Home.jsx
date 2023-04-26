import Container from "../components/Container"
import Box from '../components/Box';
import '../styles/Styles.css';
import "../themes/main_theme"
import Cookies from "universal-cookie"
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Form from "../components/Forms";
import {cool_50} from "../themes/main_theme"

const Home = ()=>{

    const [clientAppID, SetClientAppID] = useState(null)

    const GetAppID = async ()=>{
        const cookies = new Cookies()
        const jwt = cookies.get("jwt")
        console.log(jwt)
        const req = {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${jwt}`,
                "clientAppID": clientAppID,
                "Content-type": "application/json",
            },
        };
        const res = await fetch(process.env.REACT_APP_SERVER_URL+"/api/appID")
        const response = await res.json()
        
        console.log(response)
        SetClientAppID(response.clientAppId)

    }

    useEffect(()=>{
        GetAppID()
    }, [])

    return (
        <Container center>
            {clientAppID
            ? 
            <a href={`${process.env.REACT_APP_AUTHX_FRONTEND}/login?clientAppID=${clientAppID}`} target="_blank" rel="noopener noreferrer">
            <div className="authXlogin">
                Login with <div className="x">X</div>
            </div>
            </a>
            :
            <div className="text" style={{
                color: cool_50
            }}>LOADING...</div>
            }
        </Container>
    )
}

export default Home