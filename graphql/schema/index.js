const {buildSchema}=require('graphql')


module.exports =buildSchema(`

type Stats{
    sno:ID!
    state:String!
    total:String!
    discharged:String!
    death:String!
}

type TotalStats{
    total:String!
    discharged:String!
    death:String!
}

input StatInput {
    state:String!
    total:String!
    discharged:String!
    death:String!
}


type RootQuery {
    stats:[Stats!]!
    totalStats:[TotalStats!]!
 }

type RootMutation{
    insertStats(statInput:StatInput):[Stats]!
    clearStats:[Stats!]!
}

schema {
    query:RootQuery
    mutation:RootMutation
}



`)