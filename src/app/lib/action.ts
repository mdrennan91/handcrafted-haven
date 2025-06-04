'use server'

import { AuthError } from "next-auth";
import { signIn } from "../../auth";

export async function authenticate (
    prevState: string | undefined,
    formData: FormData
    
) {   

    try {
        await signIn('credentials', formData);        

        // console.log('Login attempt:', {
        //     formPassword: formData.get('password'),
        //     });

        } catch (error) {

        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid Username or Password';
                default: 
                    return 'Oops! Something went wrong.'
            }
        }
        throw error;
        
    }
}