import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { startLogout } from '../actions/auth';

const Home = ({ startLogout }) => {
  const history = useNavigate();
  
  const logout = async () => {
    const data = await startLogout();
    
    console.log(data);

    history('/login')
  };
  
  return (
    <div>
      <button onClick={logout}>Logout</button>
      <Link to='/login'>login</Link>
      <Link to='/register'>signup</Link>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Home);
