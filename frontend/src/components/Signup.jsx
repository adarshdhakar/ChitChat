// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';

// const Signup = () => {
//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [profileImage, setProfileImage] = useState(null); // State for profile image
//     const [otp, setOtp] = useState(''); // State for OTP
//     const [error, setError] = useState('');
//     const [otpSent, setOtpSent] = useState(false); // Flag to check if OTP has been sent
//     const [resendTimer, setResendTimer] = useState(30); // Timer for resending OTP
//     const [resendDisabled, setResendDisabled] = useState(true); // Disable resend initially
//     const router = useRouter();

//     useEffect(() => {
//         let timer;
//         if (otpSent && resendTimer > 0) {
//             timer = setInterval(() => {
//                 setResendTimer((prev) => prev - 1);
//             }, 1000);
//         } else if (resendTimer === 0) {
//             setResendDisabled(false);
//         }
//         return () => clearInterval(timer);
//     }, [otpSent, resendTimer]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         formData.append('username', username);
//         formData.append('email', email);
//         formData.append('password', password);

//         if (profileImage) {
//             formData.append('profileImage', profileImage);
//         }

//         try {
//             const res = await fetch('http://localhost:5000/api/auth/signup', {
//                 method: 'POST',
//                 body: formData,
//             });

//             const data = await res.json();
//             if (res.ok) {
//                 setOtpSent(true); 
//                 setError('');
//                 setResendTimer(30); // Reset timer when OTP is sent
//                 setResendDisabled(true); // Disable the resend button
//             } else {
//                 setError(data.error || 'Signup failed');
//             }
//         } catch (err) {
//             setError('An error occurred');
//         }
//     };

//     const handleOTPSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await fetch('http://localhost:5000/api/auth/verify-otp', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ otp }),
//             });

//             const data = await res.json();
//             if (res.ok) {
//                 router.push('/'); 
//             } else {
//                 setError(data.error || 'OTP verification failed');
//             }
//         } catch (err) {
//             setError('An error occurred during OTP verification');
//         }
//     };

//     const handleResendOTP = async () => {
//         setResendDisabled(true);
//         setResendTimer(30); // Reset the timer

//         try {
//             const res = await fetch('http://localhost:5000/api/auth/resend-otp', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ email }),
//             });

//             const data = await res.json();
//             if (!res.ok) {
//                 setError(data.error || 'Failed to resend OTP');
//             }
//         } catch (err) {
//             setError('An error occurred while resending OTP');
//         }
//     };

//     return (
//         <div className="d-flex justify-content-center align-items-center vh-100">
//             <div className="card p-4" style={{ width: '400px' }}>
//                 <h1 className="text-center mb-4">Signup</h1>
//                 {!otpSent ? (
//                     <form onSubmit={handleSubmit} encType="multipart/form-data">
//                         <div className="mb-3">
//                             <label className="form-label">Username</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 value={username}
//                                 onChange={(e) => setUsername(e.target.value)}
//                                 required
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label className="form-label">Email</label>
//                             <input
//                                 type="email"
//                                 className="form-control"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 required
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label className="form-label">Password</label>
//                             <input
//                                 type="password"
//                                 className="form-control"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 required
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label className="form-label">Profile Image (optional)</label>
//                             <input
//                                 type="file"
//                                 className="form-control"
//                                 onChange={(e) => setProfileImage(e.target.files[0])}
//                             />
//                         </div>
//                         <button type="submit" className="btn btn-primary w-100">Signup</button>
//                         {error && <p className="text-danger mt-3">{error}</p>}
//                     </form>
//                 ) : (
//                     <form onSubmit={handleOTPSubmit}>
//                         <div className="mb-3">
//                             <label className="form-label">Enter OTP</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 value={otp}
//                                 onChange={(e) => setOtp(e.target.value)}
//                                 required
//                             />
//                         </div>
//                         <button type="submit" className="btn btn-primary w-100">Verify OTP</button>
//                         {error && <p className="text-danger mt-3">{error}</p>}

//                         <button
//                             type="button"
//                             className="btn btn-secondary w-100 mt-3"
//                             onClick={handleResendOTP}
//                             disabled={resendDisabled}
//                         >
//                             Resend OTP {resendDisabled && `(${resendTimer}s)`}
//                         </button>
//                     </form>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Signup;


import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [resendTimer, setResendTimer] = useState(30);
    const [resendDisabled, setResendDisabled] = useState(true);
    const router = useRouter();

    useEffect(() => {
        let timer;
        if (otpSent && resendTimer > 0) {
            timer = setInterval(() => {
                setResendTimer((prev) => prev - 1);
            }, 1000);
        } else if (resendTimer === 0) {
            setResendDisabled(false);
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [otpSent, resendTimer]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);

        if (profileImage) {
            formData.append('profileImage', profileImage);
        }

        try {
            const res = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                body: formData,
                credentials: 'include', // Include cookies
            });

            const data = await res.json();
            if (res.ok) {
                setOtpSent(true);
                setError('');
                setResendTimer(30);
                setResendDisabled(true);
            } else {
                setError(data.error || 'Signup failed');
            }
        } catch (err) {
            setError('An error occurred');
        }
    };

    const handleOTPSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ otp }),
                credentials: 'include', // Include cookies
            });

            const data = await res.json();
            if (res.ok) {
                router.push('/');
            } else {
                setError(data.error || 'OTP verification failed');
            }
        } catch (err) {
            setError('An error occurred during OTP verification');
        }
    };

    const handleResendOTP = async () => {
        setResendDisabled(true);
        setResendTimer(30);

        try {
            const res = await fetch('http://localhost:5000/api/auth/resend-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
                credentials: 'include', // Include cookies
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data.error || 'Failed to resend OTP');
            }
        } catch (err) {
            setError('An error occurred while resending OTP');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ width: '400px' }}>
                <h1 className="text-center mb-4">Signup</h1>
                {!otpSent ? (
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Profile Image (optional)</label>
                            <input
                                type="file"
                                className="form-control"
                                onChange={(e) => setProfileImage(e.target.files[0])}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Signup</button>
                        {error && <p className="text-danger mt-3">{error}</p>}
                    </form>
                ) : (
                    <form onSubmit={handleOTPSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Enter OTP</label>
                            <input
                                type="text"
                                className="form-control"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Verify OTP</button>
                        {error && <p className="text-danger mt-3">{error}</p>}

                        <button
                            type="button"
                            className="btn btn-secondary w-100 mt-3"
                            onClick={handleResendOTP}
                            disabled={resendDisabled}
                        >
                            Resend OTP {resendDisabled && `(${resendTimer}s)`}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Signup;
