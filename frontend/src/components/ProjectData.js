const ProjectData = ({ projectItem }) => (
    <div className="project-data">
        <p className="project__name">{projectItem?.name}</p>
        <p className="project__user"><span className="static-text">By: </span>{projectItem?.user?.username}</p>
        <p className="project__time"><span className="static-text">On: </span>{projectItem?.time}</p>
        <div className="project__users">
            <span className="static-text">Users in: </span>{projectItem?.admins?.map(admin => <span key={admin}>{admin} </span>)}
        </div>
        <div className="project__admins">
            <span className="static-text">Admins in: </span>{projectItem?.users_with?.map(user => <span key={user}>{user} </span>)}
        </div>
    </div>
);

export default ProjectData;