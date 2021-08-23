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

    setLocalTime(payload: { date: string, time: string }) {
        if (payload) {
            window.localStorage.setItem("_d", payload.date)
            window.localStorage.setItem("_t", payload.time)
        }
    }

    getLocalTime() {
        const date = window.localStorage.getItem("_d")
        const time = window.localStorage.getItem("_t")
        return {date, time}
    }

    removeLocalTime() {
        window.localStorage.removeItem("_d")
        window.localStorage.removeItem("_t")
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
