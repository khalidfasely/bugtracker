import { Link } from "react-router-dom";
import { connect } from "react-redux";

const ProjectItem = ({name, id, time, user, admins, users_with, uname}) => {
    return (
        <>
            {
                users_with?.includes(uname) ?
                <div>
                    <p>{id}</p>
                    <p>{name}</p>
                    <p>{time}</p>
                    <p>{user?.username}</p>
                    <div>
                        {admins?.map(admin => <span>{admin} </span>)}
                    </div>
                    <br />
                    <div>
                        {users_with?.map(user => <span>{user} </span>)}
                    </div>
                </div> :
                <div>Not able to see this project! <Link to="/new">Create one!</Link></div>
            }
        </>
    );
}

const mapStateToProps = (state) => ({
    uname: state.auth.uname
});

export default connect(mapStateToProps)(ProjectItem);