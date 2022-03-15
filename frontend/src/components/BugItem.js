import { Link } from "react-router-dom";
import { connect } from "react-redux";

const BugItem = ({uname, bug}) => {
    console.log(bug);
    return (
        <>
            {
                bug?.users_with?.includes(uname) ?
                <div>
                    **** bug <br /><h1>{bug.title}</h1>
                    **** comments
                </div> :
                <div>Not able to see this bug! <Link to="/new">Create one!</Link></div>
            }
        </>
    );
}

const mapStateToProps = (state) => ({
    uname: state.auth.uname,
    bug: state.bugItem.bug
});

export default connect(mapStateToProps)(BugItem);