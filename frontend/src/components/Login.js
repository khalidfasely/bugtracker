import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const history = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const login = async (e) => {
        e.preventDefault();
        setError('');

        // Check all field
        if (!(username && password)) {
            setError('Must set all fields!');
            return;
        };
    
        const res = await fetch('/api/login', {
          method: "POST",
          body: JSON.stringify({
            username,
            password
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
            <form onSubmit={login}>
            {error && <p>{error}</p>}
                <input
                    type='text'
                    placeholder='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button>Login</button>
            </form>
            <p>Haven't an account? Create one <Link to='/register'>here</Link>.</p>
        </div>
    );
};

export default Login;