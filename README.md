# greenribbon
greenribbon scraping repo

## 포트: 8080
## API 명세서

 https://docs.google.com/spreadsheets/d/1GCI7EjBzbIPZY6pDBeCyihoqql_iF5ySUfB-8oCe7pA/edit#gid=1450538453
   
## 1. node_modules 설치

   npm i
   
## 2. 서버 실행

   npm start
   
## 3. 각각 요청 path
   
   ### 3.1 건강심사평가원 간편로그인 요청
     http://localhost:8080/hira/easyLogin
   
   ### 3.2 건강심사평가원 인증확인 요청
     http://localhost:8080/hira/authCheck
   
   ### 3.3 건강심사평가원 내진료정보열람 요청
     http://localhost:8080/nhis/readDiagnosisInfo
   
   ### 3.4 건강보험공단 간편로그인 요청
     http://localhost:8080/nhis/easyLogin
   
   ### 3.5 건강보험공단 인증확인 요청
     http://localhost:8080/hira/authCheck
   
   ### 3.6 건강보험공단 자격확인 요청
     http://localhost:8080/nhis/qualificationCheck
   
   ### 3.7 건강보험공단 보험료납부확인 요청
     http://localhost:8080/nhis/insuranceFeeCheck
