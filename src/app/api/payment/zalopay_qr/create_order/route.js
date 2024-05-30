// For a  working example, please navigate to:
// https://github.com/zalopay-samples/quickstart-nextjs-dynamic-qrcode

import axios from "axios";
import CryptoJS from "crypto-js";
import moment from "moment";
import { configZLP } from "../../../../../configs";

const embed_data = { zlppaymentid: "P271021" };
const items = [{}]; // todo: collect items from Cart page

export async function POST(req, res) {
  const body = await req.json()
  const {amount} = body
  const transID = Date.now() + Math.floor(Math.random() * 1000);
  const appTransID = `${moment().format('YYMMDD')}_${transID}`;
  const order = {
    app_id: configZLP.app_id,
    app_trans_id: appTransID,
    app_user: "user123",
    app_time: Date.now(), // miliseconds
    item: JSON.stringify(items),
    embed_data: JSON.stringify(embed_data),
    amount: amount,
    description: `Payment for the order #${transID}`,
    bank_code: "zalopayapp",
    callback_url: 'https://c481-2a09-bac5-d46c-16d2-00-246-ab.ngrok-free.app/api/payment/zalopay_qr/callback',
    // redirect_url: configZLP.redirect_url,
  };

  const data = [configZLP.app_id, order.app_trans_id, order.app_user, order.amount, order.app_time, order.embed_data, order.item].join("|");
  order.mac = CryptoJS.HmacSHA256(data, configZLP.key1).toString();

  try {
    const result = await axios.post(`${configZLP.endpoint}create`, null, { params: order });
    console.log('::::::::::result::', result)
    return new Response(JSON.stringify({
      appTransID: appTransID,
      url: result.data.order_url
    }), { status: 200 });
  } catch (err) {
    console.error('Error creating ZaloPay order:', err);
    return new Response(JSON.stringify({ error: 'Failed to create order' }), { status: 500 });
  }
}