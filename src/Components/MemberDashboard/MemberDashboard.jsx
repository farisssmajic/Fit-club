import React, { useState, useEffect } from 'react'
import './MemberDashboard.css'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import BookingModal from '../BookingModal/BookingModal'

const MemberDashboard = () => {
    const { user, supabase } = useAuth()
    const [showBookingModal, setShowBookingModal] = useState(false)
    const [bookings, setBookings] = useState([])
    const [progress, setProgress] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('bookings')
    const [showAuthModal, setShowAuthModal] = useState(false)
    const [authMode, setAuthMode] = useState('login')
    const [authLoading, setAuthLoading] = useState(false)
    const [authError, setAuthError] = useState('')
    const [authFormData, setAuthFormData] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        const loadData = async () => {
            setLoading(true)
            const { data: bookingsData } = await supabase
                .from('gym_bookings')
                .select('*')
                .eq('email', user.email)

            const { data: progressData } = await supabase
                .from('user_progress')
                .select('*')
                .eq('user_id', user.id)

            setBookings(bookingsData || [])
            setProgress(progressData || [])
            setLoading(false)
        }

        if (user) {
            loadData()
        } else {
            setLoading(false)
        }
    }, [user, supabase])

    const fetchData = async () => {
        const { data: bookingsData } = await supabase
            .from('gym_bookings')
            .select('*')
            .eq('email', user.email)

        const { data: progressData } = await supabase
            .from('user_progress')
            .select('*')
            .eq('user_id', user.id)

        setBookings(bookingsData || [])
        setProgress(progressData || [])
    }

    const handleAuthChange = (e) => {
        const { name, value } = e.target
        setAuthFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleAuthSubmit = async (e) => {
        e.preventDefault()
        setAuthLoading(true)
        setAuthError('')

        try {
            if (authMode === 'login') {
                const { error } = await supabase.auth.signInWithPassword({
                    email: authFormData.email,
                    password: authFormData.password
                })
                if (error) throw error
            } else {
                const { error } = await supabase.auth.signUp({
                    email: authFormData.email,
                    password: authFormData.password
                })
                if (error) throw error
            }
            setShowAuthModal(false)
            setAuthFormData({ email: '', password: '' })
        } catch (error) {
            setAuthError(error.message)
        } finally {
            setAuthLoading(false)
        }
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
    }

    const handleBookingSubmit = async (formData) => {
        const { error } = await supabase
            .from('gym_bookings')
            .insert([formData])

        if (error) throw error
        await fetchData()
    }

    if (!user) {
        return (
            <div className="member-dashboard-guest">
                <div className="guest-content">
                    <h2>Join Our Community</h2>
                    <p>Sign in or create an account to book classes and track your progress</p>
                    <div className="guest-buttons">
                        <button
                            className="btn"
                            onClick={() => {
                                setAuthMode('login')
                                setShowAuthModal(true)
                            }}
                        >
                            Sign In
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => {
                                setAuthMode('signup')
                                setShowAuthModal(true)
                            }}
                        >
                            Create Account
                        </button>
                    </div>
                </div>

                {showAuthModal && (
                    <div className="auth-modal-overlay" onClick={() => setShowAuthModal(false)}>
                        <motion.div
                            className="auth-modal"
                            onClick={(e) => e.stopPropagation()}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <button
                                className="close-btn"
                                onClick={() => setShowAuthModal(false)}
                            >
                                ✕
                            </button>

                            <h3>{authMode === 'login' ? 'Sign In' : 'Create Account'}</h3>

                            <form onSubmit={handleAuthSubmit}>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="email"
                                        value={authFormData.email}
                                        onChange={handleAuthChange}
                                        placeholder="Email"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        name="password"
                                        value={authFormData.password}
                                        onChange={handleAuthChange}
                                        placeholder="Password"
                                        required
                                    />
                                </div>

                                {authError && <p className="error-message">{authError}</p>}

                                <button
                                    type="submit"
                                    className="btn"
                                    disabled={authLoading}
                                >
                                    {authLoading ? 'Processing...' : (authMode === 'login' ? 'Sign In' : 'Create Account')}
                                </button>
                            </form>

                            <p className="auth-toggle">
                                {authMode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                                <button
                                    className="link-btn"
                                    onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                                >
                                    {authMode === 'login' ? 'Sign Up' : 'Sign In'}
                                </button>
                            </p>
                        </motion.div>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="member-dashboard" id="dashboard">
            <div className="dashboard-header">
                <div>
                    <h1>Welcome, {user.email.split('@')[0]}!</h1>
                    <p>Track your fitness journey and book classes</p>
                </div>
                <button className="btn btn-logout" onClick={handleLogout}>Logout</button>
            </div>

            <div className="dashboard-tabs">
                <button
                    className={`tab ${activeTab === 'bookings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('bookings')}
                >
                    My Bookings
                </button>
                <button
                    className={`tab ${activeTab === 'progress' ? 'active' : ''}`}
                    onClick={() => setActiveTab('progress')}
                >
                    Progress
                </button>
            </div>

            {activeTab === 'bookings' && (
                <div className="dashboard-content">
                    <button
                        className="btn"
                        onClick={() => setShowBookingModal(true)}
                    >
                        + Book New Class
                    </button>

                    {loading ? (
                        <p>Loading your bookings...</p>
                    ) : bookings.length === 0 ? (
                        <p className="empty-state">No bookings yet. Book your first class!</p>
                    ) : (
                        <div className="bookings-list">
                            {bookings.map(booking => (
                                <motion.div
                                    key={booking.id}
                                    className="booking-item"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <div className="booking-info">
                                        <h4>{booking.class_type}</h4>
                                        <p>{booking.preferred_date || 'Date to be confirmed'}</p>
                                        <span className={`status ${booking.status}`}>{booking.status}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'progress' && (
                <div className="dashboard-content">
                    {loading ? (
                        <p>Loading your progress...</p>
                    ) : progress.length === 0 ? (
                        <p className="empty-state">No workouts logged yet. Start tracking!</p>
                    ) : (
                        <div className="progress-list">
                            {progress.map(p => (
                                <motion.div
                                    key={p.id}
                                    className="progress-item"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <div className="progress-info">
                                        <h4>{p.workout_type}</h4>
                                        <p>{p.workout_date}</p>
                                    </div>
                                    <div className="progress-stats">
                                        <div className="stat">
                                            <span className="value">{p.duration_minutes}</span>
                                            <span className="label">minutes</span>
                                        </div>
                                        <div className="stat">
                                            <span className="value">{p.calories_burned}</span>
                                            <span className="label">calories</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            <BookingModal
                isOpen={showBookingModal}
                onClose={() => setShowBookingModal(false)}
                onSubmit={handleBookingSubmit}
            />
        </div>
    )
}

export default MemberDashboard
