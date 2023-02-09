export function authenticate() {
    return localStorage.getItem("jwt_token") != null;
}

export function deleteToken() {
    localStorage.removeItem("jwt_token");
}
