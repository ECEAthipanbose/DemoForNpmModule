
 	let  allow:boolean;
	
	function checkMobileNumberCorrect( mobileno:number):boolean
	{   allow=true;
			if(mobileno>=6000000000 && mobileno<=9999999999) 
			{
				allow=false;
			}
			else {console.log("enter the valid Mobile Number"); }
			return allow;
	}
	function checkDateOfBirthFormat( date:string):boolean
		{
			allow=true;
			const arr:string[]=date.split("");
			if(arr[4]==='-' && arr[7]==='-'&&(arr.length===10) )
			{
				allow=false;
			}
			else {console.log("\t<<<<enter the date of birth in this Format(YYYY-MM-DD)>>>>"); 
				}
			return allow;
	}
	
	function checkGender(gender:string):boolean
	{
		allow=true;
		const gen=gender.toLowerCase();
		if(gen==='male' || gen==="female" || gen==="transgender")
		{
			allow=false;
		}
		else { console.log("\t<<< Gender Is Not Valid >>>"); }
		return allow;
	}

    export {checkMobileNumberCorrect,checkDateOfBirthFormat,checkGender};
   

