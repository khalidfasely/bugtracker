import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

export const Projects = ({ uname, projects }) => {
    return (
        <div>

            {
                uname ?
                <div>
                    {
                        projects.length > 0 ?
                        <div>
                        {
                            projects.map(project => (
                                <div className='projects__item' key={project.id}>
                                    <NavLink to={`/project/${project.id}`}>
                                        <div className='projects__item-content'>
                                            <p className='projects__item-content__name'>
                                                <span className='mobile-screen'>{project.name.substring(0, 15)}...</span>
                                                <span className='desktop-screen'>{project.name.substring(0, 25)}...</span>
                                            </p>
                                            <div className='projects__item-content__us-ti'>
                                                <p className='projects__item-content__user'>{project.user.username}</p>
                                                <p className='projects__item-content__time'>{project.time.substring(0, 11)}</p>
                                            </div>
                                        </div>
                                    </NavLink>
                                </div>
                            ))
                        }
                        <div className='projects__link-new'>Create new project <Link to="/new-project">here</Link>.</div>
                        </div> :
                        <div className='projects__link-new'>No projects. Create one <Link to="/new-project">here</Link>.</div>
                    }
                </div> :
                <div className='projects__anonymous'>
                    <Link to="/login">Login</Link> or <Link to="/register">Register</Link> to see your projects or create new ones!
                </div>
            }
        </div>
    );
};

const mapStateToProps = (state) => ({
    uname: state.auth.uname,
    projects: state.projects.projects
});

export default connect(mapStateToProps)(Projects);