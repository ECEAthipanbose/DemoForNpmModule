

    import{Customer} from './Customer';
    import {resultsetMetadata}from '../DbHelper/DbQueryController';
     let customerobj=new Customer();
 	  async function  viewCustomerDetail(accountno:number):Promise<void>
	  {   
	      const query="SELECT customer_id,account_details.acc_type_id,account_no,acc_type,status"
	      		+ " FROM account_details INNER JOIN account_type ON account_details.acc_type_id=account_type.acc_type_id WHERE account_no="+accountno+";";
        const arrayresult:(string|number)[]=await resultsetMetadata(query);
	  	if(arrayresult.length>0)
	  	{   
            customerobj.cus_id=Number(arrayresult[0]);
            customerobj.acc_type_id=Number(arrayresult[1]);
	  	    console.log("Account no          : \t"+arrayresult[2]);
	  		console.log("Account Type        : \t"+arrayresult[3]);
	  		console.log("STATUS              : \t"+arrayresult[4]);
	  	}
	  	if(customerobj.acc_type_id===1)
	  	{ 
              await viewSavingAccount_Customer(arrayresult);
	  	}
	  	else if(customerobj.acc_type_id===2)
	  	{  
              await viewCurrentAccount_Customer(arrayresult);
	  	}
	  }
	  
	  async function  viewSavingAccount_Customer(arrayresult:any):Promise<void> 
	  {   
	  	  let query="SELECT customer_type,customer_name,gender,date_of_birth,customer_email,contact_no,"
	  			+ "customer_address,adharcard_no,city,district,state FROM personaltypecustomer_details INNER JOIN customerdetail ON "
	  			+ "customerdetail.customer_id=personaltypecustomer_details.customer_id"
	  			+ " WHERE customerdetail.customer_id="+customerobj.cus_id+";";
          arrayresult=await resultsetMetadata(query);
	  	if( arrayresult.length>0 )
	  	{
	  	
                customerobj.customertype=arrayresult[0];
                customerobj.status='active';
                customerobj.customerName=arrayresult[1];
                customerobj.gender=arrayresult[2];
                customerobj.dateOfBirth=arrayresult[3];
                customerobj.emailid=arrayresult[4];
                customerobj.mobileno=arrayresult[5];
                customerobj.address=arrayresult[6];
                customerobj.adhar_no=arrayresult[7];
                customerobj.city=arrayresult[8];
                customerobj.district=arrayresult[9];
                customerobj.state=arrayresult[10];
                console.log(customerobj.toString());
	  	    	console.log(customerobj.personalTypeString());
	  	}
	  	
	  }
	  
	  //view CurrentAccount CustomerDetails
	  async function viewCurrentAccount_Customer(arrayresult:any):Promise<void> 
	  {    
	       let query="SELECT customer_type,customer_name,nature_of_buisness,company_pan_no,company_email,contact_no,company_address,city,district,state"
	       		+ "  FROM companytypecustomer INNER JOIN customerdetail ON "
				+ "customerdetail.customer_id=companytypecustomer.customer_id"
				+ " WHERE customerdetail.customer_id="+customerobj.cus_id+";";
	        arrayresult=await resultsetMetadata(query);
		     if( arrayresult.length>0 )
		     {      customerobj.customertype=arrayresult[0];
                     customerobj.status='active';
		    	     customerobj.customerName=arrayresult[1];
		    	    customerobj.nature_of_buisness=arrayresult[2];
		    	    customerobj.pan_no=arrayresult[3];
		    	    customerobj.emailid=arrayresult[4];
		    	
                    customerobj.mobileno=arrayresult[5];
                    customerobj.address=arrayresult[6];
		    	 
                    customerobj.city=arrayresult[7];
                    customerobj.district=arrayresult[8];
                    customerobj.state=arrayresult[9];
	
                    console.log(customerobj.toString());
	  	    	    console.log(customerobj.companyTypeString());
		     }	
	  }
      export{viewCustomerDetail,viewSavingAccount_Customer,viewCurrentAccount_Customer};
