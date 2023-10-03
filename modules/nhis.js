const axios = require('axios');
const {cookieParser, sliceFunc, base64decoding,base64Encoding, getYYYYMMDDBirth} = require('../common/commonFunc');
const cheerio = require('cheerio');
const { PdfReader } = require("pdfreader");
const {putItem, selectItem} =  require('../dbCrud/DynamoDB_local');

function Nhis(){

    this.TEMPDB = {};
    this.providerMap = {
        "kakao": {
            "id": "kakao_v1.5",
            "provider_id": "kakao",
            "providerName": "카카오톡",
            "name": "카카오",
            "url": "https://k-pki.kakao.com",
            "provider_type": "gov",
            "oper_sort": "prod",
            "status_code": "y",
            "service_type": "",
            "create_date": "Jul 4, 2022 1:20:41 PM",
            "create_id": "admin",
            "version": "v1.5"
          },
          "kb":{
            "id": "kb_v1.5",
            "provider_id": "kb",
            "providerName": "KB은행",
            "name": "KB은행",
            "url": "https://openapi.kbstar.com:8443",
            "provider_type": "gov",
            "oper_sort": "prod",
            "status_code": "y",
            "service_type": "",
            "create_date": "Jul 4, 2022 1:20:41 PM",
            "create_id": "admin",
            "version": "v1.5"
          },
          "kica":{
            "id": "kica_v1.5",
            "provider_id": "kica",
            "name": "삼성패스",
            "providerName": "삼성패스",
            "config": "",
            "url": "https://ses.signgate.com",
            "provider_type": "gov",
            "oper_sort": "prod",
            "status_code": "y",
            "service_type": "",
            "create_date": "Jul 4, 2022 1:20:41 PM",
            "create_id": "admin",
            "version": "v1.5"
          },
          "pass":{
            "id": "pass_v1.5",
            "provider_id": "pass",
            "name": "통신사패스",
            "providerName": "통신사패스",
            "config": "",
            "url": "https://pub-api.passauth.co.kr",
            "provider_type": "gov",
            "oper_sort": "prod",
            "status_code": "y",
            "service_type": "",
            "create_date": "Jul 4, 2022 1:20:41 PM",
            "create_id": "admin",
            "version": "v1.5"
          },
          "payco":{
            "id": "payco_v1.5",
            "provider_id": "payco",
            "name": "페이코",
            "config": "",
            "providerName": "페이코",
            "url": "https://ca.payco.com",
            "provider_type": "gov",
            "oper_sort": "prod",
            "status_code": "y",
            "service_type": "",
            "create_date": "Jul 4, 2022 1:20:41 PM",
            "create_id": "admin",
            "version": "v1.5"
          },
          "naver":{
            "id": "naver_v1.5",
            "provider_id": "naver",
            "name": "네이버",
            "config": "",
            "providerName": "네이버",
            "url": "https://nsign-gw.naver.com",
            "provider_type": "gov",
            "oper_sort": "prod",
            "status_code": "y",
            "service_type": "",
            "create_date": "Jul 4, 2022 1:20:41 PM",
            "create_id": "admin",
            "version": "v1.5"
          },
          "shinhan":{
            "id": "shinhan_v1.5",
            "provider_id": "shinhan",
            "name": "신한",
            "providerName": "신한",
            "config": "",
            "url": "https://ca.shinhan.com",
            "provider_type": "gov",
            "oper_sort": "prod",
            "status_code": "y",
            "service_type": "",
            "create_date": "Jul 4, 2022 1:20:41 PM",
            "create_id": "admin",
            "version": "v1.5"
          },
          "toss":{
            "id": "toss_v1.5",
            "provider_id": "toss",
            "name": "토스",
            "providerName": "토스",
            "config": "",
            "url": "https://mois.cert.toss.im",
            "provider_type": "gov",
            "oper_sort": "prod",
            "status_code": "y",
            "service_type": "",
            "create_date": "Jul 4, 2022 1:20:41 PM",
            "create_id": "admin",
            "version": "v1.5"
          },
          "dream":{
            "id": "dream_v1.5",
            "provider_id": "dream",
            "name": "드림인증",
            "providerName": "드림인증",
            "config": "",
            "url": "",
            "provider_type": "gov",
            "oper_sort": "prod",
            "status_code": "n",
            "unuse_style": "hide",
            "service_type": "",
            "create_date": "May 31, 2023 12:50:52 PM",
            "create_id": "admin",
            "version": "v1.5"
          },
          "banksalad":{
            "id": "banksalad_v1.5",
            "provider_id": "banksalad",
            "name": "뱅크샐러드",
            "providerName": "뱅크샐러드",
            "config": "",
            "url": "https://certificate.banksalad.com",
            "provider_type": "gov",
            "oper_sort": "prod",
            "status_code": "y",
            "service_type": "",
            "create_date": "May 31, 2023 12:50:50 PM",
            "create_id": "admin",
            "version": "v1.5"
          },
          "nh":{
            "id": "nh_v1.5",
            "provider_id": "nh",
            "name": "NH인증서",
            "providerName": "NH인증서",
            "config": "",
            "url": "",
            "provider_type": "gov",
            "oper_sort": "prod",
            "status_code": "y",
            "service_type": "",
            "create_date": "May 31, 2023 12:50:53 PM",
            "create_id": "admin",
            "version": "v1.5"
          },
          "hana":{
            "id": "hana_v1.5",
            "provider_id": "hana",
            "name": "하나은행",
            "providerName": "하나은행",
            "config": "",
            "url": "",
            "provider_type": "gov",
            "oper_sort": "prod",
            "status_code": "y",
            "service_type": "",
            "create_date": "May 31, 2023 12:50:51 PM",
            "create_id": "admin",
            "version": "v1.5"
          },
          "nice":{
            "id": "nice_v1.5",
            "provider_id": "nice",
            "name": "나이스",
            "providerName": "나이스",
            "url": "https://www.niceapi.co.kr",
            "provider_type": "iden",
            "oper_sort": "prod",
            "status_code": "y",
            "service_type": "IDENTITY",
            "version": "v1.5"
          }
    }
        
};


