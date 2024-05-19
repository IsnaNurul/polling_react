import React, {useEffect, useState} from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";

const Voting = () => {

    const navigate = useNavigate([]);
    const location = useLocation();
    const id_poll = location.state.id;
    const [polls, setPolls] = useState([]);
    const [votes, setVotes] = useState([]);
    const [vote, setVote] = useState([]);

    useEffect(() => {
        if (sessionStorage.getItem('token') === null) {
            navigate('/login')
        }else{
            getVoting()
        }
    })

    const getVoting = () => {
        fetch('http://127.0.0.1:8000/api/showvote', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'bearer '+sessionStorage.getItem('token')
            },
            body : JSON.stringify({id_poll})
        })
        .then(data => data.json())
        .then(response => {
            setPolls(response.Polls)  
            setVotes(response.Polls.votings)  
        })
    }

    const create = async(e) => {
        e.preventDefault();

        fetch('http://127.0.0.1:8000/api/result', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'bearer '+sessionStorage.getItem('token')
            },
            body : JSON.stringify({vote,id_poll})
        })

        .then(data => data.json())
        .then(Response => {
            if (Response.status === "success") {
                navigate('/user')
            }else{
                console.log("gagal");
            }
        })
    }

    return (
        <form onSubmit={create}>
            <h2>Title: {polls.title}</h2>
            {
                votes.map((data)=>(
                    <>
                        <input type="radio" name="vote" value={data.id} onClick={(e)=>setVote(e.target.value)} /> {data.vote} <br/>
                    </>                   
                ))
            }
            <input type="submit" value="Simpan" /> 

        </form>
    )
}

export default Voting;