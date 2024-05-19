import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

const Poll = () => {

    const [title, setTitle] = useState([]);
    const [description, setDescription] = useState([]);
    const [deadline, setDeadline] = useState([]);
    const navigate = useNavigate([]);

    useEffect(() => {
        if (sessionStorage.getItem('token') === null) {
            navigate('/Login')
        }
    })
    
    const create = async(e) =>{
        e.preventDefault();

        fetch('http://127.0.0.1:8000/api/pollcreate', {
            method: 'POST',
            headers: {
                'Content-Type' : 'Application/json',
                'Authorization': 'Bearer '+sessionStorage.getItem('token')
            },
            body: JSON.stringify({title,description,deadline})
        })


        .then(data => data.json())
        .then(Response => {
            if (Response.status == "success") {
                navigate('/admin')
            }else{
                console.log("gagal");
            }
        })
    }

    return(
        <form onSubmit={create}>
            title <input type="text" onChange={e => setTitle(e.target.value)} /> <br/>
            description <input type="text" onChange={e => setDescription(e.target.value)} /> <br/>
            deadline <input type="date" onChange={e => setDeadline(e.target.value)} /> <br/>
            <input type="submit" value="submit"/>
        </form>
            
    )
}

export default Poll;

