import React, {useEffect, useState} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "./Header";

const User =() => {
    
    const [polls, setPolls] = useState([]);
    // const [id_poll, setIdPolls] = useState([]);

    const Navigate = useNavigate([]);

    let id_user = sessionStorage.getItem('id_user')

    useEffect(() => {
        getPoll();
    },[])

    const toVote = (e) => {
        console.log(id_user);
        getResult(e);
    }

    const getResult = async(e) => {
        let id_poll = e

        fetch('http://127.0.0.1:8000/api/cek',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' +sessionStorage.getItem('token'),
            },
            body : JSON.stringify({id_user, id_poll})
        })
        .then(data => data.json())
        .then(response => {
            if (response.status === "found") {
                Navigate('/result')
                console.log(response);
            }else{
                Navigate('/voting',{state:{id:id_poll}})
                console.log('gagal');
            }
        })
    }

    const getPoll = async(e) => {   
        console.log(id_user);    
        fetch('http://127.0.0.1:8000/api/pollshow',{
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' +sessionStorage.getItem('token'),
            },
        })

        .then(data => data.json())
        .then(response => setPolls(response.Polls))
    }

    return(
        <div>
            <Header/>
            <h1>Data Polls</h1>
            <table>
                <tr>
                    <td>Title</td>
                    <td>Description</td>
                    <td>Deadline</td>
                    <td>Aksi</td>
                </tr>
                {
                    polls.map((data, index) => (
                        <tr>
                            <td>{data.title}</td>
                            <td>{data.description}</td>
                            <td>{data.deadline}</td>
                            <td><button onClick={()=>toVote(data.id_poll)}>Vote {data.id_poll}</button></td>
                        </tr>
                    ))
                }
            </table>
        </div>
    )
}

export default User;