import React, {useEffect, useState} from "react";
import { Navigate } from "react-router-dom";
import Header from "./Header";
import Poll from "./Poll";

const Admin = () => {

    const [polls,setPolls] = useState([])

    useEffect(()=>{
        getPoll()
    },[])

    const getPoll = async()=>{
        fetch("http://127.0.0.1:8000/api/pollshow",{
            method: 'GET',
            headers: {
                'Authorization': 'Bearer '+sessionStorage.getItem('token')
            }
        })
        .then(data => data.json())
        .then(response =>setPolls(response.Polls))
    }

    return(
        <div>
            <Header/>
            <h1>Data Pengguna</h1>
            <a href="/pollcreate"><button>New Poll</button></a>
            <table>
                <tr>
                    <td>Title</td>
                    <td>Description</td>
                    <td>Deadline</td>
                    {/* <td>Aksi</td> */}
                </tr>
                {
                    polls.map((data, index)=>(
                        <tr>
                            <td>{data.title}</td>
                            <td>{data.description}</td>
                            <td>{data.deadline}</td>
                            {/* <td><a href="/polldelete"><button>Delete</button></a></td> */}

                        </tr>
                    ))
                }
            </table>
        </div>
    )
}

export default Admin