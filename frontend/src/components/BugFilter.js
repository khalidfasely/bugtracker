import { connect } from "react-redux";
import { setTextFilter, sortByDefault, sortByPriority } from "../actions/bugFilter";

const BugFilter = ({ filters, setTextFilter, sortByDefault, sortByPriority }) => {
    const onSortByChange = (e) => {
        if (e.target.value === 'priority') {
            sortByPriority();
            return;
        };
        sortByDefault();
    };

    return (
        <div className="bugs-filter">
            <div className="input-group__item">
                <input
                    type="text"
                    className="text-input"
                    placeholder="Search bugs"
                    value={filters.text}
                    onChange={(e) => setTextFilter(e.target.value)}
                />
            </div>
            <div className="input-group__item">
                <select
                    className="select"
                    value={filters.sortBy}
                    onChange={onSortByChange}
                >
                    <option value="">Date</option>
                    <option value="priority">Priority</option>
                </select>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    filters: state.bugFilter
});

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByPriority: () => dispatch(sortByPriority()),
    sortByDefault: () => dispatch(sortByDefault())
});

export default connect(mapStateToProps, mapDispatchToProps)(BugFilter);