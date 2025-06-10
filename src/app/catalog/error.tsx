'use client' // Error boundaries must be Client Components
 
import { useEffect } from 'react'
import { Button } from '@/app/ui/button';
 
export default function Error({
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
    <div className='flex h-full flex-col items-center justify-center pt-2'>
      <h2 className='text-center'>Something went wrong!</h2>
       <Button onClick={reset} title="Try again">
        Try again
      </Button>      
    </div>
  )
}