// Set Text Filter
export const setTextFilter = (text = '') => ({
    type: 'SET_FILTER',
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