import React, {useEffect, useState} from "react";
import {useNavigate } from "react-router-dom";

const Changepass = () => {

    const [old_password, setOld_password] = useState([]);
    const [new_password, setNew_password] = useState([]);

    const navigate = useNavigate([]);

    useEffect(() => {
        if (sessionStorage.getItem('token') === null) {
            navigate('/Login')
        }
    })

    const change = async (e) => {
        e.preventDefault();

        fetch('http://127.0.0.1:8000/api/reset', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' +sessionStorage.getItem('token') 
            },
            body : JSON.stringify({old_password,new_password})
        })

        .then (data => data.json())
        .then (response => {
            if (response.status == "success") {
                navigate('/login')
            }else{
                console.log('gagal');
            }
        })
    }

    return(
        <form onSubmit={change}>
            Old Password <input type="text" onChange={e => setOld_password(e.target.value)}/> <br/>
            New Password<input type="text" onChange={e => setNew_password(e.target.value)}/> <br/>
            <input type="submit" value="Simpan"/>
        </form>
    )
}

export default Changepass;