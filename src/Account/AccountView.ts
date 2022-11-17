

import {resultsetMetadata} from '../DbHelper/DbQueryController';
	export async function  showingAccountStatement(accountno:number):Promise<void>  //Showing AccountStatement
	{
		      const query="SELECT date,account_no,deposit,withdraw FROM customer_statement WHERE account_no="+accountno+";";
		     const arrayresult=await resultsetMetadata(query);
		      if(arrayresult.length>0)
		      {   let count=-1;
                    while(count<(arrayresult.length-1)) //<12
		          {  
                    console.log("\t\t<<<<<<<< DATE :"+arrayresult[++count]+" >>>>>>>>");//0 4 8
				    console.log("\t\tAccount No       :"+arrayresult[++count]);//1 5 9 
				    console.log("\t\tDEPOSIT AMOUNT   :"+arrayresult[++count]);//2 6 10
				    console.log("\t\tWITHDRAW AMOUNT  :"+arrayresult[++count]);//3 7 11
				    console.log("\n");
		          }
		      }
		      else
		      { console.log("Transaction did not Take Place !"); }
		     
	 }