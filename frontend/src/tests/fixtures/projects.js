export default [
    {
        id: 1,
        user: {
            username: '1',
            id: 2
        },
        users_with: ['1'],
        admins: ['1'],
        time: 'now'
    }, {
        id: 2,
        user: {
            username: 'admin',
            id: 1
        },
        users_with: ['admin', '1'],
        admins: ['admin', '1'],
        time: 'now'
    }
]