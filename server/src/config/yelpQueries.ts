import gql from "graphql-tag"

export const searchBusinesses = gql`
  query SearchBusinesses($location: String) {
    search(term: "bars", location: $location, limit: 12) {
      business {
        id
        name
        photos
        location {
          address1
          postal_code
          city
          formatted_address
        }
        hours {
          # open {
          #   is_overnight
          #   end
          #   start
          #   day
          # }
          is_open_now
        }
        coordinates {
          latitude
          longitude
        }
      }
    }
  }
`