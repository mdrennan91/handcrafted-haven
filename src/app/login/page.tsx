import { Suspense } from "react";
import LoginForm from "../ui/login-form";


export default function LoginPage() {

    return (
        <Suspense>        
            <LoginForm />
        </Suspense>
    );
}