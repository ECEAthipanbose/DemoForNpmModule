

import {resultsetMetadata,executeQuery} from '../DbHelper/DbQueryController';
    
        let allow:boolean=true;
		let arrayList:(string|number)[]=[];
		let query:string='';
	async function  checkCustomer_AlreadySignIn(accountno:number):Promise<boolean>
	{  
		query="SELECT * FROM customer_login WHERE account_no="+accountno+";";
		arrayList=await resultsetMetadata(query);
		if(arrayList.length>0)
		{   console.log("You are already Sign in");
				allow=false;
		}
		return allow;
	}

	async function checkCustomer_AccountNo(acc_no:number):Promise<boolean>//checking customer Account no
    {
		allow=false;//reset allow
 	    query="SELECT * FROM account_details WHERE account_no="+acc_no+";";
 	    arrayList=await resultsetMetadata(query);
 	    if(arrayList.length>0)
        {   
        		allow=true;
        }
    	return allow;  	
    }
	
	async function checkCustomer_UserNamePass(username:string,password:string):Promise<boolean>
    {
		allow=false;//reset flag..
    	   query="SELECT * FROM customer_login WHERE cus_user_name="
    	   		+ "'"+username +"' AND cus_password='"+password+"';";
    	  arrayList=await resultsetMetadata(query);
    	    if(arrayList.length>0)
           {   
           		allow=true;
           }
    	return allow;
    }
	
	async function checkManager_UserNamePass(username:string,password:string):Promise<boolean>
	{
	   allow=false;//reset allow..
 	    query="SELECT * FROM manager_login WHERE manager_username="
 	   		+ "'"+username+"' AND manager_password='"+password+"';";
 	   arrayList=await resultsetMetadata(query);
 	   if(arrayList.length>0)
 	   {
 		   allow=true;
 	   }
		return allow;		
	}

    export{checkCustomer_AlreadySignIn,checkCustomer_AccountNo,checkCustomer_UserNamePass,checkManager_UserNamePass};

// }