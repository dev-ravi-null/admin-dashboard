import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './redux/UserSlice';
import { useNavigate } from 'react-router-dom';
import jpfunwareImage from './jpfunware.png';
const Login = () => {
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlePhoneSubmit = (e) => {
        e.preventDefault();
        if (name.trim() && phone.length === 10) {
            setStep(2);
            setError('');
        } else {
            setError('Please enter a valid name and 10-digit phone number');
        }
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        const validOtp = phone.slice(-4);
        if (otp === '1212' || otp === validOtp) {
            const userData = { name, phone, isLoggedIn: true };
            dispatch(login(userData));
            alert('Login successful ✅');
            navigate('/');
        } else {
            setError('Invalid OTP');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div style={{ maxWidth: '400px', width: '100%' }}>
                <img
                    src={jpfunwareImage}
                    alt="Login"
                    className="img-fluid mb-3 rounded shadow-sm"
                />

                <div className="card p-4 shadow-lg">
                    <h3 className="text-center mb-4">{step === 1 ? 'Login' : 'Verify OTP'}</h3>

                    {step === 1 ? (
                        <form onSubmit={handlePhoneSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Phone</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    placeholder="Enter 10-digit number"
                                    value={phone}
                                    onChange={(e) => {
                                        const input = e.target.value;
                                        if (/^\d{0,10}$/.test(input)) {
                                            setPhone(input);
                                        }
                                    }}
                                    maxLength={10}
                                />
                            </div>


                            <button type="submit" className="btn btn-primary w-100">Send OTP</button>
                        </form>
                    ) : (
                        <form onSubmit={handleOtpSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Enter OTP</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-success w-100">Verify & Login</button>
                        </form>
                    )}

                    {error && (
                        <div className="alert alert-danger mt-3" role="alert">
                            {error}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
