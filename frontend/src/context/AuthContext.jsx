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
        if(token) {
            authServices.getUser()
            .then(user => dispatch({ type: 'AUTH_SUCCESS', payload: user }))
            .catch(error => {
                
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                dispatch({ type: 'LOGOUT' });
            });
        }
    }, []);

    const login = async (credentials) => {
        dispatch({type : 'AUTH_START'});
        try {
            const data = await authServices.login(credentials);
            localStorage.setItem('accessToken', data.access);
            localStorage.setItem('refreshToken', data.refresh);

            const user = await authServices.getUser();
            dispatch({ type: 'AUTH_SUCCESS', payload: user });
            return user;
        } catch (error) {
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
        authServices.logout();
        dispatch({ type: 'LOGOUT' });
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