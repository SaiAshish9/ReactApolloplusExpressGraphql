import React,{useState,useRef,useEffect} from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';
import ReactTooltip from 'react-tooltip';

import getHeatMapData from '../../constants/heatmapData'

import Wrapper from '../Wrapper/Wrapper'

import './dashboard.css'

import {Spinner} from 'react-bootstrap'

import * as d3 from 'd3'



const {select, axisBottom, axisRight, scaleLinear, scaleBand }=d3



const INDIA_TOPO_JSON = require('../../constants/india.topo.json');

const PROJECTION_CONFIG = {
  scale: 350,
  center: [78.9629, 22.5937] //  [East Latitude, North Longitude]
};



const COLOR_RANGE = [
    '#ffedea',
    '#ffcec5',
    '#ffcec5',
    '#ffad9f',
    '#ff8a75',
    '#ff8a75',
    '#ff8a75',
    '#ff5533',
    '#e2492d',
    '#be3d26',
    '#9a311f',
    '#782618'
  ];
  
  const DEFAULT_COLOR = '#EEE';
  

  
const geographyStyle = {
    default: {
      outline: 'none'
    },
    hover: {
      fill: '#ccc',
      transition: 'all 250ms',
      outline: 'none'
    },
    pressed: {
      outline: 'none'
    }
  };


