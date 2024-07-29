import { gql } from "@apollo/client";

const GET_ADMIN = gql`
  query GetAdmin($email: String!, $password: String!) {
    getAdmin(email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
      image
      IsBlocked
    }
  }
`;

export { GET_ADMIN, GET_USERS }