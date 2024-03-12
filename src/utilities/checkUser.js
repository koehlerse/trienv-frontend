import jsCookie from "js-cookie";

export function checkUser() {
    return jsCookie.get("trienv_refresh_token") != undefined;
}