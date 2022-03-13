const ProjectItem = ({name, id, time, user}) => {
    console.log(id);
    return (
        <div>
            <p>{id}</p>
            <p>{name}</p>
            <p>{time}</p>
            <p>{user.username}</p>
        </div>
    );
}

//<p>{admins}</p>
//<p>{users_with}</p>

export default ProjectItem;