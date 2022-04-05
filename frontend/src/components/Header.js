import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { startLogout } from '../actions/auth';
import { startSetProjects } from '../actions/projects';

export const Header = ({ uname, startLogout, startSetProjects }) => {
    return (
        <header>
            <Link to='/'>
                <h1 data-testid='title_header'>
                    Bug Tracker
                </h1>
            </Link>
            {
                uname ?
                <div>
                    <p>{uname}</p>
                    <button onClick={() => {startLogout().then(() => startSetProjects())}}>Logout</button>
                </div> :
                <div>
                    <Link to='/login'>login</Link>
                    <Link to='/register'>signup</Link>
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