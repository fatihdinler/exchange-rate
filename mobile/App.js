import Layout from './src/app/layout/layout'
import { Provider } from 'react-redux'
import { AuthProvider } from './src/context/auth-context'
import { NativeBaseProvider } from 'native-base'
import { store } from './src/redux/store'
import "react-native-gesture-handler"

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <AuthProvider>
          <Layout />
        </AuthProvider>
      </NativeBaseProvider>
    </Provider>
  )
}