Nhis.prototype.간편로그인 = async function(Input){
    const host = "https://www.nhis.or.kr";
    const loginHost = "https://ptl.Nhis.or.kr";
    let header = {};
    let postData = "";
    let result= null;
   
    try {

        const uuid = Input.uuid;
        const userName = Input.userName;//한글 정진우-> encoding 필요
        const phoneNo = Input.phoneNo;//01082271995
        const useType = Input.useType; // 확인할것 jjw
        const isIdentityViewYN = Input.isIdentityViewYN; // 요것도 확인할것 jjw
        const originDataYN = Input.originDataYN; // 요것도 확인할것
        const birthday = Input.identity;
        const loginTypeLevel = Input.loginTypeLevel;
        const telecom = Input.telecom;

        if(loginTypeLevel=="5"&& !telecom){
            return {
                statusCode:400,
                body:"not_entered_param"
            }
        }
        
        if( userName==undefined||
            phoneNo==undefined||
            phoneNo.length!=11||
            loginTypeLevel==undefined||
            birthday==undefined
            ){

                return {
                    statusCode:400,
                    body:"not_entered_param"
                }
        }

        console.log("[module] Nhis 간편로그인 init");
       
        const encodedName = base64Encoding(userName);
        const encodedBirthDay = base64Encoding(birthday);
        const encodedPhone = base64Encoding(phoneNo);
        const encodedPhone1 = base64Encoding(phoneNo.substring(0,3));
        const encodedPhone2 = base64Encoding(phoneNo.substring(3,11));


        let provider = null;
        switch(loginTypeLevel){
            case "1":
                provider="kakao"
                break;
            case "2":
                provider="payco"
                break;
            case "3":
                provider="kica"
                break;
            case "4":
                provider="kb"
                break;
            case "5":
                provider="pass"
                break;
            case "6":
                provider="naver"
                break;
            case "7":
                provider="shinhan"
                break;
            case "8":
                provider="toss"
                break;
            default:
                provider="not_supported_loginType"
                break;                                                                           
        }

        if(provider==="not_supported_loginType"){
            return {
                statusCode:400,
                body:provider 
            }
        }

        let telcoTycd = "null";
        if(telecom){
            if(telecom=="0"){
                telcoTycd = '"S"'
            }else if(telecom=="1"){
                telcoTycd = '"K"'
            }else if(telecom=="2"){
                telcoTycd = '"L"'
            }else if(telecom=="3"){
                telcoTycd = '"S"'
            }else if(telecom=="4"){
                telcoTycd = '"K"'
            }else if(telecom=="5"){
                telcoTycd = '"L"'
            }    
        }


        

        // GET https://www.nhis.or.kr/nhis/etc/personalLoginPage.do HTTP/1.1
        header['Host']='www.nhis.or.kr'
        header['Connection']='keep-alive'
        header['sec-ch-ua']='"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"'
        header['sec-ch-ua-mobile']='?0'
        header['sec-ch-ua-platform']='"Windows"'
        header['Upgrade-Insecure-Requests']='1'
        header['User-Agent']='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
        header['Accept']='text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7'
        header['Sec-Fetch-Site']='none'
        header['Sec-Fetch-Mode']='navigate'
        header['Sec-Fetch-User']='?1'
        header['Sec-Fetch-Dest']='document'
        header['Accept-Encoding']='gzip, deflate, br'
        header['Accept-Language']='ko-KR,ko;q=0.9'

        result = await axios({
            method:'GET',
            url:host+'/nhis/etc/personalLoginPage.do',
            headers:header
        });

        let cookie = cookieParser(result);
        

        // POST https://www.nhis.or.kr/oacx/issue_token.jsp HTTP/1.1
        header['Host']='www.nhis.or.kr'
        header['Connection']='keep-alive'
        header['Content-Length']='12'
        header['sec-ch-ua']='"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"'
        header['Accept']='application/json; charset=utf-8'
        header['Content-Type']='application/json; charset=UTF-8'
        header['sec-ch-ua-mobile']='?0'
        header['User-Agent']='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
        header['sec-ch-ua-platform']='"Windows"'
        header['Origin']='https://www.nhis.or.kr'
        header['Sec-Fetch-Site']='same-origin'
        header['Sec-Fetch-Mode']='cors'
        header['Sec-Fetch-Dest']='empty'
        header['Referer']='https://www.nhis.or.kr/nhis/etc/personalLoginPage.do'
        header['Accept-Encoding']='gzip, deflate, br'
        header['Accept-Language']='ko-KR,ko;q=0.9'
        header['Cookie']=cookie;

        postData= '{"token":""}'

        result = await axios({
            method:'POST',
            url:host+'/oacx/issue_token.jsp',
            headers:header,
            data:postData
        });

        cookie+=cookieParser(result);

        const token = result.data["token"];
        const txId = result.data["txId"];


        console.log("cookie: "+ cookie);

        // POST https://www.nhis.or.kr/oacx/api/v1.0/authen/request HTTP/1.1
        header= {};
        header['Host']='www.nhis.or.kr'
        header['Connection']='keep-alive'
        header['sec-ch-ua']='"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"'
        header['Accept']='application/json; charset=utf-8'
        header['Content-Type']='application/json; charset=UTF-8'
        header['sec-ch-ua-mobile']='?0'
        header['User-Agent']='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
        header['sec-ch-ua-platform']='"Windows"'
        header['Origin']='https://www.nhis.or.kr'
        header['Sec-Fetch-Site']='same-origin'
        header['Sec-Fetch-Mode']='cors'
        header['Sec-Fetch-Dest']='empty'
        header['Referer']='https://www.nhis.or.kr/nhis/etc/personalLoginPage.do'
        header['Accept-Encoding']='gzip, deflate, br'
        header['Accept-Language']='ko-KR,ko;q=0.9'
        header['Cookie']=cookie;


        const userInfo ='{"isMember":false,"name":"'+encodedName+'","phone":"'+encodedPhone+'","phone1":"'+encodedPhone1+'","phone2":"'+encodedPhone2+'","ssn1":"","ssn2":"","birthday":"'+encodedBirthDay+'","privacy":1,"policy3":0,"policy4":1,"terms":1,"telcoTycd":'+telcoTycd+',"access_token":"","token_type":"","state":"","mtranskeySsn2":null}'


        

        postData = '{"id":"","provider":"'+this.providerMap[provider]["id"]+'","token":"'+token+'","txId":"'+txId+'","appInfo":{"code":"","path":"","type":""},"userInfo":'+userInfo+',"deviceInfo":{"code":"PC","browser":"WB","os":"","universalLink":false},"contentInfo":{"signTarget":"","signTargetTycd":"nonce","signType":"GOV_SIMPLE_AUTH","requestTitle":"","requestContents":""},"providerOptionInfo":{"callbackUrl":"","reqCSPhoneNo":"1","upmuGb":"","isUseTss":"Y","isNotification":"Y","isPASSVerify":"Y","isUserAgreement":"Y"},"compareCI":false}'
         
       
        result = await axios({
            method:'POST',
            url:host+'/oacx/api/v1.0/authen/request',
            headers:header,
            data:postData
        });

        let resultData = result.data;

        if(resultData["clientMessage"]!="성공"||resultData["resultCode"]!="200"||resultData["oacxCode"]!="OACX_SUCCESS"){
            console.log(resultData);
                
            // 개인정보오류 + 해당 인증서에 가입되어 있지 않을때도 
            if(resultData["oacxCode"]=="OACX_NO_USER"){
                
                return {
                    statusCode:400,
                    body:"wrong_info"
                }
            // 로그인에서는 안뜨고 인증확인단계에서 발생
            }else if(resultData["oacxCode"]=="OACX_TOKEN_EXPIRED"){
                
                // 토큰만료 -> 재시도 
                return {
                    statusCode:400,
                    body:"token_expired"
                }
            // 삼성패스(kica)의 경우 인증서를 발급한적이 있지만 재발행이 필요한 경우에 아래 메시지와 코드를 내려줌
            }else if(resultData["oacxCode"]=="OACX_UNDEFINED"){
                // 인증서 재발급 
                // "<p>추가 인증이 필요한<br>인증서 입니다.</p><p class='sTxt'>ERROR CODE :&nbsp606</p><p class='cont'>현 재 발급받은 인증서로는 해당 서비스 이용이 불가능합니다.<br>전자서명법 기준을 충족한 높은 보안성과 안정을 갖춘 인증서를  신규 발급 받으시기 바랍니다.</p><p class='sTxt bold'>[ 인증서 삭제 및 발급 방법 ]</p><p class='sTxt'>1. 삼성패스 앱 실행<br>2. 기존 인증서 삭제<br>3. 인증서 신규 발급</p><p class='sTxt bold'><a target='_blank' href='https://ses.signgate.com/ses/guide/html/spass_discardcert.html'>상세보기(클릭)<br>한국정보인증&nbsp고객센터 :&nbsp1577-8787</a></p>"
                // 인증서 재발급이 필요할때 
                return {
                    statusCode:400,
                    body:resultData["clientMessage"]
                }
            }

            
            console.log(resultData)
            // 서버에서 알수없는 응답을 내려줬을때 
            return {
                statusCode:500,
                body:resultData["clientMessage"]
            }
        }

        console.log("DB test");
        const dbParam = {
            uuid:uuid,
            userInfo:userInfo,
            resultData:resultData,
            cookie:cookie,
            birthday:encodedBirthDay
        };

        const dbResult = await putItem(dbParam);

        if(dbResult.statusCode!=200){
            return {
                statusCode:500,
                body:"dberror"
            }    
        }
        console.log("[module] dbResult: "+ JSON.stringify(dbResult));
        
        return {
            statusCode:200,
            body:"success_request"
        }


    } catch (error) {
        console.log(error);
        console.log("[modules] 간편로그인 error:"+ error.message);
        return {
            statusCode:500,
            body:error.message
        }   
    }

}


