import prompt from 'prompt-sync';
import {createUserNamePassword} from './CreateUserNamePassword';
import {pboiAccountCreate} from './CreateBankAccount';
const PROMPT=prompt();

export async function userSignUp():Promise<void> 
{
    let flag=true;
    while(flag)
    {
		console.log("CREATE NEW      PBI ACCOUNT :\t PRESS--------->1");
		console.log("ALREADY HAVE AN PBI ACCOUNT :\t PRESS--------->2");
		console.log("BACK                        :\t PRESS--------->3");
		let choice=PROMPT("enter the your choice : ");
		switch(choice)
        {
            case"1":
               await pboiAccountCreate();
		         await createUserNamePassword();
               break;
            case"2":
               await createUserNamePassword();
               break;
            case"3":
               flag=false;
               break;
            default:
               console.log("Invalid input Try Again!");
               break;
        } 
	 }
	
}