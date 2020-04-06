const mongoose=require('mongoose')

const Schema=new mongoose.Schema({

total:{
    type:Number,
    required:true
},
discharged:{
    type:Number,
    required:true
},
death:{
    type:Number,
    required:true
}
},{
    timestamps:true
})

module.exports=mongoose.model('ScrapeTotal',Schema)