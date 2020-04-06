const request=require('request-promise'),
      cheerio = require('cheerio'),
      url='https://www.mohfw.gov.in',
      Scrape=require('../../models/scrape'),
      ScrapeTotal=require('../../models/scrapeTotal')

let arr=[]

let total=[]

async function scrape(){
arr=[]
    const htmlRequest= await request.get(url)
    const $=cheerio.load(htmlRequest)
    
    $('.table').find('tr').each(function(x,i){
    
    var y=$(this).find('td')
    
    if(y.eq(0).text().length!=0 && y.eq(4).text().length!=0)
    
    arr.push({
    sno: y.eq(0).text(), 
    state: y.eq(1).text(), 
    total:y.eq(2).text(),
    discharged: y.eq(3).text(),
    death:y.eq(4).text()
    
    })
    
    })

    var x=arr.reduce((acc,next)=>{
        return acc+parseInt(next.total)
    },0)


ScrapeTotal.find({},async (err,result)=>{

if(result[0].total!=x){

await Scrape.deleteMany({})    

await Scrape.insertMany(arr,(err,success)=>{
if(err){
    console.log(err)
}else{
    console.log(success)
}
})
}else{
    console.log('no modification')
}
})
    return arr
        
}
    async function scrapeTotal(){
    
    
        const htmlRequest= await request.get(url)
        const $=cheerio.load(htmlRequest)
       
        total=[]  
    
        $('.table').find('tr').each(function(x,i){
        
        var y=$(this).find('td')
    
        if(y.eq(0).text().length!=0 && y.eq(4).text().length==0&& y.eq(3).text()!=0)
    
        total.push({
            total:y.eq(1).text().split('').filter(x=>x!='*').join(''),
            discharged: y.eq(2).text().trim(),
            death:y.eq(3).text().trim()
        })

        
        })


await ScrapeTotal.find({},async (err,result) => {

if(err){
    console.log(err)
}else{
    if(result[0].total!=total[0].total){

        console.log(result[0].total,total[0].total)

        await ScrapeTotal.deleteMany({})

        const data= new ScrapeTotal({
           total: total[0].total,
           discharged:total[0].discharged,
           death:total[0].death
           })
   
        console.log(data)
   
        await   data.save()
        
        console.log('total stats saved')

    }else{
        console.log("total stats don't changed ")
    }
}


})




        return total
    
    }

exports.scrape=scrape

exports.scrapeTotal=scrapeTotal