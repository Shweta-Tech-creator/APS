import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Sun, Moon, Star, Apple, Chrome, Facebook, Eye, EyeOff } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { toast } from 'react-hot-toast';
import '../styles/Login.css';

const Login = () => {
    const { theme, toggleTheme } = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleCreateAccount = (e) => {
        e.preventDefault();
        setLoading(true);
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 1500)),
            {
                loading: 'Creating account...',
                success: 'Welcome to APS!',
                error: 'Registration failed!',
            }
        ).then(() => {
            navigate('/dashboard');
        });
    };

    const featureItems = [
        "Effortlessly spider and map targets to uncover hidden security flaws",
        "Deliver high-quality, validated findings in hours, not weeks.",
        "Generate professional, enterprise-grade security reports automatically."
    ];

    return (
        <div className="login-container">
            <div className="login-left">
                <div className="logo-container">
                    <div className="logo-dot"></div>
                    <span>aps</span>
                </div>

                <div className="hero-content">
                    <h1 className="hero-title">
                        Expert level Cybersecurity in <span>hours</span> not weeks.
                    </h1>

                    <div className="feature-list">
                        <h4>What's included</h4>
                        {featureItems.map((text, idx) => (
                            <div key={idx} className="feature-item">
                                <Check className="feature-check" size={18} strokeWidth={3} />
                                <p>{text}</p>
                            </div>
                        ))}
                    </div>

                    <div className="trustpill">
                        <div className="trustpill-row">
                            <Star size={18} fill="#0CC8A8" stroke="none" />
                            <span>Trustpilot</span>
                        </div>
                        <div className="trustpill-row">
                            <span className="rating-text">Rated 4.5/5.0</span>
                            <span className="rating-sub">(100k+ reviews)</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="login-right">
                <button className="theme-toggle-floating" onClick={toggleTheme} style={{
                    background: 'none', border: 'none', color: 'var(--text-secondary)',
                    display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, cursor: 'pointer'
                }}>
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </button>

                <div className="login-card">
                    <div className="login-header">
                        <h2>Sign up</h2>
                        <p>Already have an account? <a href="#">Log in</a></p>
                    </div>

                    <form onSubmit={handleCreateAccount}>
                        <div className="form-row">
                            <div className="input-group">
                                <input className="input-style" type="text" placeholder="First name*" required />
                            </div>
                            <div className="input-group">
                                <input className="input-style" type="text" placeholder="Last name*" required />
                            </div>
                        </div>

                        <div className="input-group">
                            <input className="input-style" type="email" placeholder="Email address*" required />
                        </div>

                        <div className="input-group" style={{ position: 'relative' }}>
                            <input
                                className="input-style"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password (8+ characters)*"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute', right: '1rem', top: '1rem',
                                    background: 'none', border: 'none', color: '#999', cursor: 'pointer'
                                }}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        <div className="checkbox-row">
                            <input type="checkbox" id="terms" required />
                            <label htmlFor="terms">
                                I agree to Aps's <a href="#" style={{ color: 'inherit' }}>Terms & Conditions</a> and acknowledge the <a href="#" style={{ color: 'inherit' }}>Privacy Policy</a>
                            </label>
                        </div>

                        <button className="create-btn" disabled={loading} type="submit">
                            {loading ? "Creating..." : "Create account"}
                        </button>

                        <div className="social-login">
                            <button type="button" className="social-btn apple" title="Apple Login"><Apple size={22} /></button>
                            <button type="button" className="social-btn google" title="Google Login">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.07-3.71 1.07-2.85 0-5.27-1.92-6.13-4.51H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.87 14.09c-.22-.67-.35-1.38-.35-2.09s.13-1.42.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.69-2.84z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.69 2.84c.86-2.59 3.28-4.51 6.13-4.51z" fill="#EA4335" />
                                </svg>
                            </button>
                            <button type="button" className="social-btn meta" title="Meta Login">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.5 6C15.19 6 13.97 6.54 13.08 7.42L12.5 8L11.92 7.42C11.03 6.54 9.81 6 8.5 6C5.46 6 3 8.46 3 11.5C3 14.54 5.46 17 8.5 17C9.81 17 11.03 16.46 11.92 15.58L12.5 15L13.08 15.58C13.97 16.46 15.19 17 16.5 17C19.54 17 22 14.54 22 11.5C22 8.46 19.54 6 16.5 6ZM16.5 14.5C14.84 14.5 13.5 13.16 13.5 11.5C13.5 9.84 14.84 8.5 16.5 8.5C18.16 8.5 19.5 9.84 19.5 11.5C19.5 13.16 18.16 14.5 16.5 14.5ZM8.5 14.5C6.84 14.5 5.5 13.16 5.5 11.5C5.5 9.84 6.84 8.5 8.5 8.5C10.16 8.5 11.5 9.84 11.5 11.5C11.5 13.16 10.16 14.5 8.5 14.5Z" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
