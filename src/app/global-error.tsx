'use client' // Error boundaries must be Client Components
import {Button} from '@/app/ui/button';
import { notoSans } from "./ui/fonts";
import { useEffect } from 'react'


export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
   useEffect(() => {
      // Log the error to an error reporting service
      console.error(error)
    }, [error])

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
            </div>    
          </body>
        </html>
    
  )
}