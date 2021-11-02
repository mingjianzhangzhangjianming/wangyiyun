import {
    HashRouter as Router,
    Route,
    Switch,
    Link,
    useHistory,
    useParams,
    useLocation,
    useRouteMatch,
    Redirect
} from 'react-router-dom'
import AuthRouter from './components/AuthRouter'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import styled from 'styled-components'
import Find from './pages/Find'
import Blog from './pages/Blog'
import Login from './pages/Login'
import { setToken, getToken } from './utils/auth.js'

const Layout = styled.div`
    width: 100vw;
    max-width: 100vw;
    min-width: 100vw;
    overflow-x: hidden;
    background-color: #e7e7e7;
`

export const App = () => {
    const token = getToken()
    return (
        <Router>
            <Route
                path="/admin"
                render={() => (
                    <Switch>
                        <Route path="/admin/login" component={Login} />
                        <AuthRouter>
                            <Layout>
                                <Header />
                                <Main>
                                    <Route path="/admin/find" component={Find} />
                                    <Route path="/admin/blog" component={Blog} />
                                </Main>
                                <Footer />
                            </Layout>
                        </AuthRouter>
                    </Switch>
                )}
            />
        </Router>
    )
}
