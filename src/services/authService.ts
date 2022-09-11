import dotenv from "dotenv";
import Cryptr from "cryptr";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { findEmail, findPassword, insertUser, UserInsertData } from "../repositories/authRepository";
dotenv.config();

const cryptr = new Cryptr(process.env.CHAVE);


export async function creatUser(user:UserInsertData) {
    const email:string = String(user.email);
    const senha:string = String(user.senha);

    console.log(email);

    await findEmail(email);
    
    const encryptedPassword:string = await encryptPassword(senha);

    const userInsertData:UserInsertData = {email, senha:encryptedPassword}

    await insertUser(userInsertData);

}

function encryptPassword(password: string) {
    const encryptedPassword = bcrypt.hashSync(password, Number(process.env.KEY));
    return encryptedPassword;
}

export async function login(email:string, senha:string){

    const encryptedPassword = await findPassword(email);

    authenticatePassword(senha, encryptedPassword);

    const SECRET: string = process.env.TOKEN_SECRET_KEY ;
    const EXPIRES_IN = process.env.TOKEN_EXPIRES_IN;

    const payload = {
        email,
        senha: encryptedPassword
    };
  
    const jwtConfig = {
        expiresIn: EXPIRES_IN
    };
  
    const token = jwt.sign(payload, SECRET, jwtConfig);

    return token;

}

function authenticatePassword(password: string, encryptedPassword: string) {
    const comparePassword = bcrypt.compareSync(password, encryptedPassword);
    if(!comparePassword){
      throw { code: 'Unauthorized' }
    }
}


// export async function verifyEmployee(employeeId: number){

//     const employee = await findById(employeeId);

//     if(!employee){
//         throw { code:"NotFound" }
//     }

//     return employee;
// }

// export async function verifyEmployeeAndType(type: TransactionTypes, employeeId: number){

//     const typeCard = await findByTypeAndEmployeeId(type, employeeId);
//     console.log(typeCard)
//     if(typeCard){
//         throw { code:"Conflict" }
//     }

// }

// function factoryName(name:string[]){
//     let fullName : string = "";

//     for(let i =0; i< name.length; i++){
        
//         if(i === 0 || i === name.length-1){
//             fullName+= name[i];
//         }
//         else if(name[i].length >=3){
//             fullName+=` ${name[i][0]} `
//         }
//     }

//     return fullName;
// }

// export async function creatCardCard(apiKey: string, type: TransactionTypes, employeeId: number) {

//     await verifyEmployeeAndType(type, employeeId);

//     await verifyApiKey(apiKey);

//     const employee = await verifyEmployee(employeeId);

//     const cardNumber = faker.finance.creditCardNumber('################');
    
//     const cardCVV :string = faker.finance.creditCardCVV();
//     const encryptedCVV = cryptr.encrypt(cardCVV);

//     const dataExpirion = dayjs().add(5, 'year').format("MM/YY");

//     const fullName = employee.fullName;
    
//     const cardholderName = factoryName(fullName.split(" "))

//     const Card:CardInsertData = {

//         employeeId: employeeId,
//         number: cardNumber,
//         cardholderName: cardholderName,
//         securityCode: encryptedCVV,
//         expirationDate: dataExpirion,
//         isVirtual: false,
//         isBlocked: true,
//         type: type

//     }

//     await insert(Card);

// }

// export async function verifyValidateDateCard(expirationDate){
//     const dateDifference = dayjs(expirationDate).diff(dayjs().format('MM/YY'),'month', true);

//     if (dateDifference < 0) {
//         throw  { code: 'Expired'}
//     }
    
//     return false;
// }

// function verifyIfUnlocked(isBlocked: boolean) {
//     if (!isBlocked) {
//       throw { 
//         code: 'Conflict'
//       }
//     }
// }
// function verifyIfBlocked(isBlocked: boolean) {
//     if (isBlocked) {
//       throw { 
//         code: 'Conflict'
//       }
//     }
// }

// export async function  unlockCardService(id: number, password: string){
    
//     const card = await verifyCardExistent(id);
    
//     await verifyValidateDateCard(card.expirationDate);
   
//     verifyIfUnlocked(card.isBlocked);
    
//     authenticatePassword(password, card.password);
    
//     await update(id, {isBlocked: false});
// }

// export async function  blockCardService(id: number, password: string){
    
//     const card = await verifyCardExistent(id);
    
//     await verifyValidateDateCard(card.expirationDate);
   
//     verifyIfBlocked(card.isBlocked);
    
//     authenticatePassword(password, card.password);
    
//     await update(id, {isBlocked: true});
// }



// function verifyCVC(cvc: string, encryptedCVC: string) {
    
//     const decryptedCVC: string = cryptr.decrypt(encryptedCVC);

//     if (!(cvc === decryptedCVC)) {
//       throw  { code: 'BadRequest' }
//     }
//     return false;
// }

// export async function activateCardService(id: number, cvc: string, password: string ){
  
//     const card = await verifyCardExistent(id);
  
//     await verifyValidateDateCard(card.expirationDate);
  
//     if (card.password) {
//       throw { 
//         code: 'Conflict'
//       }
//     }
  
//     verifyCVC(cvc, card.securityCode);
  
//     const encryptedPassword = encryptPassword(password);
  
//     await update(id, {password: encryptedPassword});

// }

// function verifyCardActive(password){

//     if (!password) {
//         throw { 
//           code: 'BadRequest'
//         }
//     }
// }

// export async function rechargeService(id: number, amount: number, apiKey: string){

//     await verifyApiKey(apiKey);
    
//     const card = await verifyCardExistent(id);
    
//     verifyCardActive(card.password);
    
//     await verifyValidateDateCard(card.expirationDate);

//     await insertRecharge({cardId: card.id, amount})
// }