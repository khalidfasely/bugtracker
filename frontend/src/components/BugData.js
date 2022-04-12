const BugData = ({ bug }) => (
    <div className="bug-data">
        <div className="bug-data__title-desc">
            <div>
                <div className="active-point">
                    <abbr title={bug?.active ? 'Active' : 'Not Active'}>
                        <div className={`is-active ${bug?.active ? 'active' : 'not-active'}`}></div>
                    </abbr>
                </div>
                <abbr title={`Priority: ${bug?.classification}`}>
                    <h3 className={`bug__title ${bug?.classification}`}>{bug?.title}</h3>
                </abbr>
            </div>
            <p className="bug__description">{bug?.description}</p>
        </div>
        <div className="bug-data__user-time">
            <p className="bug__user"><span className="static-text">By: </span>{bug?.user?.username}</p>
            <p className="bug__time"><span className="static-text">On: </span>{bug?.time}</p>
        </div>
        <div>
            <span className="static-text">Users in: </span>{bug?.admins?.map(admin => <span key={admin} >{admin} </span>)}
        </div>
        <div>
        <span className="static-text">Admins in: </span>{bug?.users_with?.map(user => <span key={user} >{user} </span>)}
        </div>
    </div>
);

export default BugData;