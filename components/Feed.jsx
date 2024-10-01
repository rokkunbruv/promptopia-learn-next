"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick, handleProfileClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleProfileClick={handleProfileClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const router = useRouter()
  
  const [searchText, setSearchText] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [searchResults, setSearchResults] = useState([])

  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()

      setPosts(data)
    }

    fetchPosts()
  }, [])

  const filterPosts = (searchtext) => {
    const regex = new RegExp(searchtext, "i")
    
    return posts.filter(
      (post) => 
        regex.test(post.creator.username) ||
        regex.test(post.tag) ||
        regex.test(post.prompt)
    )
  }

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPosts(e.target.value)
        
        setSearchResults(searchResult)
      }, 500)
    )
  }

  const handleTagClick = (tag) => {
    setSearchText(tag)

    const searchResult = filterPosts(tag)
    setSearchResults(searchResult)
  }

  const handleProfileClick = (post) => {
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`)
  }
  
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {searchText ? (
        <PromptCardList 
          data={searchResults}
          handleTagClick={handleTagClick}
          handleProfileClick={handleProfileClick}
        />) : (
        <PromptCardList 
          data={posts}
          handleTagClick={handleTagClick}
          handleProfileClick={handleProfileClick}
        />)
      }
      
    </section>
  )
}

export default Feed
