import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { startLogin } from '../actions/auth';

const Login = ({ startLogin }) => {
    const history = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const onFormSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Check all field
        if (!(username && password)) {
            setError('Must set all fields!');
            return;
        };

        // Start login with redux
        const result = await startLogin({ username, password });

        // Check result from backend
        if (result.message !== "Login Successfully.") {
            setError(result.message);
        } else {
            setUsername('');
            setPassword('');

            history('/');
        };
    };

    return (
        <div>
            <form onSubmit={onFormSubmit}>
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

const mapDispatchToProps = (dispatch) => ({
    startLogin: ({ username, password }) => dispatch(startLogin({ username, password }))
});

export default connect(undefined, mapDispatchToProps)(Login);