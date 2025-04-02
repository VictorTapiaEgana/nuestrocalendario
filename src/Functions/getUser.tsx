// import sql from "../assets/utils/DbConnect";
// import { userLoginProps } from "../types/type";

// export default async function getUSer({correo, contrasena}:userLoginProps){

//     const data = await sql`SELECT email, password, nombre FROM usuarios WHERE email = ${correo}`;        

//     if(!data || data.length < 1) {        
//         return null
//     }    

//     if (data[0].password !== contrasena){        
//         return null
//     }

//     return data[0]    

// }