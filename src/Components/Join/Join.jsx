import React from 'react'
import { useRef, useState } from 'react'
import './Join.css'
import emailjs from '@emailjs/browser'

const Join = () => {
    const form = useRef();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const sendEmail = (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        emailjs.sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            form.current,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
          .then((result) => {
              setMessage('Success! We will contact you soon.');
              form.current.reset();
              setTimeout(() => setMessage(''), 3000);
          }, (error) => {
              setMessage('Error sending message. Please try again.');
              setTimeout(() => setMessage(''), 3000);
          })
          .finally(() => setLoading(false));
      };

  return (
    <div className="join" id="join-us">
        <div className="left-j">
            <hr />
            <div>
                <span className='stroke-text'>READY TO</span>
                <span>LEVEL UP</span>
            </div>
            <div>
                <span>YOUR BODY</span>
                <span className='stroke-text'>WITH US?</span>
            </div>
        </div>
        <div className="right-j">
            <form ref={form} className="email" onSubmit={sendEmail}>
                <input
                    type="email"
                    name='user-email'
                    placeholder='Enter your Email address'
                    required
                />
                <button className='btn btn-j' disabled={loading}>
                    {loading ? 'Joining...' : 'Join Now'}
                </button>
            </form>
            {message && <p className={`form-message ${message.includes('Success') ? 'success' : 'error'}`}>{message}</p>}
        </div>
    </div>
  )
}

export default Join