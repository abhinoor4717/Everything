// 'use client'

// import { Authenticated, Unauthenticated } from 'convex/react'
import { SignIn, SignInButton, UserButton } from '@clerk/nextjs'
// import { useQuery } from 'convex/react'
// import { api } from '../convex/_generated/api'
// import Navbar02Page from '@/components/navbar-02/navbar-02'
import Hero06 from '@/components/hero-06/hero-06'
// import { NavMenu } from '@/components/navbar-02/nav-menu'
// import Features01Page from '@/components/features-01/features-01'

export default function Home() {
  return (
    <>
      <Hero06 />
    </>
  )
}

// function Content() {
//   const messages = useQuery(api.messages.getForCurrentUser)
//   return <div>Authenticated content: {messages?.length}</div>
// }