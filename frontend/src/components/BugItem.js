import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import Modal from "react-modal";

import Comment from "./Comment";
import BugData from "./BugData";
import NewBug from "./NewBug";
import NewComment from "./NewComment";
import { startSetDeleteBug } from "../actions/project";
import { startSetSelectUsers } from '../actions/selectUsers';

const BugItem = ({
        uname, bug, comments, startSetDeleteBug,
        users, startSetSelectUsers
    }) => {
    const history = useNavigate();

    const [delModalOpen, setDelModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);

    // Set select users
    useEffect(() => startSetSelectUsers(bug.on_project), []);

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
                            <button onClick={() => setEditModalOpen(true)}>Edit</button>
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
            <Modal
                isOpen={editModalOpen}
                onRequestClose={() => setEditModalOpen(false)}
            >
                <NewBug users={users} isEdit={true} bug={bug} setEditModalOpen={setEditModalOpen} />
            </Modal>
        </>
    );
}

const mapStateToProps = (state) => ({
    uname: state.auth.uname,
    bug: state.bugItem.bug,
    comments: state.bugItem.comments,
    users: state.selectUsers
});

const mapDispatchToProps = (dispatch) => ({
    startSetDeleteBug: (bid) => dispatch(startSetDeleteBug(bid)),
    startSetSelectUsers: (pid) => dispatch(startSetSelectUsers(pid))
});

export default connect(mapStateToProps, mapDispatchToProps)(BugItem);