Nhis.prototype.인증확인 = async function(Input){
    const host = "https://www.nhis.or.kr";
    const loginHost = "https://ptl.Nhis.or.kr";
    let header = {};
    let postData = "";
    let result= null;
    // console.log("this.TEMPDB: "+this.TEMPDB);

   
    try {
        console.log("[module] Nhis 인증확인 init!");
        const uuid = Input.uuid;
        if(uuid==undefined|| uuid==""){
            return {
                statusCode:500,
                body:"putUuid"
            }
        }

        const dbResult = await selectItem(uuid);
        
        if(JSON.stringify(dbResult)==="{}"){
            return {
                statusCode:400,
                body:"LOGINFIRST"
            }
        }
        const dbItem = dbResult.Item

        console.log("============dbItem============")
        console.log(dbItem);
        console.log("============dbItem============")
        let cookie = dbItem.cookie;
        let resultData = dbItem.resultData;
        let userInfo = dbItem.userInfo;
        const birthday = dbItem.birthday;
        
        if(cookie==undefined||resultData==undefined|| resultData["cxId"]==undefined||resultData["reqTxId"]==undefined){
            return {
                statusCode:400,
                body:"LOGINFIRST"
            }
        }

        

        const cxId = resultData["cxId"]
        const txId = resultData["reqTxId"]
        const token = resultData["token"]

        const providerId = resultData["provider"]
        const providerName = this.providerMap[providerId]["name"];
        const providerVersion = this.providerMap[providerId]["id"];


        // POST https://www.nhis.or.kr/oacx/api/v1.0/authen/result HTTP/1.1
        header['Host']='www.nhis.or.kr'
        header['Connection']='keep-alive'
        header['sec-ch-ua']='"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"'
        header['Accept']='application/json; charset=utf-8'
        header['Content-Type']='application/json; charset=UTF-8'
        header['sec-ch-ua-mobile']='?0'
        header['User-Agent']='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
        header['sec-ch-ua-platform']='"Windows"'
        header['Origin']='https://www.nhis.or.kr'
        header['Sec-Fetch-Site']='same-origin'
        header['Sec-Fetch-Mode']='cors'
        header['Sec-Fetch-Dest']='empty'
        header['Referer']='https://www.nhis.or.kr/nhis/etc/personalLoginPage.do'
        header['Accept-Encoding']='gzip, deflate, br'
        header['Accept-Language']='ko-KR,ko;q=0.9'
        header['Cookie']=cookie;

        postData = '{"providerId":"'+providerId+'","providerName":"'+providerName+'","deeplinkUri":"","naverAppSchemeUrl":"","telcoTxid":"","mdlAppHash":"","id":"","provider":"'+providerVersion+'","token":"'+token+'","txId":"'+txId+'","cxId":"'+cxId+'","appInfo":{"code":"","path":"","type":""},"userInfo":'+userInfo+',"deviceInfo":{"code":"PC","browser":"WB","os":"","universalLink":false},"contentInfo":{"signTarget":"","signTargetTycd":"nonce","signType":"GOV_SIMPLE_AUTH","requestTitle":"","requestContents":""},"providerOptionInfo":{"callbackUrl":"","reqCSPhoneNo":"1","upmuGb":"","isUseTss":"Y","isNotification":"Y","isPASSVerify":"Y","isUserAgreement":"Y"},"compareCI":false,"useMdlSsn":false}'

        result = await axios({
            method:'POST',
            url:host+'/oacx/api/v1.0/authen/result',
            headers:header,
            data:postData
        });

        resultData = result.data;

        if(resultData["resultCode"]!="200"||resultData["oacxCode"]!="OACX_SUCCESS"){
            if(resultData["oacxCode"]=="OACX_NOT_SIGNED"){
                // 아직 인증을 하지 않은경우
                return {
                    statusCode:400,
                    body:"auth_not_yet"
                }
            }else if(resultData["oacxCode"]=="OACX_TOKEN_EXPIRED"){
                // 토큰만료 -> 재시도 
                return {
                    statusCode:400,
                    body:"token_expired"
                }
            }
            console.log(resultData);
            return {
                statusCode:500,
                body:"unKnown_authCheck"
            }
            
        }

        // POST https://www.nhis.or.kr/nhis/etc/personalSimpleLogin.do HTTP/1.1
        header['Host']='www.nhis.or.kr'
        header['Connection']='keep-alive'
        header['Cache-Control']='max-age=0'
        header['sec-ch-ua']='"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"'
        header['sec-ch-ua-mobile']='?0'
        header['sec-ch-ua-platform']='"Windows"'
        header['Upgrade-Insecure-Requests']='1'
        header['Origin']='https://www.nhis.or.kr'
        header['Content-Type']='application/x-www-form-urlencoded'
        header['User-Agent']='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
        header['Accept']='text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7'
        header['Sec-Fetch-Site']='same-origin'
        header['Sec-Fetch-Mode']='navigate'
        header['Sec-Fetch-User']='?1'
        header['Sec-Fetch-Dest']='document'
        header['Referer']='https://www.nhis.or.kr/nhis/etc/personalLoginPage.do'
        header['Accept-Encoding']='gzip, deflate, br'
        header['Accept-Language']='ko-KR,ko;q=0.9'
        header['Cookie']=cookie;

        postData ='logintype=&'
        postData +='idn=&'
        postData +='signedMsg=&'
        postData +='vidMsg=&'
        postData +='burl=&'
        postData +='site=main&'
        postData +='plain='+encodeURIComponent("건강하십시오!")+"+"+encodeURIComponent("국민건강보험")+"+"+encodeURIComponent("본인인증서비스")+"+"+encodeURIComponent("입니다")+'.&'
        postData +='userIdForAuth=&'
        postData +='ci=&'
        postData +='reqTxId='+txId+'&'
        postData +='netfunnelKey=&'
        postData +='res='+encodeURIComponent(JSON.stringify(resultData))+'&'
        postData +='juminNo1=&'
        postData +='juminNo2=&'
        postData +='hidfrmId=trxTbwbla01VO&'
        postData +='seedKey_trxTbwbla01VO=&'
        postData +='initTime_trxTbwbla01VO=&'
        postData +='keyIndex_juminNo2_trxTbwbla01VO=&'
        postData +='keyboardType_juminNo2_trxTbwbla01VO=number&'
        postData +='fieldType_juminNo2_trxTbwbla01VO=password&'
        postData +='transkeyUuid_trxTbwbla01VO=&'
        postData +='transkey_juminNo2_trxTbwbla01VO=&'
        postData +='transkey_HM_juminNo2_trxTbwbla01VO=&'
        postData +='Tk_juminNo2_checkbox_value_trxTbwbla01VO=e2e'


        result = await axios({
            method:'POST',
            url:host+'/nhis/etc/personalSimpleLogin.do',
            headers:header,
            data:postData,
            maxRedirects: 0,
            validateStatus: function (status) {
                return status == 303 || status == 200;
              }
        });
        
        cookie+=cookieParser(result);

        const redirectUrl = result.headers.location;
        console.log("redirectUrl: "+ redirectUrl)
        // GET https://www.nhis.or.kr/nhis/index.do HTTP/1.1
        header['Host']='www.nhis.or.kr'
        header['Connection']='keep-alive'
        header['Cache-Control']='max-age=0'
        header['Upgrade-Insecure-Requests']='1'
        header['User-Agent']='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
        header['Accept']='text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7'
        header['Sec-Fetch-Site']='same-origin'
        header['Sec-Fetch-Mode']='navigate'
        header['Sec-Fetch-User']='?1'
        header['Sec-Fetch-Dest']='document'
        header['sec-ch-ua']='"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"'
        header['sec-ch-ua-mobile']='?0'
        header['sec-ch-ua-platform']='"Windows"'
        header['Referer']='https://www.nhis.or.kr/nhis/etc/personalLoginPage.do'
        header['Accept-Encoding']='gzip, deflate, br'
        header['Accept-Language']='ko-KR,ko;q=0.9'
        header['Cookie']=cookie;
        
        result = await axios({
            method:'GET',
            url:redirectUrl,
            headers:header
        });

        cookie+=cookieParser(result);

        const dbParam = {
            uuid:uuid,
            cookie:cookie,
            birthday:birthday
        };

        const dbPutResult = await putItem(dbParam);

        if(dbPutResult.statusCode!=200){
            return {
                statusCode:500,
                body:"dberror"
            }    
        }


        return {
            statusCode:200,
            body:"success_auth"
        }


    } catch (error) {
        console.log(error);
        console.log("[modules] 간편로그인 error:"+ error.message);
        return {
            statusCode:500,
            body:error.message
        }   
    }

}

