require('dotenv').config()

const express=require('express'),
      app=express(),
      bodyParser=require('body-parser'),
      graphqlHttp=require('express-graphql'),
      cors=require('cors'),
      port=process.env.PORT || 3001,
      graphqlSchema=require('./graphql/schema'),
      graphqlResolvers=require('./graphql/resolvers'),
      mongoose=require('mongoose')

mongoose.connect(process.env.MONGO_KEY,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());


app.use('/graphql',graphqlHttp({

    schema:graphqlSchema,
    rootValue:graphqlResolvers,
    graphiql:true

}))

app.get('/',(req,res)=>{
res.redirect('/graphql')
})

app.listen(port,()=>console.log("server started"))