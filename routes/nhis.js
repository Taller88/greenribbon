const express = require('express');
const router = express.Router();
const Nhis = require('../modules/nhis');
const {createTable} =  require('../dbCrud/DynamoDB_local');

let nhisInstance = new Nhis();

router.get("/dbCreate", async(req, res, next)=>{
    try{
        console.log("DB init!");
        const result = await createTable();
        if(result.TableDescription==undefined){
            res.send("Db Create fail!")
        }else{
            res.send("Db Create success!")    
        }
    }catch(error){
        res.send(error.message)
    }
    
    return;
})
router.get("/easyLogin", async(req, res, next)=>{
    let response = "";    
    try {

          // loginTypeLevel
            //  "1":카카오톡
            //  "2":페이코
            //  "3":삼성패스 -> 재발급 필요할땐 재발급 필요하다고 나옴
            //  "4":KB모바일 -> 
            //  "5":통신사(PASS)
            //  "6":네이버
            //  "7":신한인증서
            //  "8": toss

          // telecom
            //   loginType=“5”이고 loginTypeLevel=“5” 필수
            //   "0":SKT
            //   "1":KT
            //   "2":LG U+
            //   "3":알뜰폰 (SKT)
            //   "4":알뜰폰(KT)
            //   "5":알뜰폰(LG U+)  
        const input = 
        {
            "uuid":"abcdef",
            "loginTypeLevel": "1", //1:카카오 자세한건 위에
            "phoneNo": "01082271995",//전화번호
            "userName": "정진우",
            "identity": "19930616",//간편인증시 주민번호뒷자리는 필요없음
            "telecom": "0",// loginTypeLevel: 5(Pass)일 경우 필수 
            "useType": "01",//가입자구분(용도) 0: 전체, 1:직장가입자, 2:지역가입자, 3:가입자전체 -> 필요 X
            "isIdentityViewYN": "0",//주민번호 뒷자리 1:공개, 2: 비공개 <- 자격득실확인서에서만 씀 (안쓸듯)
            "id": "사용자 계정을 식별할 수 있는 유일 값 세팅",//필수값 아님
            "originDataYN": "0 ",//원문 DATA 포함 여부? 요건 확인필요!!
            "organization": "0002",
            "loginType": "5",//간편인증만 하니까 뺴도 될듯
            
        }


       console.log("[router] input: "+ JSON.stringify(input));

       let result = null;
       
       //5번일 경우 간편로그인
       if(input.loginType==="5"){
            result = await nhisInstance.간편로그인(input);
       }else{
        //지원하지 않는 로그인타입
        result = {
            statusCode:400,
            body:"wrong_loginType"
        }
       }

       console.log(result);
       res.send(result);
       
    } catch (error) {


        console.log(error);
        console.log("[router] nhis easyLogin :"+ error.message);

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

router.post("/easyLogin", async(req, res, next)=>{
    let response = "";    
    try {

        
        const uuid = req.body.uuid;
        const organization = req.body.organization;
        const loginType = req.body.loginType;
        const identity = req.body.identity;
        const loginTypeLevel = req.body.loginTypeLevel;
        const userName = req.body.userName;
        const phoneNo = req.body.phoneNo;
        const useType = req.body.useType;
        const telecom = req.body.telecom;

        const isIdentityViewYN = req.body.isIdentityViewYN; // 자격득실확인서에서만 옵션선택가능, 자격확인서+보험납부확인서에서는 불가 -> 필요X
        const id = req.body.id; // uuid로 대체가능
        const originDataYN = req.body.originDataYN; // 어떤값인지 확인 필요

        const input = {
            uuid : uuid, 
            organization : organization, 
            loginType : loginType,
            identity : identity,
            loginTypeLevel : loginTypeLevel,
            userName : userName,
            phoneNo : phoneNo,
            useType : useType,
            telecom : telecom,
            isIdentityViewYN : isIdentityViewYN,
            id : id,
            originDataYN : originDataYN,
            

        }

       console.log("[router] input: ");

       let result = await nhisInstance.간편로그인(input);

       console.log(result);
       res.send(result);
       
    } catch (error) {

        console.log(error);
        console.log("[router] nhis easyLogin :"+ error.message);

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



router.post("/authCheck", async(req, res, next)=>{
    let response = "";    
    try {

        console.log("[router] authCheck init");

        const uuid = req.body.uuid;

        const input = {
            "uuid":uuid
          }

       const result = await nhisInstance.인증확인(input);

       console.log(result);
       res.send(result);
       
    } catch (error) {


        console.log(error);
        console.log("[router] nhis authCheck :"+ error.message);

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


router.get("/authCheck", async(req, res, next)=>{
    let response = "";    
    try {

        console.log("[router] authCheck init");

        const uuid = "abcdef";

        const input = {
            "uuid":uuid,            
          }

       const result = await nhisInstance.인증확인(input);

       console.log(result);
       res.send(result);
       
    } catch (error) {


        console.log(error);
        console.log("[router] nhis authCheck :"+ error.message);

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

// 자격확인 API
router.get("/qualificationCheck", async(req, res, next)=>{
    let response = "";    
    try {

        console.log("[router] qualificationCheck init");
        
        const input = {
            uuid:"abcdef",
        };
       const result = await nhisInstance.자격확인(input);

       console.log(result);
       res.send(result);
       
    } catch (error) {


        console.log(error);
        console.log("[router] nhis qualificationCheck :"+ error.message);

        res.send({
            statusCode:500,
            body:error.message
        })
        
        
    }
    return;
    
})


// 자격확인 API
router.post("/qualificationCheck", async(req, res, next)=>{
    let response = "";    
    try {

        console.log("[router] qualificationCheck init");
        
        const uuid = req.body.uuid;

        const input = {
            uuid:uuid,
        };
       const result = await nhisInstance.자격확인(input);

       console.log(result);
       res.send(result);
       
    } catch (error) {

        console.log(error);
        console.log("[router] nhis qualificationCheck :"+ error.message);

        res.send({
            statusCode:500,
            body:error.message
        })
    }
    return;
    
})

// 보험료납부 API
router.get("/insuranceFeeCheck", async(req, res, next)=>{
    let response = "";    
    try {

        console.log("[router] insuranceFeeCheck init");

        // "startDate": "202001",  // 조회 시작년월 YYYYMM 
        // "endDate": "202006",    // 조회 종료년월 YYYYMM
        // "usePurposes": "2",     // 사용용도 2: 납부확인, 4: 연말정산, 6:학교제출용, 8: 종합소득세신고용 
        // "useType": "01", // 00: 건강,장기용양보험료, 01: 건강보험료, 02: 장기
        // "originDataYN": "",// 1: 포함, 0:미포함

       const input = {
        uuid:"abcdef",
        usePurposes:"2",
        startDate:"202001",
        endDate:"202312",
        useType:"00"
       };
       
       const result = await nhisInstance.보험료납부확인(input);

       res.send(result);
       
    } catch (error) {


        console.log(error);
        console.log("[router] nhis insuranceFeeCheck :"+ error.message);

        res.send({
            statusCode:500,
            body:error.message
        })
        
        
    }
    return;
    
})


// 보험료납부 API
router.post("/insuranceFeeCheck", async(req, res, next)=>{
    let response = "";    
    try {

        console.log("[router] insuranceFeeCheck init");

        const uuid          = req.body.uuid
        const usePurposes  = req.body.usePurposes
        const startDate   = req.body.startDate
        const endDate   = req.body.endDate
        const useType  = req.body.useType

        const input = {
            uuid:uuid,
            usePurposes:usePurposes,
            startDate:startDate,
            endDate:endDate,
            useType:useType
           };
       
       const result = await nhisInstance.보험료납부확인(input);

       res.send(result);
       
    } catch (error) {


        console.log(error);
        console.log("[router] nhis insuranceFeeCheck :"+ error.message);

        res.send({
            statusCode:500,
            body:error.message
        })
        
        
    }
    return;
    
})


module.exports = router