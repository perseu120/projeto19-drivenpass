import Cryptr from "cryptr";
import { findAllCredentials, findOneCredentialsById, findTitleByUser, insertCredential } from "../repositories/credentialsRepository";


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

export async function getAllCredentialService(userId:number) {
    
    const allCredential = await findAllCredentials(userId);
    const credential = allCredential.map((item:any) => {

        const cryptr = new Cryptr('secretKey');
        const decryptedPass = cryptr.decrypt(item.password);
        item["password"] = decryptedPass

        return item;
      });

    return credential;
}

export async function getOneCredentialService(id:number, userId:number ) {

    const credential = await findOneCredentialsById(id);
    
    if(!credential){
    throw {code:'NotFound'}
    }
    if(userId!==credential.userId){
    throw {code:'Unathorized'}
    }
    const cryptr = new Cryptr('secretKey');
    const decryptedPass = cryptr.decrypt(credential.password);
    credential["password"] = decryptedPass ;
        
    return credential
}