/**
 * 통보번호 관련 문의사항 응답값
 *  현재 pdf에 저장된 값: 2-0134-20230914-1012 -> '-'를 제외하면 17자
 *  그린리본 응답값: "resIssueNo": " 201012310013193" -> 15자 
 * @param {*} Input 
 * @returns 
 */
Nhis.prototype.자격확인 = async function(Input){
    const host = "https://www.nhis.or.kr";
    let header = {};
    let postData = "";
    let result= null;
    const res = {};

   
    try {
        console.log("[module] Nhis 자격확인 init!");
        const uuid = Input.uuid;

        if(uuid==undefined|| uuid==""){
            return {
                statusCode:500,
                body:"putUuid"
            }
        }

        const dbResult = await selectItem(uuid);
        
        console.log("dbResult: "+(dbResult=={}));
        if(JSON.stringify(dbResult)==="{}"){
            return {
                statusCode:400,
                body:"LOGINFIRST"
            }
        }
        console.log("dbResult: "+JSON.stringify(dbResult));

        const dbItem = dbResult.Item
        
       
        let cookie = dbItem.cookie;


        if(cookie==undefined||cookie.indexOf("ssotoken")==-1||dbItem.birthday==undefined){
            return {
                statusCode:400,
                body:"LOGINFIRST"
            }
        }
        const birthday = base64decoding(dbItem.birthday).substring(2);


        // GET https://www.nhis.or.kr/nhis/minwon/jpAea00501.do HTTP/1.1
        header= {};
        header['Host']='www.nhis.or.kr'
        header['Connection']='keep-alive'
        header['sec-ch-ua']='"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"'
        header['sec-ch-ua-mobile']='?0'
        header['sec-ch-ua-platform']='"Windows"'
        header['Upgrade-Insecure-Requests']='1'
        header['User-Agent']='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
        header['Accept']='text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7'
        header['Sec-Fetch-Site']='same-origin'
        header['Sec-Fetch-Mode']='navigate'
        header['Sec-Fetch-User']='?1'
        header['Sec-Fetch-Dest']='document'
        header['Accept-Encoding']='gzip, deflate, br'
        header['Accept-Language']='ko-KR,ko;q=0.9'
        header['Cookie']=cookie;

        result = await axios({
            method:'GET',
            url:host+"/nhis/minwon/jpAea00501.do",
            headers:header
        });

        let beforeUrl = host+"/nhis/minwon/jpAea00501.do";
                
        console.log("[module] nhis jpAea00501.do completed!")


        // POST https://www.nhis.or.kr/nhis/minwon/jpAea00502.do HTTP/1.1
        header = {};

        header['Host']='www.nhis.or.kr'
        header['Connection']='keep-alive'
        header['Cache-Control']='max-age=0'
        header['sec-ch-ua']='"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"'
        header['sec-ch-ua-mobile']='?0'
        header['sec-ch-ua-platform']='"Windows"'
        header['Upgrade-Insecure-Requests']='1'
        header['Origin']='https://www.nhis.or.kr'
        header['Content-Type']='application/x-www-form-urlencoded'
        header['User-Agent']='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
        header['Accept']='text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7'
        header['Sec-Fetch-Site']='same-origin'
        header['Sec-Fetch-Mode']='navigate'
        header['Sec-Fetch-Dest']='document'
        header['Referer']=beforeUrl
        header['Accept-Encoding']='gzip, deflate, br'
        header['Accept-Language']='ko-KR,ko;q=0.9'
        header['Cookie']=cookie;

        postData = "ecdwAdres=&printCheck0=Y";

        result = await axios({
            method:'POST',
            url:host+"/nhis/minwon/jpAea00502.do",
            headers:header,
            data:postData
        });

        console.log("[module] nhis jpAea00502.do completed!")
        beforeUrl = host+"/nhis/minwon/jpAea00502.do";
        if(result.data.indexOf("인터넷발급 당일 10건 제한")>-1){
            return {
                statusCode:400,
                body:"인터넷발급 당일 10건 제한 고객센터로 발급요청하세요"
            }
        }

        const nextPath = sliceFunc(result.data, 'url:"','",');
        if(nextPath.indexOf('>로그인 &lt; 회원서비스')>-1){
            return {
                statusCode:400,
                body:"token_expired"
            }
        }
        
        const mrdPath = encodeURIComponent(sliceFunc(result.data, 'mrdPath:"','"'));
        const mrdParam = encodeURIComponent(sliceFunc(result.data, 'rdParam = "','";'));
        const mrdData = encodeURIComponent(sliceFunc(result.data, 'mrdData:"','"'));
        const barcodeYn = sliceFunc(result.data, 'barcodeYn:"','"');
        
        
        // POST https://www.nhis.or.kr/nhis/minwon/jpZaa00104.do HTTP/1.1
        header['Host']='www.nhis.or.kr'
        header['Connection']='keep-alive'
        header['sec-ch-ua']='"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"'
        header['Accept']='*/*'
        header['Content-Type']='application/x-www-form-urlencoded; charset=UTF-8'
        header['X-Requested-With']='XMLHttpRequest'
        header['sec-ch-ua-mobile']='?0'
        header['User-Agent']='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
        header['sec-ch-ua-platform']='"Windows"'
        header['Origin']='https://www.nhis.or.kr'
        header['Sec-Fetch-Site']='same-origin'
        header['Sec-Fetch-Mode']='cors'
        header['Sec-Fetch-Dest']='empty'
        header['Referer']=beforeUrl
        header['Accept-Encoding']='gzip, deflate, br'
        header['Accept-Language']='ko-KR,ko;q=0.9'
        header['Cookie']=cookie;

        postData ='mrdPath='+mrdPath+'&'
        postData +='mrdParam='+mrdParam+'&';
        postData +='mrdData='+mrdData+'&'
        postData +='barcodeYn='+barcodeYn
 
        result = await axios({
            method:'POST',
            url:host+nextPath,
            headers:header,
            data:postData
        });

        if(result.data.alimMsg){
            console.log(result.data);
            // { alimMsg: '잠시 후 다시 사용해 주세요.' }
            return {
                statusCode:500,
                body:result.data.alimMsg
            }
        }
        console.log("[module] nhis "+nextPath+" completed!")

        const strRtDataPath = result.data["strRtDataPath"]
        const ivCellBlockCount = result.data["ivCellBlockCount"]
        const strPdfFilePath = result.data["strPdfFilePath"]
        const strPdfDataType = result.data["strPdfDataType"]
        const ivCellBlockRow = result.data["ivCellBlockRow"]
        const strConfingEncodeData = result.data["strConfingEncodeData"]
        
        header = {}
        // POST https://www.nhis.or.kr/3rdparty/markany/zc_rpt/jsp/rdView.jsp HTTP/1.1
        header['Host']='www.nhis.or.kr'
        header['Connection']='keep-alive'
        header['Cache-Control']='max-age=0'
        header['sec-ch-ua']='"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"'
        header['sec-ch-ua-mobile']='?0'
        header['sec-ch-ua-platform']='"Windows"'
        header['Upgrade-Insecure-Requests']='1'
        header['Origin']='https://www.nhis.or.kr'
        header['Content-Type']='application/x-www-form-urlencoded'
        header['User-Agent']='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
        header['Accept']='text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7'
        header['Sec-Fetch-Site']='same-origin'
        header['Sec-Fetch-Mode']='navigate'
        header['Sec-Fetch-Dest']='document'
        header['Referer']='https://www.nhis.or.kr/nhis/minwon/jpAea00502.do'
        header['Accept-Encoding']='gzip, deflate, br'
        header['Accept-Language']='ko-KR,ko;q=0.9'
        header['Cookie']=cookie;

        postData ='strRtDataPath='+encodeURIComponent(strRtDataPath)+'&'
        postData +='strPdfFilePath='+encodeURIComponent(strPdfFilePath)+'&'
        postData +='strPdfDataType='+encodeURIComponent(strPdfDataType)+'&'
        postData +='ivCellBlockCount='+encodeURIComponent(ivCellBlockCount)+'&'
        postData +='ivCellBlockRow='+encodeURIComponent(ivCellBlockRow)+'&'
        postData +='strConfingEncodeData='+encodeURIComponent(strConfingEncodeData)+'&'
        postData +='maTimestamp='+(new Date()-0)
        
        console.log("postData: "+ postData);

        result = await axios({
            method:'POST',
            url:host+'/3rdparty/markany/zc_rpt/jsp/rdView.jsp',
            headers:header,
            data:postData,
            responseType: 'arraybuffer'
        });
        

        console.log("[module] nhis rdView.jsp completed!")

        const hexPdfData = Buffer.from(result.data).toString('hex');

        // HEX 문자열을 Buffer로 변환
        const pdfBuffer = Buffer.from(hexPdfData, 'hex');

        // pdfreader를 사용하여 PDF를 파싱
        const pdfResults = await readPDFPages(birthday, pdfBuffer);
        pdfResults.forEach((pdfMap)=>{
            
            const 발급일자=pdfMap["40.896"][0]
            const 유효일자=pdfMap["45.037"][0]
            const findTextStr = "통보번호 : ";
            const 통보번호=pdfMap["8.211"][0].substring(pdfMap["8.211"][0].indexOf(findTextStr)+findTextStr.length)
            const 수신기관명=pdfMap["10.058"][1]
            const 자격확인요청일=pdfMap["10.058"][3]
            
            const 증번호=pdfMap["12.276"][1]
            const 사업장관리번호=pdfMap["12.276"][3]
            const 세대주여부=pdfMap["15.925999999999998"]
            const 전체성명=pdfMap["16.414"][0];
            const 마스킹된주민번호=pdfMap["16.414"][1];
            
            const 자격확인List=pdfMap["22.181"];

            const resCertificateList = [];

           
            const resCertificate = {}
            console.log("자격확인List len: "+자격확인List.length);

            if(자격확인List.length>=3){
                resCertificate["resUserNm"] =자격확인List[0];
                resCertificate["resUserIdentiyNo"] =자격확인List[1].replaceAll("-", "")
                resCertificate["commStartDate"] =자격확인List[2].replaceAll(".", "")
                if(자격확인List.length>3){
                    resCertificate["commEndDate"] =자격확인List[3].replaceAll(".", "")
                    resCertificate["resReasonSalaryStop"] =자격확인List[4]    
                    resCertificate["resRelation"] =""
                    // resCertificate["resRelation"] =자격확인List[5]    
                    // resRelation
                }else{
                    resCertificate["commEndDate"] =""
                    resCertificate["resReasonSalaryStop"] =""    
                    resCertificate["resRelation"] =""
                }    
            }
                        
           
            resCertificateList.push(resCertificate);

            res["resIssueNo"] = 통보번호.replaceAll("-", ""),
            res["resReportingDate"] = 자격확인요청일.replaceAll(".", ""),
            res["resHealthInsuranceCardNo"] = 증번호,
            res["resPlaceBusinessManageNo"] = 사업장관리번호,
            res["resUserNm"] = 전체성명,
            res["resUserIdentiyNo"] = 마스킹된주민번호.replaceAll("-", ""),
            res["resIssueDate"] = 발급일자.replaceAll(".", ""),
            res["resCertificateList"] = resCertificateList
        })

        return {
            statusCode:200,
            body:res
        }


    } catch (error) {
        console.log(error);
        console.log("[modules] 자격확인 error:"+ error.message);
        return {
            statusCode:500,
            body:error.message
        }   
    }

}

