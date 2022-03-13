import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProjectItem from "./ProjectItem";

const Project = () => {
    const params = useParams();
    const [project, setProject] = useState({name: "default", time: "default", id: "default", user: "default"});
    const [ableToSee, setAbleToSee] = useState(true);
    //if (!projects.users_with.include(uname)) {
    //    return <div>You're not able to see this project</div>
    //}

    useEffect(() => {
        getProject();
        //.then(() => setAbleToSee(true));
    }, [params])

    const getProject = async () => {
        fetch(`/api/project/${params.pid}`)
        .then(res => res.json())
        .then(result => setProject(result.project));
        //const res = await fetch(`/api/project/${params.pid}`);

        //const project = await res.json();

        //setProject(project);
    }

    return (
        <div>
            {
                ableToSee ?
                <div><ProjectItem {...project} /></div> :
                <div>You're not able to see this project</div>
            }
        </div>
    );
};

export default Project;