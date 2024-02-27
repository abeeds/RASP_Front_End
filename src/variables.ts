let current_user: string = '';

export const setUser = (newUser: string): void => {
  current_user = newUser;
};

export const getUser = (): string => {
  return current_user;
};

let current_room: string = '';

export const setRoom = (newRoom: string): void => {
  current_room = newRoom;
};

export const getRoom = (): string => {
  return current_room;
};

let isAdmin: boolean = false;

export const setAdmin = (): void => {
  if ( !isAdmin ) {
    isAdmin = true;
  }
};

export const getAdmin = (): boolean => {
  return isAdmin;
};
