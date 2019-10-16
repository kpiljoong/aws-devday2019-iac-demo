import cdk = require('@aws-cdk/core');
import ddb = require('@aws-cdk/aws-dynamodb');
import lambda = require('@aws-cdk/aws-lambda');
import apigw = require('@aws-cdk/aws-apigateway');

import { Loader } from './loader';
import { Watchful } from 'cdk-watchful';

export class PastebinStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
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

    const wf = new Watchful(this, "Monitoring");
    wf.watchScope(this);
  }
}

export class LoaderStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const url = "https://m7ween6gz7.execute-api.ap-northeast-1.amazonaws.com/prod/3PAEctibvu/";
    new Loader(this, "TestLoader", url, 10);
  }
}

