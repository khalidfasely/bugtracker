import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { startLogin } from '../actions/auth';
import { startSetProjects } from '../actions/projects';

export const Login = ({ startLogin, startSetProjects }) => {
    const history = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [shownPd, setShownPd] = useState(false);
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
        let result;
        try {
            result = await startLogin({ username, password });
        } catch(er) {
            console.error(er);
        }

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
            <form onSubmit={onFormSubmit} data-testid='login_form'>
            {error && <p data-testid='error_message'>{error}</p>}
                <input
                    type='text'
                    autoFocus
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    data-testid='username_input'
                />
                <input
                    type={shownPd ? 'text' : 'password'}
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    data-testid='password_input'
                />
                {
                    shownPd ?
                    <button type="button" onClick={() => setShownPd(false)}>Hide password!</button> :
                    <button type="button" onClick={() => setShownPd(true)}>Show password!</button>
                }
                <button data-testid='login_button'>Login</button>
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