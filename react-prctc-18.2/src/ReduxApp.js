import store from './app/store'
import { Provider } from 'react-redux'
import { Counter } from './features/counter/counter'
import { PostsList } from './features/posts/PostsList'
import { AddPostForm } from './features/posts/AddPostForm'


export default function ReduxApp () {
    console.log(store, store.getState())
    return <Provider store={store}>
        <Counter />
        <PostsList />
        <AddPostForm />
    </Provider>
}