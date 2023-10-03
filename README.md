# greenribbon
greenribbon scraping repo

## 포트: 8080

## API 명세서

 [구글시트](https://docs.google.com/spreadsheets/d/1GCI7EjBzbIPZY6pDBeCyihoqql_iF5ySUfB-8oCe7pA/edit#gid=1450538453)
   
## 1. node_modules 설치

   npm i

        
## 2. DynamoDB Local 설치 및 실행법 
  [AWS DynamoDB Local v1.x 다운로드 링크](https://docs.aws.amazon.com/ko_kr/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html)
   * 버전: DynamoDB Local v1.x 다운로드
   * 개발환경: Windows
   * 실행방법
     1. 설치된 path로 이동
     2. 아래 명령어를 쳐주세요! port를 변경하신다면 ./dbCryd/DynamoDB_local.js에서 포트를 같이 변경해주세요!
```bash
java -Dlibray.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
```
    

    
        
## 3. 서버 실행

   npm start
   
## 4. 각각 요청 path
   
   ### 4.1 건강심사평가원 간편로그인 요청
     http://localhost:8080/hira/easyLogin
   
   ### 4.2 건강심사평가원 인증확인 요청
     http://localhost:8080/hira/authCheck
   
   ### 4.3 건강심사평가원 내진료정보열람 요청
     http://localhost:8080/nhis/readDiagnosisInfo
   
   ### 4.4 건강보험공단 간편로그인 요청
     http://localhost:8080/nhis/easyLogin
   
   ### 4.5 건강보험공단 인증확인 요청
     http://localhost:8080/hira/authCheck
   
   ### 4.6 건강보험공단 자격확인 요청
     http://localhost:8080/nhis/qualificationCheck
   
   ### 4.7 건강보험공단 보험료납부확인 요청
     http://localhost:8080/nhis/insuranceFeeCheck
