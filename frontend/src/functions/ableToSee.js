const ableToSee = (listName, name) => {
    if (!listName.include(name)) {
        return true;
    }

    return false;
};