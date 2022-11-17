
import{BankProcess} from'./BankProcess';
import prompt from 'prompt-sync';
import { executeQuery,resultsetMetadata } from '../DbHelper/DbQueryController';
let PROMPT=prompt();
export class SavingAccount extends BankProcess
{
	private static savingAcc_DepositLimit:number;
	private  static savingAcc_WithdrawLimit:number;
	constructor()
	{   super();
		SavingAccount.savingAcc_DepositLimit=50000;
		SavingAccount.savingAcc_WithdrawLimit=25000;
	}
	
	//deposit process
	async deposit(accountno:number):Promise<void>
	{  
			console.log("ACCOUNT NO :    "+accountno);
            const depositAmount:number=Number(PROMPT("enter the deposit amount  :  "));
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
				console.log("Total Amount Of Today You Deposit :"+this.todayDep_Amount+"");
				console.log("\t<<<<<<Transaction Denied You reach the Today deposit limit"+SavingAccount.savingAcc_DepositLimit+">>>>>\t");
			}
	}
	
	//withdraw Process
     async withdraw(accountno:number):Promise<void>   
	{
		console.log("ACCOUNT NO :    "+accountno );
        const withdrawAmount:number=Number(PROMPT("enter the WithDraw Amount : "));
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
			console.log("\t<<<<<<Transaction Denied You reach the Today Withdraw limit"+SavingAccount.savingAcc_WithdrawLimit+">>>>>\t");
		}
	}
	
	//checking deposit Limit
	 async checkDepositLimit( depositAmount:number,accountno:number ):Promise<boolean>
	{
		let allow=true;
	    const  query="SELECT SUM(deposit) FROM customer_statement "
					+ "Where account_no="+ accountno +" And date='"+this.getDate()+"'  GROUP BY  account_no, date;";
        const arrayresult:(string|number)[]=await resultsetMetadata(query);
	        if(arrayresult.length>0)
	        {
		    this.todayDep_Amount=Number((arrayresult[0]));
		    if((this.todayDep_Amount+depositAmount)>SavingAccount.savingAcc_DepositLimit)
		    { 
		    	   allow=false;
		    }  
	        }
		    else if(arrayresult.length<=0)
		    {   
		    	if(depositAmount > SavingAccount.savingAcc_DepositLimit) {
		    	allow=false;}
		    }
		return allow;
	}

	//checking withdraw Limit
	 async checkWithdrawLimit( withdrawAmount:number,accountno:number):Promise<boolean>
	{
		let Allow=true;
		const query="SELECT SUM(withdraw) FROM customer_statement "
				+ "Where account_no="+ accountno+" And date='"+this.getDate()+"'  GROUP BY  account_no, date;";
		const arrayresult:(string|number)[]=await resultsetMetadata(query);
		//todayWith_Amount=Double.parseDouble(al.get(0));
	    if( arrayresult.length>0 )
	    {   
			this.todayWith_Amount=Number(arrayresult[0]);
	    	if((this.todayWith_Amount+withdrawAmount) > SavingAccount.savingAcc_WithdrawLimit)
	       	{  
	    	   Allow=false;
	       	}     
		}
	    else if(arrayresult.length<=0)
	    {  if(withdrawAmount > SavingAccount.savingAcc_WithdrawLimit) {
	    	Allow=false;}
        }
		return Allow;
	}		
}
