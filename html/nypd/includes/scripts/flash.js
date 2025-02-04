﻿// -----------------------------------------------------------------------------
// Globals
// Major version of Flash required
var requiredMajorVersion = 8;
// Minor version of Flash required
var requiredMinorVersion = 0;
// Revision of Flash required
var requiredRevision = 0;
// the version of javascript supported
var jsVersion = 1.0;
// -----------------------------------------------------------------------------

var isIE  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;
jsVersion = 1.1;
// JavaScript helper required to detect Flash Player PlugIn version information
function JSGetSwfVer(i){
	// NS/Opera version >= 3 check for Flash plugin in plugin array
	if (navigator.plugins != null && navigator.plugins.length > 0) {
		if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
			var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
      		var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;
			descArray = flashDescription.split(" ");
			tempArrayMajor = descArray[2].split(".");
			versionMajor = tempArrayMajor[0];
			versionMinor = tempArrayMajor[1];
			if ( descArray[3] != "" ) {
				tempArrayMinor = descArray[3].split("r");
			} else {
				tempArrayMinor = descArray[4].split("r");
			}
      		versionRevision = tempArrayMinor[1] > 0 ? tempArrayMinor[1] : 0;
            flashVer = versionMajor + "." + versionMinor + "." + versionRevision;
      	} else {
			flashVer = -1;
		}
	}
	// MSN/WebTV 2.6 supports Flash 4
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;
	// WebTV 2.5 supports Flash 3
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;
	// older WebTV supports Flash 2
	else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;
	// Can't detect in all other cases
	else {
		
		flashVer = -1;
	}
	return flashVer;
} 
// If called with no parameters this function returns a floating point value 
// which should be the version of the Flash Player or 0.0 
// ex: Flash Player 7r14 returns 7.14
// If called with reqMajorVer, reqMinorVer, reqRevision returns true if that version or greater is available
function DetectFlashVer(reqMajorVer, reqMinorVer, reqRevision) 
{
 	reqVer = parseFloat(reqMajorVer + "." + reqRevision);
   	// loop backwards through the versions until we find the newest version	
	for (i=25;i>0;i--) {	
		if (isIE && isWin && !isOpera) {
			versionStr = VBGetSwfVer(i);
		} else {
			versionStr = JSGetSwfVer(i);		
		}
		if (versionStr == -1 ) { 
			return false;
		} else if (versionStr != 0) {
			if(isIE && isWin && !isOpera) {
				tempArray         = versionStr.split(" ");
				tempString        = tempArray[1];
				versionArray      = tempString .split(",");				
			} else {
				versionArray      = versionStr.split(".");
			}
			versionMajor      = versionArray[0];
			versionMinor      = versionArray[1];
			versionRevision   = versionArray[2];
			
			versionString     = versionMajor + "." + versionRevision;   // 7.0r24 == 7.24
			versionNum        = parseFloat(versionString);
        	// is the major.revision >= requested major.revision AND the minor version >= requested minor
			if ( (versionMajor > reqMajorVer) && (versionNum >= reqVer) ) {
				return true;
			} else {
				return ((versionNum >= reqVer && versionMinor >= reqMinorVer) ? true : false );	
			}
		}
	}	
	return (reqVer ? false : 0.0);
}

function writeFlashContent() {
  //document.write("<object classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\" codebase=\"http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0\" width=\"" + width + "\" height=\"" + height + "\" id=\"" + id + "\" align=\"middle\">");
  //document.write("<param name=\"allowScriptAccess\" value=\"sameDomain\" />");
  //document.write("<param name=\"movie\" value=\"" + path + "\" /><param name=\"quality\" value=\"high\" /><param name=\"bgcolor\" value=\"" + bgcolor + "\" /><embed src=\"" + path + "\" quality=\"high\" bgcolor=\"" + bgcolor + "\" width=\"" + width + "\" height=\"" + height + "\" name=\"" + id + "\" align=\"middle\" allowScriptAccess=\"sameDomain\" type=\"application/x-shockwave-flash\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" />");
  //document.write("</object>");
	if((flashVarsParam==undefined)) {
		flashVarsParam = "";
	}
	if((flashVarsParam==undefined)) {
		flashVarsEmbed = "";
	}
	var oeTags = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'
    + 'width="' + width + '" height="' + height + '"'
    + 'codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab">'
    + '<param name="movie" value="' + path + '" /><param name="quality" value="high" /><param name="bgcolor" value="#ffffff" />'
		+ flashVarsParam
    + '<embed src="' + path + '" quality="high" bgcolor="#ffffff" '
    + ' width="' + width + '" height="' + height + '" name="' + name + '" align="middle"'
    + ' play="true" '
		+ ' ' + flashVarsEmbed
    + ' loop="false"'
    + ' quality="high"'
    + ' allowScriptAccess="sameDomain"'
    + ' type="application/x-shockwave-flash"'
    + ' pluginspage="http://www.macromedia.com/go/getflashplayer">'
    + '<\/embed>'
    + '<\/object>';
		//document.write(oeTags);
		dispFeature.innerHTML = oeTags;
}


var hasRightVersion = DetectFlashVer(requiredMajorVersion, requiredMinorVersion, requiredRevision);
if(hasRightVersion) {  // if we've detected an acceptable version
	writeFlashContent();
} else {
	var alternateContent = 'This content requires the Macromedia Flash Player (Version 8). <a href=http://www.macromedia.com/go/getflash/>Get Flash</a>';
	//document.write(alternateContent);
	dispFeature.innerHTML = alternateContent;
}
