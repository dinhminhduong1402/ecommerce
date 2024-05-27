import axios from "axios";
import CryptoJS from "crypto-js";
import qs from "qs";
import { configZLP } from "../../../../../configs";

let postData = {
  app_id: configZLP.app_id,
  app_trans_id: appTransId, // Input your app_trans_id
}

let data = [postData.app_id, postData.app_trans_id, configZLP.key1].join("|"); // appid|app_trans_id|key1
postData.mac = CryptoJS.HmacSHA256(data, configZLP.key1).toString();

let postConfig = {
  method: 'post',
  url: configZLP.endpoint + 'query',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data: qs.stringify(postData)
};

const result = await axios(postConfig).then(response => {
  return response.data
})
if (returnCode === 1) {
  console.log(`💰  Payment received!`);
  console.log("✅  Update order's status = success where app_trans_id =", postData["app_trans_id"]);
}