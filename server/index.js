import mongoose from "mongoose";
import colors from 'colors'
import express from "express";
import { config } from "dotenv";
import {graphqlHTTP} from 'express-graphql'
import schema from './schema/schema.js'
import {ConnectDb} from './config/DB.js'
config('./env')
const port =process.env.PORT || 5000;
const app=express()
//connect to db
ConnectDb()
app.use('/graphql', graphqlHTTP({
 schema,
 graphiql:process.env.NODE_ENV==='development'
}))
app.listen(port,console.log('server running on port '+port))
