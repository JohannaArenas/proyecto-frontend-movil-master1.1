
export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}

//validacion de password:  ^(?=.*\d)(?=.*[A-Z]).{8,}$

export function validatePassword(password) {
    const re = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;
    return re.test(password)
}