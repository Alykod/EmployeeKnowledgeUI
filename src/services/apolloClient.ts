import ApolloClient from 'apollo-boost';

export const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ""
      }
    })
  },
  uri: process.env.REACT_APP_API_URL,
});