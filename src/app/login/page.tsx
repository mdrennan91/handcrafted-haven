import { Suspense } from "react";
import LoginForm from "../ui/login-form";
import Logo from "../ui/logo";

export default function LoginPage() {

    return (
  
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-md sm:max-w-md">  
                <Logo />          
                <Suspense>        
                    <LoginForm />
                </Suspense>
            </div>
        </div>        
    );
   
}