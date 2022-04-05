import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from 'react-redux';

import { startSetProject } from "../actions/project";
import ProjectItem from "./ProjectItem";

export const Project = ({ startSetProject }) => {
    const params = useParams();
    //const [project, setProject] = useState({name: "default", time: "default", id: "default", user: "default"});
    const [ableToSee, setAbleToSee] = useState(false);
    const [notFound, setNotFound] = useState('');
    //if (!projects.users_with.include(uname)) {
    //    return <div>You're not able to see this project</div>
    //}

    useEffect(() => {
        startSetProject(params.pid)
        .then((result) => {
            setNotFound('');

            if (result.message) {
                setNotFound(result.message);
            };

            //setProject(projectItem);
            //Instead of rendering the result.project
            // I do set the project on redux then render it from the projectItem
            // otherwise if I want to render it here it render the project before on the redux
            // With that saying I render the project info AFTER the project stored in redux
        })
        .then(() => setAbleToSee(true));
    }, [params])

    if (notFound) {
        return <div>Project Not Found! -- {notFound}</div>;
    }

    return (
        <div>
            {
                ableToSee ?
                <div><ProjectItem /></div> :
                <div>You're not able to see this project</div>
            }
        </div>
    );
};

//const mapStateToProps = (state) => ({
//    // Not uses yet
//    projectItem: state.projectItem.project
//});

const mapDispatchToProps = (dispatch) => ({
    startSetProject: (pid) => dispatch(startSetProject(pid))
});

export default connect(undefined, mapDispatchToProps)(Project);