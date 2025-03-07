import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

const Header = () => {
    const {data: session} = useSession();

    const handleSignOut = async() => {
     
    }
  return (
    <div>Header</div>
  )
}

export default Header