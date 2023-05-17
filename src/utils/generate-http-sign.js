import CryptoJS from "crypto-js";

// 生成云后台请求所需的签名
export function generateSign(tokenId, secureKey, dataLength, UUID) {
  let cl = `${tokenId}${secureKey}${dataLength}${UUID}`;
  const md5 = CryptoJS.MD5(cl);
  return md5.toString().toUpperCase();
}

// headers里面加入云管家请求所需验证参数
export default function completeConfig(config) {
  const UUID = uuid();
  // TODO 获取token的方式
  const tokenId = localStorage.getItem("token");
  // TODO 获取key的方式
  const secureKey = "8630FC8C-13E8-40C7-B6F2-17E38FA4BC76";
  const sign = generateSign(
    tokenId,
    secureKey,
    JSON.stringify(config.data).length,
    UUID
  );
  config.headers = Object.assign(config.headers, {
    // TODO
    "AemsCloud-TokenId": tokenId,
    "AemsCloud-RequestId": UUID,
    "AemsCloud-Sign": sign,
  });
  return config;
}

function uuid() {
  var temp_url = URL.createObjectURL(new Blob());
  var uuid = temp_url.toString();
  URL.revokeObjectURL(temp_url);
  return uuid.substr(uuid.lastIndexOf("/") + 1);
}
