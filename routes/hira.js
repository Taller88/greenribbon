const express = require('express');
const router = express.Router();
const Hira = require('../modules/hira');
const {base64Encoding} = require("../common/commonFunc")

let hiraInstance = new Hira();
router.get("/smsInit", async(req, res, next)=>{
    let response = "";    
    try {


        const uuid = "qwer"
        const telecom = "5"
        const input = {
            uuid:uuid,
            telecom:telecom
       }
       
       console.log("[router] input: "+ JSON.stringify(input));

       const result = await hiraInstance.문자Init(input);
       console.log(result);
       res.send(result);
       
    } catch (error) {


        console.log(error);
        console.log("[router] hira smsLogin :"+ error.message);

        res.send({
            statusCode:500,
            body:error.message
        })
        return {
            statusCode:500,
            body:"unKnownError"
        }
        
    }
    
})

/**
 * smsInit
 *  - 문자인증을 위해 통신사 전달후 보안문자를 전달받고 응답하는 API 
 * 
 * req 
 *  uuid: 고유값
 *  telecom : 통신사 기존 통신사 값과 동일 0: SKT, 1: KT ...
 * 
 *  res 
 *      base64로 인코딩된 보안문자
 *   
 */
router.post("/smsInit", async(req, res, next)=>{
    let response = "";    
    try {

        const uuid=req.body.uuid;
        const telecom=req.body.telecom
       
        const input = {
            uuid:uuid,
            telecom:telecom
       }
       
       console.log("[router] input: "+ JSON.stringify(input));

       const result = await hiraInstance.문자Init(input);
       console.log(result);
       res.send(result);
       
    } catch (error) {


        console.log(error);
        console.log("[router] hira smsLogin :"+ error.message);

        res.send({
            statusCode:500,
            body:error.message
        })
        return {
            statusCode:500,
            body:"unKnownError"
        }
        
    }
    
})

router.get("/smsRequest", async(req, res, next)=>{
    let response = "";    
    try {


        
        const loginTypeLevel="6"        
        const phoneNo="01082271995"
        const userName="정진우"
        const identity="9306161268217"
        const captchaImg = "927136"
       

        const telecom = "5"// pass 테스트 -> LG 알뜰폰
        const uuid = "qwer"
        const input = {
            uuid:uuid,
            phoneNo: phoneNo,       
            userName: userName,
            identity: identity,
            telecom: telecom,
            captchaImg:captchaImg
       }

       console.log("[router] input: "+ JSON.stringify(input));

    //    const hiraInstance = new Hira();
       const result = await hiraInstance.문자요청(input);
       console.log(result);
       res.send(result);
       
    } catch (error) {


        console.log(error);
        console.log("[router] hira easyLogin :"+ error.message);

        res.send({
            statusCode:500,
            body:error.message
        })
        return {
            statusCode:500,
            body:"unKnownError"
        }

        
        
    }
    
})

/**
 *  /smsRequest 
 *  req
 *   기존 easyLogin에서 사용하던 param과 거의 동일
 *   ** captchaImg 이미지는 /smsInit의 결과에서 전달받은 base64된 이미지값
 *      프론트에 뿌려주고 사용자가 입력하게 하는걸 추천드리지만 유용한 OCR이 있다면 OCR을 추천드립니다. 
 *  res
 *   1. 정상(statusCode: 200)
 *      success_sms_request
 *      
 *  2. 문제 
 *      *** 해당 문자인증 모듈에서는 개인정보 오류가 뜨질 않음 무조건 success가 떠버림
 *          실제 사이트에서도 잘못된 정보를 입력해도 인증번호 확인하는 란으로 넘어가버림 
 * 
 */
