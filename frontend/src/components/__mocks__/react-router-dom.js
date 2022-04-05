function Link({ children }){
  return <a>{children}</a>;
}

function NavLink({ children }){
  return <a className="nav-link">{children}</a>;
}

function useParams(){
  return {};
}

function useNavigate(){
  //useNavigate returns a function
  return jest.fn().mockImplementation(() => ({}));
}

export { Link, NavLink, useParams, useNavigate };