Nhis.prototype.보험료납부확인 = async function(Input){
    const host = "https://www.nhis.or.kr";
    let header = {};
    let postData = "";
    let result= null;
    
    console.log(this.TEMPDB);

   
    try {
        const uuid = Input.uuid;

        if(uuid==undefined|| uuid==""){
            return {
                statusCode:500,
                body:"putUuid"
            }
        }

        const dbResult = await selectItem(uuid);
        
        if(JSON.stringify(dbResult)==="{}"){
            return {
                statusCode:400,
                body:"LOGINFIRST"
            }
        }
        console.log("dbResult: "+JSON.stringify(dbResult));

        const dbItem = dbResult.Item

       

        let cookie = dbItem.cookie;
        const birthday = dbItem.birthday;

        

        if(cookie==undefined||cookie.indexOf("ssotoken")==-1||birthday==undefined){
            return {
                statusCode:400,
                body:"LOGINFIRST"
            }
        }

        // selYearFrom:"2020",
        // selMonthFrom:"1",
        // selYearTo:"2023",
        // selMonthTo:"12",

        const startDate = Input.startDate;
        const endDate = Input.endDate;

        const tempStartMonth = startDate.substring(4,6);
        const tempEndMonth = endDate.substring(4,6);
        
        const selPbltnType=Input.usePurposes
        const selLngeType="1"// 국문 으로 고정
        const selYearFrom=startDate.substring(0,4)
        const selMonthFrom=tempStartMonth.substring(0,1)=="0"?tempStartMonth.substring(1):tempStartMonth
        const selYearTo=endDate.substring(0,4)
        const selMonthTo=tempEndMonth.substring(0,1)=="0"?tempEndMonth.substring(1):tempEndMonth
        const insuType=Input.useType
       
    // POST https://www.nhis.or.kr/nhis/minwon/jpAea00101.do HTTP/1.1
    header['Host']='www.nhis.or.kr'
    header['Connection']='keep-alive'
    header['Cache-Control']='max-age=0'
    header['sec-ch-ua']='"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"'
    header['sec-ch-ua-mobile']='?0'
    header['sec-ch-ua-platform']='"Windows"'
    header['Upgrade-Insecure-Requests']='1'
    header['Origin']='https://www.nhis.or.kr'
    header['Content-Type']='application/x-www-form-urlencoded'
    header['User-Agent']='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
    header['Accept']='text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7'
    header['Sec-Fetch-Site']='same-origin'
    header['Sec-Fetch-Mode']='navigate'
    header['Sec-Fetch-User']='?1'
    header['Sec-Fetch-Dest']='document'
    header['Referer']='https://www.nhis.or.kr/nhis/index.do'
    header['Accept-Encoding']='gzip, deflate, br'
    header['Accept-Language']='ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7'
    header['Cookie']=cookie;

    // selPbltnType:   
        // 2: 납부확인용
        // 4: 연말정산용
        // 6: 학교제출용
        // 8: 종합소득세신고용
    // selLngeType:
        // 1: 국문
        // 2: 영문
    //  insuType:
        // 00: 건강,장기요양보험료
        // 01: 건강보험료
        // 02: 장기요양보험료
        
    postData='selPbltnType='+selPbltnType+'&'
    postData+='selLngeType='+selLngeType+'&'
    postData+='selYearFrom='+selYearFrom+'&'
    postData+='selMonthFrom='+selMonthFrom+'&'
    postData+='selYearTo='+selYearTo+'&'
    postData+='selMonthTo='+selMonthTo+'&'
    postData+='insuType='+insuType+''


    console.log(postData)
    result = await axios({ 
        method:'POST',
        url:host+'/nhis/minwon/jpAea00101.do',
        headers:header,
        data:postData
    });

    if(result.data.indexOf('/personalLoginPage.do">로그인</a>')>-1){
        
        return {
            statusCode:400,
            body:"token_expired"
        }
    }


    // ===========================================
    // HTML parsing Code 보험금납부확인 목록 parsing  init
    // ===========================================
    let paramStrArr = [];
    const searchString = 'fn_openPrint("';
    const suffixSearchString = '");';
    let prefixIdx = result.data.indexOf(searchString);

    const $ = cheerio.load(result.data); //jjwjjw
    const trList = $('.col-table').find("tr");
    let trIdx = 1;

    
    while (prefixIdx !== -1) {
        const 소속지사 = trList.eq(trIdx++).find("td").eq(5).text().trim();
        
        const suffixIdx = result.data.indexOf(suffixSearchString, prefixIdx+1);
        paramStrArr.push(result.data.substring(prefixIdx+searchString.length, suffixIdx)+","+소속지사);
        prefixIdx = result.data.indexOf(searchString, prefixIdx + 1);
    }

    const functionParams = [];
    console.log("while init! end! prefixIdx:"+ prefixIdx);
    paramStrArr.forEach((paramStr, idx)=>{
        const paramSplits = paramStr.split(",");
        const tempArr = []
        paramSplits.forEach((paramSplit, idx2)=>{
            tempArr.push(paramSplit.replaceAll('\\', '').replaceAll('"','').trim())
        });
        functionParams.push(tempArr);
    })

    // ===========================================
    // HTML parsing Code 보험금납부확인 목록 parsing  end
    // ===========================================


    const promises = functionParams.map((functionParam) => parsingIssuanceData(functionParam, cookie, Input,birthday))
    const pdfParsingResult = []
    
    try {
        const promiseResults = await Promise.allSettled(promises)

        //{ status: 'fulfilled', value: { statusCode: 200, body: [Array] } },
        promiseResults.forEach(async (promiseResult, idx)=>{
        
          if(promiseResult.status=="fulfilled" && promiseResult.value.statusCode==200){
            promiseResult.value.body.forEach((promiseData,idx)=>{
                pdfParsingResult.push(promiseData)
            })
          }else{
            // promiseResult.status: rejected 일 경우
            console.lolg(promiseResult);
            return {
              statusCode:500,
              body:"scraping_error"
            }
         }
         
        })

    } catch (error) {
        console.log(error);
        return {
            statusCode:500,
            body:"scraping_error"
          }
    }
    
    
    return {
        statusCode:200,
        body:pdfParsingResult
    }
    }catch(error){
        console.log(error);
        return {
            statusCode:500,
            body:error.message
        }
    }
}
function generatePrtChk(gaibjaType,selPbltnType,jungNo,selLngeType){
    try {
        let prtChk = selPbltnType;
        let lngeType = selLngeType;
        if ( ( gaibjaType == '1' || gaibjaType == '2' ) && ( prtChk == '2' || prtChk == '4' || prtChk == '6' || prtChk == '8' || prtChk == '10' ) ) {
            if (prtChk == '2')       prtChk = '1';
            else if (prtChk == '4')  prtChk = '3';
            else if (prtChk == '6')  prtChk = '5';
            else if (prtChk == '8')  prtChk = '7';
            else if (prtChk == '10') prtChk = '9';
        }
        if ( ( gaibjaType == '5' ) && ( jungNo.substring(0, 2) == '77' || jungNo.substring(0, 2) == '78' || jungNo.substring(0, 2) == '79' ) ) {
            if (prtChk == '2')       prtChk = '1';
            else if (prtChk == '4')  prtChk = '3';
            else if (prtChk == '6')  prtChk = '5';
            else if (prtChk == '8')  prtChk = '7';
            else if (prtChk == '10') prtChk = '9';
        }
        if ( ( gaibjaType == '5' ) && !( jungNo.substring(0, 2) == '77' || jungNo.substring(0, 2) == '78' || jungNo.substring(0, 2) == '79' ) && ( prtChk == '1' || prtChk == '3' || prtChk == '5' || prtChk == '7' || prtChk == '9' ) ) {
            if (prtChk == '1')       prtChk = '2';
            else if (prtChk == '3')  prtChk = '4';
            else if (prtChk == '5')  prtChk = '6';
            else if (prtChk == '7')  prtChk = '8';
            else if (prtChk == '9')  prtChk = '10';
        }
        return {
            statusCode:200,
            body:prtChk
        }
        
    } catch (error) {
        console.log(error);
        console.log("generatePrtChk error");
        return {
            statusCode:500,
            body:error.message
        }
    }
}

