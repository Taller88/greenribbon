const axios = require('axios');
const {cookieParser, sliceFunc, base64decoding, isJuminNo, cookieRefresh} = require('../common/commonFunc');
const cheerio = require('cheerio');
const {putItem, selectItem} =  require('../dbCrud/DynamoDB_local');
const {base64Encoding} = require('../common/commonFunc');

function Hira(){
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

// 보안문자를 받아야하기 때문에 먼저 요청해야함 
Hira.prototype.문자Init = async function(Input){
    let response = {};
    let postData = "";
    let header = {};
    const host = "https://ptl.hira.or.kr";
    const niceHost = 'https://nice.checkplus.co.kr';
    
    try {
        const uuid = Input.uuid;
        const telecom = Input.telecom;
        let mobileco = null;

        //SKT:0,SKM:4,KTF:8,KTM:12,LGT:16,LGM:20};
        switch(telecom){
            case "0":
                mobileco = "SKT"
                break;
            case "1":
                mobileco = "KTF"
                break;

            case "2":
                mobileco = "LGT"
                break;

            case "3":
                mobileco = "SKM"
                break;

            case "4":
                mobileco = "KTM"
                break;

            case "5":
                mobileco = "LGM"
                break;
        }

        const mvnoCo = mobileco;

        header ={}
        // GET https://ptl.hira.or.kr/main.do?pageType=certByJ&domain=https://www.hira.or.kr&uri=JTJGcmIlMkZjbW1uJTJGcmJDZXJ0UmV0dXJuLmRvJTNGc3RyUGFnZVR5cGUlM0RESUFH HTTP/1.1
        header['Host']='ptl.hira.or.kr'
        header['Connection']='keep-alive'
        header['sec-ch-ua']='"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"'
        header['sec-ch-ua-mobile']='?0'
        header['sec-ch-ua-platform']='"Windows"'
        header['Upgrade-Insecure-Requests']='1'
        header['User-Agent']='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
        header['Accept']='text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7'
        header['Sec-Fetch-Site']='same-site'
        header['Sec-Fetch-Mode']='navigate'
        header['Sec-Fetch-User']='?1'
        header['Sec-Fetch-Dest']='document'
        header['Accept-Encoding']='gzip, deflate, br'
        header['Accept-Language']='ko-KR,ko;q=0.9'

        result = await axios({
            method:'GET',
            url:host+'/main.do?pageType=certByJ&domain=https://www.hira.or.kr&uri=JTJGcmIlMkZjbW1uJTJGcmJDZXJ0UmV0dXJuLmRvJTNGc3RyUGFnZVR5cGUlM0RESUFH',
            headers:header
        });

        console.log("[module] 문자 init main.do completed!")

        let cookie = cookieParser(result);

        // POST https://ptl.hira.or.kr/common/signInfo.do HTTP/1.1
        header['Host']='ptl.hira.or.kr'
        header['Connection']='keep-alive'
        header['Content-Length']='0'
        header['sec-ch-ua']='"Chromium";v="118", "Google Chrome";v="118", "Not=A?Brand";v="99"'
        header['Content-Type']='application/x-www-form-urlencoded; charset=UTF-8'
        header['X-Requested-With']='XMLHttpRequest'
        header['sec-ch-ua-mobile']='?0'
        header['User-Agent']='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36'
        header['sec-ch-ua-platform']='"Windows"'
        header['Accept']='*/*'
        header['Origin']='https://ptl.hira.or.kr'
        header['Sec-Fetch-Site']='same-origin'
        header['Sec-Fetch-Mode']='cors'
        header['Sec-Fetch-Dest']='empty'
        header['Referer']='https://ptl.hira.or.kr/main.do?pageType=certByJ&domain=https://www.hira.or.kr&uri=JTJGcmIlMkZjbW1uJTJGcmJDZXJ0UmV0dXJuLmRvJTNGc3RyUGFnZVR5cGUlM0RESUFH'
        header['Accept-Encoding']='gzip, deflate, br'
        header['Accept-Language']='ko-KR,ko;q=0.9'
        header['Cookie']=cookie;
        
        postData = ""

        // 세션 등록 및 재발행
        result = await axios({
            method:'POST',
            url:host+'/common/signInfo.do',
            data:postData,
            headers:header
        });

        const newCookie = cookieParser(result);

        // 기존에 발급받은 JSESSIONID 재발행 
        cookie = cookieRefresh(cookie, newCookie);
        
        header = {}
        // POST https://ptl.hira.or.kr/co/checkplus/create.do HTTP/1.1
        header['Host']='ptl.hira.or.kr'
        header['Connection']='keep-alive'
        header['Cache-Control']='max-age=0'
        header['sec-ch-ua']='"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"'
        header['sec-ch-ua-mobile']='?0'
        header['sec-ch-ua-platform']='"Windows"'
        header['Upgrade-Insecure-Requests']='1'
        header['Origin']='https://ptl.hira.or.kr'
        header['Content-Type']='application/x-www-form-urlencoded'
        header['User-Agent']='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
        header['Accept']='text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7'
        header['Sec-Fetch-Site']='same-origin'
        header['Sec-Fetch-Mode']='navigate'
        header['Sec-Fetch-Dest']='document'
        header['Referer']='https://ptl.hira.or.kr/main.do?pageType=certByJ&domain=https://www.hira.or.kr&uri=JTJGcmIlMkZjbW1uJTJGcmJDZXJ0UmV0dXJuLmRvJTNGc3RyUGFnZVR5cGUlM0RESUFH'
        header['Accept-Encoding']='gzip, deflate, br'
        header['Accept-Language']='ko-KR,ko;q=0.9'
        header['Cookie']=cookie;

        postData = 'authType=M&isHttp=https&isAbledBank=nice&domain=https%3A%2F%2Fptl.hira.or.kr'
        
        result = await axios({
            method:'POST',
            url:host+'/co/checkplus/create.do',
            headers:header,
            data:postData
        });

        
        console.log("[module] 문자 init create.do completed!")

        // 인증후 필요
        const ptlCookie = cookie;

        const EncodeData = sliceFunc(result.data, 'name="EncodeData" value="', '" />');
        const mValue = sliceFunc(result.data, '" name="m" value="', '" />');

        // POST https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb HTTP/1.1
        header['Host']='nice.checkplus.co.kr'
        header['Connection']='keep-alive'
        header['Cache-Control']='max-age=0'
        header['sec-ch-ua']='"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"'
        header['sec-ch-ua-mobile']='?0'
        header['sec-ch-ua-platform']='"Windows"'
        header['Upgrade-Insecure-Requests']='1'
        header['Origin']='https://ptl.hira.or.kr'
        header['Content-Type']='application/x-www-form-urlencoded'
        header['User-Agent']='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
        header['Accept']='text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7'
        header['Sec-Fetch-Site']='cross-site'
        header['Sec-Fetch-Mode']='navigate'
        header['Sec-Fetch-Dest']='document'
        header['Referer']='https://ptl.hira.or.kr/'
        header['Accept-Encoding']='gzip, deflate, br'
        header['Accept-Language']='ko-KR,ko;q=0.9'

        postData = 'm='+mValue+'&EncodeData='+encodeURIComponent(EncodeData);

        result = await axios({
            method:'POST',
            url:niceHost+'/CheckPlusSafeModel/checkplus.cb',
            data:postData,
            headers:header
        });


        console.log(cookieParser(result));
        // const JSESSIONID = sliceFunc(cookieParser(result), '; JSESSIONID=', ';')
        cookie = cookieParser(result);

        console.log(cookie)
        const strArr = sliceFunc(result.data, "callTracerApiInput('", ");").split("', '");
        const hostStr = strArr[0]
        const ipStr = strArr[1]

        var start = 10000;
        var end = 99999;
        var rand = Math.floor((Math.random() * (end - start + 1)) + start);
        const loginId = strArr[2] + "_T_" + rand + "_WC";
        const port = strArr[3]

        console.log("/CheckPlusSafeModel/checkplus.cb completed!")

        // POST https://ifc.niceid.co.kr/TRACERAPI/inputQueue.do HTTP/1.1
        header['Host']='ifc.niceid.co.kr'
        header['Connection']='keep-alive'
        header['sec-ch-ua']='"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"'
        header['Accept']='*/*'
        header['Content-Type']='application/x-www-form-urlencoded; charset=UTF-8'
        header['sec-ch-ua-mobile']='?0'
        header['User-Agent']='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
        header['sec-ch-ua-platform']='"Windows"'
        header['Origin']='https://nice.checkplus.co.kr'
        header['Sec-Fetch-Site']='cross-site'
        header['Sec-Fetch-Mode']='cors'
        header['Sec-Fetch-Dest']='empty'
        header['Referer']='https://nice.checkplus.co.kr/'
        header['Accept-Encoding']='gzip, deflate, br'
        header['Accept-Language']='ko-KR,ko;q=0.9'
        
        const queData = {
            ipStr:ipStr,
            loginId:loginId,
            port:port            
        }

        postData = 'host='+hostStr+'&ip='+ipStr+'&loginId='+loginId+'&port='+port+'&pageUrl=service&userAgent='+encodeURIComponent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36')
        result = await axios({
            method:'POST',
            url:'https://ifc.niceid.co.kr/TRACERAPI/inputQueue.do',
            data:postData,
            headers:header
        });

        const wcCookie = sliceFunc(result.data, '"loginId" type="String">', '</Parameter');
        
        cookie+=("wcCookie="+wcCookie+";");

        // POST https://nice.checkplus.co.kr/CheckPlusSafeModel/service.cb HTTP/1.1
        header = {}
        header['Host']='nice.checkplus.co.kr'
        header['Connection']='keep-alive'
        header['Cache-Control']='max-age=0'
        header['sec-ch-ua']='"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"'
        header['sec-ch-ua-mobile']='?0'
        header['sec-ch-ua-platform']='"Windows"'
        header['Upgrade-Insecure-Requests']='1'
        header['Origin']='https://nice.checkplus.co.kr'
        header['Content-Type']='application/x-www-form-urlencoded'
        header['User-Agent']='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
        header['Accept']='text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7'
        header['Sec-Fetch-Site']='same-origin'
        header['Sec-Fetch-Mode']='navigate'
        header['Sec-Fetch-Dest']='document'
        header['Referer']='https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb'
        header['Accept-Encoding']='gzip, deflate, br'
        header['Accept-Language']='ko-KR,ko;q=0.9'
        header['Cookie']=cookie;

        postData = 'm=serviceMain'

        result = await axios({
            method:'POST',
            url:niceHost+'/CheckPlusSafeModel/service.cb',
            headers:header,
            validateStatus: function (status) {
                return status == 302 || status == 200;
              },
            data:postData
        });


        console.log("[module] 문자 init checkplus.cb completed!")

        cookie += cookieParser(result);

        let menuId = sliceFunc(result.data, 'var menuId = "', '";');
      
        header = {};

        // POST https://nice.checkplus.co.kr/CheckPlusSafeModel/service.cb HTTP/1.1
        header['Host']='nice.checkplus.co.kr'
        header['Connection']='keep-alive'
        header['Cache-Control']='max-age=0'
        header['sec-ch-ua']='"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"'
        header['sec-ch-ua-mobile']='?0'
        header['sec-ch-ua-platform']='"Windows"'
        header['Upgrade-Insecure-Requests']='1'
        header['Origin']='https://nice.checkplus.co.kr'
        header['Content-Type']='application/x-www-form-urlencoded'
        header['User-Agent']='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
        header['Accept']='text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7'
        header['Sec-Fetch-Site']='same-origin'
        header['Sec-Fetch-Mode']='navigate'
        header['Sec-Fetch-User']='?1'
        header['Sec-Fetch-Dest']='document'
        header['Referer']='https://nice.checkplus.co.kr/CheckPlusSafeModel/service.cb?m=authMobileMain'
        header['Accept-Encoding']='gzip, deflate, br'
        header['Accept-Language']='ko-KR,ko;q=0.9'
        header['Cookie']=cookie;

        //mobileco: LGM , mvnoCo: LGM
        postData = 'm=authMobile01'
        postData += '&mobileco='+ mobileco
        postData += '&mobileAuthType=SMS'
        postData += '&nciInfo='
        postData += '&menuId='+menuId
        postData += '&agree=on'
        postData += '&agree1=Y'
        postData += '&agree2=Y'
        postData += '&agree3=Y'
        postData += '&agree4=Y'
        postData += '&agree6=Y'
        if(Number(telecom)>2){
            postData += '&mvnoCo='+mvnoCo
        }

        result = await axios({
            method:'POST',
            url:niceHost+'/CheckPlusSafeModel/service.cb',
            data:postData,
            headers:header
        });

        console.log("[module] 문자 init checkplus.cb completed!")


        const captchaImgVersion = sliceFunc(result.data, 'var captchaImgVersion="', '";');
        menuId = sliceFunc(result.data, 'menuId = "', '";');

        header = {}
        // GET https://nice.checkplus.co.kr/Common/service.cb?m=simpleCaptchaInfo&ver=MOBILE1697119583774 HTTP/1.1
        header['Host']='nice.checkplus.co.kr'
        header['Connection']='keep-alive'
        header['sec-ch-ua']='"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"'
        header['sec-ch-ua-mobile']='?0'
        header['User-Agent']='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
        header['sec-ch-ua-platform']='"Windows"'
        header['Accept']='image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
        header['Sec-Fetch-Site']='same-origin'
        header['Sec-Fetch-Mode']='no-cors'
        header['Sec-Fetch-Dest']='image'
        header['Referer']='https://nice.checkplus.co.kr/CheckPlusSafeModel/service.cb'
        header['Accept-Encoding']='gzip, deflate, br'
        header['Accept-Language']='ko-KR,ko;q=0.9'
        header['Cookie']=cookie;

        result = await axios({
            method:'GET',
            url:niceHost+'/Common/service.cb?m=simpleCaptchaInfo&ver='+captchaImgVersion,
            headers:header,
            responseType: 'arraybuffer'
        });

        console.log("[module] 보안문자 불러오기 성공!")

        const imageData = result.data;
    
        // 전달받은 보안문자를 base64로 인코딩
        const buffer = Buffer.from(imageData, 'binary').toString('base64');
    

        const dbParam = {
            uuid:uuid,
            cookie:cookie,
            menuId:menuId,
            ptlCookie:ptlCookie,
            queData:queData
        }

        const dbResult = await putItem(dbParam);

        if(dbResult.statusCode!=200){
            return {
                statusCode:500,
                body:"dberror"
            }    
        }


        response = {
            statusCode:200,
            body:buffer
        }


    }catch(error){
        console.log("[module] 문자Init error");
        console.log(error);
        response = {
            statusCode:500,
            body:error.message
        }
    }

    return response;
}
Hira.prototype.문자요청 = async function(Input){
    let response = {};
    let postData = "";
    let header = {};
    const host = "https://nice.checkplus.co.kr";

    try {
        const uuid = Input.uuid
        const username = Input.userName;
        const mynum1 = Input.identity.substring(0, 6);
        const mynum2 = Input.identity.substring(6, 7);
        const mobileno = Input.phoneNo;
        const answer = Input.captchaImg;

        // 문자인증 확인하고 추가 통신에서 필요 -> DB에 저장만
        const identity = Input.identity;
        

        if(uuid==undefined|| uuid==""){
            return {
                statusCode:500,
                body:"putUuid"
            }
        }

        let dbResult = await selectItem(uuid);
        
        if(JSON.stringify(dbResult)==="{}"){
            return {
                statusCode:400,
                body:"LOGINFIRST"
            }
        }
        const dbItem = dbResult.Item;

        console.log(dbItem)
        let cookie = dbItem.cookie;
        let menuId = dbItem.menuId;
        const ptlCookie = dbItem.ptlCookie;
        const queData = dbItem.queData;

        
        // POST https://nice.checkplus.co.kr/CheckPlusSafeModel/service.cb HTTP/1.1
        header['Host']='nice.checkplus.co.kr'
        header['Connection']='keep-alive'
        header['sec-ch-ua']='"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"'
        header['Accept']='*/*'
        header['Content-Type']='application/x-www-form-urlencoded; charset=UTF-8'
        header['X-Requested-With']='XMLHttpRequest'
        header['sec-ch-ua-mobile']='?0'
        header['User-Agent']='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
        header['sec-ch-ua-platform']='"Windows"'
        header['Origin']='https://nice.checkplus.co.kr'
        header['Sec-Fetch-Site']='same-origin'
        header['Sec-Fetch-Mode']='cors'
        header['Sec-Fetch-Dest']='empty'
        header['Referer']='https://nice.checkplus.co.kr/CheckPlusSafeModel/service.cb'
        header['Accept-Encoding']='gzip, deflate, br'
        header['Accept-Language']='ko-KR,ko;q=0.9'
        header['Cookie']=cookie;
        
        postData = 'm=authMobile01Proc'
        postData += '&authType=SMS'
        postData += '&menuId='+menuId
        postData += '&username='+encodeURIComponent(username)
        postData += '&mynum1='+mynum1
        postData += '&mynum2='+mynum2
        postData += '&mobileno='+mobileno
        postData += '&answer='+answer

        result = await axios({
            method:'POST',
            url:host+'/CheckPlusSafeModel/service.cb ',
            data:postData,
            headers:header
        });

        const RES_MENU_ID = result.data["RES_MENU_ID"];
        const RES_CD = result.data["RES_CD"];
        console.log(result.data)
        // 인증요청 오류: 개인정보오류 , 토큰 만료 등등
        if(RES_CD!="0000"){
            // 0001: 인증번호 틀렸을때 
            // 0002 : 아마 토큰 만료
            response = {
                statusCode:400,
                body:result.data["RES_RESULT"]
            }
        }else{

            // POST https://nice.checkplus.co.kr/CheckPlusSafeModel/service.cb HTTP/1.1
            header['Host']='nice.checkplus.co.kr'
            header['Connection']='keep-alive'
            header['Cache-Control']='max-age=0'
            header['sec-ch-ua']='"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"'
            header['sec-ch-ua-mobile']='?0'
            header['sec-ch-ua-platform']='"Windows"'
            header['Upgrade-Insecure-Requests']='1'
            header['Origin']='https://nice.checkplus.co.kr'
            header['Content-Type']='application/x-www-form-urlencoded'
            header['User-Agent']='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
            header['Accept']='text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7'
            header['Sec-Fetch-Site']='same-origin'
            header['Sec-Fetch-Mode']='navigate'
            header['Sec-Fetch-User']='?1'
            header['Sec-Fetch-Dest']='document'
            header['Referer']='https://nice.checkplus.co.kr/CheckPlusSafeModel/service.cb'
            header['Accept-Encoding']='gzip, deflate, br'
            header['Accept-Language']='ko-KR,ko;q=0.9'
            header['Cookie']=cookie;

            postData = 'm=authMobile02'

            result = await axios({
                method:'POST',
                url:host+'/CheckPlusSafeModel/service.cb ',
                data:postData,
                headers:header
            });
        
            menuId = sliceFunc(result.data, 'var menuId = "', '";');

            // 요청 성공시 refresh된 menuId 찾기
            const dbParam = {
                uuid:uuid,
                cookie:cookie,
                menuId:menuId,
                identity:identity,
                ptlCookie:ptlCookie,
                queData: queData
            }
    
            dbResult = await putItem(dbParam);
    
            if(dbResult.statusCode!=200){
                return {
                    statusCode:500,
                    body:"dberror"
                }    
            }
    
            response = {
                statusCode:200,
                body:"success_sms_request"
            }

        }

    } catch (error) {
        console.log("[module] 문자요청 error");
        console.log(error);
        response = {
            statusCode:500,
            body:error.message
        }

    }

    return response;

}


Hira.prototype.문자확인 = async function(Input){
    let response = {};
    let postData = "";
    const host = "https://nice.checkplus.co.kr";
    let header = {};

    try {

        const authNum = Input.authNum;
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

        let menuId = dbItem.menuId;
        let cookie = dbItem.cookie;
        const identity = dbItem.identity;
        const ptlCookie = dbItem.ptlCookie;

        const queData = dbItem.queData;

        // 인증번호가 틀렸을때 이것만 바꿔서 다시 요청
        const resMenuId = dbItem.RES_MENU_ID;

        // 인증번호 확인하는 단계에서 실패해서 재시도하는 경우 menuId가 있고 
        // menuId가 없는 경우는 인증확인을 처음하는 단계
        if(resMenuId){
            menuId = resMenuId
        }

        // POST https://nice.checkplus.co.kr/CheckPlusSafeModel/service.cb HTTP/1.1
        header['Host']='nice.checkplus.co.kr'
        header['Connection']='keep-alive'
        header['sec-ch-ua']='"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"'
        header['Accept']='*/*'
        header['Content-Type']='application/x-www-form-urlencoded; charset=UTF-8'
        header['X-Requested-With']='XMLHttpRequest'
        header['sec-ch-ua-mobile']='?0'
        header['User-Agent']='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
        header['sec-ch-ua-platform']='"Windows"'
        header['Origin']='https://nice.checkplus.co.kr'
        header['Sec-Fetch-Site']='same-origin'
        header['Sec-Fetch-Mode']='cors'
        header['Sec-Fetch-Dest']='empty'
        header['Referer']='https://nice.checkplus.co.kr/CheckPlusSafeModel/service.cb'
        header['Accept-Encoding']='gzip, deflate, br'
        header['Accept-Language']='ko-KR,ko;q=0.9'
        header['Cookie']=cookie;

        postData = 'm=authMobile02Proc&menuId='+menuId+'&authnumber='+authNum

        result = await axios({
            method:'POST',
            url:host+'/CheckPlusSafeModel/service.cb',
            data:postData,
            headers:header
        });

        menuId = result.data["RES_MENU_ID"];
        //{"RES_MENU_ID":"b00acd77c4fa645715bbdfa4b16216e7ae811687e4047c724503ba30c4a2f9b7","RES_CD":"0000"}

        let dbParam = {
            uuid:uuid,
            cookie:cookie,
            queData:queData,
            ptlCookie:ptlCookie,
            identity:identity
        }

        
        if(result.data["RES_CD"]!="0000"){
            // 인증번호가 틀린경우 or 다른 에러케이스
            
            dbParam["RES_MENU_ID"] = menuId
            
            const RES_RESULT = result.data["RES_RESULT"];
            response = {
                statusCode:400,
                body:RES_RESULT
            }
        }else{
            // 인증 성공시 필요 통신 보내기
            header= {}
            // POST https://nice.checkplus.co.kr/CheckPlusSafeModel/service.cb HTTP/1.1
            header['Host']='nice.checkplus.co.kr'
            header['Connection']='keep-alive'
            header['Cache-Control']='max-age=0'
            header['sec-ch-ua']='"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"'
            header['sec-ch-ua-mobile']='?0'
            header['sec-ch-ua-platform']='"Windows"'
            header['Upgrade-Insecure-Requests']='1'
            header['Origin']='https://nice.checkplus.co.kr'
            header['Content-Type']='application/x-www-form-urlencoded'
            header['User-Agent']='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
            header['Accept']='text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7'
            header['Sec-Fetch-Site']='same-origin'
            header['Sec-Fetch-Mode']='navigate'
            header['Sec-Fetch-User']='?1'
            header['Sec-Fetch-Dest']='document'
            header['Referer']='https://nice.checkplus.co.kr/CheckPlusSafeModel/service.cb'
            header['Accept-Encoding']='gzip, deflate, br'
            header['Accept-Language']='ko-KR,ko;q=0.9'
            header['Cookie']=cookie;
            
            postData = 'm=serviceResultSend'

            result = await axios({
                method:'POST',
                url:host+'/CheckPlusSafeModel/service.cb',
                data:postData,
                headers:header
            });
            
            const nextUrl = sliceFunc(result.data, 'location.href = "', '";');
            cookie = ptlCookie;
            console.log("ptlCookie: "+ ptlCookie)
            console.log("nextUrl: "+ nextUrl)

            var hostArray = new Array('COMMON_CHECKPLUS','COMMON_MOBILE','COMMON_MOBILE_LGU'); // 유량제어 항목이 여러개라 배열로 동시에 처리
		    const ipStr = queData["ipStr"]
            const loginId = queData["loginId"]
            const port = queData["port"]
            
            for (var i = 0 ; i < hostArray.length;i++) { 
		    	var hostElement  = hostArray[i];

                header = {};
                // POST https://ifc.niceid.co.kr/TRACERAPI/outQueue.do HTTP/1.1
                header['Host']='ifc.niceid.co.kr'
                header['Connection']='keep-alive'
                header['sec-ch-ua']='"Chromium";v="118", "Google Chrome";v="118", "Not=A?Brand";v="99"'
                header['Accept']='*/*'
                header['Content-Type']='application/x-www-form-urlencoded; charset=UTF-8'
                header['sec-ch-ua-mobile']='?0'
                header['User-Agent']='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36'
                header['sec-ch-ua-platform']='"Windows"'
                header['Origin']='https://nice.checkplus.co.kr'
                header['Sec-Fetch-Site']='cross-site'
                header['Sec-Fetch-Mode']='cors'
                header['Sec-Fetch-Dest']='empty'
                header['Referer']='https://nice.checkplus.co.kr/'
                header['Accept-Encoding']='gzip, deflate, br'
                header['Accept-Language']='ko-KR,ko;q=0.9'

                postData = 'host='+hostElement+'&ip='+ipStr+'&loginId='+loginId+'&port='+port+'&pageUrl=result'
                result = await axios({
                    method:'POST',
                    url:'https://ifc.niceid.co.kr/TRACERAPI/outQueue.do',
                    headers:header,
                    data:postData
                });
            }


            header = {};
            // GET https://ptl.hira.or.kr/co/checkplus/success.do?EncodeData=AgAFRzU5NTUsTO8hMkr8LtYINWjyFfqs3Z8SaCfRy3ipCYbCak3QkTruoc38NKOhBxkvXUaR1JgmONIZFgt3FISsVN0uBkpvQnJl2o/R9j2n/uY7Bj/JPiOeTTjbTN1OGKbFTprtkiJunFl0HnA0RmhX9TrNMx0e8pg5zijLYesoeqG4R7GIzSVmJoUR0%2B6HKCTYT4dg5HSDmQ3Bc0RmG2YRwDpjWNRIAzl2UkDP2Erg5fLeRrfTrT5MQU0OlHSpMErMzh9/22IUVgD/sfOMIgKdHbPeJOaw3V%2BZ5iLikfBY%2BwiYuHlXl/3kZR9EPwtH6j9dCnT2sem3qFox3pyLeuvmOwTrbxyOrqpzcVVGX7F/V%2B1bmVZ9r8lUoyrGzzAYQ/D2W289v5AcvdzimOiz1Ce2pas5K8m4cq8E2bZPGhZTNpm5pKoCpL0Dx2Tq4hclKk5nb3f%2B%2BmsRqlDyX46YUwvQ6YrKLdh2pswzFztUK3n2HG3H69E0Wb1wXvY0PhdPqGscdvFASdCengDwiOHiwx/z/5gv%2B2mM4oWdN%2BJyvwp5witJUjRampUhnlBmM4TMnf2GzxBfM5myMrk4xglBKgFDUkGAou1GnfMU6r6eF/tQbqlc/x0PwcauVHuC2W/9kwpHLUjj24/ccg%2Bxns7bkaGMN6YjC1v9%2BQVDpWM8559Z9GzK3pQgVCQbOLeVnL7wCvCG1i/zWu4= HTTP/1.1
            header['Host']='ptl.hira.or.kr'
            header['Connection']='keep-alive'
            header['sec-ch-ua']='"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"'
            header['sec-ch-ua-mobile']='?0'
            header['sec-ch-ua-platform']='"Windows"'
            header['Upgrade-Insecure-Requests']='1'
            header['User-Agent']='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
            header['Accept']='text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7'
            header['Sec-Fetch-Site']='cross-site'
            header['Sec-Fetch-Mode']='navigate'
            header['Sec-Fetch-Dest']='document'
            header['Referer']='https://nice.checkplus.co.kr/'
            header['Accept-Encoding']='gzip, deflate, br'
            header['Accept-Language']='ko-KR,ko;q=0.9'
            header['Cookie']=cookie;

            result = await axios({
                method:'GET',
                url:nextUrl,
                headers:header
            });

            header = {};
            // POST https://ptl.hira.or.kr/pl/login/certByJumin.do HTTP/1.1
            header['Host']='ptl.hira.or.kr'
            header['Connection']='keep-alive'
            header['sec-ch-ua']='"Chromium";v="118", "Google Chrome";v="118", "Not=A?Brand";v="99"'
            header['Content-Type']='application/x-www-form-urlencoded; charset=UTF-8'
            header['X-Requested-With']='XMLHttpRequest'
            header['sec-ch-ua-mobile']='?0'
            header['User-Agent']='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36'
            header['sec-ch-ua-platform']='"Windows"'
            header['Accept']='*/*'
            header['Origin']='https://ptl.hira.or.kr'
            header['Sec-Fetch-Site']='same-origin'
            header['Sec-Fetch-Mode']='cors'
            header['Sec-Fetch-Dest']='empty'
            header['Referer']='https://ptl.hira.or.kr/main.do?pageType=certByJ&domain=https://www.hira.or.kr&uri=JTJGcmIlMkZjbW1uJTJGcmJDZXJ0UmV0dXJuLmRvJTNGc3RyUGFnZVR5cGUlM0RESUFH'
            header['Accept-Encoding']='gzip, deflate, br'
            header['Accept-Language']='ko-KR,ko;q=0.9'
            header['Cookie']=cookie;

            postData = '%40d1%23usr_nm='
            postData += '&%40d1%23jumin_no='+identity
            postData += '&%40d1%23jumin_no1='+identity.substring(0, 6)
            postData += '&%40d1%23jumin_no2='+identity.substring(6)
            postData += '&%40d1%23domain=https%3A%2F%2Fwww.hira.or.kr'
            postData += '&%40d1%23uri=JTJGcmIlMkZjbW1uJTJGcmJDZXJ0UmV0dXJuLmRvJTNGc3RyUGFnZVR5cGUlM0RESUFH'
            postData += '&%40d1%23resParam='
            postData += '&%40d1%23resToken='
            postData += '&%40d1%23resultCode='
            postData += '&%40d%23=%40d1%23'
            postData += '&%40d1%23=dmParam'
            postData += '&%40d1%23tp=dm'
            postData += '&'

            result = await axios({
                method:'POST',
                url:"https://ptl.hira.or.kr/pl/login/certByJumin.do",
                headers:header,
                data:postData
            });
            

            resultData = result.data;

            console.log(resultData);
            if(resultData["dmResult"]==undefined||resultData["dmResult"]["tknSno"]==undefined||resultData["dmResult"]["returnUrl"]==undefined){
                console.log(resultData);
                return {
                    statusCode:500,
                    body:"Fail_Issue_Session"
                }
            }

            const tknSno = resultData["dmResult"]["tknSno"];
            const returnUrl = resultData["dmResult"]["returnUrl"];


            // GET https://www.hira.or.kr/rb/cmmn/rbCertReturn.do?strPageType=DIAG&tknId=bef00e43-2277-40e7-9481-b45572bf0210 HTTP/1.1
            header['Host']='www.hira.or.kr'
            header['Connection']='keep-alive'
            header['sec-ch-ua']='"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"'
            header['sec-ch-ua-mobile']='?0'
            header['sec-ch-ua-platform']='"Windows"'
            header['Upgrade-Insecure-Requests']='1'
            header['User-Agent']='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
            header['Accept']='text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7'
            header['Sec-Fetch-Site']='same-site'
            header['Sec-Fetch-Mode']='navigate'
            header['Sec-Fetch-User']='?1'
            header['Sec-Fetch-Dest']='document'
            header['Referer']='https://ptl.hira.or.kr/'
            header['Accept-Encoding']='gzip, deflate, br'
            header['Accept-Language']='ko-KR,ko;q=0.9'
            // header['Cookie']=cookie;
            //  WT_FPC=id=24b2367346f88547a111694251389042:lv=1694251403760:ss=1694251389042

            result = await axios({
                method:'GET',
                url:returnUrl+'&tknId='+tknSno,
                headers:header,
                maxRedirects: 0,
                validateStatus: function (status) {
                    return status == 302 || status == 200;
                  }
            });


            const path = result.headers.location;
            cookie = cookieParser(result);
            if(result.status!=302 || cookie.indexOf("SESSION=")==-1 || path==undefined){
                console.log("cookie: "+cookie)
                return {
                    statusCode:500,
                    body:"Fail_Issue_Session"
                }
            }


            const originHost = "https://www.hira.or.kr";
            // GET https://www.hira.or.kr/rb/diag/selectMyDiagInfmList.do?pgmid=HIRAA070001000600 HTTP/1.1
            header['Host']='www.hira.or.kr'
            header['Connection']='keep-alive'
            header['Upgrade-Insecure-Requests']='1'
            header['User-Agent']='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
            header['Accept']='text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7'
            header['Sec-Fetch-Site']='same-site'
            header['Sec-Fetch-Mode']='navigate'
            header['Sec-Fetch-User']='?1'
            header['Sec-Fetch-Dest']='document'
            header['sec-ch-ua']='"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"'
            header['sec-ch-ua-mobile']='?0'
            header['sec-ch-ua-platform']='"Windows"'
            header['Referer']='https://ptl.hira.or.kr/'
            header['Accept-Encoding']='gzip, deflate, br'
            header['Accept-Language']='ko-KR,ko;q=0.9'
            header['Cookie']=cookie;

            result = await axios({
                method:'GET',
                url:originHost+path,
                headers:header
            });

            const patHpin = sliceFunc(result.data, 'var patHpin = "', '";');
            const patNm = sliceFunc(result.data, 'var patNm = "', '";');



            dbParam = {
                uuid:uuid,
                cookie:cookie,
                patHpin:patHpin,
                patNm:patNm

            }

            console.log(dbParam)
            response = {
                statusCode:200,
                body:"success_auth"
            }
            
        }

        const dbPutResult = await putItem(dbParam);

        if(dbPutResult.statusCode!=200){
            return {
                statusCode:500,
                body:"dberror"
            }    
        }

    } catch (error) {
        console.log("[module] 문자확인 error");
        console.log(error);

        response = {
            statusCode:500,
            body:error.message
        }
    }

    return response;

}

Hira.prototype.간편로그인 = async function(Input){
    const host = "https://ptl.hira.or.kr";
    const loginHost = "https://ptl.hira.or.kr";
    let header = {};
    let postData = "";
    let result= null;
   
    try {

        console.log("[module] hira 간편로그인 init");
        const uuid = Input.uuid;
        
        

        const phoneNo= Input.phoneNo;
        const userName= Input.userName;
        const identity= Input.identity;
        const telecom= Input.telecom;
        const loginTypeLevel = Input.loginTypeLevel;

        // const organization = Input.organization;
        // const loginType= Input.loginType;
        // const loginTypeLevel= Input.loginTypeLevel;
        // const startDate= Input.startDate;
        // const endDate= Input.endDate;
        // const id= Input.id;
        // const type= Input.type;

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
            identity==undefined
            ){

                return {
                    statusCode:400,
                    body:"not_entered_param"
                }
        }

        const name = base64Encoding(userName);
        const phone = base64Encoding(phoneNo);
        const phone1 = base64Encoding(phoneNo.substring(4,8));
        const phone2 = base64Encoding(phoneNo.substring(8,12));
        const ssn1 = base64Encoding(identity.substring(0,6));
        const ssn2 = base64Encoding(identity.substring(6));

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

        if(!isJuminNo(identity)){
            return {
                statusCode:400,
                body:"wrong_ssn"
            }
        }
        // "0":SKT
        // "1":KT
        // "2":LG U+
        // "3":알뜰폰 (SKT)
        // "4":알뜰폰(KT)
        // "5":알뜰폰(LG U+)


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
        
        // GET https://ptl.hira.or.kr/main.do?pageType=certByJ&domain=https://www.hira.or.kr&uri=JTJGcmIlMkZjbW1uJTJGcmJDZXJ0UmV0dXJuLmRvJTNGc3RyUGFnZVR5cGUlM0RESUFH HTTP/1.1
        header['Host']='ptl.hira.or.kr'
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
            url:host+'/main.do?pageType=certByJ&domain=https://www.hira.or.kr&uri=JTJGcmIlMkZjbW1uJTJGcmJDZXJ0UmV0dXJuLmRvJTNGc3RyUGFnZVR5cGUlM0RESUFH',
            headers:header
        });

        console.log("[module] hira main.do completed");

        let cookie = cookieParser(result);

        // POST https://ptl.hira.or.kr/esign/issue_token.jsp HTTP/1.1
        header['Host']='ptl.hira.or.kr'
        header['Connection']='keep-alive'
        header['sec-ch-ua']='"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"'
        header['Accept']='application/json; charset=utf-8'
        header['Content-Type']='application/json; charset=UTF-8'
        header['sec-ch-ua-mobile']='?0'
        header['User-Agent']='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
        header['sec-ch-ua-platform']='"Windows"'
        header['Origin']='https://ptl.hira.or.kr'
        header['Sec-Fetch-Site']='same-origin'
        header['Sec-Fetch-Mode']='cors'
        header['Sec-Fetch-Dest']='empty'
        header['Referer']='https://ptl.hira.or.kr/simpleCert/simpleCert.jsp'
        header['Accept-Encoding']='gzip, deflate, br'
        header['Accept-Language']='ko-KR,ko;q=0.9'
        header['Cookie']=cookie;

        postData = '{"token":""}'

        result = await axios({
            method:'POST',
            url:host+'/esign/issue_token.jsp',
            data:postData,
            headers:header
        });
        console.log("[module] hira issue_token.jsp completed");


        let issueToken = result.data;

        if(typeof(issueToken)!='object'){
            issueToken = JSON.parse(result.data);
        }
        const token = issueToken["token"]
        const txId = issueToken["txId"]
        const oacxCode = issueToken["oacxCode"]
        const resultCode = issueToken["resultCode"]

        if(token==undefined||txId==undefined||oacxCode==undefined||resultCode==undefined || resultCode!="200" ||oacxCode!="OACX_SUCCESS" ){

            return {
                statusCode:400,
                body:"fail_issue_token"
            }
        }
        
        //실제 로그인으로 요청하는 부분
        // POST https://ptl.hira.or.kr/oacx/api/v1.0/authen/request HTTP/1.1
        header['Host']='ptl.hira.or.kr'
        header['Connection']='keep-alive'
        header['sec-ch-ua']='"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"'
        header['Accept']='application/json; charset=utf-8'
        header['Content-Type']='application/json; charset=UTF-8'
        header['sec-ch-ua-mobile']='?0'
        header['User-Agent']='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
        header['sec-ch-ua-platform']='"Windows"'
        header['Origin']='https://ptl.hira.or.kr'
        header['Sec-Fetch-Site']='same-origin'
        header['Sec-Fetch-Mode']='cors'
        header['Sec-Fetch-Dest']='empty'
        header['Referer']='https://ptl.hira.or.kr/simpleCert/simpleCert.jsp'
        header['Accept-Encoding']='gzip, deflate, br'
        header['Accept-Language']='ko-KR,ko;q=0.9'
        header['Cookie']=cookie;
        
       
        const userInfo = '{"isMember":false,"name":"'+name+'","phone":"'+phone+'","phone1":"'+phone1+'","phone2":"'+phone2+'","ssn1":"'+ssn1+'","ssn2":"'+ssn2+'","birthday":"","privacy":0,"policy3":0,"policy4":1,"terms":1,"telcoTycd":'+telcoTycd+',"access_token":"","token_type":"","state":"","mtranskeySsn2":null}'

        postData = '{"id":"","provider":"'+this.providerMap[provider]["id"]+'","token":"'+token+'","txId":"'+txId+'","appInfo":{"code":"","path":"","type":""},"userInfo":'+userInfo+',"deviceInfo":{"code":"PC","browser":"WB","os":"","universalLink":false},"contentInfo":{"signTarget":"","signTargetTycd":"nonce","signType":"GOV_SIMPLE_AUTH","requestTitle":"","requestContents":""},"providerOptionInfo":{"callbackUrl":"","reqCSPhoneNo":"1","upmuGb":"","isUseTss":"Y","isNotification":"Y","isPASSVerify":"Y","isUserAgreement":"Y"},"compareCI":true}'
        
        result = await axios({
            method:'POST',
            url:host+'/oacx/api/v1.0/authen/request',
            data:postData,
            headers:header
        });


        console.log("[module] hira authen/request completed");
        console.log(postData);

        let resultData = result.data;
        if(typeof(resultData)!='object'){
            console.log(result.data);

            console.log("result.data2 is not Object!");
            resultData = JSON.parse(result.data);
        }

        const token2 = resultData["token"];
        const cxId = resultData["cxId"];
        const reqTxId = resultData["reqTxId"];
        const resultCode2 = resultData["resultCode"];
        const oacxCode2 = resultData["oacxCode"];
        const oacxStatus = resultData["oacxStatus"];
        const clientMessage = resultData["clientMessage"];
        const provider2 = resultData["provider"];

        // response를 제대로 못받았을때 
        if(token2==undefined||reqTxId==undefined||resultCode2==undefined||oacxCode2==undefined||clientMessage==undefined||provider2==undefined){
            console.log(resultData);
            console.log(postData)
            console.log("fail_auth_request");
            
            return {
                statusCode:500,
                body:"fail_auth_request"
            }
        }

        dbParam = {
            uuid:uuid,
            cookie:cookie,
            resultData:resultData,
            userInfo:userInfo
        }

        if(clientMessage!="성공"||oacxCode!="OACX_SUCCESS"||resultCode!="200"){
            console.log(resultData);

            // 개인정보오류 + 해당 인증서에 가입되어 있지 않을때도
            // jjw 확인해봐야할 부분 인증서 가입되지 않았을때 
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
                    body:clientMessage
                }
            }

            
            console.log(resultData)
            // 서버에서 알수없는 응답을 내려줬을때 
            return {
                statusCode:500,
                body:resultData["clientMessage"]
            }
        }

        const dbResult = await putItem(dbParam);

        if(dbResult.statusCode!=200){
            return {
                statusCode:500,
                body:"dberror"
            }    
        }

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

