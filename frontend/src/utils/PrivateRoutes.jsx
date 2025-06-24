import { Outlet, Navigate } from 'react-router-dom'

function PrivateRoutes() {
    const token = localStorage.getItem('token');
    let isLogin = false;
    if (token) {
        isLogin = true;
    } else {
        isLogin = false;
    }
    return(
        isLogin ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoutes



