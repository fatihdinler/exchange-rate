import Layout from './src/app/layout/layout'
import { Provider } from 'react-redux'
import { AuthProvider } from './src/context/auth-context'
import { store } from './src/redux/store'

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </Provider>
  )
}
