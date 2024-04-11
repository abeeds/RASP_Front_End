export const BACKEND_URL = import.meta.env.VITE_URL_PRE;
export const ADMIN_KEY = 'avespaisnotamotorcycle'

// ENDPOINTS
// comments next to endpoints indicate parameters

export const GET_FORMS = BACKEND_URL + "/get_forms";
export const HFORM = BACKEND_URL + "/hform";

export const BAN = BACKEND_URL + "/ban/"; // username
export const DEACTIVATE = BACKEND_URL + "/deactivate/";
export const GET_USERS = BACKEND_URL + "/get_users";
export const LOGIN = BACKEND_URL + "/login/"; // name/password
export const REGISTER = BACKEND_URL + "/register/" // name/password

export const GET_CHATROOMS = BACKEND_URL + "/get_chatrooms";
export const INSERT_CHATROOM = BACKEND_URL + "/insert_chatroom";
export const UPDATE_CHATROOM_DESC = BACKEND_URL + "/update_chatroom_desc";

export const GET_MSGS = BACKEND_URL + "/get_msgs/"; // room_name
export const DELETE_MSG = BACKEND_URL + "/delete_msg/"; // message_id
export const WRITE_MSG = BACKEND_URL + "/write_msg"; 

export const WIPE_COLLECTION = BACKEND_URL + "/wipe/";