const express = require('express');
const router = express.Router();
const Hira = require('../modules//hira');
const {base64Encoding} = require("../common/commonFunc")

let hiraInstance = new Hira();

router.get("/easyLogin", async(req, res, next)=>{
    let response = "";    
    try {


        
        const organization="002";
        const loginType="5"
        const loginTypeLevel="6"        
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
         "type":"0"
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