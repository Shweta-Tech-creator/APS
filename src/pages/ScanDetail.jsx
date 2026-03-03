import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Globe, Target, Activity, ShieldCheck, FileText,
    ChevronDown, X, Lock, Zap, Clock, Sun, Moon, RotateCw
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useTheme } from '../context/ThemeContext';
import '../styles/ScanDetail.css';

const ScanDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const [activeTab, setActiveTab] = useState('activity');
    const [logs, setLogs] = useState([]);
    const consoleRef = useRef(null);

    const steps = [
        { label: 'Spidering', icon: <Globe size={18} />, active: true },
        { label: 'Mapping', icon: <Target size={18} />, active: false },
        { label: 'Testing', icon: <Activity size={18} />, active: false },
        { label: 'Validating', icon: <ShieldCheck size={18} />, active: false },
        { label: 'Reporting', icon: <FileText size={18} />, active: false },
    ];

    const metadata = [
        { label: 'Scan Type', value: 'Grey Box', color: null },
        { label: 'Targets', value: 'google.com', color: null },
        { label: 'Started At', value: 'Nov 22, 09:00AM', color: null },
        { label: 'Credentials', value: '2 Active', color: null },
        { label: 'Files', value: 'Control.pdf', color: null },
        { label: 'Checklists', value: '40/350', color: '#0CC8A8' },
    ];

    const findings = [
        {
            severity: 'critical',
            time: '18:45:23',
            title: 'SQL Injection in Authentication Endpoint',
            path: '/api/users/profile',
            desc: 'Time-based blind SQL injection confirmed on user-controlled input during authentication flow. Exploitation allows database-level access.',
        },
        {
            severity: 'high',
            time: '18:45:23',
            title: 'Unauthorized Access to User Metadata',
            path: '/api/auth/login',
            desc: 'Authenticated low-privileged user was able to access metadata of other users. Access control checks were missing.',
        },
        {
            severity: 'medium',
            time: '18:45:23',
            title: 'Broken Authentication Rate Limiting',
            path: '/api/search',
            desc: 'No effective rate limiting detected on login attempts. Automated brute-force attempts possible.',
        },
    ];

    const initialLogs = [
        {
            parts: [
                { t: 'normal', v: "[09:00:00] I'll begin a systematic penetration test on " },
                { t: 'link', v: 'helpdesk.democorp.com' },
                { t: 'normal', v: '. Let me start with reconnaissance and enumeration.' },
            ]
        },
        {
            parts: [
                { t: 'normal', v: '[09:01:00] Good! target is online. Now let me perform port scanning to identify running services.' },
            ]
        },
        {
            parts: [
                { t: 'normal', v: '[09:02:00] Excellent reconnaissance results:' },
                { t: 'indent', v: '- helpdesk.democorp.com: Apache httpd 2.4.65 on port 80 (web server)' },
                { t: 'normal', v: 'Let me probe the web server on target first to understand its structure.' },
            ]
        },
        {
            parts: [
                { t: 'normal', v: '[09:03:00] Great! I found a login page for a Help Desk Platform. I can see a useful comment: ' },
                { t: 'string', v: '"TODO: Delete the testing account (test:test)"' },
                { t: 'normal', v: '. Let me test this credential. The login redirects to ' },
                { t: 'path', v: '/password/test' },
                { t: 'normal', v: '. Let me follow that path and explore it.' },
            ]
        },
        {
            parts: [
                { t: 'normal', v: "[09:04:00] The POST method is not allowed on /password/test. Let me check what the JavaScript does - it posts to " },
                { t: 'string', v: "'#'" },
                { t: 'normal', v: " which means the current page. Let me try a different approach." },
            ]
        },
        {
            parts: [
                { t: 'normal', v: "[09:05:00] It redirects back to /password/test. Let me check if there's an /api endpoint or look for other paths. Let me also try exploring with the " },
                { t: 'link', v: 'test:test' },
                { t: 'normal', v: ' password directly on other endpoints.' },
            ]
        },
        {
            parts: [
                { t: 'normal', v: "[09:06:00] Great! I can access the dashboard using the " },
                { t: 'string', v: "'X-UserId: 10032'" },
                { t: 'normal', v: '. The dashboard shows "Welcome, John Doe". This suggests an ' },
                { t: 'bold', v: '**IDOR vulnerability**' },
                { t: 'normal', v: " - I can access any user's dashboard by just changing the X-UserId header. Let me explore more of the application..." },
            ]
        },
    ];

    useEffect(() => { setLogs(initialLogs); }, []);

    useEffect(() => {
        if (consoleRef.current) {
            consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
        }
    }, [logs]);

    const renderPart = (part, i) => {
        switch (part.t) {
            case 'link': return <span key={i} className="sd-link">{part.v}</span>;
            case 'string': return <span key={i} className="sd-string">{part.v}</span>;
            case 'path': return <span key={i} className="sd-path">{part.v}</span>;
            case 'bold': return <span key={i} className="sd-bold">{part.v}</span>;
            case 'indent': return <div key={i} className="sd-indent">{part.v}</div>;
            default: return <span key={i}>{part.v}</span>;
        }
    };

    return (
        <div className="sd-root">
            <Sidebar />
            <main className="sd-main">

                {/* Header */}
                <header className="sd-header">
                    <div className="sd-header-left">
                        <button className="sd-back-btn" onClick={() => navigate('/dashboard')}>
                            <ArrowLeft size={16} />
                        </button>
                        <h1 className="sd-title">
                            Scan
                            <span className="sd-sep">›</span>
                            <span className="sd-dim">Private Assets</span>
                            <span className="sd-sep">›</span>
                            <span className="sd-active">New Scan</span>
                        </h1>
                    </div>
                    <div className="sd-header-right">
                        <button className="sd-btn-icon" onClick={toggleTheme}>
                            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                        </button>
                        <button className="sd-btn-outline">Export Report</button>
                        <button className="sd-btn-danger">Stop Scan</button>
                    </div>
                </header>

                {/* Progress Card */}
                <section className="sd-progress-card">

                    {/* Top row: circular indicator + step tracker side by side */}
                    <div className="sd-progress-top">
                        {/* Circular progress */}
                        <div className="sd-circle">
                            <svg viewBox="0 0 100 100" className="sd-circle-svg">
                                <circle className="sd-circle-bg" cx="50" cy="50" r="40" />
                                <circle className="sd-circle-fg" cx="50" cy="50" r="40" />
                            </svg>
                            <div className="sd-circle-label">
                                <span className="sd-circle-pct">0%</span>
                                <span className="sd-circle-status">In Progress</span>
                            </div>
                        </div>

                        {/* Step tracker */}
                        <div className="sd-steps">
                            {steps.map((step, idx) => (
                                <React.Fragment key={step.label}>
                                    <div className={`sd-step ${step.active ? 'active' : ''}`}>
                                        <div className="sd-step-icon">{step.icon}</div>
                                        <span className="sd-step-label">{step.label}</span>
                                    </div>
                                    {idx < steps.length - 1 && <div className="sd-step-line" />}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/* Meta row */}
                    <div className="sd-meta-row">
                        {metadata.map((m, i) => (
                            <div key={i} className="sd-meta-item">
                                <span className="sd-meta-label">{m.label}</span>
                                <span className="sd-meta-value" style={m.color ? { color: m.color } : {}}>
                                    {m.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Console + Findings */}
                <div className="sd-console-container">

                    {/* Left: Console panel */}
                    <section className="sd-console-panel">
                        <div className="sd-panel-header">
                            <div className="sd-panel-header-left">
                                <span className="sd-live-dot" />
                                <span className="sd-panel-title">Live Scan Console</span>
                                <span className="sd-running-badge">
                                    <RotateCw size={11} className="sd-spin" /> Running...
                                </span>
                            </div>
                            <div className="sd-panel-header-right">
                                <ChevronDown size={16} />
                                <X size={16} />
                            </div>
                        </div>

                        <div className="sd-tabs">
                            <button
                                className={`sd-tab ${activeTab === 'activity' ? 'active' : ''}`}
                                onClick={() => setActiveTab('activity')}>
                                Activity Log
                            </button>
                            <button
                                className={`sd-tab ${activeTab === 'verification' ? 'active' : ''}`}
                                onClick={() => setActiveTab('verification')}>
                                Verification Loops
                            </button>
                        </div>

                        <div className="sd-console-body" ref={consoleRef}>
                            {logs.map((log, li) => (
                                <div key={li} className="sd-log-line">
                                    {log.parts.map(renderPart)}
                                </div>
                            ))}
                            <span className="sd-cursor">_</span>
                        </div>
                    </section>

                    {/* Right: Finding Log */}
                    <aside className="sd-findings-panel">
                        <div className="sd-findings-header">Finding Log</div>
                        <div className="sd-findings-list">
                            {findings.map((f, i) => (
                                <div key={i} className={`sd-finding-card ${f.severity}`}>
                                    <div className="sd-finding-top">
                                        <span className={`sd-sev-badge ${f.severity}`}>
                                            {f.severity.charAt(0).toUpperCase() + f.severity.slice(1)}
                                        </span>
                                        <span className="sd-finding-time">{f.time}</span>
                                    </div>
                                    <h4 className="sd-finding-title">{f.title}</h4>
                                    <div className="sd-finding-path">{f.path}</div>
                                    <p className="sd-finding-desc">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </aside>
                </div>

                {/* Footer */}
                <footer className="sd-footer">
                    <div className="sd-footer-left">
                        <span className="sd-footer-stat"><span className="sd-dot" />Sub-Agents: 0</span>
                        <span className="sd-footer-stat"><span className="sd-dot" />Parallel Executions: 2</span>
                        <span className="sd-footer-stat"><span className="sd-dot" />Operations: 1</span>
                    </div>
                    <div className="sd-footer-right">
                        <span className="sd-sev-stat critical">Critical: 0</span>
                        <span className="sd-sev-stat high">High: 0</span>
                        <span className="sd-sev-stat medium">Medium: 0</span>
                        <span className="sd-sev-stat low">Low: 0</span>
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default ScanDetail;
