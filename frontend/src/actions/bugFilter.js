// Set Text Filter
export const setTextFilter = (text = '') => ({
    type: 'SET_TEXT',
    text
});

// Sort By Priority
export const sortByPriority = () => ({
    type: 'SORT_BY_PRIORITY'
});

// Sort By Date
export const sortByDefault = () => ({
    type: 'DEFAULT_SORT'
});