router.post("/smsRequest", async(req, res, next)=>{
    let response = "";    
    try {

        const uuid=req.body.uuid;
        const phoneNo=req.body.phoneNo;
        const userName=req.body.userName;
        const identity=req.body.identity;
        const telecom=req.body.telecom;

        // 보안문자
        const captchaImg=req.body.captchaImg;

        const input = {
            uuid:uuid,
            phoneNo: phoneNo,       
            userName: userName,
            identity: identity,
            telecom: telecom,
            captchaImg:captchaImg
       }

       console.log("[router] input: "+ JSON.stringify(input));

    //    const hiraInstance = new Hira();
       const result = await hiraInstance.문자요청(input);
       console.log(result);
       res.send(result);
       
    } catch (error) {


        console.log(error);
        console.log("[router] hira easyLogin :"+ error.message);

        res.send({
            statusCode:500,
            body:error.message
        })
        return {
            statusCode:500,
            body:"unKnownError"
        }

        
        
    }
    
})


router.get("/smsCheck", async(req, res, next)=>{
    let response = "";    
    try {


        
        const authNum="234457";
       
        const uuid = "qwer"
        const input = {
            uuid:uuid,
            authNum: authNum,
        }

       console.log("[router] input: "+ JSON.stringify(input));

    //    const hiraInstance = new Hira();
       const result = await hiraInstance.문자확인(input);
       console.log(result);
       res.send(result);
       
    } catch (error) {


        console.log(error);
        console.log("[router] hira easyLogin :"+ error.message);

        res.send({
            statusCode:500,
            body:error.message
        })
        return {
            statusCode:500,
            body:"unKnownError"
        }

        
        
    }
    
})

/**
 *  /smsCheck 
 *  req
 *   uuid: 고유값
 *   authNum: 전달받은 인증번호
 *  res
 *   1. 정상(statusCode: 200)
 *      success_auth
 *      
 *  2. 인증번호 불일치
 *      statusCode: 400, 
 *      body: 아래 txt가 urlEncoding되어 있음 -> 서버에서 내려오는 값
            인증+번호가+일치하지+않습니다.+
            인증번호를+확인+후+다시+시도해+주세요.
            남은+재시도+횟수:+2
            urlEncoding value: %EC%9D%B8%EC%A6%9D+%EB%B2%88%ED%98%B8%EA%B0%80+%EC%9D%BC%EC%B9%98%ED%95%98%EC%A7%80+%EC%95%8A%EC%8A%B5%EB%8B%88%EB%8B%A4.+%0A%EC%9D%B8%EC%A6%9D%EB%B2%88%ED%98%B8%EB%A5%BC+%ED%99%95%EC%9D%B8+%ED%9B%84+%EB%8B%A4%EC%8B%9C+%EC%8B%9C%EB%8F%84%ED%95%B4+%EC%A3%BC%EC%84%B8%EC%9A%94.%0A%EB%82%A8%EC%9D%80+%EC%9E%AC%EC%8B%9C%EB%8F%84+%ED%9A%9F%EC%88%98%3A+2%EC%9D%B8%EC%A6%9D+%EB%B2%88%ED%98%B8%EA%B0%80+%EC%9D%BC%EC%B9%98%ED%95%98%EC%A7%80+%EC%95%8A%EC%8A%B5%EB%8B%88%EB%8B%A4.+%0A%EC%9D%B8%EC%A6%9D%EB%B2%88%ED%98%B8%EB%A5%BC+%ED%99%95%EC%9D%B8+%ED%9B%84+%EB%8B%A4%EC%8B%9C+%EC%8B%9C%EB%8F%84%ED%95%B4+%EC%A3%BC%EC%84%B8%EC%9A%94.%0A%EB%82%A8%EC%9D%80+%EC%9E%AC%EC%8B%9C%EB%8F%84+%ED%9A%9F%EC%88%98%3A+2
 */
