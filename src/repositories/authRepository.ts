import client from "../database";

export interface User {
  id: number;
  email: string;
  senha: string;
}

export type UserInsertData = Omit<User, "id">;


// export type CardUpdateData = Partial<Card>;

export async function insertUser(user: UserInsertData){

  await client.users.create({
    data: {
        email: user.email,
        senha: user.senha
    }
  });
}

export async function findEmail(email:string) {
  const isEmail = await client.users.findMany({
    where: {
        email
    }
  })

  if(isEmail.length > 0){
    
      throw { 
          code: 'Conflict'
      }

  }
}

export async function findPassword(email:string) {
  const senha = await client.users.findMany({
    where: {
        email
    }
  })

  if(!senha){
    throw {
      code: 'NotFound'
    }
  }

  return senha[0].senha;

}
// export default async function findById(id: number) {
//   const result = await connection.query<Card, [number]>(
//     "SELECT * FROM cards WHERE id=$1",
//     [id]
//   );

//   return result.rows[0];
// }

// export async function findByTypeAndEmployeeId(
//   type: TransactionTypes,
//   employeeId: number
// ) {
//   const result = await connection.query<Card, [TransactionTypes, number]>(
//     `SELECT * FROM cards WHERE type=$1 AND "employeeId"=$2`,
//     [type, employeeId]
//   );

//   return result.rows[0];
// }

// export async function findByCardDetails(
//   number: string,
//   cardholderName: string,
//   expirationDate: string
// ) {
//   const result = await connection.query<Card, [string, string, string]>(
//     ` SELECT 
//         * 
//       FROM cards 
//       WHERE number=$1 AND "cardholderName"=$2 AND "expirationDate"=$3`,
//     [number, cardholderName, expirationDate]
//   );

//   return result.rows[0];
// }

// export async function insert(cardData: CardInsertData) {
//   const {
//     employeeId,
//     number,
//     cardholderName,
//     securityCode,
//     expirationDate,
//     password,
//     isVirtual,
//     originalCardId,
//     isBlocked,
//     type,
//   } = cardData;

//   connection.query(
//     `
//     INSERT INTO cards ("employeeId", number, "cardholderName", "securityCode",
//       "expirationDate", password, "isVirtual", "originalCardId", "isBlocked", type)
//     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
//   `,
//     [
//       employeeId,
//       number,
//       cardholderName,
//       securityCode,
//       expirationDate,
//       password,
//       isVirtual,
//       originalCardId,
//       isBlocked,
//       type,
//     ]
//   );
// }

// export async function update(id: number, cardData: CardUpdateData) {
//   const { objectColumns: cardColumns, objectValues: cardValues } =
//     mapObjectToUpdateQuery({
//       object: cardData,
//       offset: 2,
//     });

//   connection.query(
//     `
//     UPDATE cards
//       SET ${cardColumns}
//     WHERE $1=id
//   `,
//     [id, ...cardValues]
//   );
// }

// export async function remove(id: number) {
//   connection.query<any, [number]>("DELETE FROM cards WHERE id=$1", [id]);
// }
