import { useNavigate } from 'react-router-dom';

const Home = () => {
  const history = useNavigate();
  
  const logout = async () => {
    const res = await fetch('/api/logout');
    
    const data = await res.json();
    
    console.log(data);

    history('/login')
  };
  
  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Home;
