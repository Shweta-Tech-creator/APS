import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    FolderKanban,
    Radar,
    Calendar,
    Bell,
    Settings,
    LifeBuoy,
    LogOut,
    ChevronRight
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import '../styles/Sidebar.css';

const Sidebar = () => {
    const { theme } = useTheme();

    const navItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
        { icon: <FolderKanban size={20} />, label: 'Projects', path: '/projects' },
        { icon: <Radar size={20} />, label: 'Scans', path: '/scans' },
        { icon: <Calendar size={20} />, label: 'Schedule', path: '/schedule' },
    ];

    const subNavItems = [
        { icon: <Bell size={20} />, label: 'Notifications', path: '/notifications' },
        { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
        { icon: <LifeBuoy size={20} />, label: 'Support', path: '/support' },
    ];

    return (
        <div className="sidebar">
            <div className="sidebar-top">
                <div className="sidebar-logo">
                    <div className="logo-dot"></div>
                    <span>aps</span>
                </div>

                <nav className="sidebar-nav">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.label}
                            to={item.path}
                            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="sidebar-divider"></div>

                <nav className="sidebar-nav sub-nav">
                    {subNavItems.map((item) => (
                        <NavLink
                            key={item.label}
                            to={item.path}
                            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>

            <div className="sidebar-bottom">
                <div className="user-profile">
                    <div className="user-avatar">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
                    </div>
                    <div className="user-info">
                        <span className="user-email">admin@edu.com</span>
                        <span className="user-role">Security Lead</span>
                    </div>
                    <ChevronRight size={16} className="profile-chevron" />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
