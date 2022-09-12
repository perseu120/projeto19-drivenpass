import Cryptr from "cryptr";
import { findTitleByUser, insertCredential } from "../repositories/credentialsRepository";


export async function createCredentialService(title: string, url: string, userName: string, password: string, userId:number){

    const result = await findTitleByUser(title, userId);
   
    if (result.length!==0) {
      throw {code:'Conflict'}
    }
  
    const cryptr = new Cryptr('secretKey');
    const encryptPassword= cryptr.encrypt(password);
  
    const data={
      title, 
      url,
      userName,
      password: encryptPassword,
      userId
    }
    
    insertCredential(data);
   
}