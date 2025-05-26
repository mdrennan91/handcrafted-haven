import { Suspense } from "react";


export default function LoginPage() {

    return (
        <Suspense>        
            <LoginForm />
        </Suspense>
    );
}