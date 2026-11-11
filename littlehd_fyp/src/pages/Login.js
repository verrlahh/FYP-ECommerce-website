import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const isValidEmail = (email) => {
    if (email.includes(' ')) return false;       // no spaces allowed

    const parts = email.split('@');              // split at the @ sign
    if (parts.length !== 2) return false;        // must have exactly one @

    const name = parts[0];                       // part before the @
    const domain = parts[1];                     // part after the @

    if (name.length === 0) return false;         // something must come before @
    if (!domain.includes('.')) return false;     // domain needs a dot
    if (domain.endsWith('.')) return false;      // can't end with a dot
    if (domain.startsWith('.')) return false;    // can't start with a dot

    return true;
};

const Icons = {
    microsoft: (
        <svg viewBox="0 0 21 21" aria-hidden="true">
            <rect x="1" y="1" width="9" height="9" fill="#f25022" />
            <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
            <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
            <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
        </svg>
    ),
    apple: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
                fill="#000"
                d="M16.37 12.6c-.03-2.6 2.12-3.85 2.22-3.91-1.21-1.77-3.09-2.01-3.76-2.04-1.6-.16-3.12.94-3.93.94-.81 0-2.06-.92-3.39-.89-1.74.03-3.35 1.01-4.25 2.57-1.81 3.14-.46 7.79 1.3 10.34.86 1.25 1.89 2.65 3.24 2.6 1.3-.05 1.79-.84 3.36-.84 1.57 0 2.01.84 3.38.82 1.4-.02 2.29-1.27 3.14-2.52.99-1.45 1.4-2.85 1.42-2.92-.03-.01-2.72-1.04-2.75-4.15zM13.8 4.96c.71-.87 1.2-2.07 1.07-3.27-1.03.04-2.28.69-3.02 1.55-.66.77-1.24 2-1.09 3.18 1.15.09 2.32-.58 3.04-1.46z"
            />
        </svg>
    ),
    google: (
        <svg viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
        </svg>
    ),
};

const PROVIDERS = [
    { id: 'microsoft', label: 'Sign in with Microsoft' },
    { id: 'apple', label: 'Sign in with Apple' },
    { id: 'google', label: 'Sign in with Google' },
];

const Login = () => {
    const [email, setEmail] = useState('');
    const [optIn, setOptIn] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // Social sign-in: replace with your real OAuth flow (MSAL, Firebase, Auth0, etc.)
    const handleProvider = (provider) => {
        setError('');
        setMessage(`Redirecting to ${provider}…`);
        // window.location.href = `/auth/${provider}`;
    };

    // Email sign-up
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!isValidEmail(email.trim())) {
            setError('Enter a valid email address.');
            return;
        }

        try {
            await api.post('/signup', { email: email.trim(), marketingOptIn: optIn });
            setError('');
            setMessage('Check your inbox to finish creating your account.');
            // navigate('/dashboard');
        } catch (err) {
            setError('Could not create your account. Please try again.');
        }
    };

    return (
        <div className="lhd-page">
            <style>{css}</style>

            <h1 className="lhd-brand">LITTLE.HD</h1>

            <main className="lhd-card">
                <h2 className="lhd-heading">Sign in</h2>

                <div className="lhd-providers">
                    {PROVIDERS.map(({ id, label }) => (
                        <button
                            key={id}
                            type="button"
                            className="lhd-btn"
                            onClick={() => handleProvider(id)}
                        >
                            {Icons[id]}
                            {label}
                        </button>
                    ))}
                </div>

                <div className="lhd-divider" role="separator">
                    <span>or</span>
                </div>

                <h2 className="lhd-heading">Create an account</h2>

                <form onSubmit={handleSubmit} noValidate>
                    <div className={`lhd-field${error ? ' invalid' : ''}`}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setError('');
                            }}
                            placeholder="Email"
                            autoComplete="email"
                            aria-label="Email address"
                        />
                        <button type="submit" className="lhd-submit" aria-label="Continue with email">
                            <svg
                                viewBox="0 0 14 14"
                                fill="none"
                                stroke="#000"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <path d="M3 11L11 3M4.5 3H11v6.5" />
                            </svg>
                        </button>
                    </div>

                    <label className="lhd-optin">
                        <input
                            type="checkbox"
                            checked={optIn}
                            onChange={(e) => setOptIn(e.target.checked)}
                        />
                        <span>Email me with news and offers</span>
                    </label>

                    <p className={`lhd-status ${error ? 'error' : 'ok'}`} role="status" aria-live="polite">
                        {error || message}
                    </p>
                </form>
            </main>
        </div>
    );
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Poppins:wght@300;400;600;700&display=swap');

