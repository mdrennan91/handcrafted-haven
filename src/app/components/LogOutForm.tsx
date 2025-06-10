'use client'
import { logout } from '@/app/lib/actions';
import { LogOut } from 'lucide-react'
import clsx from 'clsx';


export default function LogoutForm() {
  return (
    <form action={logout}>
        <button
            type="submit"     
            title="Log out"           
            className={clsx(
                "text-white p-3 rounded-md transition-all ease-in-out duration-300",
                "hover:bg-[var(--secondary)]"
            )}
            >
            <LogOut className="w-6" />                
        </button>
    </form>
  )
}
