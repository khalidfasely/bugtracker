import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ProjectData from "./ProjectData";
import BugsList from "./BugsList";
import NewBug from "./NewBug";

const ProjectItem = ({uname, projectItem, bugs}) => {
    return (
        <>
            {
                projectItem?.users_with?.includes(uname) ?
                <div>
                    **** project <br /><ProjectData projectItem={projectItem} />
                    **** new bug <br /><NewBug users={projectItem.users_with} on_project={projectItem.id} />
                    **** bugs <br /><div>
                        { bugs?.map(bug => (
                            <Link to={`/project/${bug?.on_project}/bug/${bug?.id}`}>
                                <BugsList bug={bug} />
                            </Link>)
                        )}
                    </div>
                </div> :
                <div>Not able to see this project! <Link to="/new">Create one!</Link></div>
            }
        </>
    );
}

const mapStateToProps = (state) => ({
    uname: state.auth.uname,
    projectItem: state.projectItem.project,
    bugs: state.projectItem.bugs
});

export default connect(mapStateToProps)(ProjectItem);