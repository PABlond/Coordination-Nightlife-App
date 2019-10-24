import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from "apollo-boost"
import "cross-fetch/polyfill"

const httpLink = new HttpLink({ uri: "https://api.yelp.com/v3/graphql" })

const authLink = new ApolloLink((operation, forward) => {
  const { YELP_TOKEN: authorization } = process.env

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization
    }
  })

  // Call the next link in the middleware chain.
  return forward(operation)
})

export default new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})
