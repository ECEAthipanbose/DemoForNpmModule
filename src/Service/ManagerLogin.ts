 import prompt from 'prompt-sync';
 import {Account} from '../Account/Account';
 import {checkCustomer_AccountNo} from '../Service/Checking';
 import {viewCustomerDetail} from '../Customer/CustomerView';
 import {showingAccountStatement} from '../Account/AccountView';
 const PROMPT =prompt();
export  class ManagerLogin 
{
	private  _managerUserName:string;
	private  _managerPassword:string;
	
	constructor() 
	{
        this._managerUserName=PROMPT("enter the UserName  :  ");
        this._managerPassword=PROMPT("enter the Password  :  ");
	}
	
//setter

	public  set managerUserName( managerUserName:string)
	{ this._managerUserName=managerUserName; }
	

 	public  set managerPassword( managerPassword:string)
 	{ this._managerPassword=managerPassword; }
	

//getters	

 	public  get managerUserName():string
 	{ return this._managerUserName; }
	
 	public  get managerPassword():string
 	{  return this._managerPassword; }
	

	public  async bankManagerOption()
	{   let flag=true;
	    let account_no=0;
        let accountobj=new Account();
		while(flag)
		{
			console.log("\t\tCustomer  details             \tpress----->1");
			console.log("\t\tCustomer Account Statement    \tpress----->2");
			console.log("\t\tBACK                          \tpress----->0");
			let selection=PROMPT("enter your choice  :  ");
            if(selection !== "0")
			{
            account_no=Number(PROMPT("Enter the Account No  :  "));
			 accountobj.accountno=account_no;//set account no;
			}
			switch(selection)
			{
			 case "1":
				 if(await checkCustomer_AccountNo(accountobj.accountno))
                 {
                    await viewCustomerDetail(accountobj.accountno);   
				 }
				 else { console.log("Account not found"); }
				 break;
			 case "2": 
				 if(await checkCustomer_AccountNo(accountobj.accountno))
				 {  
					 await showingAccountStatement(accountobj.accountno);
				 }
				 else { console.log("Account not found"); }
				  break;
			 case "0":
				 flag=false;
				 break;
			default:
				console.log("INVALID INPUT");
				break;
			}
	    }
	}
}