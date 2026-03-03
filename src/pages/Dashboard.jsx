import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Filter, Columns, Plus, ArrowUpRight, ArrowDownRight,
    RotateCw, MoreVertical, Calendar, User, Cpu,
    ShieldAlert, AlertTriangle, ShieldCheck, Sun, Moon, FolderKanban
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { SeverityBadge, StatusChip, Button, SkeletonCard, TableRowSkeleton } from '../components/ui/index.jsx';
import { useTheme } from '../context/ThemeContext';
import { toast } from 'react-hot-toast';
import '../styles/Dashboard.css';

/* Animation variants */
const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };
const staggerContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07 } }
};

const Dashboard = () => {
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    /* Simulate data loading */
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    const stats = [
        { label: 'Critical Severity', count: 86, change: '+2%', positive: false, icon: <ShieldAlert size={18} />, type: 'critical' },
        { label: 'High Severity', count: 16, change: '+0.9%', positive: false, icon: <AlertTriangle size={18} />, type: 'high' },
        { label: 'Medium Severity', count: 26, change: '-0.9%', positive: true, icon: <AlertTriangle size={18} />, type: 'medium' },
        { label: 'Low Severity', count: 16, change: '+0.9%', positive: false, icon: <ShieldCheck size={18} />, type: 'low' },
    ];

    const scans = [
        { id: 1, name: 'Web App Servers', type: 'Greybox', status: 'Completed', progress: 100, v: { c: 5, h: 12, m: 23, l: 18 }, lastScan: '4d ago' },
        { id: 2, name: 'Web App Servers', type: 'Greybox', status: 'Completed', progress: 100, v: { c: 5, h: 12, m: 23, l: 18 }, lastScan: '4d ago' },
        { id: 3, name: 'Web App Servers', type: 'Greybox', status: 'Completed', progress: 100, v: { c: 5, h: 12, m: 23, l: 18 }, lastScan: '4d ago' },
        { id: 4, name: 'Web App Servers', type: 'Greybox', status: 'Completed', progress: 100, v: { c: 5, h: 12, m: 23, l: 18 }, lastScan: '4d ago' },
        { id: 5, name: 'Web App Servers', type: 'Greybox', status: 'Completed', progress: 100, v: { c: 5, h: 12, m: 23, l: 18 }, lastScan: '4d ago' },
        { id: 6, name: 'Web App Servers', type: 'Greybox', status: 'Completed', progress: 100, v: { c: 5, h: 12, m: 23, l: 18 }, lastScan: '4d ago' },
        { id: 7, name: 'Web App Servers', type: 'Greybox', status: 'Completed', progress: 100, v: { c: 5, h: 12, m: 23, l: 18 }, lastScan: '4d ago' },
        { id: 8, name: 'Web App Servers', type: 'Greybox', status: 'Scheduled', progress: 100, v: { c: 5, h: 12, m: 0, l: 0 }, lastScan: '4d ago' },
        { id: 9, name: 'Web App Servers', type: 'Greybox', status: 'Scheduled', progress: 100, v: { c: 5, h: 12, m: 0, l: 0 }, lastScan: '4d ago' },
        { id: 10, name: 'IoT Devices', type: 'Blackbox', status: 'Failed', progress: 10, v: { c: 2, h: 4, m: 8, l: 1 }, lastScan: '3d ago' },
        { id: 11, name: 'Temp Data', type: 'Blackbox', status: 'Failed', progress: 10, v: { c: 2, h: 4, m: 8, l: 1 }, lastScan: '3d ago' },
    ];

    const filtered = scans.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.type.toLowerCase().includes(search.toLowerCase())
    );

    /* Keyboard: allow Enter/Space on table rows */
    const handleRowKeyDown = (e, id) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navigate(`/scans/${id}`);
        }
    };

    return (
        <div className="layout-root">
            <Sidebar />
            <main className="main-content" role="main" aria-label="Dashboard">

                {/* Header */}
                <header className="dashboard-header" role="banner">
                    <h1 className="header-title">
                        Scan
                        <span className="breadcrumb-sep" aria-hidden="true">›</span>
                        <span className="breadcrumb-dim">Private Assets</span>
                        <span className="breadcrumb-sep" aria-hidden="true">›</span>
                        <span className="breadcrumb-active">New Scan</span>
                    </h1>
                    <div className="header-actions" role="toolbar" aria-label="Page actions">
                        <button
                            className="theme-toggle-btn"
                            onClick={toggleTheme}
                            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                        >
                            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                        <Button variant="outline" ariaLabel="Export report">Export Report</Button>
                        <Button variant="danger" ariaLabel="Stop scan">Stop Scan</Button>
                    </div>
                </header>

                {/* Meta bar */}
                <section className="dashboard-meta" aria-label="Scan metadata">
                    <div className="meta-pill"><FolderKanban size={13} aria-hidden="true" /><span>Org: <strong>Project X</strong></span></div>
                    <div className="meta-divider" role="separator" />
                    <div className="meta-pill"><User size={13} aria-hidden="true" /><span>Owner: <strong>Nammagiri</strong></span></div>
                    <div className="meta-divider" role="separator" />
                    <div className="meta-pill"><Cpu size={13} aria-hidden="true" /><span>Total Scans: <strong>100</strong></span></div>
                    <div className="meta-divider" role="separator" />
                    <div className="meta-pill"><Calendar size={13} aria-hidden="true" /><span>Scheduled: <strong>1000</strong></span></div>
                    <div className="meta-divider" role="separator" />
                    <div className="meta-pill"><RotateCw size={13} aria-hidden="true" /><span>Rescans: <strong>100</strong></span></div>
                    <div className="meta-divider" role="separator" />
                    <div className="meta-pill"><ShieldAlert size={13} aria-hidden="true" /><span>Failed Scans: <strong>100</strong></span></div>
                    <div className="meta-pill meta-refresh" style={{ marginLeft: 'auto' }} aria-label="Last refreshed 10 minutes ago">
                        <RotateCw size={13} aria-hidden="true" /><span>10 mins ago</span>
                    </div>
                </section>

                {/* Stats strip — skeleton or real */}
                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.section
                            key="stat-skeleton"
                            className="stats-strip"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            aria-label="Loading statistics" aria-busy="true"
                        >
                            {[0, 1, 2, 3].map(i => (
                                <React.Fragment key={i}>
                                    <SkeletonCard lines={3} style={{ flex: 1, background: 'transparent', border: 'none' }} />
                                    {i < 3 && <div className="stats-strip-divider" />}
                                </React.Fragment>
                            ))}
                        </motion.section>
                    ) : (
                        <motion.section
                            key="stats"
                            className="stats-strip"
                            variants={staggerContainer}
                            initial="hidden"
                            animate="show"
                            aria-label="Severity statistics"
                        >
                            {stats.map((stat, i) => (
                                <React.Fragment key={stat.label}>
                                    <motion.div className="stat-strip-item" variants={fadeUp}>
                                        <div className="stat-strip-top">
                                            <span className="stat-strip-label">{stat.label}</span>
                                            <span className={`stat-strip-icon ${stat.type}`} aria-hidden="true">{stat.icon}</span>
                                        </div>
                                        <div className="stat-strip-count" aria-live="polite">{stat.count}</div>
                                        <div className={`stat-strip-change ${stat.positive ? 'down' : 'up'}`}
                                            aria-label={`${stat.change} ${stat.positive ? 'decrease' : 'increase'} than yesterday`}>
                                            {stat.positive ? <ArrowDownRight size={13} aria-hidden="true" /> : <ArrowUpRight size={13} aria-hidden="true" />}
                                            <span>{stat.change} {stat.positive ? 'decrease' : 'increase'} than yesterday</span>
                                        </div>
                                    </motion.div>
                                    {i < stats.length - 1 && <div className="stats-strip-divider" role="separator" />}
                                </React.Fragment>
                            ))}
                        </motion.section>
                    )}
                </AnimatePresence>

                {/* Table */}
                <motion.section
                    className="table-container"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.4 }}
                    aria-label="Scans list"
                >
                    <div className="table-toolbar" role="toolbar" aria-label="Table controls">
                        <div className="search-wrapper" role="search">
                            <Search size={16} className="search-icon" aria-hidden="true" />
                            <input
                                type="search"
                                placeholder="Search scans by name or type..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                aria-label="Search scans"
                            />
                        </div>
                        <div className="toolbar-actions">
                            <Button variant="toolbar" icon={<Filter size={15} />} ariaLabel="Filter scans">Filter</Button>
                            <Button variant="toolbar" icon={<Columns size={15} />} ariaLabel="Manage columns">Column</Button>
                            <Button
                                variant="primary"
                                icon={<Plus size={15} />}
                                onClick={() => toast.success('Initializing new scan...')}
                                ariaLabel="Start a new scan"
                            >
                                New scan
                            </Button>
                        </div>
                    </div>

                    <div className="table-responsive" role="region" aria-label="Scans table">
                        <table className="scan-table" aria-label="Security scans">
                            <thead>
                                <tr>
                                    <th scope="col">Scan Name</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Progress</th>
                                    <th scope="col">Vulnerability</th>
                                    <th scope="col">Last Scan</th>
                                    <th scope="col"><span className="sr-only">Actions</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading
                                    ? Array.from({ length: 6 }).map((_, i) => <TableRowSkeleton key={i} cols={7} />)
                                    : filtered.map(scan => (
                                        <motion.tr
                                            key={scan.id}
                                            className="clickable-row"
                                            onClick={() => navigate(`/scans/${scan.id}`)}
                                            onKeyDown={e => handleRowKeyDown(e, scan.id)}
                                            tabIndex={0}
                                            role="row"
                                            aria-label={`Scan: ${scan.name}, Status: ${scan.status}`}
                                            whileHover={{ backgroundColor: 'var(--bg-primary)' }}
                                            transition={{ duration: 0.15 }}
                                        >
                                            <td><strong>{scan.name}</strong></td>
                                            <td><span className="type-badge" aria-label={`Type: ${scan.type}`}>{scan.type}</span></td>
                                            <td><StatusChip status={scan.status.toLowerCase()} /></td>
                                            <td>
                                                <div className="progress-cell" role="progressbar"
                                                    aria-valuenow={scan.progress} aria-valuemin={0} aria-valuemax={100}
                                                    aria-label={`Progress: ${scan.progress}%`}>
                                                    <div className="progress-bar-bg">
                                                        <div
                                                            className={`progress-bar-fill ${scan.status === 'Failed' ? 'failed' : ''}`}
                                                            style={{ width: `${scan.progress}%` }}
                                                        />
                                                    </div>
                                                    <span className="progress-text">{scan.progress}%</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="vuln-badges" aria-label="Vulnerabilities">
                                                    {scan.v.c > 0 && <SeverityBadge severity="critical" count={scan.v.c} size="sm" />}
                                                    {scan.v.h > 0 && <SeverityBadge severity="high" count={scan.v.h} size="sm" />}
                                                    {scan.v.m > 0 && <SeverityBadge severity="medium" count={scan.v.m} size="sm" />}
                                                    {scan.v.l > 0 && <SeverityBadge severity="low" count={scan.v.l} size="sm" />}
                                                </div>
                                            </td>
                                            <td><span className="last-scan-text">{scan.lastScan}</span></td>
                                            <td>
                                                <button className="row-options-btn"
                                                    aria-label={`More options for ${scan.name}`}
                                                    onClick={e => e.stopPropagation()}>
                                                    <MoreVertical size={15} aria-hidden="true" />
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className="table-footer">
                        <span aria-live="polite">Showing {filtered.length} of {scans.length} Scans</span>
                        <nav className="pagination" aria-label="Table pagination">
                            <button className="btn-page" aria-label="Previous page">‹</button>
                            <button className="btn-page active" aria-current="page" aria-label="Page 1">1</button>
                            <button className="btn-page" aria-label="Next page">›</button>
                        </nav>
                    </div>
                </motion.section>
            </main>
        </div>
    );
};

export default Dashboard;
