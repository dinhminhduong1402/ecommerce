// For a  working example, please navigate to: 
// https://github.com/zalopay-samples/quickstart-nextjs-dynamic-qrcode

import CryptoJS from "crypto-js";
import { configZLP } from "../../../../../configs";

export async function POST(req) {
    
    console.log('::::::::::::callback invoked!')
  
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ message: 'Method Not Allowed' }), {status: 405})
    }

  
    try {
      let result = {};
      try {
        let dataStr = req.body.data;
        let reqMac = req.body.mac;

        let mac = CryptoJS.HmacSHA256(dataStr, configZLP.key2).toString();
        console.log("mac =", mac);

        if (reqMac !== mac) {
          result.return_code = -1;
          result.return_message = "mac not equal";
        } else {
          let dataJson = JSON.parse(dataStr, configZLP.key2);
          console.log(`💰  Payment Callback received!`);
          console.log("✅  Update order's status = success where app_trans_id =", dataJson["app_trans_id"]);

          result.return_code = 1;
          result.return_message = "success";
        }
      } catch (ex) {
        result.return_code = 0;
        result.return_message = ex.message;
      }

      return new Response(JSON.stringify(result), {status: 200})
    } catch (err) {
      console.log('::ERROR::', err.message)
      return new Response(JSON.stringify({statusCode: 500, message: err.message}), {
        status: 500
      });
    }
}