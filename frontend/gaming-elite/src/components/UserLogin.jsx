import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserLogin = ({ setLoggedIn ,setUsername,setUserId }) => {
    const [user, setUser] = useState({
        username: '',
        password: '',
      
    });

    const navigate = useNavigate();
    

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: user.username,
                    password: user.password,
                }),
            });
            if (!response.ok) {
                throw new Error('Login failed');
            }
            alert('Login successful');
            setLoggedIn(true); // Call setLoggedIn here
            setUsername(user.username); // Use user.username
            setUserId(user.userId);
            navigate('/'); // Navigate to the home page
        } catch (error) {
            console.error('Error logging in:', error.message);
            alert('Login failed');
        }
    };

    const handleCancel = () => {
        setUser({
            username: '',
            password: '',
            
        });
    };

    return (
        <div className="form">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    id="username"
                    value={user.username}
                    onChange={handleChange}
                />
                <label htmlFor="username">Username</label>

                <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    value={user.password}
                    onChange={handleChange}
                />
                <label htmlFor="password">Password</label>

                <button type="submit">Login</button>
                <button type="button" className="cancel" onClick={handleCancel}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default UserLogin;
