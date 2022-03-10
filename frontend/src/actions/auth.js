import loginApi from '../api/login';
import logoutApi from '../api/logout';
import registerApi from '../api/register';

export const login = ({ uname, uid }) => ({
    type: 'LOGIN',
    uname,
    uid
});

export const startLogin = ({ username, password }) => {
    return (dispatch) => {
        return loginApi({ username, password }).then((result) => {
            console.log(result);
            if (!result.user) {
                return result;
            };

            dispatch(login({
                uname: result.user?.username,
                uid: result.user?.uid
            }));
            
            return result;
        });
    };
};

export const register = ({ uname, uid }) => ({
    type: 'REGISTER',
    uname,
    uid
});

export const startRegister = ({ username, email, password, confirmation }) => {
    return (dispatch) => {
        return registerApi({ username, email, password, confirmation }).then((result) => {
            console.log(result);
            if (!result.user) {
                return result;
            };
            
            dispatch(register({
                uname: result.user?.username,
                uid: result.user?.uid
            }));

            return result;
        });
    };
};

export const logout = () => ({
    type: 'LOGOUT'
});

export const startLogout = () => {
    return (dispatch) => {
        return logoutApi().then((result) => {
            dispatch(logout());
            return result;
        });
    };
};