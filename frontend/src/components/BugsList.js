const BugsList = ({ bug }) => (
    <div className="bug-list-item">
        <div className="bug-list-item__title-cls">
            <h3>{bug?.title}</h3>
            {
                bug?.active ?
                <p className={bug?.classification}>{bug?.classification}</p> :
                <abbr title="Not Active Anymore">
                    <p className="not-active">N.A</p>
                </abbr>
            }
        </div>
        <p className="bug-list-item__description">{bug?.description.substring(0, 120)}...</p>
        <div className="bug-list-item__user-time">
            <p>{bug?.user?.username}</p>
            <p>{bug?.time}</p>
        </div>
        {/*<div>
            {bug?.admins?.map(admin => <span key={admin}>{admin} </span>)}
        </div>
        <br />
        <div>
            {bug?.users_with?.map(user => <span key={user}>{user} </span>)}
        </div>*/}
    </div>
);

export default BugsList;