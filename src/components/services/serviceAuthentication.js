import serviceAPI from "./serviceApi";
import { redirect } from "./serviceRedirect";

import { BASE_URL, SESSION_ID } from "../../constants";

class ServiceAuthentication {
    constructor() {
        this.apiService = new serviceAPI();
    }

    isAuthenticated() {
        const sessionId = sessionStorage.getItem(SESSION_ID);
        if (sessionId) {
            return true;
        } else {
            return false;
        }
    }

    logIn(data, errorCallback) {
        const url = `${BASE_URL}/login`;

        this.apiService.postToAPI(url, data, responseData => {
            sessionStorage.setItem(SESSION_ID, responseData.sessionId);
            redirect("/");
        }, error => errorCallback(error));
    }

    logOut() {
        sessionStorage.clear();
        redirect("/");
    }

    register(data, errorCallback) {
        const url = `${BASE_URL}/register`;

        this.apiService.postToAPI(url, data, responseData => {
            redirect("/");
        }, error => errorCallback(error));
    }
}

export default ServiceAuthentication;