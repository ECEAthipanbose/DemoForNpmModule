
import * as dbtable from './DbHelper/TableCreationInDb';
import{closeConnection} from './DbHelper/DbConnection';
import prompt from 'prompt-sync';
import {user} from './Service/User';
import {ManagerLogin} from './Service/ManagerLogin';
import {checkManager_UserNamePass} from'./Service/Checking';
async function start()
{
        const PROMPT=prompt();
        let flag:boolean=true;
        await dbtable.createDbTableTrigger();//ct.createTableForPboi_Bank();

 		while(flag) {
 		console.log("----------------------------WELCOME TO Pboi Srivilliputtur Branch-----------------------------");
 		console.log("\t USER            \tPRESS--------> 1\n");
 		console.log("\t BANK MANAGER    \tPRESS--------> 2\n");
 		console.log("\t EXIT            \tPRESS--------> 0\n");
        let selection =PROMPT('enter your choice  :');//String selection =in.next();
    	switch(selection)
		{
		case "1":
		    console.log("yes");
 		    await user();
			break;
		case "2": 
		    let ml=new ManagerLogin(); 
			if(await checkManager_UserNamePass(ml.managerUserName,ml.managerPassword))
			{
			   await ml.bankManagerOption();
			}
			else {
				console.log("UN AUTHENTICATED PERSON (USERNAME PASSWORD IS INVALID");
			}
 			break;
		case "0":
 			flag=false;
			closeConnection();
			break;
 		default:
			console.log("Invalid Selection");
			break;
			}
		} 
}
start();
