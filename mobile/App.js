import Layout from './src/app/layout/layout'
import { Provider } from 'react-redux'
import { store } from './src/redux/store'

export default function App() {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  )
}
