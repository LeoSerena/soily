import { useState } from 'react'
import Router from 'next/router'
import axios from 'axios'

import { validate_login, validate_register } from '../../lib/validation'
import Input from '../utils/input'

export default function RegisterLogin ( {setUser} ){

    const [toggle, setToggle] = useState('default')

    if(toggle === 'register'){
        return <RegisterForm setToggle={setToggle}/>
    } else if (toggle === 'login'){
        return <LoginForm setUser={setUser} setToggle={setToggle}/>
    } else{
        return (<div className = 'registerLogin'>
            <button onClick={() => setToggle('login')}>Login</button>
            <button onClick={() => setToggle('register')}>Register</button>
        </div>)
    }
                
}



function LoginForm({ setUser, setToggle }) {

    const [credentials, setCredentials] = useState('')
    const [password, setPassword] = useState('')

    function handleChange(event) {
        if(event.target.name == 'credentials'){
            setCredentials(event.target.value)
        }else{
            setPassword(event.target.value)
        }
    }

    async function login(event) {
        event.preventDefault()
        const data = {
            credentials : credentials,
            password : password
        }
        const valid = validate_login(data)
        if(valid){
            alert(valid)
        }else{
            const result = await axios({
                method : 'post',
                url : `${process.env.NEXT_PUBLIC_SERVER_URL}/login`,
                data : data,
                withCredentials: true
            })
            if(result.data.status === 'success'){
                setUser(result.data.user)
                Router.push('/myPage')
            }else{
                alert(result.data)
            }
        }
    }

    return (
        <form onSubmit={login}>
            <Input 
                withLabel={true} 
                key={'credentials'} 
                name={'credentials'} 
                inputNameDisplay={'email or username'} 
                value={credentials} handleChange={handleChange}/>
            <Input 
                withLabel={true} 
                key={'password'} 
                name={'password'} 
                inputNameDisplay={'password'} 
                value={password} handleChange={handleChange}/>
            <input type="submit" value="Submit" /><button onClick={()=>setToggle('default')}>cancel</button>
        </form>
    )
}

function RegisterForm({setToggle}) {

    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [email, setemail] = useState('')

    function handleChange(event) {
        switch(event.target.name){
            case 'username':
                setUsername(event.target.value)
                break
            case 'password':
                setPassword(event.target.value)
                break
            case 'passwordConfirm':
                setPasswordConfirm(event.target.value)
                break
            case 'email':
                setemail(event.target.value)
                break
        }
    }

    async function handleSubmit(event) {
        event.preventDefault()
        const data = {
            username : username,
            password : password,
            email : email
        }
        const valid = validate_register(data)
        if(valid){alert(valid)}
        else{
            if(!password === passwordConfirm){
                alert('The two passwords are not identical')
            }else{
                let result = await axios({
                    method : 'post',
                    url : `${process.env.NEXT_PUBLIC_SERVER_URL}/register`,
                    data : data
                })
                // handle register verification
                Router.reload()
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input withLabel={true} name={'username'} inputNameDisplay={'username'} value={username} handleChange={handleChange}/>
            <Input withLabel={true} name={'password'} inputNameDisplay={'password'} value = {password} handleChange={handleChange}/>
            <Input withLabel={true} name={'passwordConfirm'} inputNameDisplay={'passwordConfirm'} value = {passwordConfirm} handleChange={handleChange}/>
            <Input withLabel={true} name={'email'} inputNameDisplay={'email'} value = {email} handleChange={handleChange}/>
            <input type="submit" value="Submit" /><button onClick={()=>setToggle('default')}>cancel</button>
        </form>)
}