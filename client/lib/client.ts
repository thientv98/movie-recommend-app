"use client"
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

// const httpLink = new HttpLink({ uri: process.env.GRAPHQL_API_URL, });

const httpLink = createHttpLink({
    uri: process.env.GRAPHQL_API_URL,
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    // const token = localStorage.getItem('token');
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTJmZmEwOWRlNGZkNDhkYTNmNGJhNDQiLCJuYW1lIjoiVGhpZW4gVmFuNCIsImVtYWlsIjoidGhpZW40QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJGRnV2NxNmduNVh0dUlLa1B6WnZlL09aTnAzYzBTc1J3Y0dQdDhremkzenQ2V0ZkUXpwbmVPIiwiX192IjowLCJpYXQiOjE2OTc3MjUxOTJ9.U4IYXppqEBU_nUTdVVHk_UdNS4uM9vZRku0dM4NTzSk'

    const token = localStorage?.getItem("accessToken") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTJmZmEwOWRlNGZkNDhkYTNmNGJhNDQiLCJuYW1lIjoiVGhpZW4gVmFuNCIsImVtYWlsIjoidGhpZW40QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJGRnV2NxNmduNVh0dUlLa1B6WnZlL09aTnAzYzBTc1J3Y0dQdDhremkzenQ2V0ZkUXpwbmVPIiwiX192IjowLCJpYXQiOjE2OTc3MjUxOTJ9.U4IYXppqEBU_nUTdVVHk_UdNS4uM9vZRku0dM4NTzSk"

    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    // link: authLink.concat(httpLink), // Chain it with the HttpLink
    link: httpLink
})