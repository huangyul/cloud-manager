import md5 from "js-md5";
import Hashes from "hashes";
import CryptoJS from "crypto-js";

// 生成云后台请求所需的签名
export function generateSign(tokenId, secureKey, dataLength, UUID) {
  let cl = `${tokenId}${secureKey}${dataLength}${UUID}`;
  const md5 = CryptoJS.MD5(cl);
  return md5.toString().toUpperCase();
}

// headers里面加入云管家请求所需验证参数
export default function completeConfig(config) {
  const UUID = crypto.randomUUID();
  const tokenId = "bcc686ac-d3a1-47c5-b44f-9d46612e3b99";
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
