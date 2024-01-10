import { createSlice, nanoid, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { client } from '../../api/client'
import { sub } from 'date-fns'

const reactions = {
        thumbsUp: 0,
        hooray: 0,
        heart: 0,
        rocket: 0,
        eyes: 0,
      };
// const initialState = [
//   {
//     id: '1',
//     title: 'First Post!',
//     content: 'Hello!',
//     user: '0',
//     date: sub(new Date(), { minutes: 10 }).toISOString(),
//     reactions: {
//       thumbsUp: 0,
//       hooray: 0,
//       heart: 0,
//       rocket: 0,
//       eyes: 0,
//     },
//   },
//   {
//     id: '2',
//     title: 'Second Post',
//     content: 'More text',
//     user: '2',
//     date: sub(new Date(), { minutes: 5 }).toISOString(),
//     reactions: {
//       thumbsUp: 0,
//       hooray: 0,
//       heart: 0,
//       rocket: 0,
//       eyes: 0,
//     },
//   },
// ]

const initialState = {
  posts: [],
  status: 'idle',
  error: null
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        // postAdded(state, action) {
        //     state.push(action.payload)
        //   },
        postAdded: {
          reducer(state, action) {
            // state.push(action.payload)
            state.posts.push(action.payload)
          },
          prepare(title, content, userId) {
            return {
              payload: {
                id: nanoid(),
                title,
                content,
                date: new Date().toISOString(),
                user: userId
              }
            }
          }
        },
        reactionAdded(state, action) {
          const { postId, reaction } = action.payload
          const existingPost = state.posts.find(post => post.id === postId)
          if (existingPost) {
            existingPost.reactions[reaction]++
          }
        },
        postUpdated(state, action) {
          const { id, title, content } = action.payload
          const post = state.posts.find(post => post.id === id)
          if (post) {
            post.title = title
            post.content = content
          }
        }
    },
    // extraReducers(builder) {
    extraReducers: builder => {
      builder
        .addCase(fetchPosts.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
          state.status = 'succeeded'
          // Add any fetched posts to the array
          state.posts = action.payload
        })
        .addCase(fetchPosts.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        }).addCase(addNewPost.fulfilled, (state, action) => {
          // We can directly add the new post object to our posts array
          state.posts.push(action.payload)
        })
    }
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions
export default postsSlice.reducer

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('http://localhost:3001/posts')
  return response.data
})

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  // The payload creator receives the partial `{title, content, user}` object
  async initialPost => {
    // We send the initial data to the fake API server
    const response = await client.post('http://localhost:3001/posts', {
      ...initialPost,
      date: new Date().toISOString(),
      reactions
    })
    // The response includes the complete post object, including unique ID
    return response.data
  }
)

export const selectAllPosts = state => state.posts.posts

export const selectPostById = (state, postId) =>
  state.posts.posts.find(post => post.id === postId)

export const selectPostsByUser = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter(post => post.user === userId)
  )