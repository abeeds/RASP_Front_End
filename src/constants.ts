export const BACKEND_URL = import.meta.env.VITE_URL_PRE;
export const ADMIN_KEY = 'avespaisnotamotorcycle'

// ENDPOINTS

export const GET_FORMS = BACKEND_URL + "/get_forms";
export const UPDATE_PASS = BACKEND_URL + "/update_password";

export const BAN = BACKEND_URL + "/users/ban/"; // username
export const DEACTIVATE = BACKEND_URL + "/users/deactivate/";
export const GET_USERS = BACKEND_URL + "/users";
export const LOGIN = BACKEND_URL + "/users/login/"; // name/password
export const REGISTER = BACKEND_URL + "/users/register/" // name/password

export const CHATROOMS_URL = BACKEND_URL + "/chatrooms";
export const MSG_URL = BACKEND_URL + "/messages";

export const FETCH_FORM = BACKEND_URL + "/forms/"; // form_name
export const WIPE_COLLECTION = BACKEND_URL + "/wipe/";
