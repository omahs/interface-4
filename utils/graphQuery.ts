import {
  ApolloClient,
  InMemoryCache,
  gql,
  ApolloQueryResult,
} from "@apollo/client"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

const graphQuery = async (
  tokensQuery: string,
  setData: Dispatch<SetStateAction<ApolloQueryResult<any>>>
) => {
  const APIURL = process.env.NEXT_PUBLIC_THEGRAPH_API_URL

  const client = new ApolloClient({
    uri: APIURL,
    cache: new InMemoryCache(),
  })

  try {
    const query = await client.query({ query: gql(tokensQuery) })
    setData(query)
  } catch (err) {
    console.log("Error fetching data: ", err)
  }
}

const useQuery = (tokensQuery: string) => {
  const [data, setData] = useState(null)
  useEffect(() => {
    graphQuery(tokensQuery, setData)
  }, [])
  return data
}

export default useQuery
