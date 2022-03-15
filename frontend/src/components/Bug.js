import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { startSetBug } from "../actions/bug";

import BugItem from './BugItem';

const Bug = ({ startSetBug }) => {
    const params = useParams();

    const [ableToSee, setAbleToSee] = useState(false);
    const [notFound, setNotFound] = useState('');

    useEffect(() => {
        startSetBug(params.pid, params.bid)
        .then((result) => {
            setNotFound('');

            if (result.message) {
                setNotFound(result.message);
            };
        })
        .then(() => setAbleToSee(true));
    }, [params])


    if (notFound) {
        return <div>Bug Not Found! -- {notFound}</div>;
    };

    return (
        <div>
            <p>{params.bid}</p>
            <p>{params.pid}</p>
            {
                ableToSee ?
                <div><BugItem /></div> :
                <div>You're not able to see this project</div>
            }
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    startSetBug: (pid, bid) => dispatch(startSetBug(pid, bid))
});

export default connect(undefined, mapDispatchToProps)(Bug);