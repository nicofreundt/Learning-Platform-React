import React from 'react';
import { Route } from 'react-router-dom';
import { authenticated } from '../../auth';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={
            (props) => {
                if (authenticated || localStorage.getItem('user')) {
                    return <Component {...props}/>
                } else {
                    return <Redirect to={
                        {
                            pathname: "/login",
                            state: {
                                from: props.location
                            }
                        }
                    }/>
                }
            }
        }/>
    )
}

export default ProtectedRoute;
