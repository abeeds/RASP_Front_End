let isAdmin: boolean = false;

export const setAdmin = (): void => {
  if ( !isAdmin ) {
    isAdmin = true;
  }
};

export const getAdmin = (): boolean => {
  return isAdmin;
};
