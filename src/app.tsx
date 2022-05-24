import { Provider } from 'react-redux'
import persistStore from 'redux-persist/es/persistStore'
import { PersistGate } from 'redux-persist/integration/react'
import 'windi.css'
import { store } from './store'
const persistor = persistStore(store)

export default function App(props) {
  return (
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>
        {props.children}
      </PersistGate>
    </Provider>
  )
}
