import React,{useEffect,useState} from 'react';
import './App.css';

import { Query,Mutation,useMutation } from 'react-apollo'

import {gql} from 'apollo-boost'



function App() {

const GET_STATS= gql`
query
{
  totalStats {
  total
  discharged
  death
}
}
`

const CLEAR_STATS= gql`

mutation {
  clearStats {
    state
  }
}


`

const [clear]=useMutation(CLEAR_STATS)

  return (
  
<React.Fragment>


<Query query={GET_STATS}>


{({data})=>{

console.log(data)


return ( !data?
  (<p>loading...</p>):
( <h1>
   total :  {data.totalStats[0].total} <br/>
  discharged / migrated :  {data.totalStats[0].discharged}<br/>
  death :  {data.totalStats[0].death}<br/>
  Active Cases :  {(parseInt(data.totalStats[0].total))-(data.totalStats[0].discharged)-(data.totalStats[0].death) } 
</h1>
)
)
}}

</Query>

<button onClick={
  ()=>{
  clear()
.then(data=>console.log(data))
}
}>
  clear
</button>


</React.Fragment>

    
      )

}


export default App;
