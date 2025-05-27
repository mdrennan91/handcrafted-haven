'use client';

//still need to add refernce for Register page;
//css/tailwind classes; formAction and useActionState stuff, authentication


import { useActionState } from "react";


export default function LoginForm() {
    // const [formAction] = useActionState (authenticate, undefined)
    return (
        
        <form className="">
            <div className="">Sign In</div>
            <div className="">
                <label className=""
                        htmlFor="email">
                    Email
                    <input 
                        className="" 
                        placeholder="Enter your email address" 
                        id="email"
                        name="email"
                        type="text"
                        required />
                </label>
                <label className=""
                        htmlFor="password">
                    Password
                    <input 
                        className="" 
                        placeholder="Password"
                        id="password"                        
                        type="password" />
                </label>
            <button className="">Log In</button>            
            <p className="signup-link">Don't have an account? <a href="#">Sign up</a></p>
            </div>
        </form>
    );
}