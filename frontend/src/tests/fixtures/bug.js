import comments from './comments';

export default {
    id: 1,
    title: 'Bug title',
    description: 'Bug description',
    on_project: 1,
    active: true,
    classification: 'medium',
    user: {
        username: 'admin',
        id: 1
    },
    users_with: ['admin', '1'],
    admins: ['admin', '1'],
    time: 'now',
    comments: [comments[0]]
}