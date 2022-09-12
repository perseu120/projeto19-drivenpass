import client from "../database";

export async function findTitleByUser(title:string, userId:number) {

    const result = await client.credentials.findMany({
        where:{
         userId, title
        }
       })
       
    return result;
}

export async function insertCredential(data){
    const result = await client.credentials.create({
     data
    })
    
    return result;
  }