async function parsingIssuanceData(param,cookie, Input,birthday){
    let postData = "";
    let header = {};
    const host = "https://www.nhis.or.kr";
    try {
        const joinType = param[3];
       
        const insuType = Input.useType;
        const selLngeType ="1";
        const selPbltnType= Input.usePurposes;
        
        
        let  hidYearTo=param[6].substring(0,4);//상실일의 연도
        let hidMonthTo = param[6].substring(4,6);//상실일의 월

        // 상실일 연도가 9999일때는 
        if(Number(hidYearTo)==9999){
            hidYearTo=new Date().getFullYear()+"";
        }

        if( "0" == param[6].substring(4,5) ) { 
            hidMonthTo = param[6].substring(5,6);	
        } 

        const hidYearFrom = param[5].substring(0,4);//시작일연도
        let hidMonthFrom = param[5].substring(4,6);//시작일의 월
        
        if( "0" == param[5].substring(4,5) ) { 
            hidMonthFrom = param[5].substring(5,6);	
        } 
        
        

        if(param.length!=12){
            console.log("[error] param.length is not 11!");
            console.log(param);
            console.log("[error] parsingIssuanceData error!");
            
            return {
                statusCode:500,
                body:"parsingIssuanceData error"
            }
        }

        const sliceBirthDay = base64decoding(birthday).substring(2);
        const prtChkResult = generatePrtChk(joinType, selPbltnType,sliceBirthDay,selLngeType);
        if(prtChkResult.statusCode!=200){
            console.log(prtChkResult.body);
            return {
                statusCode: 500,
                body:"function generatePrtChk error!"
            }
        }

        const prtChk = prtChkResult.body;

        // POST https://www.nhis.or.kr/nhis/minwon/jpAea00102.do HTTP/1.1
        header['Host']='www.nhis.or.kr'
        header['Connection']='keep-alive'
        header['Cache-Control']='max-age=0'
        header['sec-ch-ua']='"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"'
        header['sec-ch-ua-mobile']='?0'
        header['sec-ch-ua-platform']='"Windows"'
        header['Upgrade-Insecure-Requests']='1'
        header['Origin']='https://www.nhis.or.kr'
        header['Content-Type']='application/x-www-form-urlencoded'
        header['User-Agent']='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
        header['Accept']='text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7'
        header['Sec-Fetch-Site']='same-origin'
        header['Sec-Fetch-Mode']='navigate'
        header['Sec-Fetch-Dest']='document'
        header['Referer']='https://www.nhis.or.kr/nhis/minwon/jpAea00101.do'
        header['Accept-Encoding']='gzip, deflate, br'
        header['Accept-Language']='ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7'
        header['Cookie']=cookie;

        
        postData ='ecdwAdres='
        postData +='&hidPopupGb=JPAC100M01'
        postData +='&hidBrchCode='+param[0]
        postData +='&hidJungNo='+param[1]
        postData +='&hidName='+encodeURIComponent(param[2])
        postData +='&hidGaibjaType='+param[3]
        postData +='&hidCenType='
        postData +='&hidYearFrom='+hidYearFrom
        postData +='&hidYearTo='+hidYearTo
        postData +='&hidChwidukDate='+param[5]
        postData +='&hidSangsilDate='+param[6]
        postData +='&hidJungSeq='+param[7]
        postData +='&hidFirmSym='+param[8]
        postData +='&hidFirmNm='+encodeURIComponent(param[9])
        postData +='&hidLngeType='+selLngeType
        postData +='&hidPrtChk='+prtChk
        postData +='&hidInsuType='+insuType
        postData +='&hidIssueTargetEngName='
        postData +='&hidRequestEngName='
        postData +='&hidBizEngName='
        postData +='&hidMonthFrom=1'
        postData +='&hidMonthTo=12'
        postData +='&str11='
        postData +='&str12='
        postData +='&hidPrtType='
        postData +='&focusChk=a'
        postData +='&fax='
	
        // return {};


        result = await axios({ 
            method:'POST',
            url:host+'/nhis/minwon/jpAea00102.do',
            headers:header,
            data:postData
        });

        console.log("jpAea00102.do complted!")

        const nextPath = sliceFunc(result.data, 'url:"','",');
        if(nextPath.indexOf('>로그인 &lt; 회원서비스')>-1){
            return {
                statusCode:400,
                body:"LOGIN expired"
            }
        }

        const mrdPath = encodeURIComponent(sliceFunc(result.data, 'mrdPath:"','"'));
        const mrdParam = encodeURIComponent(sliceFunc(result.data, 'rdParam = "','";'));
        const mrdData = encodeURIComponent(sliceFunc(result.data, 'mrdData:"','"'));

        console.log("jpZaa00104 init!")
        // POST https://www.nhis.or.kr/nhis/minwon/jpZaa00104.do HTTP/1.1
        header['Host']='www.nhis.or.kr'
        header['Connection']='keep-alive'
        header['sec-ch-ua']='"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"'
        header['Accept']='*/*'
        header['Content-Type']='application/x-www-form-urlencoded; charset=UTF-8'
        header['X-Requested-With']='XMLHttpRequest'
        header['sec-ch-ua-mobile']='?0'
        header['User-Agent']='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
        header['sec-ch-ua-platform']='"Windows"'
        header['Origin']='https://www.nhis.or.kr'
        header['Sec-Fetch-Site']='same-origin'
        header['Sec-Fetch-Mode']='cors'
        header['Sec-Fetch-Dest']='empty'
        header['Referer']='https://www.nhis.or.kr/nhis/minwon/jpAea00102.do'
        header['Accept-Encoding']='gzip, deflate, br'
        header['Accept-Language']='ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7'
        header['Cookie']=cookie;

        postData = 'mrdPath='+mrdPath
        postData +='&mrdParam='+mrdParam
        postData +='&mrdData='+mrdData

        result = await axios({ 
            method:'POST',
            url:host+nextPath,
            headers:header,
            data:postData
        });

        console.log("jpZaa00104 completed!!")

        if(result.data["alimMsg"]!==""){
            console.log(result.data);
            return {
                statusCode:500,
                body:result.data["alimMsg"]
            }
        }

        const strRtDataPath = encodeURIComponent(result.data["strRtDataPath"]);
        const strPdfDataType = encodeURIComponent(result.data["strPdfDataType"]);
        const strPdfFilePath = encodeURIComponent(result.data["strPdfFilePath"]);
        const ivCellBlockCount = encodeURIComponent(result.data["ivCellBlockCount"]);
        const ivCellBlockRow = encodeURIComponent(result.data["ivCellBlockRow"]);
        const strConfingEncodeData = encodeURIComponent(result.data["strConfingEncodeData"]);
        
        
        //{"strPdfDataType":"0","strPrintOptions":"0","alimMsg":"","ivCellBlockRow":1,"strConfigFilePath":"","strConfingEncodeData":"46.5^265.6^20.6^265.6^528^264^Internet^COPY^4^280^70^0^0^3^","strRtDataPath":"01i2Mc2JEYECx4xtT43C2M0SHv+O6dz5gOgmsXNkPdPEIBxzU4FxNBJUcdWkrzEcMTQwMTk1MC5wZGYubW1s","ivCellBlockCount":14,"strPdfFilePath":"01i2Mc2JEYECx4xtT43C2M0SHv+O6dz5gOgmsXNkPdPEIBxzU4FxNBJUcdWkrzEcMTQwMTk1MC5wZGY=","strValueTrue":true}

        header = {}
        // POST https://www.nhis.or.kr/3rdparty/markany/zc_rpt/jsp/rdView.jsp HTTP/1.1
        header['Host']='www.nhis.or.kr'
        header['Connection']='keep-alive'
        header['Cache-Control']='max-age=0'
        header['sec-ch-ua']='"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"'
        header['sec-ch-ua-mobile']='?0'
        header['sec-ch-ua-platform']='"Windows"'
        header['Upgrade-Insecure-Requests']='1'
        header['Origin']='https://www.nhis.or.kr'
        header['Content-Type']='application/x-www-form-urlencoded'
        header['User-Agent']='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
        header['Accept']='text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7'
        header['Sec-Fetch-Site']='same-origin'
        header['Sec-Fetch-Mode']='navigate'
        header['Sec-Fetch-Dest']='document'
        header['Referer']='https://www.nhis.or.kr/nhis/minwon/jpAea00102.do'
        header['Accept-Encoding']='gzip, deflate, br'
        header['Accept-Language']='ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7'
        header['Cookie'] = cookie;


        postData = 'strRtDataPath='+strRtDataPath
        postData += '&strPdfFilePath='+strPdfFilePath
        postData +='&strPdfDataType='+strPdfDataType
        postData +='&ivCellBlockCount='+ivCellBlockCount
        postData +='&ivCellBlockRow='+ivCellBlockRow
        postData +='&strConfingEncodeData='+strConfingEncodeData
        postData +='&maTimestamp='+(new Date()-0);

        console.log("rdView.jsp completed!");

        result = await axios({
            method:'POST',
            url:host+'/3rdparty/markany/zc_rpt/jsp/rdView.jsp',
            headers:header,
            data:postData,
            responseType: 'arraybuffer'
        });

        console.log("[module] nhis rdView.jsp completed! ")

        const hexPdfData = Buffer.from(result.data).toString('hex');

        // HEX 문자열을 Buffer로 변환
        const pdfBuffer = Buffer.from(hexPdfData, 'hex');

        // pdfreader를 사용하여 PDF를 파싱
        const pdfPwd = base64decoding(birthday).substring(2);

        const pdfResults = await readPDFPages(pdfPwd, pdfBuffer);
       
        const res = []
        pdfResults.forEach((pdfData)=>{
            

            const resJoinOffice = param[11];
            let resPayerNo = param[11];
            
            if(pdfData["10.098"].length==4){
                resPayerNo = pdfData["10.098"][3];
            }else if(pdfData["10.098"].length==3){
                resPayerNo = pdfData["10.098"][2];
            }
            
            const resCancelDate = param[6];
            const resAcquisitionDate = param[5]
            const resCompanyIdentityNo = param[1]
            const resJoinUserType = param[3];
            const resCompanyNm = param[9];
            const resInsuranceAmtList  = [];

            resInsuranceAmtList.push(parsingPrice(pdfData["16.037"] , "1"));   // 1월
            resInsuranceAmtList.push(parsingPrice(pdfData["17.043"] , "2"));   // 2월
            resInsuranceAmtList.push(parsingPrice(pdfData["18.051"] , "3"));   // 3월
            resInsuranceAmtList.push(parsingPrice(pdfData["19.052"] , "4"));   // 4월
            resInsuranceAmtList.push(parsingPrice(pdfData["20.056"] , "5"));   // 5월
            resInsuranceAmtList.push(parsingPrice(pdfData["21.068"] , "6"));   // 6월
            resInsuranceAmtList.push(parsingPrice(pdfData["22.081"] , "7"));   // 7월
            resInsuranceAmtList.push(parsingPrice(pdfData["23.086"] , "8"));   // 8월
            resInsuranceAmtList.push(parsingPrice(pdfData["24.092"] , "9"));   // 9월
            resInsuranceAmtList.push(parsingPrice(pdfData["25.1"]   , "10"));     //10월
            resInsuranceAmtList.push(parsingPrice(pdfData["26.104"] , "11"));   //11월
            resInsuranceAmtList.push(parsingPrice(pdfData["27.105"] , "12"));   //12월
            
            const startEndData = ((pdfData["11.762"]+'').replaceAll("년 ", "").replaceAll("월", "").replaceAll(" 납부내역", "")).split(" ~ ")
            const commStartDate = startEndData[0];
            const commEndDate = startEndData[1];
            
            const resIssueDate = (pdfData["33.882"]+"").replaceAll("년 ", "").replaceAll("월 ", "").replaceAll("일", "")   // 발급일자
            const resUserIdentiyNo = pdfData["8.638"][3];
            const resUserNm = pdfData["8.638"][1];
            const resIssueNo = (pdfData["5.026"][1]+"").replaceAll("-", "");

            console.log(pdfData["28.23"]);

            let resYETaxRectalHealthNoticeAmt	= "0";
            let resYETaxRectalLTCNoticeAmt	    = "0";	
            let resYETaxRectalHealthPayAmt	    = "0";	
            let resYETaxRectalLTCPayAmt         = "0";


            if(pdfData["27.105"].length!=4){
                resYETaxRectalHealthNoticeAmt	= pdfData["28.23"][0];	
                resYETaxRectalLTCNoticeAmt	= pdfData["28.23"][1];	
                resYETaxRectalHealthPayAmt	= pdfData["28.23"][2];	
                resYETaxRectalLTCPayAmt       = pdfData["28.23"][3];
    
            }


            res.push({
                resJoinOffice:resJoinOffice,
                resCancelDate:resCancelDate,
                resAcquisitionDate:resAcquisitionDate,
                resCompanyIdentityNo:resCompanyIdentityNo,
                resJoinUserType:resJoinUserType,
                resCompanyNm:resCompanyNm,
                resInsuranceAmtList:resInsuranceAmtList,
                commStartDate:commStartDate,
                commEndDate:commEndDate,
                resIssueDate:resIssueDate,
                resUserIdentiyNo:resUserIdentiyNo,
                resUserNm:resUserNm,
                resIssueNo:resIssueNo,                
                resYETaxRectalHealthNoticeAmt:resYETaxRectalHealthNoticeAmt,
                resYETaxRectalLTCNoticeAmt	:resYETaxRectalLTCNoticeAmt,	
                resYETaxRectalHealthPayAmt	:resYETaxRectalHealthPayAmt,	
                resYETaxRectalLTCPayAmt     :resYETaxRectalLTCPayAmt

            });

        })

        return {
            statusCode:200,
            body:res
        }


    } catch (error) {
        console.log(error);
        return {
            statusCode:500,
            body:"fail_parsingIssuanceData"
        }
    }
}

