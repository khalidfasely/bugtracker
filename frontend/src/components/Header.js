import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { startLogout } from '../actions/auth';
import { startSetProjects } from '../actions/projects';
import navSlide from '../styles/stylesJS/navSlide';

export const Header = ({ uname, startLogout, startSetProjects }) => {
    useEffect(() => navSlide(), [])
    
    return (
        <header className='header'>
            <div className='burger'>
                <div className='line1'></div>
                <div className='line2'></div>
                <div className='line3'></div>
            </div>
            <Link to='/'>
                <h1 className="header-logo" data-testid='title_header'>
                    Bug Tracker
                </h1>
            </Link>
            {
                uname ?
                <div className='header-buttons'>
                    <p className='header-buttons__uname'>{uname}</p>
                    <button className='header-buttons__button' onClick={() => {startLogout().then(() => startSetProjects())}}>Logout</button>
                </div> :
                <div className='header-buttons'>
                    <Link className='header-buttons__a login-link' to='/login'>login</Link>
                    <Link className='header-buttons__a register-link' to='/register'>signup</Link>
                </div>
            }
        </header>
    );
};

const mapStateToProps = (state) => ({
    uname: state.auth.uname,
});

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout()),
    startSetProjects: () => dispatch(startSetProjects()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);