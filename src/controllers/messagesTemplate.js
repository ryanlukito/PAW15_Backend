export const wrongPwdLogin = (username, role, statusCode=401) => {
    return {
        statusCode: statusCode,
        username: username,
        role: role,
        payload: "password is not true",
    }
}

export const userNotFound = (username, role, statusCode=404) => {
    return {
        statusCode: statusCode,
        username: username,
        role: role,
        payload: "user is not found",
    }
}

export const productNotFound = (product, owner, statusCode=404) => {
    return {
        statusCode: statusCode,
        prodName: product,
        owner: owner,
        payload: "product is not found",
    }
}

export const forbiden = (msg, statusCode=403) => {
    return {
        statusCode: statusCode,
        payload: msg,
        // lupa mau nambahin apa
    }
}

export const failedToRegister = (msg="gagal membuat akun", statusCode=400) => {
    return {
        statusCode: statusCode,
        payload: msg,
    }
}