
import {resultsetMetadata} from '../DbHelper/DbQueryController';
export abstract class BankProcess 
{
	private date:string='';
	 current_balance:number=0;
	 todayDep_Amount:number=0;
     todayWith_Amount:number=0; 

    public  setdate()
    { 
        let dt=new Date();
        let todaydate=("0"+dt.getDate()).slice(-2);
        let year=dt.getFullYear();
        let month=("0"+(dt.getMonth()+1)).slice(-2);
        this.date=`${year}-${month}-${todaydate}`;
     }
  
    public  getDate():string
    { return this.date;}
    
    
    //checking balance
  	public async checkMyBalance(accountno:number):Promise<void>   
	{
	    	console.log("ACCOUNT NO :\t"+accountno);
	        const query:string="SELECT current_balance FROM customer_statement WHERE account_no="
	    	+accountno+"ORDER BY statement_id DESC LIMIT 1;";
            const arrayresult:(string|number)[]=await resultsetMetadata(query);
	        if(arrayresult.length>0)
	        {
	        	this.current_balance=Number(arrayresult[0]);
	        	console.log("CURRENT BALANCE :"+this.current_balance);
	        }
	        else
	        {console.log("CURRENT BALANCE :"+this.current_balance);
	        }
	       
	}
  	
  	abstract  deposit(accountno:number):Promise<void>;
  	abstract  withdraw(accountno:number):Promise<void>;
  	abstract checkDepositLimit(depositAmount:number,accountno:number):Promise<boolean>;
  	abstract checkWithdrawLimit( withdrawAmount:number,accountno:number):Promise<boolean>;
}
