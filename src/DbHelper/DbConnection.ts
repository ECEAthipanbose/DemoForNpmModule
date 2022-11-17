
import {Pool} from 'pg';

const credential={
  user: 'postgres',
  host: 'localhost',
  database: 'bankaccountmanagement',
  password: 'athipan-16010',
  port:5432,
};

 export const pool = new Pool(credential);
 export function closeConnection():void
 {
     pool.end();
     console.log("ThankYou!!");
 }
