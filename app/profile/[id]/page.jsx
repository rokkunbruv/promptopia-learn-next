"use client"

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

import Profile from '@components/Profile'

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams()
  const profileUsername = searchParams.get('name')

  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`)
      const data = await response.json()

      setPosts(data)
    }

    if (params.id) fetchPosts()
  }, [])
  
  return (
    <Suspense>
      <div>
        <Profile 
          name={profileUsername}
          desc={`Welcome to ${profileUsername}'s personalized profile page.
                Explore ${profileUsername}'s exceptional prompts and be
                inspired by the power of their imagination.`}
          data={posts}

        />
      </div>
    </Suspense>
  )
}

export default UserProfile
