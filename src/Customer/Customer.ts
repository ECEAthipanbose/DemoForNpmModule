

export class Customer
{
	private _customerName:string;
    private _dateOfBirth:string;
    private _gender:string;
    private _address:string;
    private _emailid:string;
    private _customertype:string;
    private _city:string;
    private _district:string;
     private _state : string;
    private _status='active';
    private _nature_of_buisness:string;
	private _mobileno:number;
    private _adhar_no:number;
	private  _accType:string;
    private _pan_no:string;
	private  _acc_type_id:number;
    private _cus_id:number;


	    
	    public set customerName(customerName:string)
	    {
	    	this._customerName=customerName;
	    }
	    public set dateOfBirth(dateOfBirth:string)
	    {
	    	this._dateOfBirth=dateOfBirth;
	    }
	    public  set gender(gender:string)
	    {
	    	this._gender=gender;
	    }
	    public set address(address:string)
	    {
	    	this._address=address;
	    }
	    public  set emailid( emailid:string)
	    {
	    	this._emailid=emailid;
	    }
	    public set customertype(customertype:string)
	    {
	    	this._customertype=customertype;
	    }
	    public set city(city:string)
	    {
	    	this._city=city;
	    }
	    public  set state(state:string)
	    {
	    	this._state=state;
	    }
	    public  set district( district)
	    {
	    	this._district=district;
	    }
	    public  set accType(accType:string)
	    {
	    	this._accType=accType;
	    }
	    public set pan_no(pan_no:string)
	    {
	    	this._pan_no=pan_no;
	    }
	    public set status(status:string)
	    {
	    	this._status=status;
	    }
	    public set nature_of_buisness(nature_of_buisness:string)
	    {
	    	this._nature_of_buisness=nature_of_buisness;
	    }
	    public set mobileno( mobileno:number)
	    {
	    	this._mobileno=mobileno;
	    }
	    public  set adhar_no(adhar_no:number)
	    {
	    	this._adhar_no=adhar_no;
	    }
	    public set acc_type_id(acc_type_id:number)
	    {
	    	this._acc_type_id=acc_type_id;
	    }
	    public set cus_id(cus_id:number)
	    {  this._cus_id=cus_id; }
	    
	    //getters
	    public  get customerName():string
	    {
	    	return this._customerName;
	    }
	    public  get dateOfBirth():string
	    {
	       return this._dateOfBirth;
	    }
	    public  get gender():string
	    {
	    	return this._gender;
	    }
	    public  get  address():string
	    {
	    	return this._address;
	    }
	    public  get emailid():string
	    {
	    	return this._emailid;
	    }
	    public  get customertype()
	    {
	    	return this._customertype;
	    }
	    public  get city():string
	    {
	    	return this._city;
	    }
	    public  get state():string
	    {
	    	return this._state;
	    }
	    public get district():string
	    {
	        return this._district;
	    }
	    public  get accType():string
	    {
	    	return this._accType;
	    }
	    public get pan_no():string
	    {
	    	return this._pan_no;
	    }
	    public  get status():string
	    {
	    	return this._status;
	    }
	    public get nature_of_buisness():string
	    {
	        return this._nature_of_buisness;
	    }
	    public get mobileno():number
	    {
	    	return this._mobileno;
	    }
        public get adhar_no():number{
             return this._adhar_no;
               }
        public  get acc_type_id():number{
            return this._acc_type_id;
        }
	    public get cus_id():number{return this._cus_id;} 
	    
		public toString = ()=>
         `Customer Name :${this._customerName}\nCustomer Type :${this._customertype}`;

		 
	     public personalTypeString():string
	    {
	    	return `Date Of Birth :${this._dateOfBirth}\nGender :${this._gender}\nStatus :${this._status}\nEmail :${this._emailid}\nAddress :${this._address
	    			}\nMobile No ${this._mobileno}\ncity :${this._city}\nDistrict :${this._district}\nstate :${this._state}`;
	    }
 	     public companyTypeString():string
	    {
	    	return `Nature of Buisness :${this._nature_of_buisness}\nCompany PanNo:${this._pan_no}\nStatus :${this._status}\nEmail :${this._emailid}\nAddress :${this._address
            }\nMobile No :${this._mobileno}\ncity :${this._city}\nDistrict :${this._district}\nstate :${this._state}`;
	    }
}

