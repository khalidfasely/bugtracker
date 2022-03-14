import { Link } from "react-router-dom";
import { connect } from "react-redux";

const ProjectItem = ({uname, projectItem}) => {
    console.log(projectItem);
    return (
        <>
            {
                projectItem?.users_with?.includes(uname) ?
                <div>
                    <p>{projectItem?.id}</p>
                    <p>{projectItem?.name}</p>
                    <p>{projectItem?.time}</p>
                    <p>{projectItem?.user?.username}</p>
                    <div>
                        {projectItem?.admins?.map(admin => <span>{admin} </span>)}
                    </div>
                    <br />
                    <div>
                        {projectItem?.users_with?.map(user => <span>{user} </span>)}
                    </div>
                </div> :
                <div>Not able to see this project! <Link to="/new">Create one!</Link></div>
            }
        </>
    );
}

const mapStateToProps = (state) => ({
    uname: state.auth.uname,
    projectItem: state.projectItem.project
});

export default connect(mapStateToProps)(ProjectItem);