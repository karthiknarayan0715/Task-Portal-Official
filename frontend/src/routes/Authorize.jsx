import Container from "../components/Container"
import Box from '../components/Box';
import '../styles/Styles.css';
import "../themes/main_theme"
import Cookies from "universal-cookie"
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Form from "../components/Forms";
import {cool_50} from "../themes/main_theme"

const Authorize = ()=>{
    const [searchParams] = useSearchParams()
    const auth_code = searchParams.get('auth_code')
    const cookies = new Cookies()
    const navigate = useNavigate()

    const GetAccessToken = async ()=>{
        const req = {
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                auth_code: auth_code
            })
        }
        const res = await fetch(process.env.REACT_APP_SERVER_URL+"/auth/login", req)
        const response = await res.json()

        if(res.status == 200){
            cookies.set(response.jwt_token)
            navigate("/home")
        }
    }   
    useEffect(()=>{
        GetAccessToken()
    }, [])

    return (
        <Container center>
            
        </Container>
    )
}

export default Authorize