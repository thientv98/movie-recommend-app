import { gql } from "@apollo/client";

export const CREATE_USER = gql`mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(input: $createUserInput) {
      _id
      avatar
      name
    }
  }`;

export const USER_LOGIN = gql`mutation Mutation($loginInput: LoginInput!) {
  login(input: $loginInput) {
    accessToken
    _id
    avatar
    email
    name
  }
}`;

export const USER_ME = gql`query Me {
  me {
    _id
    avatar
    email
    name
  }
}`