class AuthStorage {

    setToken(token: string) {
        if (token) {
            window.localStorage.setItem("_token", token)
        }
    }

    getToken() {
        return window.localStorage.getItem("_token")
    }

    removeToken() {
        window.localStorage.removeItem("_token")
    }

    setClient(id: string) {
        if (id) {
            window.localStorage.setItem("_client", id)
        }
    }

    getClient() {
        return window.localStorage.getItem("_client")
    }

    setTimescale(timescale: string) {
        if (timescale) {
            window.localStorage.setItem("_timescale", timescale)
        }
    }

    getTimescale() {
        return window.localStorage.getItem("_timescale")
    }

    removeTimescale() {
        window.localStorage.removeItem("_timescale")
    }

    setErrorMessage(message: string) {
        if (message) {
            window.localStorage.setItem("_m", message)
        }
    }

    getErrorMessage() {
        return window.localStorage.getItem("_m")
    }

    removeErrorMessage() {
        window.localStorage.removeItem("_m")
    }

}

export const WinStorage = new AuthStorage()
