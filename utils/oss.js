import { Base64 } from './base64';
const Crypto = require('./crypto/cryptojs.js').Crypto;

function random_string(len) {
  len = len || 32;
  var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  var maxPos = chars.length;
  var pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}


function getUploadForm(accessid, accesskey) {
  let policyText = {
    "expiration": "2020-01-01T12:00:00.000Z", //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
    "conditions": [
      ["content-length-range", 0, 1048576000] // 设置上传文件的大小限制
    ]
  };

  let policyBase64 = Base64.encode(JSON.stringify(policyText))
  let message = policyBase64
  let bytes = Crypto.HMAC(Crypto.SHA1, message, accesskey, { asBytes: true });
  let signature = Crypto.util.bytesToBase64(bytes);

  let name = "mlbpic/PublicImage" + random_string()
  return {
    'key': name,
    'policy': policyBase64,
    'OSSAccessKeyId': accessid,
    'success_action_status': '200', //让服务端返回200,不然，默认会返回204
    'signature': signature,
  }
}


module.exports = {
  getUploadForm
}