function parsingPrice(data, month){
    const result = {};
    result["resPayMonth"] = month;

    
    if(data.length==8){
        result["resIncomesLTCNoticeAmt"] = data[7];
        result["resIncomesHealthNoticeAmt"] = data[6];
        result["resIncomesLTCPayAmt"] = data[3];
        result["resIncomesHealthPayAmt"] = data[2];
        result["resRectalLTCPayAmt"] = data[5];
        result["resRectalHealthPayAmt"] = data[4];
        result["resRectalLTCNoticeAmt"] = data[1];
        result["resRectalHealthNoticeAmt"] = data[0];    
    }else if(data.length==4){

        // "21.068": [
        //     "22,590",   // 건강보험료 고지금액
        //     "2,310",    // 장기요양 고지금액
        //     "22,590",   // 건강보험료 납부
        //     "2,310"     // 장기요양 납부
        //   ],

        result["resIncomesLTCNoticeAmt"] = "0";
        result["resIncomesHealthNoticeAmt"] = "0";
        result["resIncomesLTCPayAmt"] = "0";
        result["resIncomesHealthPayAmt"] = "0";
        result["resRectalLTCPayAmt"] = data[3];
        result["resRectalHealthPayAmt"] = data[2];
        result["resRectalLTCNoticeAmt"] = data[1];
        result["resRectalHealthNoticeAmt"] = data[0]; 
        
    }

    return result;

}
function readPDFPages (password,buffer) {
    const reader = new PdfReader({ password: password });
    // We're returning a Promise here, as the PDF reading
    // operation is asynchronous.
    return new Promise((resolve, reject) => {
      // Each item in this array represents a page in the PDF
      let pages = [];
      reader.parseBuffer(buffer, (err, item) => {
        if (err)
          // If we've got a problem, eject!
          reject(err)
        else if (!item)
          // If we're out of items, resolve with the data structure
          resolve(pages);
        else if (item.page)
          // If the parser's reached a new page, it's time to
          // work on the next page object in our pages array.
          pages.push({});
        else if (item.text) {
          // If we have NOT got a new page item, then we need
          // to either retrieve or create a new "row" array
          // to represent the collection of text items at our
          // current Y position, which will be this item's Y
          // position.
          // Hence, this line reads as,
          // "Either retrieve the row array for our current page,
          //  at our current Y position, or make a new one"
          const row = pages[pages.length-1][item.y] || [];
          // Add the item to the reference container (i.e.: the row)
          row.push(item.text);
          // Include the container in the current page
          pages[pages.length-1][item.y] = row;
        }
      });
    });
  }

module.exports = Nhis;
