import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLoaderData } from 'react-router-dom'

import { selectUserById } from '../users/usersSlice'
import { selectAllPosts, selectPostsByUser } from '../posts/postsSlice'

export function loader({params}) {
    return params;
}

export const UserPage = () => {
  const { userId } = useLoaderData()

  const user = useSelector(state => selectUserById(state, userId))
  //useSelector can accept an alternate comparison function like shallowEqual instead of reference equality

//   const postsForUser = useSelector(state => {
//     const allPosts = selectAllPosts(state)
//     return allPosts.filter(post => post.user === userId)
//   })


  const postsForUser = useSelector(state => selectPostsByUser(state, userId))
  const postTitles = postsForUser.map(post => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ))

  return (
    <section>
      <h2>{user.name}</h2>

      <ul>{postTitles}</ul>
    </section>
  )
}