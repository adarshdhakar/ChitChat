import { useState } from 'react';
import { useRouter } from 'next/router';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Sending POST request to the signup API endpoint
            const res = await fetch('http://localhost:5000/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }), // Include username
            });

            const data = await res.json();
            if (res.ok) {
                // Redirecting to the home page upon successful signup
                router.push('/');
            } else {
                // Displaying error message if signup fails
                setError(data.error || 'Signup failed');
            }
        } catch (err) {
            // Handling any other errors
            setError('An error occurred');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ width: '400px' }}>
                <h1 className="text-center mb-4">Signup</h1>
                <form onSubmit={handleSubmit}>
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
                    <button type="submit" className="btn btn-primary w-100">Signup</button>
                    {error && <p className="text-danger mt-3">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Signup;
