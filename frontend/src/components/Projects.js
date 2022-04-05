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
                                <div key={project.id}>
                                    <NavLink to={`/project/${project.id}`}>
                                        <p>{project.name}</p>
                                        <p>{project.time}</p>
                                    </NavLink>
                                </div>
                            ))
                        }
                        <div>Create new project <Link to="/new-project">here</Link>.</div>
                        </div> :
                        <div>No projects. Create one <Link to="/new-project">here</Link>.</div>
                    }
                </div> :
                <div>
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