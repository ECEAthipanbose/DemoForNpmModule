import prompt from 'prompt-sync'; 
import {userSignUp} from '../Service/UserSignUp';
import {signInOption} from'../Service/UserSignIn';


export async function user():Promise<void>
{ 
	let flag=true;
  while(flag)
		{
		console.log("\t\t <<<<<<<<<USER PAGE>>>>>>>>>>>>\n");
		console.log("(SIGN UP)                      \tPRESS------> 1\n");
		console.log("(SIGN IN)                      \tPRESS------> 2\n");
		console.log("LOGOUT                         \tPRESS------> 3\n");
        const PROMPT=prompt();
		let selection =PROMPT('enter your choic ! : ');
		switch(selection)
		{
		case "1": 
		    await userSignUp();
		    break;
		case "2":
			 await signInOption();
		    break; 
		case "3":
		    flag=false;
			console.log("\"\\t<<<<<THANK YOU !  MEET YOU NEXT TIME\\t>>>>> \"");
			break;
		default :
			console.log("Invalid input ");
			break;
		}
	  }
}