import React,{useEffect,useState} from 'react';
import './App.css';

import { Query,Mutation,useMutation } from 'react-apollo'

import {gql} from 'apollo-boost'


import Dashboard from './pages/dashboard/dashboard'


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
  
<React.Fragment >


<Query query={GET_STATS}>


{({data})=>{

 console.log(data)


return ( !data? 
    (<p>loading...</p>): 
 (
<div style={{overflow: 'hidden',width:'100vw'}}>
<Dashboard
 total={data.totalStats[0].total}
 death={data.totalStats[0].death}
 discharged={data.totalStats[0].discharged}
 />
</div>
    ) 

 )
 }} 

 </Query> 




</React.Fragment>

    
      )

}


export default App;
