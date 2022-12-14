var oauth = require('./index')
  , hmacsign = oauth.hmacsign
  , hmacsign256 = oauth.hmacsign256
  , assert = require('assert')
  , qs = require('querystring')

// Tests from Twitter documentation https://dev.twitter.com/docs/auth/oauth
//===============================================================================================
// HMAC-SHA256 Tests
//===============================================================================================

var reqsign256 = hmacsign256('POST', 'https://api.twitter.com/oauth/request_token', 
  { oauth_callback: 'http://localhost:3005/the_dance/process_callback?service_provider_id=11'
  , oauth_consumer_key: 'GDdmIQH6jhtmLUypg82g'
  , oauth_nonce: 'QP70eNmVz8jvdPevU3oJD2AfF7R7odC2XJcn4XlZJqk'
  , oauth_signature_method: 'HMAC-SHA256'
  , oauth_timestamp: '1272323042'
  , oauth_version: '1.0'
  }, "MCD8BKwGdgPHvAuvgvz4EQpqDAtx89grbuNMRd7Eh98")

console.log(reqsign256)
console.log('N0KBpiPbuPIMx2B77eIg7tNfGNF81iq3bcO9RO6lH+k=')
assert.equal(reqsign256, 'N0KBpiPbuPIMx2B77eIg7tNfGNF81iq3bcO9RO6lH+k=')

var accsign256 = hmacsign256('POST', 'https://api.twitter.com/oauth/access_token',
  { oauth_consumer_key: 'GDdmIQH6jhtmLUypg82g'
  , oauth_nonce: '9zWH6qe0qG7Lc1telCn7FhUbLyVdjEaL3MO5uHxn8'
  , oauth_signature_method: 'HMAC-SHA256'
  , oauth_token: '8ldIZyxQeVrFZXFOZH5tAwj6vzJYuLQpl0WUEYtWc'
  , oauth_timestamp: '1272323047'
  , oauth_verifier: 'pDNg57prOHapMbhv25RNf75lVRd6JDsni1AJJIDYoTY'
  , oauth_version: '1.0'
  }, "MCD8BKwGdgPHvAuvgvz4EQpqDAtx89grbuNMRd7Eh98", "x6qpRnlEmW9JbQn4PQVVeVG8ZLPEx6A0TOebgwcuA")
  
console.log(accsign256)
console.log('y7S9eUhA0tC9/YfRzCPqkg3/bUdYRDpZ93Xi51AvhjQ=')
assert.equal(accsign256, 'y7S9eUhA0tC9/YfRzCPqkg3/bUdYRDpZ93Xi51AvhjQ=')

var upsign256 = hmacsign256('POST', 'http://api.twitter.com/1/statuses/update.json', 
  { oauth_consumer_key: "GDdmIQH6jhtmLUypg82g"
  , oauth_nonce: "oElnnMTQIZvqvlfXM56aBLAf5noGD0AQR3Fmi7Q6Y"
  , oauth_signature_method: "HMAC-SHA256"
  , oauth_token: "819797-Jxq8aYUDRmykzVKrgoLhXSq67TEa5ruc4GJC2rWimw"
  , oauth_timestamp: "1272325550"
  , oauth_version: "1.0"
  , status: 'setting up my twitter ?????????????????????????????????'
  }, "MCD8BKwGdgPHvAuvgvz4EQpqDAtx89grbuNMRd7Eh98", "J6zix3FfA9LofH0awS24M3HcBYXO5nI1iYe8EfBA")

console.log(upsign256)
console.log('xYhKjozxc3NYef7C26WU+gORdhEURdZRxSDzRttEKH0=')
assert.equal(upsign256, 'xYhKjozxc3NYef7C26WU+gORdhEURdZRxSDzRttEKH0=')

// handle objects in params (useful for Wordpress REST API)
var upsign256 = hmacsign256('POST', 'http://wordpress.com/wp-json',
  { oauth_consumer_key: "GDdmIQH6jhtmLUypg82g"
  , oauth_nonce: "oElnnMTQIZvqvlfXM56aBLAf5noGD0AQR3Fmi7Q6Y"
  , oauth_signature_method: "HMAC-SHA256"
  , oauth_token: "819797-Jxq8aYUDRmykzVKrgoLhXSq67TEa5ruc4GJC2rWimw"
  , oauth_timestamp: "1272325550"
  , oauth_version: "1.0"
  , filter: { number: "-1" }
  }, "MCD8BKwGdgPHvAuvgvz4EQpqDAtx89grbuNMRd7Eh98", "J6zix3FfA9LofH0awS24M3HcBYXO5nI1iYe8EfBA")

console.log(upsign256)
console.log('6hXbe84vZjenN4Il6ko0dpIBxUXrWj4SBFoBwgCIK+8=')
assert.equal(upsign256, '6hXbe84vZjenN4Il6ko0dpIBxUXrWj4SBFoBwgCIK+8=')

// example in rfc5849
var params256 = qs.parse('b5=%3D%253D&a3=a&c%40=&a2=r%20b' + '&' + 'c2&a3=2+q')
params256.oauth_consumer_key = '9djdj82h48djs9d2'
params256.oauth_token = 'kkk9d7dh3k39sjv7'
params256.oauth_nonce = '7d8f3e4a'
params256.oauth_signature_method = 'HMAC-SHA256'
params256.oauth_timestamp = '137131201'

var rfc5849sign256 = hmacsign256('POST', 'http://example.com/request',
  params256, "j49sk3j29djd", "dh893hdasih9")

console.log(rfc5849sign256)
console.log('ypAxjNip++Dm0fTM+gCl8wAo6ufSnseu1WHxL7py3BU=')
assert.equal(rfc5849sign256, 'ypAxjNip++Dm0fTM+gCl8wAo6ufSnseu1WHxL7py3BU=')

