var crypto = require('crypto');
var aws = require('aws-sdk');
var dynamodb = new aws.DynamoDB({apiVersion: '2012-08-10'});
var TABLE_NAME = process.env.TABLE_NAME;

exports.handler = async (event) => {
  const queryParams = event.queryStringParameters;
  const pathParams = event.pathParameters;
  
  let res = {};
  if (queryParams != null) {
    const key = randomValue(10);
    const content = queryParams.content;
    if (content == null) {
      res = { code: 500, body: `Content is empty` };
    } else {
      res = putItem(key, content);
    }
  } else if (pathParams != null) {
    let path = pathParams.proxy;
    if (path[path.length-1] == '/') path = path.slice(0, -1);
    const splited = path.split('/');
    const pid = splited[splited.length-1];
    res = getItem(pid);
  } else {
    res = { code: 401, body: `Unrecognized operation` };
  }

  return res;
};

async function putItem(key, content) {
  let item = {
    "pid": {"S": key},
    "content": {"S": content}
  };
  try {
    let result = await dynamodb.putItem({
      "TableName": TABLE_NAME,
      "Item" : item
    }).promise();
    return createReseponse(200, key);
  } catch (err) {
    return createReseponse(500, `Failed to put item ${err}`);
  }
}

async function getItem(pid) {
  try {
    let result = await dynamodb.getItem({
      "TableName": TABLE_NAME,
      "Key" : { "pid": {"S": pid } }
    }).promise();
    return createReseponse(200, result.Item.content.S);
  } catch (err) {
    return createReseponse(500, `Failed to get item ${err}`);
  }
}

function createReseponse(code, data) {
  return {
    statusCode: code,
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({ "data": data })
  };
}

const charsNumbers = '0123456789';
const charsLower = 'abcdefghijklmnopqrstuvwxyz';
const charsUpper = charsLower.toUpperCase();
const chars = charsNumbers + charsLower + charsUpper;

function randomValue(length) {
  length = length || 32;
  
  let string = '';

  while (string.length < length) {
    let bf = crypto.randomBytes(length);
    for (let i = 0; i < bf.length; i++) {
      let index = bf.readUInt8(i) % chars.length;
      string += chars.charAt(index);
    }
  }
  return string;
}