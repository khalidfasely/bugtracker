import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import Comment from "./Comment";
import BugData from "./BugData";
import NewComment from "./NewComment";
import Modal from "react-modal";
import { useState } from "react";
import { startSetDeleteBug } from "../actions/project";

const BugItem = ({uname, bug, comments, startSetDeleteBug}) => {
    const history = useNavigate();

    const [delModalOpen, setDelModalOpen] = useState(false);

    const deleteBug = () => {
        startSetDeleteBug(bug.id).then(() => {
            history(`/project/${bug.on_project}`);
            setDelModalOpen(false);
        });
    };

    return (
        <>
            {
                bug?.users_with?.includes(uname) ?
                <div>
                    **** bug <br /><BugData bug={bug} />
                    **** {
                        uname===bug.user.username &&
                        <div>
                            <button onClick={() => setDelModalOpen(true)}>Delete</button>
                        </div>
                    }
                    **** New comment <br /><NewComment bugId={bug.id} />
                    **** comments {comments?.map(comment => <Comment comment={comment} />)}
                </div> :
                <div>Not able to see this bug! <Link to="/new">Create one!</Link></div>
            }
            <Modal
                isOpen={delModalOpen}
                onRequestClose={() => setDelModalOpen(false)}
            >
                If you delete this bug there is no way to return it!
                <button onClick={deleteBug}>Delete</button>
            </Modal>
        </>
    );
}

const mapStateToProps = (state) => ({
    uname: state.auth.uname,
    bug: state.bugItem.bug,
    comments: state.bugItem.comments
});

const mapDispatchToProps = (dispatch) => ({
    startSetDeleteBug: (bid) => dispatch(startSetDeleteBug(bid))
});

export default connect(mapStateToProps, mapDispatchToProps)(BugItem);