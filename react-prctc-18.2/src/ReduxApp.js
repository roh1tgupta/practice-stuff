import store from './app/store'
import { Provider } from 'react-redux'
import { Counter } from './features/counter/counter'
import { PostsList } from './features/posts/PostsList'
import { AddPostForm } from './features/posts/AddPostForm'


export default function ReduxApp () {
    return <>
        <Counter />
        <PostsList />
        <AddPostForm />
    </>
}