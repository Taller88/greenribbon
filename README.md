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
     * 예시 예시데이터는 [여기](https://onlinepngtools.com/convert-base64-to-png)에서 변환시켜보실 수 있습니다. 
       ```bash
       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
       ```
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
     * 문자확인에서 'success_auth'가 나왔다면 로그인 성공한 것이므로 '4.3 건강심사평가원 내진료정보열람 요청'을 요청하시면 됩니다. 


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

     
