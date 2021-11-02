import { Redirect } from 'react-router-dom'
import { getToken } from 'utils/auth.js'

const AuthRouter = ({ children }) => (getToken() ? children : <Redirect to="/admin/login" />)

export default AuthRouter
