import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from "apollo-boost"
import 'cross-fetch/polyfill';

const httpLink = new HttpLink({ uri: "https://api.yelp.com/v3/graphql" })

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token =
    "WipzKR3FbdOYwddxs5J0YqWmGOakwWKJCXW20_5eeWiLAbBpeEjVhj5yOv7ZsP6YTx3XiO9CLwhgHAkoYndfjw7obb_0GC7yBX0bFxMgfg_3qAANT_Hd50Wb8WCxXXYx"

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: `Bearer ${token}`
    }
  })

  // Call the next link in the middleware chain.
  return forward(operation)
})

export default new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})
