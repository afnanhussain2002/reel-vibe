import React from 'react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

const Header = () => {
    const {data: session} = useSession();

    const handleSignOut = async() => {
      try {
        await signOut();
      } catch (error) {
        console.log(error);
      }
    }
  return (
    <div>
        <button onClick={handleSignOut}>Signout</button>

        {session? (
            <div>welcome</div>
        ):(
            <div>
                <Link href="/login">Login</Link>
                <Link href="/register">Register</Link>
            </div>
        )}
    </div>
  )
}

export default Header