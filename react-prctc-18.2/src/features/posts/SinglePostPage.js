import React from 'react'
import { useSelector } from 'react-redux'
import { useLoaderData, Link } from 'react-router-dom';
import { selectPostById } from './postsSlice';


export async function loader({ params }) {
  return params;
}



export const SinglePostPage = () => {
  const { postId } = useLoaderData();
  // const post = useSelector(state =>
  //   state.posts.find(post => post.id === postId)
  // )

  const post = useSelector(state => selectPostById(state, postId))

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    </section>
  )
}