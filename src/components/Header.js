import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router";

const mystyle = {
    baground: "silver"
}

const Header = () => {

    let email = sessionStorage.getItem('email')
    let password = sessionStorage.getItem('password')
    let id_user = sessionStorage.getItem('id_user')

    const navigate = useNavigate([]);

    useEffect(() => {
        if (sessionStorage.getItem('token') === null) {
            navigate('/Login')
        }
    })

    const Logout = async(e) => {
        e.preventDefault();

        // console.log(email);
        // console.log(sessionStorage.getItem('token'));
        fetch("http://127.0.0.1:8000/api/logout", {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer '+sessionStorage.getItem('token')
            },
            body : JSON.stringify({email,password})
        })

        .then(data => data.json())
        .then(response => {
            if (response.status === "success") {
                sessionStorage.clear()
                navigate ('/login')
            }
        })
    }

    return(
        <div style={mystyle}>
            Latihan LKS
            <button onClick={Logout}>Logout</button>
        </div>
    )
}

export default Header;