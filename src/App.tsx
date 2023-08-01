import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import {ChakraProvider} from '@chakra-ui/react'

// Pages
import Login from './pages/Login'
import GithubRedirect from './pages/GithubRedirect'

// Store
import store from './store'
import {Provider} from 'react-redux'
import Dashboard from './pages/Dashboard.tsx'

function App() {
    return (
        <>
            <Provider store={store}>
                <ChakraProvider>
                    <Router>
                        <Routes>
                            <Route path="/" element={<Dashboard/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/github/auth" element={<GithubRedirect/>}/>
                        </Routes>
                    </Router>
                </ChakraProvider>
            </Provider>
        </>
    )
}

export default App
