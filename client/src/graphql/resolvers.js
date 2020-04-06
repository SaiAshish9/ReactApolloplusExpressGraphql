import {gql} from 'apollo-boost'

export const typeDefs=gql`

extend type Stats {
    state:String!
    total:Int!
    discharged:Int!
    deaths:Int!
}

extend type TotalStats {
    total:Int!
    discharged:Int!
    deaths:Int!
}

extend type Mutation {
    ClearTotalStats:[TotalStats!]!   
}

`

const GET_STATS=gql`

{
  scrapedData @client
}

`

const GET_TOTAL_STATS=gql`

{
   totalScrapedData @client
}

`

export const resolvers={

   Mutation:{
       clearTotalStats:(_item,{totalStats},{cache})=>{

 const {totalScrapedData} = cache.readQuery({
  
    query:GET_TOTAL_STATS

})

console.log(totalScrapedData)

cache.writeQuery({
    query:GET_TOTAL_STATS,
    data:[]
})

return "cleared"

       }
   }


}
