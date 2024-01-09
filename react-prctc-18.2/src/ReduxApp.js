import store from './app/store'
import { Provider } from 'react-redux'
import { Counter } from './features/counter/counter'


export default function ReduxApp () {
    console.log(store, store.getState())
    return <Provider store={store}>
        <Counter />
    </Provider>
}