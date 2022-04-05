import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { startRegister } from '../actions/auth';
import { startSetProjects } from '../actions/projects';

export const Register = ({ startRegister, startSetProjects }) => {
    const history = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [shownPd, setShownPd] = useState(false);
    const [confirmation, setConfirmation] = useState('');
    const [shownCfr, setShownCfr] = useState(false);
    const [error, setError] = useState('');

    const onFormSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const availabeValues = username && email && password && confirmation;

        // Check all fields
        if (!availabeValues) {
            setError('Must set all fields!');
            return;
        };

        // Compare passwords
        if (password !== confirmation) {
            setError('Password and Confirmation must match!');
            return;
        };

        // Start register with redux
        const result = await startRegister({
            username,
            email,
            password,
            confirmation
        });

        // Check result from backend
        if (result.message !== "Register correctly.") {
            setError(result.message);
        } else {
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmation('');

            // Reset the projects after register and login
            startSetProjects();

            history('/');
        };
    };

    return (
        <div>
            <form onSubmit={onFormSubmit} data-testid='register_form'>
                <p data-testid='register_error'>{error ? error : null}</p>
                <input
                    type='text'
                    autoFocus
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    data-testid='username_input'
                />
                <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    data-testid='email_input'
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
                <input
                    type={shownCfr ? 'text' : 'password'}
                    placeholder='Confirmation'
                    value={confirmation}
                    onChange={(e) => setConfirmation(e.target.value)}
                    data-testid='confirmation_input'
                />
                {
                    shownCfr ?
                    <button type="button" onClick={() => setShownCfr(false)}>Hide confirmation!</button> :
                    <button type="button" onClick={() => setShownCfr(true)}>Show confirmation!</button>
                }
                <button data-testid='register_button'>Register</button>
            </form>
            <p>Already have an account? Login in <Link to='/login'>here</Link>.</p>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    startRegister: (newUserData) => dispatch(startRegister(newUserData)),
    startSetProjects: () => dispatch(startSetProjects())
});

export default connect(undefined, mapDispatchToProps)(Register);