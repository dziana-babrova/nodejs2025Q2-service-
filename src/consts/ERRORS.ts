export const ERRORS = {
  NOT_FOUND: (entity: string) => `${entity} not found`,
  INCORRECT_PASSWORD: () => 'Password is incorrect',
  NOT_UUID: () => 'Id is not valid',
  UNPRROCESSABLE_ENTITY: (entity: string) => `${entity} does not exist`,
};
