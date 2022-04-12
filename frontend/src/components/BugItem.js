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
        <div>
            {
                bug?.users_with?.includes(uname) ?
                <div>
                    <div className="bug-infos">
                        <BugData bug={bug} />
                        {
                            uname===bug.user.username &&
                            <div className="bug-buttons">
                                <button onClick={() => setEditModalOpen(true)}>Edit</button>
                                <button onClick={() => setDelModalOpen(true)}>Delete</button>
                            </div>
                        }
                    </div>
                    <NewComment bugId={bug.id} />
                    {
                        comments.length > 0 ?
                        comments?.map(comment => (
                            <div key={comment.id}><Comment comment={comment} /></div>
                        )) :
                        <div className="bug-empty"><p>No comments now!</p></div>
                    }
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
        </div>
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