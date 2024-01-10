import React, { useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { ReactionButtons } from './ReactionButtons'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { selectAllPosts, fetchPosts } from './postsSlice'
import { Spinner } from '../../Components/Spinner'

export const PostsList = () => {
  // const posts = useSelector(state => state.posts)
  const posts = useSelector(selectAllPosts)
  // useSelector can accept an alternate comparison function like shallowEqual instead of reference equality
  
  const dispatch = useDispatch();

  const postStatus = useSelector(state => state.posts.status)
  const error = useSelector(state => state.posts.error)

  // useEffect(() => {

  //   fetch("http://localhost:3001/posts").then(res => res.json())
  //   .then(data => {
  //       console.log(data)
  //   });

  // }, [])
  useEffect(() => {
    if (postStatus === 'idle') {
      const dispatchfn = async () => {
        let ab = await dispatch(fetchPosts()).unwrap()
        // console.log(ab, "...form inside await")
      };
      dispatchfn()
      
    }
  }, [postStatus, dispatch])

  let content

  if (postStatus === 'loading') {
    content = <Spinner text="Loading..." />
  } else if (postStatus === 'succeeded') {
    // Sort posts in reverse chronological order by datetime string
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))

    content = orderedPosts.map(post => (
      <PostExcerpt key={post.id} post={post} />
    ))
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>
  }

// // Sort posts in reverse chronological order by datetime string
// const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

// const renderedPosts = orderedPosts.map(post => (
//     <article className="post-excerpt" key={post.id}>
//       <h3>{post.title}</h3>
//       <div>
//           <PostAuthor userId={post.user} />
//           <TimeAgo timestamp={post.date} />
//         </div>
//       <p className="post-content">{post.content.substring(0, 100)}</p>
//       <ReactionButtons post={post} />
//       <Link to={`/posts/${post.id}`} className='button muted-button'>View Post</Link>
//     </article>
//   ))

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {/* {renderedPosts} */}
      {content}
    </section>
  )
}



const PostExcerpt = ({ post }) => {
  return (
    <article className="post-excerpt">
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>

      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  )
}