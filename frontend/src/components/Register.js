import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const history = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [error, setError] = useState('');

    const register = async (e) => {
        e.preventDefault();
        setError('');

        const availabeValues = username && email && password && confirmation;

        if (!availabeValues) {
            setError('Must set all fields!');
            return;
        };

        if (password !== confirmation) {
            setError('Password and Confirmation must match!');
            return;
        };
    
        const res = await fetch('/api/register', {
          method: "POST",
          body: JSON.stringify({
            username,
            email,
            password,
            confirmation
          })
        });
    
        const data = await res.json();

        if (!data.user) {
            setError(data.message);
            return;
        }
    
        console.log(data);

        history('/');
    };

    return (
        <div>
            <form onSubmit={register}>
                {error && <p>{error}</p>}
                <input
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='Confirmation'
                    value={confirmation}
                    onChange={(e) => setConfirmation(e.target.value)}
                />
                <button>Register</button>
            </form>
            <p>Already have an account? Login in <Link to='/login'>here</Link>.</p>
        </div>
    );
};

export default Register;