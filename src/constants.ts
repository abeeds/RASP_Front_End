export const BACKEND_URL = import.meta.env.VITE_URL_PRE;
export const ADMIN_KEY = 'avespaisnotamotorcycle'

// ENDPOINTS

export const GET_FORMS = BACKEND_URL + "/get_forms";
export const UPDATE_PASS = BACKEND_URL + "/update_password";

export const BAN = BACKEND_URL + "/ban/"; // username
export const DEACTIVATE = BACKEND_URL + "/deactivate/";
export const GET_USERS = BACKEND_URL + "/get_users";
export const LOGIN = BACKEND_URL + "/login/"; // name/password
export const REGISTER = BACKEND_URL + "/register/" // name/password

export const GET_CHATROOMS = BACKEND_URL + "/get_chatrooms";
export const INSERT_CHATROOM = BACKEND_URL + "/insert_chatroom";
export const UPDATE_CHATROOM_DESC = BACKEND_URL + "/update_chatroom_desc";

export const MSG_URL = BACKEND_URL + "/messages";

export const WIPE_COLLECTION = BACKEND_URL + "/wipe/";
