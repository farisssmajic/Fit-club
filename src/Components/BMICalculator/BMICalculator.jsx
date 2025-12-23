import React, { useState } from 'react'
import './BMICalculator.css'
import { motion } from 'framer-motion'

const BMICalculator = () => {
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [bmi, setBmi] = useState(null)
    const [category, setCategory] = useState('')

    const calculateBMI = () => {
        if (!height || !weight) {
            alert('Please enter both height and weight')
            return
        }

        const heightInMeters = height / 100
        const calculatedBmi = weight / (heightInMeters * heightInMeters)
        setBmi(calculatedBmi.toFixed(1))

        if (calculatedBmi < 18.5) {
            setCategory('Underweight')
        } else if (calculatedBmi < 25) {
            setCategory('Normal Weight')
        } else if (calculatedBmi < 30) {
            setCategory('Overweight')
        } else {
            setCategory('Obese')
        }
    }

    const reset = () => {
        setHeight('')
        setWeight('')
        setBmi(null)
        setCategory('')
    }

    const getBmiColor = () => {
        if (!bmi) return ''
        if (bmi < 18.5) return 'underweight'
        if (bmi < 25) return 'normal'
        if (bmi < 30) return 'overweight'
        return 'obese'
    }

    return (
        <div className="bmi-calculator" id="bmi-calculator">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bmi-container"
            >
                <div className="bmi-header">
                    <span className='stroke-text'>CALCULATE YOUR</span>
                    <span>BMI</span>
                </div>

                <div className="bmi-inputs">
                    <div className="input-group">
                        <label>Height (cm)</label>
                        <input
                            type="number"
                            placeholder="Enter height in cm"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label>Weight (kg)</label>
                        <input
                            type="number"
                            placeholder="Enter weight in kg"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                    </div>
                </div>

                <div className="bmi-buttons">
                    <button className="btn" onClick={calculateBMI}>Calculate</button>
                    <button className="btn secondary-btn" onClick={reset}>Reset</button>
                </div>

                {bmi && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className={`bmi-result ${getBmiColor()}`}
                    >
                        <div className="bmi-value">
                            <span className="bmi-number">{bmi}</span>
                            <span className="bmi-label">BMI</span>
                        </div>
                        <div className="bmi-category">
                            <span>Your Category:</span>
                            <span className="category-name">{category}</span>
                        </div>
                    </motion.div>
                )}

                <div className="bmi-reference">
                    <div className="reference-item">
                        <span className="range">Below 18.5</span>
                        <span className="label">Underweight</span>
                    </div>
                    <div className="reference-item">
                        <span className="range">18.5 - 24.9</span>
                        <span className="label">Normal</span>
                    </div>
                    <div className="reference-item">
                        <span className="range">25 - 29.9</span>
                        <span className="label">Overweight</span>
                    </div>
                    <div className="reference-item">
                        <span className="range">30+</span>
                        <span className="label">Obese</span>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default BMICalculator
