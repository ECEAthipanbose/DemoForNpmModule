
import{pool} from './DbConnection';
import {PoolClient, QueryResult } from 'pg';
 export  async function executeQuery(query:string,values?:string[]|number[])
{
        const client: PoolClient = await pool.connect();
 
  try 
   {
       if(values===undefined)
       { const res:QueryResult=  await client.query(query);
       }
       else
       { const res:QueryResult=await client.query(query,values);
       } 
   }
catch (err) 
{console.log(err);
}
 finally {
        client.release();
    }
}

export async function resultsetMetadata(query:string)
{   
    const client: PoolClient = await pool.connect();
    let arr:string[]=[];
    let count=0;
    let transferArray:(string|number)[]=[];    
  try
  {
    const res:QueryResult=await client.query(query)

    arr=res.fields.map(field =>field.name); // ['first_name', 'last_name']
	let resultobject=res.rows;
    let count=resultobject.length-1;
    for(let j=0;j<=count;j++)
    {
     for(let i=0;i<arr.length;i++)
    {
        let tempobj=resultobject[j];
            transferArray.push(tempobj[arr[i]]);
     }
    }
  }
  catch(err)
  {
      console.log(err);
      
  }
   finally {
        client.release();
    }
   return transferArray;
}
