import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Comment from "./Comment";
import BugData from "./BugData";
import NewComment from "./NewComment";

const BugItem = ({uname, bug, comments}) => {
    return (
        <>
            {
                bug?.users_with?.includes(uname) ?
                <div>
                    **** bug <br /><BugData bug={bug} />
                    **** New comment <br /><NewComment bugId={bug.id} />
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