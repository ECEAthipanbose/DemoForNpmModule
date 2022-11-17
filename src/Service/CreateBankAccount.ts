
import {Customer} from '../Customer/Customer';
import prompt from 'prompt-sync';
import {checkMobileNumberCorrect,checkDateOfBirthFormat,checkGender} from '../Customer/CustomerDetailValidation';
import {executeQuery,resultsetMetadata} from '../DbHelper/DbQueryController';
const PROMPT=prompt();
let custobj:any;
export async function  pboiAccountCreate() 
{  
    let query:string;
    let values:string[]|number[]=[];
    let cus_id:string|number=0;
    let resultarr:(string|number)[]=[]; //ArrayList<String> result;
    	custobj =new Customer();
        getCustomerInput();

		query='INSERT INTO customerdetail(customer_name,customer_type)VALUES($1,$2) RETURNING *';
        values=[custobj.customerName,custobj.customertype];

        await executeQuery(query,values);
	    
 	    query="SELECT customer_id FROM customerdetail ORDER BY customer_id DESC LIMIT 1";
 	    resultarr=await resultsetMetadata(query);
 
		cus_id=resultarr[0];
	    insertDetailByAccountType(cus_id); 


 	    query="SELECT acc_type_id FROM account_type WHERE acc_type='"+custobj.accType+"';";

        resultarr=await resultsetMetadata(query);

		custobj.acc_type_id=resultarr[0];


		query="INSERT INTO account_details(acc_type_id,customer_id,status)VALUES("+custobj.acc_type_id+","+cus_id+",'"+custobj.status+"');";
	    await executeQuery(query);
		await message(cus_id);

}
	
 	async function insertDetailByAccountType( cus_id:number|string)
	{   
		let query:string;
		if(custobj.accType==="saving")
	    {  
	
			query="INSERT INTO personaltypecustomer_details(date_of_birth , gender , customer_address , adharcard_no , customer_email , contact_no , city , district , state ,customer_id)"
					+ "VALUES('"+custobj.dateOfBirth+"','"+custobj.gender+"','"+custobj.address+"',"+custobj.adhar_no+",'"+custobj.emailid+"',"+custobj.mobileno+",'"+custobj.city+"','"+custobj.district+"','"+custobj.state+"',"+cus_id+");";
			await executeQuery(query);
	
	    }
	    else if(custobj.accType==="current")
	    {  query="INSERT INTO companytypecustomer(nature_of_buisness, company_address, company_pan_no , company_email , contact_no , city , district , state ,customer_id)"
				+ "VALUES('"+custobj.nature_of_buisness+"','"+custobj.address+"','"+custobj.pan_no+"','"+custobj.emailid+"',"+custobj.mobileno+",'"+custobj.city+"','"+custobj.district+"','"+custobj.state+"',"+cus_id+");";
	       await executeQuery(query);
	    }
	}
	
    async function getCustomerInput()
    {
      let flag=true;
		while(flag)
		{
		console.log("enter the Account type     :\t\n\t Saving Account  Press---->1\n\t Current Account  Press----->2");
		//int i=Integer.parseInt(br.readLine());
        let choice=PROMPT('enter your choice : ');
		    switch(choice)
			{
			case "2":
				 customerDetails("current");
				 flag=false;
			    break;
			case "1":
				 customerDetails("saving");
				 flag=false;
				break;
			default:
				console.log("Enter the ValiD no:");
				break;
			}
		}
    }

	async function  customerDetails( accountType:string)
	{
		
		if(accountType==="saving")
    	{
            savingCustomerDetails();
    	}
    	else if(accountType==="current")
    	{
    		currentCustomerDetails();
    	}
    }
	async function savingCustomerDetails() 
	{   
        let value:string;
        let flag:boolean=true;
       let input:number=0;
        custobj.customertype="personal"; //setter
        custobj.accType="saving";
		value=PROMPT("enter the name     :\t");
        custobj.customerName=value;
		while(flag)
        {
		
          value=PROMPT("enter the Date Of Birth (YYYY-MM-DD)   :"); 
		  flag=checkDateOfBirthFormat(value);
		}
	
        custobj.dateOfBirth=value;
		flag=true;//reset the flag
		while(flag)
        {
            value=PROMPT("Enter the Gender : ");
		    flag=checkGender(value); 
		}
        custobj.gender=value;
        value=PROMPT("enter the Email Id : ");
	
        custobj.emailid=value;
        input=Number(PROMPT("enter the Adhar No : "));
	
        custobj.adhar_no=input;
		flag=true;//reset the flag
		while(flag)
        {
           input=Number(PROMPT("enter the mobile NUmber : "));
		   flag=checkMobileNumberCorrect(input); 
		}
        custobj.mobileno=input;
	    commonDetails();
	}

	

	async function currentCustomerDetails()
    {
        let input:string | number;
        let flag:boolean=true;
	
        custobj.customertype="company";
        custobj.accType="current";
	
        input=PROMPT("Enter the Name (Company Name or Your Name         :  ");
		
        custobj.customerName=input;
	
        input=PROMPT("enter the company pan no (without gaps)    :  ");
        custobj.pan_no=input;
		
        input=PROMPT("Enter the nature of Buisness (eg:- transportation , retails,jwellery ...)");
        custobj.nature_of_buisness=input;
		
        input=PROMPT("enter the company email :  ");
        custobj.emailid=input;
		while(flag)
        {
	
           input=Number(PROMPT("enter the company mobile Number  :  "));
		   flag=checkMobileNumberCorrect(input); 
		}
        custobj.mobileno=input;
		commonDetails();
	}
	
	async function commonDetails()
	{   
       let input:string;
        input=PROMPT("enter the Addrress   :  ");
        custobj.address=input;
        input=PROMPT("enter the city       :  ");
        custobj.city=input;
        input=PROMPT("enter the District    :  ");
        custobj.district=input;
        input=PROMPT("enter the State        :  ");
        custobj.state=input;
	}
	
	async function message(cus_id:number|string)
	{
	    	let query:string;
            let resultArray:(string|number)[]=[];
	        query=`SELECT * FROM account_details WHERE customer_id=${cus_id};`;
	        resultArray=await resultsetMetadata(query);
			console.log("ACCOUNT NO :"+resultArray[0]);
			query="SELECT * FROM customerdetail WHERE customer_id="+cus_id+";";
			resultArray=await resultsetMetadata(query);
			console.log(" Customer Id :"+resultArray[0]+"\n CUSTOMER NAME :"+resultArray[1]+"\n CUSTOMER TYPE :"+resultArray[2]);	
			
	}
	
