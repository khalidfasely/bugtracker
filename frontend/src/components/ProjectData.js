const ProjectData = ({ projectItem }) => (
    <div>
        <p>{projectItem?.id}</p>
        <p>{projectItem?.name}</p>
        <p>{projectItem?.time}</p>
        <p>{projectItem?.user?.username}</p>
        <div>
            {projectItem?.admins?.map(admin => <span key={admin}>{admin} </span>)}
        </div>
        <br />
        <div>
            {projectItem?.users_with?.map(user => <span key={user}>{user} </span>)}
        </div>
    </div>
);

export default ProjectData;