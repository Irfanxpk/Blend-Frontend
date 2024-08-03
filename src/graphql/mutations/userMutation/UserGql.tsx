import { gql } from "@apollo/client";

const CREATE_USER = gql`
  mutation createUser(
    $name: String!
    $email: String!
    $password: String!
    $dob: String!
  ) {
    createUser(name: $name, email: $email, password: $password, dob: $dob) {
      token
      user {
        id
        name
      }
      message
    }
  }
`;

const VALIDATE_OTP = gql`
  mutation ValidateOtp($email: String!, $otp: String!, $id: String!) {
    validateOtp(email: $email, otp: $otp, id: $id) {
      token
      user {
        id
        name
      }
      success
    }
  }
`;

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        name
      }
      token
      success
      message
    }
  }
`;

const GOOGLE_LOGIN = gql`
  mutation createUser_google($key: String!) {
    createUser_google(key: $key) {
        user{
            id
            name
        }
    }
  }
`;

const FORGET_PASSWORD = gql`
  mutation forgetPassword($email: String!) {
    forgetPassword(email: $email){
    success
    message
  }}
`;

const CHECK_TOKEN = gql`
  query CheckToken($token: String!) {
    checkToken(token: $token) {
    
        message
        success
        req_id
    }
  }
`;

const RESET_PASSWORD = gql`
  mutation ResetPassword($token: String!, $password: String!) {
    resetPassword(token: $token, password: $password) {
      message
      success
    }
  }
`;



export {
  CREATE_USER,
  VALIDATE_OTP,
  LOGIN_USER,
  GOOGLE_LOGIN,
  FORGET_PASSWORD,
  CHECK_TOKEN,
  RESET_PASSWORD,
};


// username: "irfan", email: "test@gmail.com", password: "12345678" 