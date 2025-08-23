
import {Route , Redirect} from 'react-router-dom';

const PrivateRoute = ({children, ...rest}) => {
    const isauthenticated = false;
    return (
        <Route {...rest}>
            {!isauthenticated ? <Redirect to="/login" /> : children}
        </Route>
    );
};

export default PrivateRoute;