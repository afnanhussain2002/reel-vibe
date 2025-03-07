import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

const Header = () => {
    const {data: session} = useSession();
  return (
    <div>Header</div>
  )
}

export default Header