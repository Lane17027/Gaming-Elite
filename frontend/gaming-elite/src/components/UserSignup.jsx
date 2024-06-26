
import { useState } from 'react';
import '../style/UserSignup.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import baseUrl from "../api/api";



const UserSignup = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: '',
        password: '',
        passwordConfirm: '',
        valid: true
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const isValid = user.password === user.passwordConfirm && isValidPassword(user.password);
        setUser(prevState => ({
            ...prevState,
            valid: isValid
        }));

        if (!isValid) {
            return;
        }

        try {

            const response = await fetch(`${baseUrl}/users/signup`, {



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
                throw new Error('Failed to create user');
            }
            alert('User created successfully');
            navigate('/login');
            // Reset form fields
            setUser({
                username: '',
                password: '',
                passwordConfirm: '',
                valid: true,
            });
        } catch (error) {
            console.error('Error creating user:', error.message);
            alert('Failed to create user');
        }
    };

    const handleChange = (event) => {
        const { id, value } = event.target;
        let valid = true;
        if (id === 'passwordConfirm' && value !== user.password) {
            valid = false;
        }
        if (id === 'password' && !isValidPassword(value)) {
            valid = false;
        }
        setUser({ ...user, [id]: value, valid });
    };

    const isValidPassword = (password) => {
        const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{7,}$/;
        return regex.test(password);
    };

    const handleCancel = () => {
        setUser({
            username: '',
            password: '',
            passwordConfirm: '',
            valid: true
        });
    };

    return (
        <div className="signup-page-container">
            <div className="form">
                <h1>Sign Up</h1>
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

                    <input
                        type="password"
                        placeholder="Confirm password"
                        id="passwordConfirm"
                        value={user.passwordConfirm}
                        onChange={handleChange}
                    />
                    <label htmlFor="passwordConfirm">Confirm password</label>

                    <button type="submit">Sign Up</button>


                    <button type="button" className="cancel" onClick={handleCancel}>
                        Cancel
                    </button>
                    {!user.valid && <p className="invalid">Passwords must match and meet the criteria.</p>}
                    {user.valid && <p className="valid">Passwords match.</p>}
                    <div className="or-line">
                    <hr className="line" />
                    <p>or</p>
                    <hr className="line" />
                        </div>
                    <Link to="/login">
                        <button type="button" className="login">

                            Login
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default UserSignup;
