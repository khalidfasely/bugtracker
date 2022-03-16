import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Comment from "./Comment";

const BugItem = ({uname, bug, comments}) => {
    console.log(bug, comments);
    return (
        <>
            {
                bug?.users_with?.includes(uname) ?
                <div>
                    **** bug <br /><h1>{bug.title}</h1>
                    **** comments {comments?.map(comment => <Comment comment={comment} />)}
                </div> :
                <div>Not able to see this bug! <Link to="/new">Create one!</Link></div>
            }
        </>
    );
}

const mapStateToProps = (state) => ({
    uname: state.auth.uname,
    bug: state.bugItem.bug,
    comments: state.bugItem.comments
});

export default connect(mapStateToProps)(BugItem);