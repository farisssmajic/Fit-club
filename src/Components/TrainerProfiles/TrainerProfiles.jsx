import React, { useEffect, useState } from 'react'
import './TrainerProfiles.css'
import { motion } from 'framer-motion'
import { createClient } from '@supabase/supabase-js'

const TrainerProfiles = () => {
    const [trainers, setTrainers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTrainers = async () => {
            const supabase = createClient(
                import.meta.env.VITE_SUPABASE_URL,
                import.meta.env.VITE_SUPABASE_ANON_KEY
            )

            const { data, error } = await supabase
                .from('trainers')
                .select('*')

            if (!error && data.length === 0) {
                const defaultTrainers = [
                    {
                        id: '1',
                        name: 'John Mitchell',
                        specialty: 'Strength Training',
                        bio: 'Expert in powerlifting and muscle building with 8+ years experience.',
                        experience_years: 8,
                        rating: 4.9
                    },
                    {
                        id: '2',
                        name: 'Sarah Johnson',
                        specialty: 'Cardio & HIIT',
                        bio: 'Certified NASM trainer specializing in high-intensity interval training.',
                        experience_years: 6,
                        rating: 4.8
                    },
                    {
                        id: '3',
                        name: 'Michael Chen',
                        specialty: 'Yoga & Flexibility',
                        bio: 'Certified yoga instructor with focus on flexibility and mobility work.',
                        experience_years: 7,
                        rating: 4.9
                    },
                    {
                        id: '4',
                        name: 'Emma Williams',
                        specialty: 'CrossFit & Functional',
                        bio: 'CrossFit Level 2 trainer passionate about functional fitness.',
                        experience_years: 5,
                        rating: 4.7
                    }
                ]
                setTrainers(defaultTrainers)
            } else if (data) {
                setTrainers(data)
            }
            setLoading(false)
        }

        fetchTrainers()
    }, [])

    if (loading) return <div className="trainers-loading">Loading trainers...</div>

    return (
        <div className="trainer-profiles" id="trainers">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="trainers-header"
            >
                <span className='stroke-text'>MEET OUR</span>
                <span>EXPERT TRAINERS</span>
            </motion.div>

            <div className="trainers-grid">
                {trainers.map((trainer, index) => (
                    <motion.div
                        key={trainer.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="trainer-card"
                    >
                        <div className="trainer-image-placeholder">
                            <div className="placeholder-initial">
                                {trainer.name.charAt(0)}
                            </div>
                        </div>

                        <div className="trainer-info">
                            <h3>{trainer.name}</h3>
                            <p className="specialty">{trainer.specialty}</p>

                            <div className="trainer-rating">
                                <span className="stars">
                                    {'★'.repeat(Math.floor(trainer.rating))}
                                    {trainer.rating % 1 !== 0 && '✦'}
                                </span>
                                <span className="rating-value">{trainer.rating}</span>
                            </div>

                            <p className="bio">{trainer.bio}</p>

                            <div className="trainer-meta">
                                <div className="meta-item">
                                    <span className="meta-label">Experience</span>
                                    <span className="meta-value">{trainer.experience_years}+ Years</span>
                                </div>
                            </div>

                            <button className="btn btn-trainer">Book Session</button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default TrainerProfiles
