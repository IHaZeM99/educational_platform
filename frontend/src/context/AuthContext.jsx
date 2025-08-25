import React, {createContext, useContext, useReducer , useEffect} from 'react';
import {authServices} from '../services/authServices'

const AuthContext = createContext();


const initialState = {
    user:null,
    isAuthenticated:false,
    isLoading:false,
    error:null,
}

function authReducer(state, action) {
    switch(action.type) {
        case 'AUTH_START':
            return {
                ...state,
                isLoading: true,
                error: null,
            }
        case 'AUTH_SUCCESS':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            }
        case 'AUTH_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: null,
            }
        default:
            return state;
    }
}


export function AuthProvider({children}) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        
        if(token && refreshToken) {
            authServices.getUser()
            .then(user => {
                dispatch({ type: 'AUTH_SUCCESS', payload: user });
            })
            .catch(error => {
                console.log('Token validation failed:', error);
                // Clear invalid tokens
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('user');
                dispatch({ type: 'LOGOUT' });
            });
        } else {
            // If either token is missing, clear everything
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            dispatch({ type: 'LOGOUT' });
        }
    }, []);

    const login = async (credentials) => {
        dispatch({type : 'AUTH_START'});
        try {
            // Clear any existing tokens first
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            
            const data = await authServices.login(credentials);
            localStorage.setItem('accessToken', data.access);
            localStorage.setItem('refreshToken', data.refresh);

            const user = await authServices.getUser();
            dispatch({ type: 'AUTH_SUCCESS', payload: user });
            return user;
        } catch (error) {
            // Clear tokens on login failure
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            dispatch({ type: 'AUTH_FAILURE', payload: error.response?.data?.message || 'Login failed' });
            throw error;
        }
    }

    const register = async (credentials) => {
        try {
            const data = await authServices.register(credentials);
        } catch (error) {
            dispatch({ type: 'AUTH_FAILURE', payload: error.response?.data?.message || 'Registration failed' });
            throw error;
        }
    }

    
    const logout = () => {
        // Clear tokens from localStorage
        authServices.logout();
        
        // Update state to logged out
        dispatch({ type: 'LOGOUT' });
        
        // Force a page reload to clear any cached data
        window.location.href = '/';
    }

    const value = {
        ...state,
        login,
        logout,
        register
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}