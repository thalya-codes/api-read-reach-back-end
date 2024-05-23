export enum ErrorMessagesEnum {
  NOT_FOUNDED = 'Could not possible find the requested resource',
  INVALID_PASSWORD = 'The given password is invalid',
  INVALID_TOKEN = 'The given token is invalid',
  FAIL_TOKEN_GENERATION = 'Fail to generate token',
  INVALID_USER_ID = 'The give id is invalid',
  INVALID_USER_EMAIL = 'The give email is invalid or is no registered',
  SUCCESSFUL_OPERATION = 'Successfull operation',
  NOT_AUTHORIZATED = "You don't have permission to access the requested resource",
  ALREADY_EXISTING_USER = '',
  REQUIRED_REGISTER_FIELDS_NOT_FILLED = "The fields 'name,' 'email,' and 'password' are required. Please confirm if they are filled correctly",
  REQUIRED_READING_FIELDS_NOT_FILLED = "The fields 'title,' 'start_date' , 'end_date' , 'rating' and 'user_id' are required. Please confirm if they are filled correctly",
}
