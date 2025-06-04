'use client';

// send user back to /dashboard ???

import { lusitana } from '@/app/ui/fonts';
import { useActionState } from "react";
import { authenticate } from '@/app/lib/action';
import { useSearchParams } from 'next/navigation';
import { Button } from '@ui/button';

export default function LoginForm() {
    
    const searchParams = useSearchParams();  //look in param for url to return to
    const callbackUrl = searchParams.get('callbackUrl') || '/';  //send user back to page trying to enter or /dashboard
    // if authentication fails, authenticate returns error string, errorMessage is set to that string, render errorMessage in form
    // formAction triggers state change, can use isPending to disable button, etc.
    const [errorMessage, formAction, isPending] = useActionState (authenticate, undefined); 
    
    return (
        
        <form action={formAction} className="space-y-3.5">
            <div className="flex-1 rounded-lg bg-[var(--accent1)] px-5 pb-4 pt-9">
                <h1 className={`${lusitana.className} mb-3 text-2xl text-[var(--primary-light)]`}>
                  Please sign in to continue.</h1>
                <div className="w-full">
                    <div>
                    <label className="mb-3 mt-5 block text-sm/8 font-medium text-[var(--primary-light)]"
                            htmlFor="email">
                        Email
                        <input 
                            className="peer block w-full rounded-xl border border-gray-300 px-4 py-2 text-sm outline-2 placeholder:text-gray-400 )]" 
                            placeholder="Enter email address" 
                            id="email"
                            name="email"
                            type="text"
                            required />
                    </label> 
                    </div>
                <div className="mt-5"></div>
                <label className="mb-3 mt-5 block text-sm/8 font-medium text-[var(--primary-light)]"
                        htmlFor="password">
                    Password
                    <input 
                        className="peer block w-full rounded-xl border border-gray-300 px-4 py-2 text-sm outline-2 placeholder:text-gray-400" 
                        placeholder="Password"
                        id="password"                        
                        type="password"
                        name="password" />
                </label>
                </div>
                <div>
                
                    <input type="hidden" name="redirectTo" value={callbackUrl}/>
                    <Button className=" bg-[var(--secondary)] hover:bg-[var(--secondary-light)] text-black transition-transform duration-200 hover:scale-105">
                        Sign In
                    </Button>            
                    <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true" aria-disabled={isPending} >
                        {errorMessage && (
                            <>
                            <p className="text-sm text-red-800">{errorMessage}</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
       </form>
    );
}