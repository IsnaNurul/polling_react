import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const Login = () =>{

    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);
    const [id_user, setId_user] = useState([]);

    const navigate = useNavigate([]);

    const auth = async(e) => {
        e.preventDefault();

        fetch('http://127.0.0.1:8000/api/login',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({email,password})
        })
        .then(data => data.json())
        .then(response => {
            if(response.status === "success"){
                if(response.user.level === "admin"){
                    sessionStorage.setItem('token', response.authorisation.token)
                    sessionStorage.setItem('email', email)
                    sessionStorage.setItem('password', password)
                    console.log(response);
                    if (password === "admin") {
                        navigate('/changepass')
                    }else{
                        navigate('/admin')
                    }
                }else if(response.user.level === "user"){
                    sessionStorage.setItem('token', response.authorisation.token)
                    sessionStorage.setItem('email', email)
                    sessionStorage.setItem('password', password)
                    sessionStorage.setItem('id_user', response.user.id_user)

                    console.log(response);
                    if (password === "user") {
                        navigate('/changepass')
                    }else{
                        navigate('/user')
                    }
                }else{
                    navigate('/login')
                }
                console.log("berhasil");
            }else{
                console.log("gagal");
            }
        })
    }

    return(
        <form onSubmit={auth}>
            Email <input type="text" onChange={e => setEmail(e.target.value)} /> <br />
            Password <input type='text' onChange={e => setPassword(e.target.value)} /> <br />
            <input type="submit" value="SIGN IN" />
        </form>
    )

}

export default Login;