router.post("/smsCheck", async(req, res, next)=>{
    let response = "";    
    try {


        const uuid=req.body.uuid;
        const authNum=req.body.authNum
        
        const input = {
            uuid:uuid,
            authNum: authNum,
        }

       console.log("[router] input: "+ JSON.stringify(input));

    //    const hiraInstance = new Hira();
       const result = await hiraInstance.문자확인(input);
       console.log(result);
       res.send(result);
       
    } catch (error) {


        console.log(error);
        console.log("[router] hira easyLogin :"+ error.message);

        res.send({
            statusCode:500,
            body:error.message
        })
        return {
            statusCode:500,
            body:"unKnownError"
        }

        
        
    }
    
})

router.get("/easyLogin", async(req, res, next)=>{
    let response = "";    
    try {


        
        const organization="002";
        const loginType="5"
        const loginTypeLevel="1"        
        const phoneNo="01082271995"
        const userName="정진우"
        const identity="9306161268217"

        // loginTypeLevel
        //  "1":카카오톡
        //  "2":페이코
        //  "3":삼성패스 -> 재발급 필요할땐 재발급 필요하다고 나옴
        //  "4":KB모바일 -> 
        //  "5":통신사(PASS)
        //  "6":네이버
        //  "7":신한인증서
        //  "8": toss

        const telecom = "5"// pass 테스트 -> LG 알뜰폰
        const uuid = "asdfgh"
        const input = {
            uuid:uuid,
            organization: organization,
            loginType: loginType,
            loginTypeLevel: loginTypeLevel,
            phoneNo: phoneNo,       
            userName: userName,
            identity: identity,
            // startDate: startDate,
            // endDate: endDate,
            telecom: telecom,
            // id: id,
            // type: type
       }

       console.log("[router] input: "+ JSON.stringify(input));

    //    const hiraInstance = new Hira();
       const result = await hiraInstance.간편로그인(input);
       console.log(result);
       res.send(result);
       
    } catch (error) {


        console.log(error);
        console.log("[router] hira easyLogin :"+ error.message);

        res.send({
            statusCode:500,
            body:error.message
        })
        return {
            statusCode:500,
            body:"unKnownError"
        }

        
        
    }
    
})


/**
 * /easyLogin 간편로그인
 * method : POST
 * parameters 
 *  uuid: 원하시는 deviceId or 식별값
    organization: 기관코드 공통 값 입력 (0020) 고정값
    loginType: "5":간편인증 -> 간편인증만 사용하니 고정값
    loginTypeLevel: default 0 간편인증이니까 0아님
        "1":카카오톡
        "2":페이코
        "3":삼성패스
        "4":KB모바일
        "5":통신사(PASS)
        "6":네이버
        "7":신한인증서
        "8": toss
    phoneNo: 사용자휴대폰 번호 loginType:5(간편인증) 일 경우 필수값
    userName: 
    identity: 사용자 주민번호,
    startDate: 시작일자 yyyymmdd,
    endDate: 종료일자 yyyymmdd,
    telecom: 통신사	
        loginType=“5”이고 loginTypeLevel=“5” 필수
        "0":SKT
        "1":KT
        "2":LG U+
        "3":알뜰폰 (SKT)
        "4":알뜰폰(KT)
        "5":알뜰폰(LG U+)
    id: 요청 식별 아이디(SSO(동일계정) 구분값) -> 이걸 uuid로 사용해도 될듯,
    type: [민감상병 포함 여부] 0: 미포함, 1: 포함 (defautl = 0)
 **/
