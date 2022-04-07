import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { startLogin } from '../actions/auth';
import { startSetProjects } from '../actions/projects';
import Loading from './Loading';

export const Login = ({ startLogin, startSetProjects }) => {
    const history = useNavigate();
    const [loading, setLoading] = useState(false);
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

        setLoading(true);

        // Start login with redux
        let result;
        try {
            result = await startLogin({ username, password });
        } catch(er) {
            console.error(er);
        }

        // Check result from backend
        if (result.message !== "Login Successfully.") {
            setLoading(false);
            setError(result.message);
        } else {
            setUsername('');
            setPassword('');

            // Reset the projects after login
            startSetProjects();

            history('/');
        };
    };

    if (loading) {
        return (
            <div className='login-container'>
                <div className='login'>
                    <Loading />
                </div>
            </div>
        );
    }

    return (
        <div className='login-container'>
            <div className='login'>
                <form onSubmit={onFormSubmit} className='login-form' data-testid='login_form'>
                    {error && <p className='error_message' data-testid='error_message'>{error}</p>}
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
                        <button
                            className='show-pswrd'
                            type="button"
                            onClick={() => setShownPd(false)}
                        >
                            Hide password
                        </button> :
                        <button
                            className='show-pswrd'
                            disabled={!password}
                            type="button"
                            onClick={() => setShownPd(true)}
                        >
                            Show password
                        </button>
                    }
                    <button className='login__button' data-testid='login_button'>Login</button>
                </form>
                <p>Haven't an account? Create one <Link to='/register'>here</Link>.</p>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    startLogin: ({ username, password }) => dispatch(startLogin({ username, password })),
    startSetProjects: () => dispatch(startSetProjects())
});

export default connect(undefined, mapDispatchToProps)(Login);