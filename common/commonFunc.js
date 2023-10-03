

exports.isJuminNo = (no)=>{
    var tot = 0;
    var add = '234567892345';

    if (!/^\d{6}[12340]\d{6}$/.test(no)) {
        return false;
    }

    for (var i = 0; i < 12; i++) {
        tot = tot + parseInt(no.substr(i, 1)) * parseInt(add.substr(i, 1));
    }

    tot = 11 - (tot % 11);

    if (tot == 10) {
        tot = 0;
    } else if (tot == 11) {
        tot = 1;
    }

    if (parseInt(no.substr(12, 1)) != tot) {
        return false;
    }

    return true;
}

exports.base64Encoding=(text)=>{
    var base64EncodedText = Buffer.from(text,"utf8").toString('base64');
    return base64EncodedText;
}

exports.base64decoding=(text)=>{
    var base64EncodedText = Buffer.from(text, "base64").toString('utf8');
    return base64EncodedText;
}


exports.cookieParser=(res)=>{
    var cookies = "";
    if(res.headers['set-cookie']){
        var cookieArr = res.headers['set-cookie'];
        for(var i =0; i<cookieArr.length; i++){
            cookies+=cookieArr[i].substring(0, cookieArr[i].indexOf(";"))+"; "
        }    
    }

    return cookies;
}
exports.cookieRefresh=(oldCookies, newCookies)=>{
    const oldCookiesArr = oldCookies.split(";");
    const newCookieArr = newCookies.split(";");
    const result = {};  

    for(var i=0; i<oldCookiesArr.length-1; i++){
        const cookieName = oldCookiesArr[i].substring(0, oldCookiesArr[i].indexOf("="));
        const cookieVal = oldCookiesArr[i].substring(oldCookiesArr[i].indexOf("=")+1);
        result[cookieName] = cookieVal+";"
    }


    for(var i=0; i<newCookieArr.length-1; i++){
        const cookieName = newCookieArr[i].substring(0, newCookieArr[i].indexOf("="));
        const cookieVal = newCookieArr[i].substring(newCookieArr[i].indexOf("=")+1);
        result[cookieName] = cookieVal+";"
    }
    
    let cookieResult = "";
    for(key in result){
        cookieResult += key+"="+result[key]
    }

    return cookieResult;
}

exports.sliceFunc=(htmlData, prefix, suffix)=>{
    
    let temp = htmlData.substring(htmlData.indexOf(prefix)+prefix.length);
    const result= temp.substring(0,temp.indexOf(suffix));

    return result;
}



exports.unicodeToString = (strTemp, strValue1, strValue2)=>{ 

    while(1){

        if( strTemp.indexOf(strValue1) != -1 )

            strTemp = strTemp.replace(strValue1, strValue2);

        else

            break;

    }

    return unescape(strTemp);

}

  
exports.decodeUnicode = (unicodeString)=>{
    var r = /\\u([\d\w]{4})/gi;
	unicodeString = unicodeString.replace(r, function (match, grp) {
	    return String.fromCharCode(parseInt(grp, 16)); } );
	return unescape(unicodeString);
}

exports.charToUnicode = function(str) {
    if (!str) return false; // Escaping if not exist
    var unicode = '';
    for (var i = 0, l = str.length; i < l; i++) {
      unicode += '\\' + str[i].charCodeAt(0).toString(16);
    };
    return unicode;
  }

