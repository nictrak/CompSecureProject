export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { "Authorization": '6NEVebMx6_bULg' + user.token, 'X-Frame-Options': 'sameorigin' };
    } else {
        return {};
    }
}