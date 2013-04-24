

	var cookieName = "activeCSS";
	
	var expDate = new Date();
	expDate.setTime(expDate.getTime()+365*24*60*60*1000);  // one year; 
	var prevCSS = "";
	
	function getCookie(nName){
  		
		var cookieStr = document.cookie;	
		var startSlice = cookieStr.indexOf(nName+"=");
		if (startSlice == -1)
			{
			 return false;
			}
		var endSlice = cookieStr.indexOf(";",startSlice+1)
		if (endSlice == -1)
			{
			 endSlice = cookieStr.length;
			}
		return cookieStr.substring(startSlice,endSlice).replace(/^.+\=/,"");		
	}

	function setCookie(nName,nValue,dExpires){       
		           			 
		document.cookie = nName+ "=" + nValue + ";expires= " + dExpires.toGMTString() +";path=/";
	}
	
	function swapCSS(currBtn,nBtn){

		if (currBtn >= 0)
			{
			 var currCSS = currBtn;
			}	
		else	{
			 for (i=0; i<nBtn.length; i++)
				{
			 	 if (currBtn == nBtn[i])
					{
				 	 var currCSS = i;
					}
				}
			}
		prevCSS != "" ?  document.styleSheets[prevCSS].disabled = true : null;
		document.styleSheets[currCSS].disabled = false;			
		prevCSS = currCSS;
		setCookie(cookieName,currCSS,expDate)
	}
	
	function init(){
		
		var nSheets = document.styleSheets;
		for (i=0; i<nSheets.length; i++)
			{
			 document.styleSheets[i].disabled = true;
			}
		var nBtn = [];	
		if (getCookie(cookieName))
			{
			 swapCSS(getCookie(cookieName),nBtn);			
			}			
		var sheetIndex = [];
		for (i=0; i<nSheets.length; i++)
			{ 
			 sheetIndex[sheetIndex.length] = i;
			}
		var nInput = document.forms['swapCSS'].getElementsByTagName('input');		
		for (i=0; i<nInput.length; i++)
			{
			 if (nInput[i].type == "button")
				{
				 nBtn[nBtn.length] = nInput[i];
				 nInput[i].onclick = function()
					{
					 swapCSS(this,nBtn);					 
					}				
				}			
			}	
	}

	navigator.appName == "Microsoft Internet Explorer" ? attachEvent('onload', init, false) : addEventListener('load', init, false);	
