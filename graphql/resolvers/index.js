
let arr=[]
let total=[]

const {scrape,scrapeTotal}=require('../helpers/scrape')


const rootResolvers={

stats:async ()=>{
const arr=  await scrape()
return arr
},

totalStats:async ()=>{
    const total=  await scrapeTotal()
    return total
    },

insertStats: async args=>{

  arr.push({state:args.statInput.state,total:args.statInput.total,discharged:args.statInput.discharged,death:args.statInput.death,_id:arr.length})

return arr

},

clearStats: async ()=>{
    arr=[]

    return arr

}

  }

module.exports=rootResolvers

