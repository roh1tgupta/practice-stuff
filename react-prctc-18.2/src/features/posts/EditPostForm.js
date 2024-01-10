import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLoaderData, useNavigate } from 'react-router-dom'

import { postUpdated, selectPostById } from './postsSlice'

export function loader({params}) {
    return params;
}

export const EditPostForm = () => {
  const { postId } = useLoaderData()
//   const post = useSelector(state =>
//     state.posts.find(post => post.id === postId)
//   )

  const post = useSelector(state => selectPostById(state, postId))
  const [title, setTitle] = useState(post?.title)
  const [content, setContent] = useState(post?.content)

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)

  const onSavePostClicked = (e) => {
    e.preventDefault()
    if (title && content) {
      dispatch(postUpdated({ id: postId, title, content }))
      navigate(-1)
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form >
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
      </form>
      <button type="button" onClick={onSavePostClicked}>
        Save Post
      </button>
    </section>
  )
}