const Dashboard = ({total,discharged,death}) => {



  const circleData=[

    { 
    color:'#F65061',
    data:total,
    desc:'Confirmed'
    },
    {
    color:'#FFE046',
    data:total-discharged-death,
    desc:'Active'
    },
    {
    color:'#64EBEC',
    data:discharged,
    desc:'Recovered'
    },
    { 
    color:'#7E8F89',
    data:death,
    desc:'Deceased'
    }
    
    ]


const stateData=[

{
  data:'total'
},

{
  data:'active'
},
{
  data:'discharged'
},
{
  data:'death'
}

]

  const svgRef=useRef()

    const [tooltipContent, setTooltipContent] = useState('');
    const [data, setData] = useState(getHeatMapData);
  
    const [hover,isHovered] = useState(false)
   
const [hoveredState,setHoveredState] = useState('')


const [stats,setStats]=useState([])

const [data1,setData1] = useState([])
    
    const colorScale = scaleQuantile()
      .domain(data.map(d => d.value))
      .range(COLOR_RANGE);
  
    const onMouseEnter = (geo, current = { value: 'NA' }) => {
      return () => {

        if(stats.filter(x=>x.state==geo.properties.name).length>0){
          setTooltipContent(`${geo.properties.name}: ${stats.filter(x=>x.state==geo.properties.name)[0].total}`);
          isHovered(true)
        }else{
          setTooltipContent(`${geo.properties.name}`);
        }
        
        
        setHoveredState(geo.properties.name)
        setData1([
          stats.filter(x=>x.state==geo.properties.name)[0].total,
          stats.filter(x=>x.state==geo.properties.name)[0].discharged,
          stats.filter(x=>x.state==geo.properties.name)[0].death,
          stats.filter(x=>x.state==geo.properties.name)[0].total-stats.filter(x=>x.state==geo.properties.name)[0].discharged-stats.filter(x=>x.state==geo.properties.name)[0].death
        ])
      };
    };
  
    const onMouseLeave = () => {
      setTooltipContent('');
      isHovered(false)
setData1([])
    };





useEffect(()=>{


  const req={


    query:`
    query
    {
      
      stats {
        sno
        state
        total
        discharged
        death
      }

    }
    `
    
    }

    
      fetch('/graphql',{
        method: 'POST',
        body: JSON.stringify(req),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res=>res.json())
      .then(data=>{
        setStats(data.data.stats)



// console.log(data.data.stats)

      })
      .catch(err=>console.log(err))
      
    

},[])


    useEffect(() => {
      const svg = select(svgRef.current);
      const xScale = scaleBand()
        .domain(data1.map((value, index) => index))
        .range([0, 400])
        .padding(0.3);
    
      const yScale = scaleLinear()
        .domain([0, 150])
        .range([150, 0]);
    
      const colorScale = scaleLinear()
        .domain([30, 70, 130])
        .range(["#d8ebb5", "#639a67", "#2b580c"])
        .clamp(true);
    
      const xAxis = axisBottom(xScale)
                   .ticks(data1.length)
                   .tickFormat(index=>index+1)
    
      svg
        .select(".x-axis")
        .style("transform", "translateY(150px)")
        .call(xAxis);
    
      const yAxis = axisRight(yScale)
    
    
      svg
          .select(".y-axis")
          .style("transform", "translateX(300px)")
          .call(yAxis);
    
      svg
        .selectAll(".bar")
        .data(data1)
        .join("rect")
        .attr("class", "bar")
        .style("transform", "scale(1, -1)")
        .attr("x", (value, index) => xScale(index))
        .attr("y", -150)
        .attr("width", xScale.bandwidth())
        .transition()
        .duration(1000)
        .attr("fill", colorScale)
        .attr("height", value => 150 - yScale(value));
    }, [data1]);








    return (

 <Wrapper>
     <div style={{minHeight:'30vh',background:'white'}}>



<div style={{padding:3,marginTop:-10,marginBottom:10,textAlign:'center',width:'100%',height:'4vh',background:'#3e8a50'}} >


<h6 style={{color:'white',fontWeight:'bold',margin:'auto'}} >
Your Safety is in Your Hands. Stay At Home
</h6>


</div>



<div className='container' style={{height:'30vh',width:'100%'}}  >


<div style={{paddingTop:'5vh',maxWidth:'65%',display:'flex',justifyContent:'space-around',flexWrap:'wrap',  alignItems:'center',marginLeft:'15%'}} >


{

  circleData.map((data,key)=>(
<div key={key} style={{margin:'auto',marginRight:5}}>
{/* <div  className='circle123'  style={{ width:100,height:100, borderTop:`5px solid ${data.color}`, borderBottom:`5px solid ${data.color}`, borderRadius:'50%'}} >
</div> */}

<Spinner animation="border"   style={{color:`${data.color}`,height:'80px',width:'80px'}} />


<h6 style={{  position:'relative',bottom:'6.8vh', color:`${data.color}`,fontWeight:'bolder',textAlign:'center'}} >

{data.data}

</h6>


<h6 style={{ color:'black',fontWeight:'bold',textAlign:'center'}}>
{data.desc}
</h6>

</div>
  ))

}



</div>

</div>



</div>





<div   >





     <div className="row" style={{minHeight:'100vh',background:'white',marginTop:'10vh'}}>




     <div className="col-md-6" style={{margin:'auto',paddingTop:50,alignItems:'center'}}>


<ReactTooltip>
        {tooltipContent}
        </ReactTooltip>
   
        <ComposableMap
          projectionConfig={PROJECTION_CONFIG}
          projection="geoMercator"
          width={300}
          height={220}
          data-tip=""
        >
          <Geographies geography={INDIA_TOPO_JSON}>
            {({ geographies }) =>
              geographies.map(geo => {
                const current = data.find(s => s.id === geo.id);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={current ? colorScale(current.value) : DEFAULT_COLOR}
                    style={geographyStyle}
                    onMouseEnter={onMouseEnter(geo, current)}
                    onMouseLeave={onMouseLeave}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>



</div>




<div className="col-md-6" style={{padding:'5%',margin:'auto'}}>

<table class="table table-striped table-sm" style={{ margin:'auto'}} >
  <thead >
    <tr >
      <th scope="col" style={{fontSize:'15px',margin:'auto'}}>Name of State / UT</th>
      <th scope="col" style={{fontSize:'15px'}} >Total</th>
      <th scope="col" style={{fontSize:'15px'}} >Discharged</th>
      <th scope="col" style={{fontSize:'15px'}} >Death</th>

    </tr>
  </thead>
  <tbody>
    {
      stats.sort((a,b)=>b.total-a.total).map((data,key)=>{
        return (
<tr key={key}>
        <td style={{fontSize:'15px'}} ><h6>{data.state}</h6></td>
        <td style={{fontSize:'15px'}} ><h6>{data.total}</h6></td>
        <td style={{fontSize:'15px'}} ><h6>{data.discharged}</h6></td>
        <td style={{fontSize:'15px'}} ><h6>{data.death}</h6></td>

    </tr>
        )
      })
    }
    
   
  </tbody>
</table>

</div>
</div>


<div className="row" style={{width: '100%',minHeight: '30vh',background:'white'}}>



<div className="col-md-6"   > 

<p style={{textAlign:'center',color:'#F65061',fontWeight:'bold'}}>
  Hover over the state
</p>

<div className='row' style={{margin:'auto', width:'60%',display:'flex',justifyContent:'space-between',textAlign:'center'}} >


{
  circleData.map((data,i)=>(
<div className='col-md-3'  key={i}  style={{textAlign:'center', borderRadius:20, width:'40%', minWidth:'40%', height:'12vh', marginTop:20,marginBottom:20, background:`${data.color}`}} >

{
  hover && (
    <div>

<h4 style={{fontWeight:'bold',color:'white',marginTop:'3vh',}}>

{
stats.filter(x=>x.state==hoveredState)[0][stateData[i].data]?stats.filter(x=>x.state==hoveredState)[0][stateData[i].data]:stats.filter(x=>x.state==hoveredState)[0].total-stats.filter(x=>x.state==hoveredState)[0].discharged-stats.filter(x=>x.state==hoveredState)[0].death


}

</h4>
<p style={{textAlign:'center',fontWeight:'bold',color:'white'}}>
{data.desc}
</p>
</div>

  )
}




</div>
  ))
}





</div>





</div>

<div className="col-md-6" > 


<p style={{textAlign:'center',color:'#F65061',fontWeight:'bold'}}>

Trends

</p>


<div style={{width: '100%',padding:40,textAlign:'center'}} > 


<svg ref={svgRef}>
            <g className="x-axis" />
            <g className="y-axis" />
          </svg>

</div>


</div>




</div>






     </div>
 </Wrapper>


    )
}

export default Dashboard
