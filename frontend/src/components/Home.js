import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import illustration from '../images/bugtracker.svg';

export const Home = ({ uname }) => {
  return (
    <div className='home-container'>
      <img src={illustration} alt='bug tracker illustration' />
      {
        uname ?
        <p>Track all your bugs by creating a <Link to='/new-project'>new project</Link> by giving a name to it and adding users you want to see the project and the bugs inside this project.</p> :
        <p>To create new projects or see yours, You must <Link to='/login'>Login</Link> or <Link to='/register'>Create an account</Link>.</p>
      }
    </div>
  );
};

const mapStateToProps = (state) => ({
  uname: state.auth.uname
});

export default connect(mapStateToProps)(Home);