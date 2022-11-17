
 import {BankProcess} from './BankProcess';
 import { executeQuery,resultsetMetadata } from '../DbHelper/DbQueryController';
 import prompt from 'prompt-sync';
 let PROMPT=prompt();
export class CurrentAccount extends BankProcess
 {
 	private static  currentAcc_DepositLimit:number;
 	private static  currentAcc_WithdrawLimit:number;
	
	constructor()
	{
		super();
		CurrentAccount.currentAcc_DepositLimit=100000;
		CurrentAccount.currentAcc_WithdrawLimit=50000;
	}
	
    	//depositProcess
 	async deposit(accountno:number):Promise<void> 
	{  
		console.log("ACCOUNT NO :    "+accountno);
		const depositAmount=Number(PROMPT("enter the deposit amount : "));
		if(await this.checkDepositLimit(depositAmount,accountno))
		{
		    await this.checkMyBalance(accountno);
		    this.current_balance=this.current_balance+depositAmount;
		   
		    const query="INSERT INTO customer_statement(account_no,deposit,current_balance)"
					+ "VALUES("+accountno+","+depositAmount+","+this.current_balance+");";
		  
		   await executeQuery(query);
		   console.log("\t<<<<<<AFTER DEPOSIT :"+depositAmount+">>>>>>\t");
		   await this.checkMyBalance(accountno);
		   
		}
		else
		{
			console.log("\tTotal Amount Of Today You Deposit :"+this.todayDep_Amount);
			console.log("\t<<<<<<Transaction Denied !,You reach the Today deposit limit"+CurrentAccount.currentAcc_DepositLimit+">>>>>\t");
		}	
	}
	
// 	//withdraw process
	async withdraw(accountno:number):Promise<void>   //money withdraw
	{
		console.log("ACCOUNT NO :    "+accountno);
		
        const withdrawAmount=Number(PROMPT("enter the WithDraw Amount  :  ")); 
		if(await this.checkWithdrawLimit(withdrawAmount,accountno))
		{
		    await this.checkMyBalance(accountno);
		    if(withdrawAmount<=this.current_balance)
		    {
		       this.current_balance=this.current_balance-withdrawAmount;
		       const query="INSERT INTO customer_statement(account_no,withdraw,current_balance)"
					+ "VALUES("+accountno+","+withdrawAmount+","+this.current_balance+");";
		       
		       await executeQuery(query);
				console.log("AFTER WITHDRAWN  :"+withdrawAmount+">>>>>>\t");
				await this.checkMyBalance(accountno);
			}
		    else
			  {console.log("------NOT ENOUGH MONEY! N YOUR ACCOUNT------");
			  }
		}
		else
		{
			console.log("\tTotal Amount Of Today You withdrawn :"+this.todayWith_Amount);
			console.log("\t<<<<<< Transaction denied !,You reach the Today Withdraw limit"+CurrentAccount.currentAcc_WithdrawLimit+">>>>>\t");
        }
		 
 	}
	
// 	//checking depositLimit
	async checkDepositLimit( depositAmount:number, accountno:number):Promise<boolean>
	{
		let allow=true;
		const query="SELECT SUM(deposit) FROM customer_statement "
					+ "Where account_no="+ accountno+" And date='"+this.getDate()+"'  GROUP BY  account_no, date;";
	     const arrayresult:(string|number)[]=await resultsetMetadata(query);
        if(arrayresult.length>0)
	    { 
	    	this.todayDep_Amount=Number((arrayresult[0]));
	    	if((this.todayDep_Amount+depositAmount)>CurrentAccount.currentAcc_DepositLimit)
	       { 
	    	   allow=false;
	       }     
		}   
        else if(arrayresult.length<=0)
	    {   
	    	if(depositAmount > CurrentAccount.currentAcc_DepositLimit) {
	    	allow=false;}
	    }
		return allow;
	}
	

	//checking withdrawLimit
	async checkWithdrawLimit( withdrawAmount:number,accountno:number):Promise<boolean>
	{
		let Allow=true;
		const query="SELECT  SUM(withdraw) FROM customer_statement "
				+ "Where account_no="+ accountno+" And date='"+this.getDate()+"'  GROUP BY  account_no, date;";
        const arrayresult:(string|number)[]=await resultsetMetadata(query);
	    if(arrayresult.length>0)
	    {   this.todayWith_Amount=Number((arrayresult[0]));
	    	if((this.todayWith_Amount+withdrawAmount) > CurrentAccount.currentAcc_WithdrawLimit)
	       {   Allow=false;
	       }     
		}
	    else if(arrayresult.length<=0)
	    {  if(withdrawAmount > CurrentAccount.currentAcc_WithdrawLimit) {
	    	Allow=false;}
	    }
	   
		return Allow;
	}
}