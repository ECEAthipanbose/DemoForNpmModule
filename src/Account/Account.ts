// package com.zoho.pboiBank;

// import java.util.ArrayList;
import {resultsetMetadata} from '../DbHelper/DbQueryController';
export class Account
 {
 	private  _accountno:number;
 	private  _accounttype_id:number;
	
	//setter
	 public  set accountno(accountno:number)
	{
		this._accountno=accountno;
	}
     public  set accounttype_id(accounttype_id:number)
	{
		this._accounttype_id=accounttype_id;
	}

// 	//getters
	public  get accountno()
	{  return this._accountno;
	}
	
	public  get accounttype_id()
	{  return this._accounttype_id;
	}


    public async setAccountNo_AccountTypeId(username:string,password:string):Promise<void>
	{
        
		const query:string="SELECT customer_login.account_no,acc_type_id FROM customer_login  INNER JOIN account_details ON customer_login.account_no=account_details.account_no WHERE cus_user_name='"+
		                 username+"'AND cus_password='"+password+"';";
		 const arrayresult:(string|number)[]=await resultsetMetadata(query);
		  if(arrayresult.length>0)
		  {
			  this._accountno=Number((arrayresult[0]));
			  this._accounttype_id=Number((arrayresult[1]));
		  }
		  else
		  {   
			  console.log("not found");
		  }
	}
 }	