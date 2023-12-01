import React, { useRef, useState } from 'react'
import { CiMail } from "react-icons/ci";
import "./LoginSignup.css"
import { IoLockOpenOutline } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import profile from "../../img/profile-icon-png-898.png"

const LoginSignup = () => {
    const loginTab = useRef(null)
    const registerTab = useRef(null)
    const switcherTab = useRef(null)

    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })
    const { name, email, password } = user
    const [avatar,setAvatar] = useState()
    const [avatarPreview,setAvatarPreview] = useState(profile)
    const loginSubmit = () => {
        console.log("Login Form submitted")
    }
    const registerSubmit = (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.set("name", name)
        myForm.set("email", email)
        myForm.set("password", password)
        myForm.set("avatar", avatar)
        console.log("sing up Form submitted")

    }

    const registerDataChange = (e) => {
        if(e.target.name === "avatar"){
            const reader = new FileReader()
            reader.onload = () => {
                if(reader.readyState === 2){
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)

                }
            }
            reader.readAsDataURL(e.target.files[0])
        }else{
            setUser({...user,[e.target.name]:e.target.value})
        }
    }
    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral")
            switcherTab.current.classList.remove("shiftToRight")

            registerTab.current.classList.remove("shiftToNeutralForm")
            registerTab.current.classList.remove("shiftToLeft")

        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight")
            switcherTab.current.classList.remove("shiftToNeutral")

            registerTab.current.classList.remove("shiftToNeutralForm")
            registerTab.current.classList.remove("shiftToLeft")

        }
    }
    return (
        <>
            <div className="LoginSignUpContainer">
                <div className="LoginSignUpBox">
                    <div>
                        <div className="login_signUp_toggle">
                            <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                            <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                        </div>
                        <button ref={switcherTab}></button>
                    </div>
                    <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                        <div className="loginEmail">
                            <CiMail />
                            <input type='email' placeholder='Email' required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}
                            />
                        </div>
                        <div className="loginPassword">
                            <IoLockOpenOutline />
                            <input type='password' placeholder='Password' required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}
                            />
                        </div>
                        <input type="submit" value="Login" className='loginBtn' />
                    </form>
                    <form className='signUpForm' ref={registerTab} encType='multipart/form-data' onSubmit={registerSubmit}>
                        <div className='signUpName'>
                            <RxAvatar />
                            <input type='text' placeholder='Name' required name='name' value={name} onChange={registerDataChange} />
                        </div>
                        <div className="signUpEmail">
                            <CiMail />
                            <input type='email' placeholder='Email' required value={email} name='email' onChange={registerDataChange}
                            />
                        </div>
                        <div className="signUpPassword">
                            <IoLockOpenOutline />
                            <input type='password' placeholder='password' required name='password' value={password} onChange={registerDataChange} />
                        </div>
                        <div className="registerImage">
                            <img src={avatarPreview} alt='Avatar' />
                            <input type='file' name='avatar' accept='image/*' onChange={registerDataChange} />
                        </div>
                        <input type='submit' value="Register" className='signUpBtn' />
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginSignup