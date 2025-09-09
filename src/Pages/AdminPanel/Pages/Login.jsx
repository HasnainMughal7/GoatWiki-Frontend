import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com"
import '../Pages/AdminPanel.css'
import Loadinganim from '../../../Components/loadingScreen/Loadinganim';


const Login = () => {
    const navigate = useNavigate()

    const [inpUsername, setInpUsername] = useState('')
    const [inpPassword, setInpPassword] = useState('')
    const [inpCode, setInpCode] = useState('')
    const [realCode, setRealCode] = useState('')

    const [error, setError] = useState(null)
    const [forgotPass, setForgotPass] = useState(false)
    const [aunthenticated, setAunthenticated] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState("")

    async function CheckCred(e) {
        e.preventDefault()
        try {
            setForgotPass(false)
            setAunthenticated(true)
            setSubmitting(false)
            setLoading(true)
            const response = await axios.get(
                'https://goatwiki-backend-production.up.railway.app/api/CheckCred',
                {
                    params: {
                        Username: inpUsername,
                        Password: inpPassword
                    }
                }
            )
            if (response.data.msg === "Authentication Successful!") {
                Cookies.set('AuthToken', response.data.token, { expires: 10 })
                navigate('/Admin')
                window.location.reload()
            }
            else {
                setForgotPass(false)
                setAunthenticated(false)
                setLoading(false)
                setError("Invalid Credentials!")
            }
        }
        catch (err) {
            console.error(err)
        }
    }
    function generateRandomCode() {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let code = "";
        for (let i = 0; i < 10; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setRealCode(code)
        return code
    }
    async function ForgotPassword() {
        try {
            setForgotPass(true)
            const genCode = generateRandomCode()
            emailjs.send(
                "service_ut9z4rq", // Service Id
                "template_ktakddo", // Template Id
                { message: genCode },
                "6j0o0Cu3SsckC9pvn"
            ).then(response => {
                alert(`Email sent successfully!`)
            }).catch(error => {
                alert("Failed to send email. Please reload this page and click Forgot Password!");
            })
        }
        catch (err) {
            console.error(err)
        }
    }
    function CheckCode() {
        if (inpCode === realCode) {
            setAunthenticated(true)
        }
        else {
            setError("Incorrect Code!")
        }
    }
    async function ChangeCreds() {
        try {
            setSubmitting(true)
            const NewCreds = {
                NewUsername: inpUsername,
                NewPassword: inpPassword
            }
            const response = await axios.post('https://goatwiki-backend-production.up.railway.app/api/UploadNewCreds', NewCreds)
            setSuccess(response.data.msg)
        }
        catch (err) {
            console.error(err)
            setSuccess("UNSUCCESSFUL")
        }
    }

    return (
        <>
            <div className="mainLogin">
                <h1 id={error ? 'popup' : 'hidden'}>{error}</h1>
                <div className="LoginContainer">
                    {
                        loading && (
                            <Loadinganim/>
                        )
                    }
                    {
                        !forgotPass && !aunthenticated && (
                            <>
                                <h1>
                                    LOGIN
                                </h1>
                                <form onSubmit={CheckCred}>
                                    <input type="text" placeholder='Username' value={inpUsername} onChange={(e) => { setInpUsername(e.target.value) }} />
                                    <input type="text" placeholder='Password' value={inpPassword} onChange={(e) => { setInpPassword(e.target.value) }} />
                                    <button type="submit">SUBMIT</button>
                                    <button type="button" onClick={ForgotPassword}>Forgot Username/Password</button>
                                </form>

                            </>
                        )
                    }
                    {
                        forgotPass && !aunthenticated && (
                            <>
                                <form onSubmit={(e) => { e.preventDefault(); CheckCode() }}>
                                    <h1>Enter The Code Sent To webeepros@gmail.com!</h1>
                                    <input type="text" placeholder='Recieved Code' value={inpCode} onChange={(e) => { setInpCode(e.target.value) }} />
                                    <button type="submit">SUBMIT</button>
                                </form>
                            </>
                        )
                    }
                    {
                        forgotPass && aunthenticated && (
                            <>
                                <form onSubmit={(e) => { e.preventDefault(); ChangeCreds() }}>
                                    <h1>Change Credentials</h1>
                                    <input type="text" placeholder='New Username' value={inpUsername} onChange={(e) => { setInpUsername(e.target.value) }} />
                                    <input type="text" placeholder='New Password' value={inpPassword} onChange={(e) => { setInpPassword(e.target.value) }} />
                                    <button type="submit">SUBMIT</button>
                                </form>
                            </>

                        )
                    }
                    {
                        submitting && (
                            <div className="AP-msg-container">
                                {success === "" && (
                                    <>
                                        <div className="AP-msg-box">
                                            <Loadinganim />
                                        </div>
                                    </>
                                )}
                                {success === "SUCCESSFUL" && (
                                    <>
                                        <div className="AP-msg-box">
                                            <h1>Upload Successful! ✅</h1>
                                            <button className='AP-msg-close-btn AP-msg-btns' onClick={() => { window.location.reload() }}>
                                                Close
                                            </button>
                                        </div>
                                    </>
                                )}
                                {success === "UNSUCCESSFUL" && (
                                    <>
                                        <div className="AP-msg-box">
                                            <h1>Upload Failed! ❌</h1>
                                            <button className='AP-msg-btns' onClick={() => { setSubmitting(false); setSuccess('') }}>
                                                Try Again
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        )
                    }



                </div>
            </div>
        </>
    )
}

export default Login
