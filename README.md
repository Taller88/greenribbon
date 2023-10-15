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
    

    
        
## 3. 서버 실행 및 DB Create
  1. 서버 실행
     ```bash
        npm start
     ```
  2. DB Create
     * 다른 요청전에 DB Schema 생성을 위해 서버를 켜신후에 아래 통신을 한번만 날려주세요!
     * DB create 설정은 ./dbCrud/DynamoDB_local.js파일의 createTable 함수를 보시면 확인하실 수 있습니다!
     * http://localhost:8080/nhis/dbCreate
   
## 4. 문자인증 특이사항 
  1. 문자Init
     * 문자를 요청하기 위해서는 보안문자를 입력해야합니다. 
     * 보안문자는 해당 통신을 날리면 base64로 인코딩한 데이터가 응답으로 떨어집니다. 
  2. 문자요청
     * 다른 easyLogin과 parameter는 거의 동일
     * 1번의 문자Init에서 응답받은 보안문자(captchaImg)를 사용자에게 보여주고 입력하게 해야함 
     
     2.1. 특이사항(!!!!!)
        * 문자인증을 지원하는 스크래핑 대상 사이트에서 개인정보 validation 체크를 하지 않음
        * 통신 오류만 나지 않으면 무조건 'success_sms_request' 응답이 나옴
          
        [여기](https://www.hira.or.kr/rb/diag/form.do?pgmid=HIRAA070001000600) 들어가보시면 확인하실 수 있습니다.
     
  3. 문자확인
     * 전달받은 인증번호(authNum)를 입력해주세요
     * 인증번호는 validation 체크를 함


## 5. 각각 요청 path + sms 요청 추가
   
   ### 4.1 건강심사평가원 간편로그인 요청
     http://localhost:8080/hira/easyLogin
   
   ### 4.2 건강심사평가원 인증확인 요청
     http://localhost:8080/hira/authCheck
   
   ### 4.3 건강심사평가원 내진료정보열람 요청
     http://localhost:8080/hira/readDiagnosisInfo
        
   ### 4.4 건강심사평가원 문자Init 요청
     http://localhost:8080/hira/smsInit
     
   ### 4.5 건강심사평가원 문자요청 요청
     http://localhost:8080/hira/smsRequest
     
   ### 4.6 건강심사평가원 문자확인 요청
     http://localhost:8080/hira/smsCheck
     
   ### 4.7 건강보험공단 간편로그인 요청
     http://localhost:8080/nhis/easyLogin
   
   ### 4.8 건강보험공단 인증확인 요청
     http://localhost:8080/nhis/authCheck
   
   ### 4.9 건강보험공단 자격확인 요청
     http://localhost:8080/nhis/qualificationCheck
   
   ### 4.0 건강보험공단 보험료납부확인 요청
     http://localhost:8080/nhis/insuranceFeeCheck

     
