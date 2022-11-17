
import prompt from 'prompt-sync';
import {checkCustomer_AlreadySignIn,checkCustomer_AccountNo,checkCustomer_UserNamePass,checkManager_UserNamePass} from './Checking';
import {Account} from '../Account/Account';
import {showingAccountStatement} from '../Account/AccountView';
import {CurrentAccount} from '../Account/CurrentAccount';
import {BankProcess} from '../Account/BankProcess';
import {SavingAccount} from '../Account/SavingAccount';
import {viewCustomerDetail} from'../Customer/CustomerView';
const PROMPT=prompt();


	export async function  signInOption():Promise<void>
	{
		
		let username=PROMPT("enter the UserName  :  ");
        let password=PROMPT("enter the Password  :  ");
		if(await checkCustomer_UserNamePass(username,password))
		{   
		    await BankProcessOption(username,password);
		}
		else
		{  console.log("USER NAME PASSWORD DOENT NOT MATCH");
		}
	}
	

	async function BankProcessOption(username:string, password:string):Promise<void> 
	{   
		let ac=new Account();
		await ac.setAccountNo_AccountTypeId(username, password);
			
		let obj:any=null;
		
        if(ac.accounttype_id==1)
		{  obj=new SavingAccount();
		   obj.setdate();
		}
		else if(ac.accounttype_id==2)
		{	obj=new CurrentAccount();
		    obj.setdate();
		}
		let flag=true;
		while(flag)
		{   console.log("\t\t<<<<SELECT OPTION>>>>\t\t");
			console.log("CHECK BALANCE      :        \tPRESS-------->1");
			console.log("DEPOSIT            :        \tPRESS-------->2");
			console.log("WITHDRAW           :        \tPRESS-------->3");
			console.log("Account Statement  :        \tPRESS-------->4");
			console.log("MY PROFILE         :        \tPRESS-------->5");
			console.log("BACK               :        \tPRESS-------->0");
			let selection = PROMPT("enter your choice !  :  ");
			switch(selection)
			{
			  case "1":
				 await obj.checkMyBalance(ac.accountno);
				  break;
			  case "2":
				  await obj.deposit(ac.accountno);
				  break;
			  case "3":
				  await obj.withdraw(ac.accountno);
				  break;
			  case "4":
				 await showingAccountStatement(ac.accountno);
				  break;
			  case "5":
				   await viewCustomerDetail(ac.accountno);
				  break;
			  case "0":
				  flag=false;
				  break;
			  default:
				  console.log("Ivalid input :");
				  break;
			}
		}
	}
