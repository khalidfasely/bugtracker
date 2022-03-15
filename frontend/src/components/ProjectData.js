const ProjectData = ({ projectItem }) => (
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
    </div>
);

export default ProjectData;