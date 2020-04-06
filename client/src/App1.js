import React,{useEffect,useState} from 'react';
import './App.css';

function App() {

const [data,setData]=useState([])

const req={


query:`
query
{
  totalStats {
  total
  discharged
  death
}
}
`

}


useEffect(()=>{

fetch('/graphql',{
  method: 'POST',
  body: JSON.stringify(req),
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(res=>res.json())
.then(data=>setData(data.data.totalStats))
.catch(err=>console.log(err))


},[])



  return (
    <div className="App">
  
    {
      data.map((d,i)=>(
        <h1 key={i} >
  total :  {d.total.split('').filter(x=>x!='*').join('')} <br/>
  discharged / migrated :  {d.discharged}<br/>
  death :  {d.death}<br/>
  Active Cases :  {(parseInt(d.total))-(d.discharged)-(d.death) }
        </h1> 
      ))

}

<button>
  Clear
</button>

    </div>
  );
}

export default App;
