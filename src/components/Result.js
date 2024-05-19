import React, {useEffect, useState} from "react";

const Result = () => {

    const [result, setResult] = useState()

    useEffect(()=>{
        getResult()
    }, [])

    const getResult = async() => {
        fetch('http://127.0.0.1:8000/api/resultshow', {
            method : 'GET',
            headers : {
                'Authorization' : 'Bearer '+sessionStorage.getItem('token')
            }
        })
        .then(data => data.json())
        .then(response => setResult(response.result))
    }

    return(
        <>  
            <h3>Anda telah melakukan voting</h3>
            <h1>Data Result</h1>
            {/* <table>
                <tr>
                    <td>No</td>
                    <td>Id User</td>
                    <td>Id Vote</td>
                    <td>Id Poll</td>
                </tr>
                {
                    result.map((data, index) => (
                    <tr>
                        <td>{index + 1}</td>
                        <td>{data.id_user}</td>
                        <td>{data.id_vote}</td>
                        <td>{data.id_poll}</td>
                    </tr>
                    ))
                    
                }
            </table> */}
        </>
    )

}
export default Result;