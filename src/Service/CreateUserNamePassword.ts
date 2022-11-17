import prompt from 'prompt-sync';
import {executeQuery}from'../DbHelper/DbQueryController';
import{checkCustomer_AlreadySignIn,checkCustomer_AccountNo}from './Checking';
const PROMPT=prompt();

export async  function  createUserNamePassword()
{

        let query:string;
		console.log("\t<<<<CREATE USERNAME PASSWORD >>>>");
		let username:string=PROMPT('enter the user name : ');
		let password:string=PROMPT("enter the password : ");
		let acc_no:number=Number(PROMPT("enter the account number : "));
 		if(await checkCustomer_AlreadySignIn(acc_no))                 //checking already sign in or not
		{
			  if(await checkCustomer_AccountNo(acc_no))           //checking account no in bank if not sign in
			    {  
					query = "INSERT INTO customer_login(cus_user_name,cus_password,account_no)"
			         		+ "VALUES('"+username+"','"+password+"',"+acc_no+");";
			          
						await executeQuery(query);
				    	console.log("\t------------------ CREATE USER NAME PASSWOR SUCESSFULLY-------------");  	
		        }
		        else
		        {
					console.log("Wrong Account no");
		        } 
			 
		}
}