//===============================================================================================
// HMAC-SHA1 Tests
//===============================================================================================
var reqsign = hmacsign('POST', 'https://api.twitter.com/oauth/request_token', 
  { oauth_callback: 'http://localhost:3005/the_dance/process_callback?service_provider_id=11'
  , oauth_consumer_key: 'GDdmIQH6jhtmLUypg82g'
  , oauth_nonce: 'QP70eNmVz8jvdPevU3oJD2AfF7R7odC2XJcn4XlZJqk'
  , oauth_signature_method: 'HMAC-SHA1'
  , oauth_timestamp: '1272323042'
  , oauth_version: '1.0'
  }, "MCD8BKwGdgPHvAuvgvz4EQpqDAtx89grbuNMRd7Eh98")

console.log(reqsign)
console.log('8wUi7m5HFQy76nowoCThusfgB+Q=')
assert.equal(reqsign, '8wUi7m5HFQy76nowoCThusfgB+Q=')

var accsign = hmacsign('POST', 'https://api.twitter.com/oauth/access_token',
  { oauth_consumer_key: 'GDdmIQH6jhtmLUypg82g'
  , oauth_nonce: '9zWH6qe0qG7Lc1telCn7FhUbLyVdjEaL3MO5uHxn8'
  , oauth_signature_method: 'HMAC-SHA1'
  , oauth_token: '8ldIZyxQeVrFZXFOZH5tAwj6vzJYuLQpl0WUEYtWc'
  , oauth_timestamp: '1272323047'
  , oauth_verifier: 'pDNg57prOHapMbhv25RNf75lVRd6JDsni1AJJIDYoTY'
  , oauth_version: '1.0'
  }, "MCD8BKwGdgPHvAuvgvz4EQpqDAtx89grbuNMRd7Eh98", "x6qpRnlEmW9JbQn4PQVVeVG8ZLPEx6A0TOebgwcuA")
  
console.log(accsign)
console.log('PUw/dHA4fnlJYM6RhXk5IU/0fCc=')
assert.equal(accsign, 'PUw/dHA4fnlJYM6RhXk5IU/0fCc=')

var upsign = hmacsign('POST', 'http://api.twitter.com/1/statuses/update.json', 
  { oauth_consumer_key: "GDdmIQH6jhtmLUypg82g"
  , oauth_nonce: "oElnnMTQIZvqvlfXM56aBLAf5noGD0AQR3Fmi7Q6Y"
  , oauth_signature_method: "HMAC-SHA1"
  , oauth_token: "819797-Jxq8aYUDRmykzVKrgoLhXSq67TEa5ruc4GJC2rWimw"
  , oauth_timestamp: "1272325550"
  , oauth_version: "1.0"
  , status: 'setting up my twitter ?????????????????????????????????'
  }, "MCD8BKwGdgPHvAuvgvz4EQpqDAtx89grbuNMRd7Eh98", "J6zix3FfA9LofH0awS24M3HcBYXO5nI1iYe8EfBA")

console.log(upsign)
console.log('yOahq5m0YjDDjfjxHaXEsW9D+X0=')
assert.equal(upsign, 'yOahq5m0YjDDjfjxHaXEsW9D+X0=')

// handle objects in params (useful for Wordpress REST API)
var upsign = hmacsign('POST', 'http://wordpress.com/wp-json',
  { oauth_consumer_key: "GDdmIQH6jhtmLUypg82g"
  , oauth_nonce: "oElnnMTQIZvqvlfXM56aBLAf5noGD0AQR3Fmi7Q6Y"
  , oauth_signature_method: "HMAC-SHA1"
  , oauth_token: "819797-Jxq8aYUDRmykzVKrgoLhXSq67TEa5ruc4GJC2rWimw"
  , oauth_timestamp: "1272325550"
  , oauth_version: "1.0"
  , filter: { number: "-1" }
  }, "MCD8BKwGdgPHvAuvgvz4EQpqDAtx89grbuNMRd7Eh98", "J6zix3FfA9LofH0awS24M3HcBYXO5nI1iYe8EfBA")

console.log(upsign)
console.log('YrJFBdwnjuIitGpKrxLUplcuuUQ=')
assert.equal(upsign, 'YrJFBdwnjuIitGpKrxLUplcuuUQ=')

// example in rfc5849
var params = qs.parse('b5=%3D%253D&a3=a&c%40=&a2=r%20b' + '&' + 'c2&a3=2+q')
params.oauth_consumer_key = '9djdj82h48djs9d2'
params.oauth_token = 'kkk9d7dh3k39sjv7'
params.oauth_nonce = '7d8f3e4a'
params.oauth_signature_method = 'HMAC-SHA1'
params.oauth_timestamp = '137131201'

var rfc5849sign = hmacsign('POST', 'http://example.com/request',
  params, "j49sk3j29djd", "dh893hdasih9")

console.log(rfc5849sign)
console.log('r6/TJjbCOr97/+UU0NsvSne7s5g=')
assert.equal(rfc5849sign, 'r6/TJjbCOr97/+UU0NsvSne7s5g=')

//===============================================================================================
// PLAINTEXT Tests
//===============================================================================================
var plainSign = oauth.sign('PLAINTEXT', 'GET', 'http://dummy.com', {}, 'consumer_secret', 'token_secret')
console.log(plainSign)
assert.equal(plainSign, 'consumer_secret&token_secret')

plainSign = oauth.plaintext('consumer_secret', 'token_secret')
console.log(plainSign)
assert.equal(plainSign, 'consumer_secret&token_secret')
