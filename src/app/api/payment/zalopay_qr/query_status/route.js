import axios from "axios";
import CryptoJS from "crypto-js";
import qs from "qs";
import {configZLP} from "../../../../../configs";
import { message } from "antd";

export async function POST(req) {
  // console.log('::req::', req)
  if (req.method !== 'POST') {    
    return new Response(JSON.stringify({ message: 'Method Not Allowed' }), {status: 405})
  }
  try {
    const body = await req.json()
    const appTransId = body.appTransId;
    console.log('::appTransId::', appTransId)

    let postData = {
      app_id: configZLP.app_id,
      app_trans_id: appTransId,
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

    const queryResult = await axios(postConfig).then(res => res.data)
    return new Response(JSON.stringify(queryResult), {status: 200})
    
    // axios(postConfig)
    // .then(function (response) {
    //   return new Response(JSON.stringify(response.data), {status: 200})
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  } catch (err) {
    console.log('::::::ERROR::',err.message)
      return new Response(JSON.stringify(err.message), {status: 500})
  }
}