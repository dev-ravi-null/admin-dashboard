import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './redux/UserSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const Layout = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { user, isLoggedIn } = useSelector((state) => state.user);

    useEffect(() => {
        document.body.className = darkMode ? 'bg-dark text-white' : 'bg-light text-dark';
    }, [darkMode]);

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('userState');
        navigate('/login');
    };

    const toggleSidebar = () => setSidebarOpen(prev => !prev);
    const toggleTheme = () => setDarkMode(prev => !prev);
    const closeSidebar = () => window.innerWidth < 768 && setSidebarOpen(false);

    const navItems = [
        { label: '📊 Dashboard', path: '/' },
        { label: '👤 Users', path: '/users' },
        { label: '🎮 Games', path: '/games' },
        { label: '💰 Transactions', path: '/transactions' }
    ];

    const navLinkStyle = (path) => ({
        padding: '10px 15px',
        borderRadius: '8px',
        marginBottom: '10px',
        display: 'block',
        textDecoration: 'none',
        fontWeight: location.pathname === path ? '600' : '400',
        color: darkMode
            ? location.pathname === path ? '#fff' : '#ccc'
            : location.pathname === path ? '#000' : '#555',
        backgroundColor: location.pathname === path
            ? darkMode ? '#495057' : '#e2e6ea'
            : 'transparent',
        transition: 'all 0.2s ease-in-out'
    });

    return (
        <div className={`App ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
            <div className="container-fluid">
                <div className="row min-vh-100">

                    {/* Toggle Sidebar Button (Mobile) */}
                    <button className="btn btn-primary d-md-none m-2" onClick={toggleSidebar}>
                        ☰ Menu
                    </button>

                    {/* Sidebar */}
                    <nav className={`col-md-3 col-lg-2 sidebar p-3 border-end 
            ${sidebarOpen ? 'd-block' : 'd-none'} d-md-block 
            ${darkMode ? 'bg-secondary' : 'bg-light'}`}>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h4 className="mb-0">JP Funware</h4>
                            {isLoggedIn && user?.name && (
                                <span className="badge bg-primary rounded-circle text-uppercase">
                                    {user.name[0]}
                                </span>
                            )}
                        </div>

                        <ul className="list-unstyled">
                            {navItems.map(({ label, path }) => (
                                <li key={path}>
                                    <Link
                                        to={path}
                                        onClick={closeSidebar}
                                        style={navLinkStyle(path)}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {isLoggedIn && (
                            <button className="btn btn-danger mt-4 w-100" onClick={handleLogout}>
                                🚪 Logout
                            </button>
                        )}
                    </nav>

                    {/* Main Content */}
                    <main className="col-12 col-md-9 col-lg-10 px-4 py-3">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="themeSwitch"
                                    checked={darkMode}
                                    onChange={toggleTheme}
                                />
                                <label className="form-check-label" htmlFor="themeSwitch">
                                    {darkMode ? 'Dark' : 'Light'} Mode
                                </label>
                            </div>
                        </div>
                        {children}
                    </main>

                </div>
            </div>
        </div>
    );
};

export default Layout;
