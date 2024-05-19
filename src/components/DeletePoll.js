import React, {useEffect, useState} from "react";
import { Navigate, Location } from "react-router-dom";

const DeletePoll = () => {

    const navigate = useNavigate([]);
    const location = useLocation();
    const id_poll = location.state.id;
    const [polls, setPolls] = useState([]);

    useEffect (() => {
        if (sessionStorage.getItem('token') === null) {
            navigate('/login')
        }else{
            getDelete()
        }
    }, []);

    const getDelete = () => {
        fetch('http://127.0.0.1:8000/api/pollshow', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer '+sessionStorage.getItem('token')
            },
            body : JSON.stringify({id_poll})
        })
        .then(data => data.json())
        .then(response => {
            setPolls(response.Polls)  
            setVotes(response.Polls.votings)  
        })
    }

    const deletePoll = async() => {
        fetch('http://127.0.0.1:8000/api/polldelete', {
            method : 'GET',
            headers : {
                'Authorization' : 'Bearer '+sessionStorage.getItem('token')
            },
            body : JSON.stringify({id_poll})
        })
        .then(data => data.json())
        .then(Response => {
            Navigate('/voting')
        })
    }
}