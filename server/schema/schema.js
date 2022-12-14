import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";


//client type
import Project from "../models/Project.js";
import Client from "../models/Client.js";
//
const ClientType=new GraphQLObjectType({
    name:'Client',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        email:{type:GraphQLString},
        phone:{type:GraphQLString},

    })
})
const ProjectType=new GraphQLObjectType({
    name:'Project',
    fields:()=>({
        id:{type:GraphQLID},
        clientId:{type:GraphQLString},
        description:{type:GraphQLString},
        status:{type:GraphQLString},
        client:{type:ClientType,
        resolve(parent,args){
            return Client.findById(parent.clientId)
        }
        }

    })
})

const RootQuery= new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        projects:{
            type:new GraphQLList(ProjectType),
            resolve(){
              return  Project.find();
            }

        },
        project:{
            type: ProjectType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return Project.findById(args.id)
            }
        },
        clients:{
            type:new GraphQLList(ClientType),
            resolve(parent, args){
                return Client.find();
            }
        },
        client:{
            type:ClientType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return Client.findById(args.id);
            }
        }
    }
})
const GraphQlSchemaConstant=new GraphQLSchema({
    query:RootQuery
})
export default   GraphQlSchemaConstant