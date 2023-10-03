
const AWS = require("aws-sdk");

AWS.config.update({
    region: "local",
    endpoint: "http://localhost:8000"
});
var dynamodb = new AWS.DynamoDB();

exports.putItem = (param)=>{
    try {
        var docClient = new AWS.DynamoDB.DocumentClient();
        var params = {
            TableName: "Scraping",
            Item: param
        };
        
        return new Promise((resolve, reject)=>{
            docClient.put(params, function(err, data) {
                if (err) {
                    reject(err);
                    console.error(err);
                } else {
                    resolve({
                        statusCode:200,
                        body:"success"
                    });
                    // console.log("PutItem succeeded:", scran.name);
                }
            });    
        })

    } catch (error) {
        console.log(error);
        return {
            statusCode:500,
            body:"DBError"
        }   
    }
}

exports.selectItem = (uuid)=>{
    try {
        var docClient = new AWS.DynamoDB.DocumentClient();

      var table = "Scraping";

      var params = {
          TableName: table,
          Key: {
              uuid: uuid
          }
      };

      return new Promise((resolve, reject)=>{
        docClient.get(params, function(err, data) {
          if (err) {
              reject(err);
              // console.error(
              //     "Unable to read item. Error JSON:",
              //     JSON.stringify(err, null, 2)
              // );
          } else {
              resolve(data);
              // console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
          }
      });

      }) 
    } catch (error) {
        return {
            statusCode:500,
            body:"DBerror"
        }   
    }
}
exports.createTable = (params)=>{
    
    
    var params = {
        TableName : "Scraping",
        KeySchema: [
            { AttributeName: "uuid", KeyType: "HASH"},  //Partition key
    ],
        // 속성 정의 S-String N-Number B-Binary
        AttributeDefinitions: [
            { AttributeName: "uuid", AttributeType: "S" },
    ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    };
    
    return new Promise((resolve, reject)=>{
        
        dynamodb.createTable(params, function(err, data) {
            if (err) {
                console.error("Error JSON.", JSON.stringify(err, null, 2));
                reject(err);
            } else {
                console.log("Created table.", JSON.stringify(data, null, 2));
                resolve(data);
            }
        });
    })  
    
}
