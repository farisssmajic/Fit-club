import React, { useState } from 'react'
import './BookingModal.css'
import { motion, AnimatePresence } from 'framer-motion'

const BookingModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        class_type: 'strength-training',
        preferred_date: '',
        message: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const classTypes = [
        { value: 'strength-training', label: 'Strength Training' },
        { value: 'cardio', label: 'Cardio & HIIT' },
        { value: 'yoga', label: 'Yoga & Flexibility' },
        { value: 'crossfit', label: 'CrossFit' },
        { value: 'personal-training', label: 'Personal Training' }
    ]

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            await onSubmit(formData)
            setFormData({
                email: '',
                phone: '',
                class_type: 'strength-training',
                preferred_date: '',
                message: ''
            })
            onClose()
        } catch (err) {
            setError('Failed to book. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="booking-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <motion.div
                        className="booking-modal"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <button className="close-btn" onClick={onClose}>✕</button>

                        <h2>Book Your Session</h2>
                        <p className="subtitle">Join us and start your fitness journey</p>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Phone (Optional)</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+1 (555) 000-0000"
                                />
                            </div>

                            <div className="form-group">
                                <label>Class Type</label>
                                <select
                                    name="class_type"
                                    value={formData.class_type}
                                    onChange={handleChange}
                                >
                                    {classTypes.map(type => (
                                        <option key={type.value} value={type.value}>
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Preferred Date (Optional)</label>
                                <input
                                    type="date"
                                    name="preferred_date"
                                    value={formData.preferred_date}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Message (Optional)</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Any special requests or questions?"
                                    rows="3"
                                />
                            </div>

                            {error && <p className="error-message">{error}</p>}

                            <button
                                type="submit"
                                className="btn submit-btn"
                                disabled={loading}
                            >
                                {loading ? 'Booking...' : 'Confirm Booking'}
                            </button>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default BookingModal
