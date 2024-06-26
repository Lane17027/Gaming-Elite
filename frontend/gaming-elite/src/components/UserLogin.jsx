import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import baseUrl from "../api/api";

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
            const response = await fetch(`${baseUrl}/users/login`, {
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

            const data = await response.json(); // Parse the response JSON data
            alert('Login successful');
            setLoggedIn(true); // Call setLoggedIn here
            setUsername(user.username); // Use user.username
            setUserId(data.user_id); // Use the user ID from the response
            localStorage.setItem('user_id', data.user_id);
             localStorage.setItem('username', user.username);
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
        <div className="login-page-container">
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
        </div>
    );
};

export default UserLogin;
