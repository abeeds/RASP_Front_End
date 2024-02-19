let current_user: string = '';

export const setUser = (newUser: string): void => {
  current_user = newUser;
};

export const getUser = (): string => {
  return current_user;
};