.lhd-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 96px 20px 48px;
    font-family: 'Poppins', system-ui, sans-serif;
    color: #111;
    background: linear-gradient(to bottom, #c9ddff 0%, #eaf2ff 55%, #fbfcfe 100%);
}
.lhd-page *, .lhd-page *::before, .lhd-page *::after { box-sizing: border-box; }

.lhd-brand {
    margin: 0 0 72px;
    font-size: clamp(40px, 6vw, 56px);
    font-weight: 700;
    letter-spacing: 0.01em;
    color: #fff;
}

.lhd-card {
    width: 100%;
    max-width: 380px;
    padding: 28px 32px 32px;
    text-align: center;
    background: rgba(255, 255, 255, 0.88);
    border-radius: 44px;
}

.lhd-heading { margin: 0; font-size: 17px; font-weight: 600; }

.lhd-providers {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin: 14px 0 18px;
}

.lhd-btn,
.lhd-field {
    width: 100%;
    height: 42px;
    background: #fff;
    border: 1px solid #eef0f3;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(20, 30, 60, 0.18);
}

.lhd-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    font-family: inherit;
    font-size: 16px;
    font-weight: 300;
    color: #111;
    cursor: pointer;
    transition: box-shadow 0.15s, transform 0.15s;
}
.lhd-btn:hover { box-shadow: 0 3px 8px rgba(20, 30, 60, 0.25); }
.lhd-btn:active { transform: translateY(1px); }
.lhd-btn:focus-visible { outline: 2px solid #5b8def; outline-offset: 2px; }
.lhd-btn svg { width: 20px; height: 20px; flex: none; }

.lhd-divider {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 4px -12px 16px;
    font-size: 11px;
    color: #9aa0a6;
}
.lhd-divider::before,
.lhd-divider::after { content: ''; flex: 1; height: 1px; background: #d9dde3; }

.lhd-card form { margin-top: 14px; }

.lhd-field {
    display: flex;
    align-items: center;
    padding: 0 12px 0 16px;
}
.lhd-field:focus-within { outline: 2px solid #5b8def; outline-offset: 2px; }
.lhd-field.invalid { outline: 2px solid #c62828; outline-offset: 2px; }

.lhd-field input {
    flex: 1;
    min-width: 0;
    border: 0;
    outline: 0;
    background: transparent;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    color: #111;
}
.lhd-field input::placeholder { color: #777; }

.lhd-submit {
    display: grid;
    place-items: center;
    padding: 6px;
    border: 0;
    background: none;
    cursor: pointer;
}
.lhd-submit:focus-visible { outline: 2px solid #5b8def; border-radius: 4px; }
.lhd-submit svg { width: 14px; height: 14px; }

.lhd-optin {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 18px;
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    cursor: pointer;
    user-select: none;
}
.lhd-optin input {
    appearance: none;
    -webkit-appearance: none;
    flex: none;
    display: grid;
    place-items: center;
    width: 16px;
    height: 16px;
    margin: 0;
    background: #fff;
    border: 1.5px solid #333;
    border-radius: 3px;
    cursor: pointer;
}
.lhd-optin input:checked { background: #2b2b2b; border-color: #2b2b2b; }
.lhd-optin input:checked::after {
    content: '';
    width: 4px;
    height: 8px;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg) translate(-1px, -1px);
}
.lhd-optin input:focus-visible { outline: 2px solid #5b8def; outline-offset: 2px; }
.lhd-optin span { padding: 1px 4px; background: #dce6fb; }

.lhd-status {
    min-height: 18px;
    margin: 12px 0 0;
    font-family: 'Inter', sans-serif;
    font-size: 12px;
}
.lhd-status.error { color: #c62828; }
.lhd-status.ok { color: #2e7d32; }

@media (prefers-reduced-motion: reduce) {
    .lhd-btn { transition: none; }
}
`;

export default Login;