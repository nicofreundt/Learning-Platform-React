
export var authenticated = false;

class Auth {
    constructor() {

        this.state = {
            user: {}
        }
    }

    login(cb, username, password) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ username, password })
        }

        const res = fetch('/users', requestOptions).then(res => res.json())

        res.then((result) => {
            if(result.status) {
                authenticated = result.status;
                localStorage.setItem('user', result.username);
            } else {
                authenticated = false;
                alert("Falsche Eingabe!")
            }
            cb();
        })
    }

    signup(cb, username, password, mail) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ username, password, mail })
        }

        const res = fetch('/users/new', requestOptions).then(res => res.json())

        res.then((result) => {
            if(result.status === 200) {
                console.log('Alles in Ordnung');
            } else {
                console.log(`Error: ${result.message}`);
            }
            cb();
        })
    }

    logout(cb) {
        authenticated = false;
        localStorage.clear();
        cb();
    }

    isAuthenticated() {
        return authenticated;
    }
}

export default new Auth();