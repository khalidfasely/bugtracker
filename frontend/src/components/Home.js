import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { startLogout } from '../actions/auth';

const Home = ({ uname, startLogout }) => {
  //const history = useNavigate();
  
  const logout = async () => {
    const data = await startLogout();
  };
  
  return (
    <div>
      <header>
        {
          uname ?
          <div>
            <p>{uname}</p>
            <button onClick={logout}>Logout</button>
          </div> :
          <div>
            <Link to='/login'>login</Link>
            <Link to='/register'>signup</Link>
          </div>
        }
      </header>
    </div>
  );
};

const mapStateToProps = (state) => ({
  uname: state.auth.uname
});

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