Hira.prototype.인증확인 = async function(Input){
    const host = "https://ptl.hira.or.kr";
    const loginHost = "https://ptl.hira.or.kr";
    let header = {};
    let postData = "";
    let result= null;
   
    try {
        console.log("[module] hira 인증확인 init!");
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

        let cookie = dbItem.cookie;
        let resultData = dbItem.resultData;
        let userInfo = dbItem.userInfo;

        console.log(resultData);

        if(cookie==undefined||resultData==undefined|| resultData["cxId"]==undefined||resultData["reqTxId"]==undefined){
            return {
                statusCode:400,
                body:"LOGINFIRST"
            }
        }

        const cxId = resultData["cxId"]
        const txId = resultData["reqTxId"]


        const providerId = resultData["provider"]
        const providerName = this.providerMap[providerId]["name"];
        const providerVersion = this.providerMap[providerId]["id"];

        console.log("[module] hira 인증확인 init2!");
        
        // POST https://ptl.hira.or.kr/oacx/api/v1.0/authen/result HTTP/1.1
        header['Host']='ptl.hira.or.kr'
        header['Connection']='keep-alive'
        header['sec-ch-ua']='"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"'
        header['Accept']='application/json; charset=utf-8'
        header['Content-Type']='application/json; charset=UTF-8'
        header['sec-ch-ua-mobile']='?0'
        header['User-Agent']='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
        header['sec-ch-ua-platform']='"Windows"'
        header['Origin']='https://ptl.hira.or.kr'
        header['Sec-Fetch-Site']='same-origin'
        header['Sec-Fetch-Mode']='cors'
        header['Sec-Fetch-Dest']='empty'
        header['Referer']='https://ptl.hira.or.kr/simpleCert/simpleCert.jsp'
        header['Accept-Encoding']='gzip, deflate, br'
        header['Accept-Language']='ko-KR,ko;q=0.9'
        header['Cookie']= cookie;

        
        postData = '{"providerId":"'+providerId+'","providerName":"'+providerName+'","deeplinkUri":"","naverAppSchemeUrl":"","telcoTxid":"","mdlAppHash":"","id":"","provider":"'+providerVersion+'","token":"'+resultData["token"]+'","txId":"'+txId+'","cxId":"'+cxId+'","appInfo":{"code":"","path":"","type":""},"userInfo":'+userInfo+',"deviceInfo":{"code":"PC","browser":"WB","os":"","universalLink":false},"contentInfo":{"signTarget":"","signTargetTycd":"nonce","signType":"GOV_SIMPLE_AUTH","requestTitle":"","requestContents":""},"providerOptionInfo":{"callbackUrl":"","reqCSPhoneNo":"1","upmuGb":"","isUseTss":"Y","isNotification":"Y","isPASSVerify":"Y","isUserAgreement":"Y"},"compareCI":true,"useMdlSsn":false}'
       
        result = await axios({
            method:'POST',
            url:host+'/oacx/api/v1.0/authen/result',
            data:postData,
            headers:header
        });

        resultData = result.data;

        
        if(resultData["resultCode"]!="200" ||resultData["oacxCode"]!="OACX_SUCCESS" ||resultData["clientMessage"]!="성공"){
            console.log(resultData);

            
            if(resultData["oacxCode"]=="OACX_NOT_SIGNED"
            ||resultData["oacxCode"]=="OACX_UNDEFINED"){
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
        console.log("[module] 인증확인 '/oacx/api/v1.0/authen/result' completed!");

        // POST https://ptl.hira.or.kr/pl/login/simpleCert.do HTTP/1.1
        header['Host']='ptl.hira.or.kr'
        header['Connection']='keep-alive'
        header['sec-ch-ua']='"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"'
        header['Content-Type']='application/x-www-form-urlencoded; charset=UTF-8'
        header['X-Requested-With']='XMLHttpRequest'
        header['sec-ch-ua-mobile']='?0'
        header['User-Agent']='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
        header['sec-ch-ua-platform']='"Windows"'
        header['Accept']='*/*'
        header['Origin']='https://ptl.hira.or.kr'
        header['Sec-Fetch-Site']='same-origin'
        header['Sec-Fetch-Mode']='cors'
        header['Sec-Fetch-Dest']='empty'
        header['Referer']='https://ptl.hira.or.kr/main.do?pageType=certByJ&domain=https://www.hira.or.kr&uri=JTJGcmIlMkZjbW1uJTJGcmJDZXJ0UmV0dXJuLmRvJTNGc3RyUGFnZVR5cGUlM0RESUFH'
        header['Accept-Encoding']='gzip, deflate, br'
        header['Accept-Language']='ko-KR,ko;q=0.9'
        header['Cookie']=cookie;

        if(typeof(userInfo)=='string'){
            userInfo = JSON.parse(userInfo);
        }

        const decodedSsn1 = base64decoding(userInfo["ssn1"])
        const decodedSsn2 = base64decoding(userInfo["ssn2"])
        const jumin = +decodedSsn1+""+decodedSsn2;

        postData = encodeURIComponent('@d1#usr_nm=&@d1#jumin_no='+jumin+'&@d1#jumin_no1='+decodedSsn1+'&@d1#jumin_no2='+decodedSsn2+'&@d1#domain=https://www.hira.or.kr&@d1#uri=JTJGcmIlMkZjbW1uJTJGcmJDZXJ0UmV0dXJuLmRvJTNGc3RyUGFnZVR5cGUlM0RESUFH&@d1#resParam=[object Object]&@d1#resToken='+resultData['token']+'&@d1#resultCode=200&@d#=@d1#&@d1#=dmParam&@d1#tp=dm&');

        postData = '%40d1%23usr_nm=&%40d1%23jumin_no='+jumin+'&%40d1%23jumin_no1='+decodedSsn1+'&%40d1%23jumin_no2='+decodedSsn2+'&%40d1%23domain=https%3A%2F%2Fwww.hira.or.kr&%40d1%23uri=JTJGcmIlMkZjbW1uJTJGcmJDZXJ0UmV0dXJuLmRvJTNGc3RyUGFnZVR5cGUlM0RESUFH&%40d1%23resParam=%5Bobject%20Object%5D&%40d1%23resToken='+resultData['token']+'&%40d1%23resultCode=200&%40d%23=%40d1%23&%40d1%23=dmParam&%40d1%23tp=dm&'

        console.log(postData);

        result = await axios({
            method:'POST',
            url:host+'/pl/login/simpleCert.do',
            data:postData,
            headers:header
        });

        resultData = result.data;

        console.log(resultData);
        if(resultData["dmResult"]==undefined||resultData["dmResult"]["tknSno"]==undefined||resultData["dmResult"]["returnUrl"]==undefined){
            console.log(resultData);
            return {
                statusCode:500,
                body:"Fail_Issue_Session"
            }
        }

        const tknSno = resultData["dmResult"]["tknSno"];
        const returnUrl = resultData["dmResult"]["returnUrl"];

        
        // GET https://www.hira.or.kr/rb/cmmn/rbCertReturn.do?strPageType=DIAG&tknId=bef00e43-2277-40e7-9481-b45572bf0210 HTTP/1.1
        header['Host']='www.hira.or.kr'
        header['Connection']='keep-alive'
        header['sec-ch-ua']='"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"'
        header['sec-ch-ua-mobile']='?0'
        header['sec-ch-ua-platform']='"Windows"'
        header['Upgrade-Insecure-Requests']='1'
        header['User-Agent']='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
        header['Accept']='text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7'
        header['Sec-Fetch-Site']='same-site'
        header['Sec-Fetch-Mode']='navigate'
        header['Sec-Fetch-User']='?1'
        header['Sec-Fetch-Dest']='document'
        header['Referer']='https://ptl.hira.or.kr/'
        header['Accept-Encoding']='gzip, deflate, br'
        header['Accept-Language']='ko-KR,ko;q=0.9'
        // header['Cookie']=cookie;
        //  WT_FPC=id=24b2367346f88547a111694251389042:lv=1694251403760:ss=1694251389042
        
        result = await axios({
            method:'GET',
            url:returnUrl+'&tknId='+tknSno,
            headers:header,
            maxRedirects: 0,
            validateStatus: function (status) {
                return status == 302 || status == 200;
              }
        });


        const path = result.headers.location;
        cookie = cookieParser(result);
        if(result.status!=302 || cookie.indexOf("SESSION=")==-1 || path==undefined){
            console.log("cookie: "+cookie)
            return {
                statusCode:500,
                body:"Fail_Issue_Session"
            }
        }


        // GET https://www.hira.or.kr/rb/diag/selectMyDiagInfmList.do?pgmid=HIRAA070001000600 HTTP/1.1
        header['Host']='www.hira.or.kr'
        header['Connection']='keep-alive'
        header['Upgrade-Insecure-Requests']='1'
        header['User-Agent']='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
        header['Accept']='text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7'
        header['Sec-Fetch-Site']='same-site'
        header['Sec-Fetch-Mode']='navigate'
        header['Sec-Fetch-User']='?1'
        header['Sec-Fetch-Dest']='document'
        header['sec-ch-ua']='"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"'
        header['sec-ch-ua-mobile']='?0'
        header['sec-ch-ua-platform']='"Windows"'
        header['Referer']='https://ptl.hira.or.kr/'
        header['Accept-Encoding']='gzip, deflate, br'
        header['Accept-Language']='ko-KR,ko;q=0.9'
        header['Cookie']=cookie;

        result = await axios({
            method:'GET',
            url:host+path,
            headers:header
        });

        const patHpin = sliceFunc(result.data, 'var patHpin = "', '";');
        const patNm = sliceFunc(result.data, 'var patNm = "', '";');



        const dbParam = {
            uuid:uuid,
            cookie:cookie,
            patHpin:patHpin,
            patNm:patNm

        }

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
        console.log("[modules] 인증확인 error:"+ error.message);
        return {
            statusCode:500,
            body:error.message
        }   
    }
}


Hira.prototype.내진료정보열람 = async function(Input){
    const host = "https://ptl.hira.or.kr";
    let header = {};
    let postData = "";
    let result= null;

    try {
        console.log("[module] hira 내진료정보열람 init!");
        
        // let cookie = this.TEMPDB.cookie;
        // const patHpin = this.TEMPDB.patHpin;
        // const patNm = this.TEMPDB.patNm;
        const startDate = Input.startDate;
        const endDate = Input.endDate;
        

        const srchFrDate = startDate.substring(0,4)+"-"+startDate.substring(4,6)+"-"+startDate.substring(6,8);
        const srchToDate = endDate.substring(0,4)+"-"+endDate.substring(4,6)+"-"+endDate.substring(6,8);
        const type = Input.type;

        const uuid = Input.uuid;

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
        const patHpin = dbItem.patHpin;
        const patNm = dbItem.patNm;


        const res = {
            "commName":patNm,
            "commStartDate":startDate,
            "commEndDate":endDate
        }


        if(cookie==undefined||patHpin==undefined||patNm==undefined){
            return {
                statusCode:400,
                body:"auth_first"
            }
        }

        console.log("[module] hira 내진료정보열람 init2!");
        header ={};
        
        // POST https://www.hira.or.kr/rb/diag/selectMyDiagInfmList.do?pgmid=HIRAA070001000600 HTTP/1.1
        header['Host']='www.hira.or.kr'
        header['Connection']='keep-alive'
        header['Cache-Control']='max-age=0'
        header['sec-ch-ua']='"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"'
        header['sec-ch-ua-mobile']='?0'
        header['sec-ch-ua-platform']='"Windows"'
        header['Upgrade-Insecure-Requests']='1'
        header['Origin']='https://www.hira.or.kr'
        header['Content-Type']='application/x-www-form-urlencoded'
        header['User-Agent']='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
        header['Accept']='text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7'
        header['Sec-Fetch-Site']='same-origin'
        header['Sec-Fetch-Mode']='navigate'
        header['Sec-Fetch-User']='?1'
        header['Sec-Fetch-Dest']='document'
        header['Referer']='https://www.hira.or.kr/rb/diag/selectMyDiagInfmList.do?pgmid=HIRAA070001000600'
        header['Accept-Encoding']='gzip, deflate, br'
        header['Accept-Language']='ko-KR,ko;q=0.9'
        header['Cookie']=cookie;

        postData = 'pageIndex=1'
        postData += '&srchInsuType=etc'
        postData += '&srchDiagInfo='
        postData += '&srchAllYn=Y'
        postData += '&srchSickYn=N'
        postData += '&srchFrDd='+srchFrDate.replaceAll("-","")
        postData += '&srchToDd='+srchToDate.replaceAll("-","")
        postData += '&patHpin='+patHpin
        postData += '&patNm=decodeURIComponentEx%28%22'+encodeURIComponent(patNm)+'%22%29%2F'
        postData += '&ykiho='
        postData += '&yadmNm=decodeURIComponentEx%28%22%22%29%2F'
        if(type=="1"){
            postData += '&snstSickShwYn=N'
            postData += '&snstSickShw=on'
        }else {
            postData += '&snstSickShwYn=N'
        }
        postData += '&insuType=etc'
        postData += '&srchYkiho='
        postData += '&srchYadmNm='
        postData += '&srchYkihoAll=on'
        postData += '&srchFrDate='+srchFrDate
        postData += '&srchToDate='+srchToDate

        result = await axios({
            method:'POST',
            url:host+'/rb/diag/selectMyDiagInfmList.do?pgmid=HIRAA070001000600',
            data:postData,
            headers:header
        });


        header ={};
        
        // 기본진료내역
        // GET https://www.hira.or.kr/rb/diag/selectBseDiagInfmList.do?pgmid=HIRAA070001000600&srchInsuType=etc&srchDiagInfo=&srchAllYn=Y&srchSickYn=N&snstSickShwYn=N&srchFrDd=20230310&srchToDd=20230910&srchFrDate=2023-03-10&srchToDate=2023-09-10&patHpin=6092822340353&patNm=%ec%98%a4%ec%98%88%ec%8a%ac&srchYadmNm=&srchYkiho= HTTP/1.1
        header['Host']='www.hira.or.kr'
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
        header['Referer']='https://www.hira.or.kr/rb/diag/selectMyDiagInfmList.do?pgmid=HIRAA070001000600'
        header['Accept-Encoding']='gzip, deflate, br'
        header['Accept-Language']='ko-KR,ko;q=0.9'
        header['Cookie']=cookie;

        let path = '/rb/diag/selectBseDiagInfmList.do?'
        path += 'pgmid=HIRAA070001000600'
        path += '&srchInsuType=etc'
        path += '&srchDiagInfo='
        path += '&srchAllYn=Y'
        path += '&srchSickYn=N'

        if(type=="1"){
            path += '&snstSickShwYn=Y'
        }else{
            path += '&snstSickShwYn=N'
        }       
        path += '&srchFrDd='+srchFrDate.replaceAll("-","")
        path += '&srchToDd='+srchToDate.replaceAll("-","")
        path += '&srchFrDate='+srchFrDate
        path += '&srchToDate='+srchToDate
        path += '&patHpin='+patHpin
        path += '&patNm='+encodeURIComponent(patNm)
        path += '&srchYadmNm=&srchYkiho='


        console.log(path);

        result = await axios({
            method:'GET',
            url:host+path,
            headers:header
        });

        let beforeUrl = host+path;


        // console.log(result.data);
        let $ = cheerio.load(result.data);

        let trList = $(".tbl_default tbody tr");

        console.log("trList.length: "+trList.length);
        
        const resBasicTreatList = [];

        trList.each(function(i, elem) {
            const tdList = $(this).find('td:not(.btnType)');
            const resBasicTreatMap = {};
            tdList.each(function(j, elem2) {
                const value = $(this).find('span:not(.phide)').text().trim();
                const keyValue = $(this).find('.phide').text().trim();
                if(keyValue==""||keyValue.length==0){
                    return {
                        statusCode:400,
                        body:"token_expired"
                    }
                }
                console.log("keyValue: "+ keyValue);
                
                let key = "";
                if(keyValue.indexOf("진료시작일")>-1){
                    key = "resTreatStartDate";
                }else if(keyValue.indexOf("병·의원&약국")>-1){
                    key = "resHospitalName";
                }else if(keyValue.indexOf("진단과")>-1){
                    key = "resDepartment";
                }else if(keyValue.indexOf("입원/외래")>-1){
                    key = "resTreatType";
                }else if(keyValue.indexOf("주상병코드")>-1){
                    key = "resDiseaseCode";
                }else if(keyValue.indexOf("주상병명")>-1){
                    key = "resDiseaseName";
                }else if(keyValue.indexOf("내원일수")>-1){
                    key = "resVisitDays";
                }else if(keyValue.indexOf("총 진료비(건강보험 적용분)")>-1){
                    key = "resTotalAmount";
                }else if(keyValue.indexOf("건강보험 등 혜택받은 금액")>-1){
                    key = "resPublicCharge";
                }else if(keyValue.indexOf("내가 낸 의료비(진료비)")>-1){
                    key = "resDeductibleAmt";
                }
                

                console.log("=================================");
                if(key!=""||key!=null){
                    resBasicTreatMap[key]=value.replaceAll(",", "");
                }
            });

            resBasicTreatList.push(resBasicTreatMap);
        });

        res["resBasicTreatList"] = resBasicTreatList;
        console.log("[module] hira 내진료정보열람 기본진료내역 selectBhvMdfeeInfmList completed!");


        header ={};

        //세부진료정보
        // GET https://www.hira.or.kr/rb/diag/selectBhvMdfeeInfmList.do?pgmid=HIRAA070001000600&srchInsuType=etc&srchDiagInfo=&srchAllYn=Y&srchSickYn=N&snstSickShwYn=N&srchFrDd=20230310&srchToDd=20230910&srchFrDate=2023-03-10&srchToDate=2023-09-10&patHpin=6092822340353&patNm=%ec%98%a4%ec%98%88%ec%8a%ac&srchYadmNm=&srchYkiho= HTTP/1.1
        header['Host']='www.hira.or.kr'
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
        header['Referer']=beforeUrl
        header['Accept-Encoding']='gzip, deflate, br'
        header['Accept-Language']='ko-KR,ko;q=0.9'
         header['Cookie']=cookie;
 

         path = '/rb/diag/selectBhvMdfeeInfmList.do?'
         
         path += 'pgmid=HIRAA070001000600'
         path += '&srchInsuType=etc'
         path += '&srchDiagInfo='
         path += '&srchAllYn=Y'
         path += '&srchSickYn=N'
         if(type=="1"){
            path += '&snstSickShwYn=Y'
         }else{
             path += '&snstSickShwYn=N'
         }     
         path += '&srchFrDd='+srchFrDate.replaceAll("-","")
         path += '&srchToDd='+srchToDate.replaceAll("-","")
         path += '&srchFrDate='+srchFrDate
         path += '&srchToDate='+srchToDate
         path += '&patHpin='+patHpin
         path += '&patNm='+encodeURIComponent(patNm)
         path += '&srchYadmNm=&srchYkiho='

         console.log(path);
 
         result = await axios({
             method:'GET',
             url:host+path,
             headers:header
         });

         beforeUrl= host+path

         $ = cheerio.load(result.data);

        trList = $(".tbl_default tbody tr");

        console.log("trList.length: "+trList.length);
        const resDetailTreatList = [];

        trList.each(function(i, elem) {
            const tdList = $(this).find('td:not(.btnType)');
            const resDetailTreatMap = {};
            tdList.each(function(j, elem2) {
                const value = $(this).find('span:not(.phide)').text().trim();
                const keyValue = $(this).find('.phide').text().trim();
                console.log("keyValue: "+ keyValue);
                
                let key = "";
                if(keyValue.indexOf("진료시작일")>-1){
                    key = "resTreatStartDate";
                }else if(keyValue.indexOf("병·의원&약국")>-1){
                    key = "resHospitalName";
                }else if(keyValue.indexOf("진단과")>-1){
                    key = "resDepartment";
                }else if(keyValue.indexOf("입원/외래")>-1){
                    key = "resTreatType";
                }else if(keyValue.indexOf("주상병코드")>-1){
                    key = "resDiseaseCode";
                }else if(keyValue.indexOf("주상병명")>-1){
                    key = "resDiseaseName";
                }else if(keyValue.indexOf("내원일수")>-1){
                    key = "resVisitDays";
                }else if(keyValue.indexOf("총 진료비(건강보험 적용분)")>-1){
                    key = "resTotalAmount";
                }else if(keyValue.indexOf("건강보험 등 혜택받은 금액")>-1){
                    key = "resPublicCharge";
                }else if(keyValue.indexOf("내가 낸 의료비(진료비)")>-1){
                    key = "resDeductibleAmt";
                }else if(keyValue.indexOf("진료내역")>-1){
                    key = "resTreatType";
                }else if(keyValue.indexOf("코드명")>-1){
                    key = "resCodeName";
                }else if(keyValue.indexOf("1회 투약량")>-1){
                    key = "resOneDose";
                }else if(keyValue.indexOf("1회 투여횟수")>-1){
                    key = "resDailyDosesNumber";
                }else if(keyValue.indexOf("1회 투약일수")>-1){
                    key = "resTotalDosingdays";
                }
                


                if(key!=""||key!=null){
                    if(key=="resTreatStartDate"){
                        resDetailTreatMap[key]=value.replaceAll("-", "");

                    }else{
                        resDetailTreatMap[key]=value;

                    }
                }
            });

            resDetailTreatList.push(resDetailTreatMap);
        });

        res["resDetailTreatList"] = resDetailTreatList;
        console.log("[module] hira 내진료정보열람 세부진료정보 selectBhvMdfeeInfmList completed!");


        // 처방조제정보
        header ={};

        // GET https://www.hira.or.kr/rb/diag/selectPrscCpmdInfmList.do?pgmid=HIRAA070001000600&srchInsuType=etc&srchDiagInfo=&srchAllYn=Y&srchSickYn=N&snstSickShwYn=N&srchFrDd=20230310&srchToDd=20230910&srchFrDate=2023-03-10&srchToDate=2023-09-10&patHpin=6092822340353&patNm=%ec%98%a4%ec%98%88%ec%8a%ac&srchYadmNm=&srchYkiho= HTTP/1.1
        header['Host']='www.hira.or.kr'
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
        header['Referer']=beforeUrl
        header['Accept-Encoding']='gzip, deflate, br'
        header['Accept-Language']='ko-KR,ko;q=0.9'
        header['Cookie']=cookie;


        path = '/rb/diag/selectPrscCpmdInfmList.do?'
        path += 'pgmid=HIRAA070001000600'
        path += '&srchInsuType=etc'
        path += '&srchDiagInfo='
        path += '&srchAllYn=Y'
        path += '&srchSickYn=N'
        if(type=="1"){
            path += '&snstSickShwYn=Y'
         }else{
             path += '&snstSickShwYn=N'
         }   
        path += '&srchFrDd='+srchFrDate.replaceAll("-","")
        path += '&srchToDd='+srchToDate.replaceAll("-","")
        path += '&srchFrDate='+srchFrDate
        path += '&srchToDate='+srchToDate
        path += '&patHpin='+patHpin
        path += '&patNm='+encodeURIComponent(patNm)
        path += '&srchYadmNm=&srchYkiho='

 

         console.log(path);
 
         result = await axios({
             method:'GET',
             url:host+path,
             headers:header
         });

         beforeUrl= host+path
         
         $ = cheerio.load(result.data);

        trList = $(".tbl_default tbody tr");

        console.log("trList.length: "+trList.length);
        const resPrescribeDrugList = [];

        trList.each(function(i, elem) {
            const tdList = $(this).find('td:not(.btnType)');
            const resPrescribeDrugMap = {};
            tdList.each(function(j, elem2) {
                const value = $(this).find('span:not(.phide)').text().trim();
                const keyValue = $(this).find('.phide').text().trim();
                console.log("keyValue: "+ keyValue);
                
                let key = "";
                if(keyValue.indexOf("진료시작일")>-1){
                    key = "resTreatStartDate";
                }else if(keyValue.indexOf("병·의원&약국")>-1){
                    key = "resHospitalName";
                }else if(keyValue.indexOf("진단과")>-1){
                    key = "resDepartment";
                }else if(keyValue.indexOf("입원/외래")>-1){
                    key = "resTreatType";
                }else if(keyValue.indexOf("주상병코드")>-1){
                    key = "resDiseaseCode";
                }else if(keyValue.indexOf("주상병명")>-1){
                    key = "resDiseaseName";
                }else if(keyValue.indexOf("내원일수")>-1){
                    key = "resVisitDays";
                }else if(keyValue.indexOf("총 진료비(건강보험 적용분)")>-1){
                    key = "resTotalAmount";
                }else if(keyValue.indexOf("건강보험 등 혜택받은 금액")>-1){
                    key = "resPublicCharge";
                }else if(keyValue.indexOf("내가 낸 의료비(진료비)")>-1){
                    key = "resDeductibleAmt";
                }else if(keyValue.indexOf("진료내역")>-1){
                    key = "resTreatType";
                }else if(keyValue.indexOf("코드명")>-1){
                    key = "resCodeName";
                }else if(keyValue.indexOf("1회 투약량")>-1){
                    key = "resOneDose";
                }else if(keyValue.indexOf("1회 투여횟수")>-1){
                    key = "resDailyDosesNumber";
                }else if(keyValue.indexOf("1회 투약일수")>-1){
                    key = "resTotalDosingdays";
                }else if(keyValue.indexOf("처방/조제")>-1){
                    key = "resTreatType";
                }else if(keyValue.indexOf("약품명")>-1){
                    key = "resDrugName";
                }else if(keyValue.indexOf("성분명")>-1){
                    key = "resIngredients";
                }
                

                console.log("=================================");
                if(key!=""||key!=null){
                    resPrescribeDrugMap[key]=value;
                }
            });

            resPrescribeDrugList.push(resPrescribeDrugMap);
        });

        res["resPrescribeDrugList"] = resPrescribeDrugList;
        
        console.log(res)
        console.log("[module] hira 내진료정보열람 처방조제정보 selectBhvMdfeeInfmList completed!");
        
        return {
            statusCode:200,
            body:res
        }

    } catch (error) {
        console.log(error);
        console.log("[modules] 내진료정보열람 error:"+ error.message);
        return {
            statusCode:500,
            body:error.message
        }   
    }
}

module.exports = Hira;
