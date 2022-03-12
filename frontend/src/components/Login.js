import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { startLogin } from '../actions/auth';
import { startSetProjects } from '../actions/projects';

const Login = ({ startLogin, startSetProjects }) => {
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

            // Reset the projects after login
            startSetProjects();

            history('/');
        };
    };

    return (
        <div>
            <form onSubmit={onFormSubmit}>
            {error && <p>{error}</p>}
                <input
                    type='text'
                    autoFocus
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='Password'
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
    startLogin: ({ username, password }) => dispatch(startLogin({ username, password })),
    startSetProjects: () => dispatch(startSetProjects())
});

export default connect(undefined, mapDispatchToProps)(Login);