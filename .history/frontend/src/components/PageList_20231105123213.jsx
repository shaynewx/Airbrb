import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function PageList () {
    const [token, setToken] = React.useState(null);
    // const logout = () => {
    //   setToken(null);
    //   localStorage.removeItem('token');
    // }
    return (
        <>
        <Router>
            <PageList />

        </Router>
        </>
    );
}