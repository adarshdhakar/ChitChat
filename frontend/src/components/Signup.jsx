import { useState } from 'react';
import { useRouter } from 'next/router';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState(null); // State for profile image
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create form data to send image and other fields
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);

        // Add profile image to the form data if available
        if (profileImage) {
            formData.append('profileImage', profileImage);
        }

        try {
            const res = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                body: formData, // Send form data with image
            });

            const data = await res.json();
            if (res.ok) {
                router.push('/');
            } else {
                setError(data.error || 'Signup failed');
            }
        } catch (err) {
            setError('An error occurred');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ width: '400px' }}>
                <h1 className="text-center mb-4">Signup</h1>
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
                            onChange={(e) => setProfileImage(e.target.files[0])} // Capture image file
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


