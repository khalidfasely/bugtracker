import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import Comment from "./Comment";
import BugData from "./BugData";
import NewComment from "./NewComment";
import { startSetDeleteBug } from "../actions/project";
import { startSetSelectUsers } from '../actions/selectUsers';
import BugDelModal from "./BugDelModal";
import BugEditModal from "./BugEditModal";

export const BugItem = ({
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
                    <BugData bug={bug} />
                    <hr />
                    {
                        uname===bug.user.username &&
                        <div>
                            <button onClick={() => setDelModalOpen(true)}>Delete</button>
                            <button onClick={() => setEditModalOpen(true)}>Edit</button>
                        </div>
                    }
                    <hr />
                    <NewComment bugId={bug.id} />
                    <hr />
                    {comments?.map(comment => <div key={comment.id}><Comment comment={comment} /></div>)}
                </div> :
                <div>Not able to see this bug! <Link to={`/project/${bug.on_project}`}>Create one!</Link></div>
            }
            <BugDelModal
                delModalOpen={delModalOpen}
                setDelModalOpen={setDelModalOpen}
                deleteBug={deleteBug}
            />
            <BugEditModal
                editModalOpen={editModalOpen}
                setEditModalOpen={setEditModalOpen}
                users={users}
                bug={bug}
            />
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