router.post("/easyLogin", async(req, res, next)=>{
    let response = "";    
    try {


        
        const organization=req.body.organization;
        const loginType=req.body.loginType
        const loginTypeLevel=req.body.loginTypeLevel        
        const phoneNo=req.body.phoneNo
        const userName=req.body.userName
        const identity=req.body.identity
        const startDate=req.body.startDate
        const endDate=req.body.endDate
        const telecom=req.body.telecom
        const id=req.body.id
        const type=req.body.type
        

        const uuid = req.body.uuid
        const input = {
            uuid:uuid,
            organization: organization,
            loginType: loginType,
            loginTypeLevel: loginTypeLevel,
            phoneNo: phoneNo,       
            userName: userName,
            identity: identity,
            startDate: startDate,
            endDate: endDate,
            telecom: telecom,
            id: id,
            type: type
       }

       console.log("[router] input: "+ JSON.stringify(input));

    //    const hiraInstance = new Hira();
       const result = await hiraInstance.간편로그인(input);
       console.log(result);
       res.send(result);
       
    } catch (error) {


        console.log(error);
        console.log("[router] hira easyLogin :"+ error.message);

        res.send({
            statusCode:500,
            body:error.message
        })
        return {
            statusCode:500,
            body:"unKnownError"
        }
        
    }
    
})


router.get("/authCheck", async(req, res, next)=>{
    let response = "";    
    try {

        console.log("[router] authCheck init");

        const uuid = "asdfgh"
        const input = {
             uuid:uuid
            } 
       const result = await hiraInstance.인증확인(input);

       console.log(result);
       res.send(result);
       
    } catch (error) {


        console.log(error);
        console.log("[router] hira authCheck :"+ error.message);

        res.send({
            statusCode:500,
            body:error.message
        })
        return {
            statusCode:500,
            body:"unKnownError_authCheck"
        }

        
        
    }
    
})

/**
 * /authCheck 인증확인
 * method : POST
 * parameters 
 *  uuid: 원하시는 deviceId or 식별값
 **/
router.post("/authCheck", async(req, res, next)=>{
    let response = "";    
    try {

        console.log("[router] authCheck init");
        const uuid = req.body.uuid
        const input = {
             uuid:uuid
            } 
       const result = await hiraInstance.인증확인(input);

       console.log(result);
       res.send(result);
       
    } catch (error) {


        console.log(error);
        console.log("[router] hira authCheck :"+ error.message);

        res.send({
            statusCode:500,
            body:error.message
        })
        return {
            statusCode:500,
            body:"unKnownError_authCheck"
        }
        
    }
    
})



/**
 * 
 *  type: [민감상병 포함 여부] 0: 미포함, 1: 포함 (defautl = 0)
 */
router.get("/readDiagnosisInfo", async(req, res, next)=>{
    let response = "";    
    try {
        const uuid = "asdfgh"
        const input = {
         uuid:uuid,
         "startDate":"20210309",
         "endDate":"20230909",
         "type":"1"
            } 
        console.log("[router] readDiagnosisInfo init");
        
     0
       const result = await hiraInstance.내진료정보열람(input);

       console.log(result);
       res.send(result);
       
    } catch (error) {


        console.log(error);
        console.log("[router] hira readDiagnosisInfo :"+ error.message);

        res.send({
            statusCode:500,
            body:error.message
        })
        
        
    }
    return;
    
})

/**
 * /readDiagnosisInfo 내진료정보열람
 * method : POST
 * parameters 
 *  uuid: 원하시는 deviceId or 식별값
 *  startDate : yyyymmdd
 *  endDate : yyyymmdd
 *  type: [민감상병 포함 여부] 0: 미포함, 1: 포함 (defautl = 0)
 **/
router.post("/readDiagnosisInfo", async(req, res, next)=>{
    let response = "";    
    try {

        const startDate=req.body.startDate;
        const endDate=req.body.endDate
        const type=req.body.type

        const uuid = req.body.uuid;
        const input = {
         "uuid":uuid,
         "startDate":startDate,
         "endDate":endDate,
         "type":type
            } 
        console.log("[router] readDiagnosisInfo init");
        
     
       const result = await hiraInstance.내진료정보열람(input);

       console.log(result);
       res.send(result);
       
    } catch (error) {


        console.log(error);
        console.log("[router] hira readDiagnosisInfo :"+ error.message);

        res.send({
            statusCode:500,
            body:error.message
        })
        
        
    }
    return;
    
})




module.exports = router