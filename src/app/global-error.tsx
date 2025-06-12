'use client' // Error boundaries must be Client Components
import {Button} from '@/app/ui/button';
import { notoSans } from "./ui/fonts";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
     return (
    // global-error must include html and body tags
    <html lang="en">
         <body className={`${notoSans.className} flex min-h-screen flex-col`}> 
            <div className='flex h-full flex-col items-center justify-center pt-2'>
              <h2 className='text-center'>Oops! Something went wrong!</h2>
              <div className='p-2'>
               <Button onClick={reset} title="Try again">                
                Try again
              </Button>
              </div>    
              <a                  href="/"
                className="mt-4 rounded-md bg-[var(--secondary)] px-4 py-2 text-sm text-white transition-colors hover:bg-[var(--secondary-light)]"
              >
                Start Over
            </a>  
            </div>    
          </body>
        </html>
    
  )
}