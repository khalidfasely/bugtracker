const BugData = ({ bug }) => (
    <div>
        <p>{bug?.id}</p>
        <p>{bug?.user?.username}</p>
        <p>{bug?.title}</p>
        <p>{bug?.description}</p>
        <p>{bug?.time}</p>
        <p>{bug?.classification}</p>
        <p>{`${bug?.active}`}</p>
        <div>
            {bug?.admins?.map(admin => <span>{admin} </span>)}
        </div>
        <br />
        <div>
            {bug?.users_with?.map(user => <span>{user} </span>)}
        </div>
    </div>
);

export default BugData;