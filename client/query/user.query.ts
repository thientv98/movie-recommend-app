import { gql } from "@apollo/client";

export const CREATE_USER = gql`mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(input: $createUserInput) {
      _id
      avatar
      name
    }
  }`;