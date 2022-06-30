export default (bugs, text = '', sortBy = 'priority') => {
    //let highs = [];
    //let mediums = [];
    //let lows = [];

    //for (let i = 0; i < bugs.length; i++) {
    //    if (bugs[i].classification === 'high') {
    //        highs.push(bugs[i]);
    //    }
    //    if (bugs[i].classification === 'medium') {
    //        mediums.push(bugs[i]);
    //    }
    //    if (bugs[i].classification === 'low') {
    //        lows.push(bugs[i]);
    //    }
    //}

    return bugs.filter(bug => {
        return bug.title.toLowerCase().includes(text.toLowerCase());
    }).sort((a, b) => {
        if (sortBy === 'priority') {
            if (a.classification === 'high') {
                return -1;
            }
            if (a.classification === 'medium') {
                return b.classification === 'high' ? 1 : -1;
            }
            if (a.classification === 'low') {
                return 1;
            }
            //return 1;//
        }
    });

    //return [...highs, ...mediums, ...lows]
};