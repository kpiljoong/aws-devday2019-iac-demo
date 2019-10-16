"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require("@aws-cdk/core");
const ddb = require("@aws-cdk/aws-dynamodb");
const lambda = require("@aws-cdk/aws-lambda");
const apigw = require("@aws-cdk/aws-apigateway");
const loader_1 = require("./loader");
const cdk_watchful_1 = require("cdk-watchful");
class PastebinStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const table = new ddb.Table(this, "DataTable", {
            partitionKey: {
                name: "pid",
                type: ddb.AttributeType.STRING
            }
        });
        const fn = new lambda.Function(this, "Backend", {
            runtime: lambda.Runtime.NODEJS_8_10,
            handler: 'index.handler',
            code: lambda.Code.fromAsset('./lambda')
        });
        table.grantReadWriteData(fn);
        fn.addEnvironment("TABLE_NAME", table.tableName);
        const api = new apigw.LambdaRestApi(this, "api", {
            handler: fn
        });
        const wf = new cdk_watchful_1.Watchful(this, "Monitoring");
        wf.watchScope(this);
    }
}
exports.PastebinStack = PastebinStack;
class LoaderStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const url = "https://m7ween6gz7.execute-api.ap-northeast-1.amazonaws.com/prod/3PAEctibvu/";
        new loader_1.Loader(this, "TestLoader", url, 10);
    }
}
exports.LoaderStack = LoaderStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzdGViaW4tc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXN0ZWJpbi1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFDQUFzQztBQUN0Qyw2Q0FBOEM7QUFDOUMsOENBQStDO0FBQy9DLGlEQUFrRDtBQUVsRCxxQ0FBa0M7QUFDbEMsK0NBQXdDO0FBRXhDLE1BQWEsYUFBYyxTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQzFDLFlBQVksS0FBb0IsRUFBRSxFQUFVLEVBQUUsS0FBc0I7UUFDbEUsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUU7WUFDN0MsWUFBWSxFQUFFO2dCQUNaLElBQUksRUFBRSxLQUFLO2dCQUNYLElBQUksRUFBRSxHQUFHLENBQUMsYUFBYSxDQUFDLE1BQU07YUFDL0I7U0FDRixDQUFDLENBQUM7UUFFSCxNQUFNLEVBQUUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUM5QyxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ25DLE9BQU8sRUFBRSxlQUFlO1lBQ3hCLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7U0FDeEMsQ0FBQyxDQUFDO1FBRUgsS0FBSyxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzdCLEVBQUUsQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVqRCxNQUFNLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRTtZQUMvQyxPQUFPLEVBQUUsRUFBRTtTQUNaLENBQUMsQ0FBQztRQUVILE1BQU0sRUFBRSxHQUFHLElBQUksdUJBQVEsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDNUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QixDQUFDO0NBQ0Y7QUEzQkQsc0NBMkJDO0FBRUQsTUFBYSxXQUFZLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDeEMsWUFBWSxLQUFvQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUNsRSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN4QixNQUFNLEdBQUcsR0FBRyw4RUFBOEUsQ0FBQztRQUMzRixJQUFJLGVBQU0sQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMxQyxDQUFDO0NBQ0Y7QUFORCxrQ0FNQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjZGsgPSByZXF1aXJlKCdAYXdzLWNkay9jb3JlJyk7XG5pbXBvcnQgZGRiID0gcmVxdWlyZSgnQGF3cy1jZGsvYXdzLWR5bmFtb2RiJyk7XG5pbXBvcnQgbGFtYmRhID0gcmVxdWlyZSgnQGF3cy1jZGsvYXdzLWxhbWJkYScpO1xuaW1wb3J0IGFwaWd3ID0gcmVxdWlyZSgnQGF3cy1jZGsvYXdzLWFwaWdhdGV3YXknKTtcblxuaW1wb3J0IHsgTG9hZGVyIH0gZnJvbSAnLi9sb2FkZXInO1xuaW1wb3J0IHsgV2F0Y2hmdWwgfSBmcm9tICdjZGstd2F0Y2hmdWwnO1xuXG5leHBvcnQgY2xhc3MgUGFzdGViaW5TdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBjZGsuQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICBjb25zdCB0YWJsZSA9IG5ldyBkZGIuVGFibGUodGhpcywgXCJEYXRhVGFibGVcIiwge1xuICAgICAgcGFydGl0aW9uS2V5OiB7XG4gICAgICAgIG5hbWU6IFwicGlkXCIsXG4gICAgICAgIHR5cGU6IGRkYi5BdHRyaWJ1dGVUeXBlLlNUUklOR1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgZm4gPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsIFwiQmFja2VuZFwiLCB7XG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfOF8xMCxcbiAgICAgIGhhbmRsZXI6ICdpbmRleC5oYW5kbGVyJyxcbiAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldCgnLi9sYW1iZGEnKVxuICAgIH0pO1xuXG4gICAgdGFibGUuZ3JhbnRSZWFkV3JpdGVEYXRhKGZuKTtcbiAgICBmbi5hZGRFbnZpcm9ubWVudChcIlRBQkxFX05BTUVcIiwgdGFibGUudGFibGVOYW1lKTtcblxuICAgIGNvbnN0IGFwaSA9IG5ldyBhcGlndy5MYW1iZGFSZXN0QXBpKHRoaXMsIFwiYXBpXCIsIHtcbiAgICAgIGhhbmRsZXI6IGZuXG4gICAgfSk7XG5cbiAgICBjb25zdCB3ZiA9IG5ldyBXYXRjaGZ1bCh0aGlzLCBcIk1vbml0b3JpbmdcIik7XG4gICAgd2Yud2F0Y2hTY29wZSh0aGlzKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgTG9hZGVyU3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogY2RrLkNvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuICAgIGNvbnN0IHVybCA9IFwiaHR0cHM6Ly9tN3dlZW42Z3o3LmV4ZWN1dGUtYXBpLmFwLW5vcnRoZWFzdC0xLmFtYXpvbmF3cy5jb20vcHJvZC8zUEFFY3RpYnZ1L1wiO1xuICAgIG5ldyBMb2FkZXIodGhpcywgXCJUZXN0TG9hZGVyXCIsIHVybCwgMTApO1xuICB9XG59XG5cbiJdfQ==