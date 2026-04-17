import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isPlaceholder } from '../supabase/config';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    async function signup(email, password, username) {
        if (isPlaceholder) {
            const mockUser = {
                id: 'mock-user-1234',
                email: email,
                user_metadata: { username },
                app_metadata: {},
                aud: 'authenticated',
            };
            localStorage.setItem('mock_session', JSON.stringify({ user: mockUser, access_token: 'mock-token' }));
            setCurrentUser(mockUser);
            return mockUser;
        }

        try {
            // 1. Check for IP ban status
            const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
            try {
                const banResponse = await fetch(`${apiBase}/moderation/check-ip`);
                const banData = await banResponse.json();
                if (banData.isBanned) {
                    const hours = Math.ceil(banData.remaining / 3600);
                    throw new Error(`Your IP is temporarily blocked due to violations. Try again in ${hours} hour(s).`);
                }
            } catch (e) {
                console.warn('IP ban check skipped or failed:', e.message);
                if (e.message.includes('IP is temporarily blocked')) throw e;
            }

            // 2. Check if username exists (Fix for 500 conflict)
            const { data: existingUser, error: checkError } = await supabase
                .from('profiles')
                .select('id')
                .eq('username', username)
                .maybeSingle();

            if (existingUser) {
                throw new Error('Username is already taken. Please choose another one.');
            }

            const { data, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        username: username,
                    },
                },
            });

            if (signUpError) throw signUpError;
            return data.user;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    }

    async function login(email, password) {
        if (isPlaceholder) {
            const mockUser = {
                id: 'mock-user-1234',
                email: email,
                user_metadata: { username: email.split('@')[0] },
                app_metadata: {},
                aud: 'authenticated',
            };
            localStorage.setItem('mock_session', JSON.stringify({ user: mockUser, access_token: 'mock-token' }));
            setCurrentUser(mockUser);
            return mockUser;
        }
        try {
            const { data, error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (signInError) throw signInError;
            return data.user;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    }

    async function signInWithGoogle() {
        try {
            const { data, error: googleError } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            if (googleError) throw googleError;
            return data.user;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    }

    async function logout() {
        if (isPlaceholder) {
            localStorage.removeItem('mock_session');
            setCurrentUser(null);
            return;
        }
        try {
            const { error: signOutError } = await supabase.auth.signOut();
            if (signOutError) throw signOutError;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    }

    async function resetPassword(email) {
        try {
            const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/auth/reset-password`,
            });
            if (resetError) throw resetError;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    }

    async function updateUserProfile(profile) {
        try {
            const { error: updateError } = await supabase.auth.updateUser({
                data: profile,
            });
            if (updateError) throw updateError;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    }

    useEffect(() => {
        let mounted = true;

        if (isPlaceholder) {
            const mockSession = localStorage.getItem('mock_session');
            if (mockSession) {
                try {
                    const parsed = JSON.parse(mockSession);
                    if (mounted) setCurrentUser(parsed.user);
                } catch (e) { }
            }
            if (mounted) setLoading(false);
            return () => { mounted = false; };
        }

        const timeout = setTimeout(() => {
            if (mounted && loading) {
                // Silently handle auth timeout to avoid console noise
                setLoading(false);
            }
        }, 3000);

        let subscription = null;
        try {
            const { data } = supabase.auth.onAuthStateChange((event, session) => {
                if (mounted) {
                    if (session) {
                        setCurrentUser(session.user);
                    } else {
                        setCurrentUser(null);
                    }
                    setLoading(false);
                }
            });
            subscription = data?.subscription;
        } catch (err) {
            console.error("Supabase auth subscription failed:", err);
            if (mounted) setLoading(false);
        }

        return () => {
            mounted = false;
            clearTimeout(timeout);
            if (subscription) {
                subscription.unsubscribe();
            }
        };
    }, []);

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        signInWithGoogle,
        updateUserProfile,
        error,
        setError
    };



    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
