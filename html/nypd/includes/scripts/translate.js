var translationCookie = 'nypd_language_preference'; // This is the name of the cookie that is used.

function setLanguage(theLanguage){
	SetCookie(translationCookie,theLanguage); // TL
	SetCookie("googtrans","/en/"+theLanguage);
	hideTranslate();
	window.location.reload();
}

function showTranslate(){
	document.getElementById("shim").style.height=document.getElementById("translate_popup").offsetHeight;
	document.getElementById("shim").style.width=document.getElementById("translate_popup").offsetWidth;
	document.getElementById("translate_popup").style.top = 356;
	document.getElementById("translate_popup").style.visibility = "visible";
	document.getElementById("shim").style.top = document.getElementById("translate_popup").style.top;
	document.getElementById("shim").style.visibility = "visible";
}

function hideTranslate(){
	document.getElementById("translate_popup").style.visibility = "hidden";
	document.getElementById("shim").style.visibility = "hidden";
}


function resetLang() {
	DeleteCookie(translationCookie);
	fireEvent(document.getElementById(":2.container").contentWindow.document.getElementById(":2.close"),"click");
	window.location.reload();
}

function checkLanguage(){
	var theLang=GetCookie(translationCookie);
	if(theLang!=null&&theLang.length>0){
		if(theLang.toLowerCase()!="en"){
/*			document.getElementById("altnav").style.display = "";
			document.getElementById("mainnav").style.display = "none";
			document.getElementById("english_button").style.display='';
			document.getElementById("translate_button").style.display = 'none';*/
		}
	}
}

function addLoadEvent(func) { 
	var oldonload = window.onload; 
	if (typeof window.onload != 'function') { 
		window.onload = func; 
	} else { 
		window.onload = function() { 
			if (oldonload) { 
				oldonload(); 
			} 
			func(); 
		} 
	} 
} 
addLoadEvent(checkLanguage);