'use client'
import React, { useState } from 'react'
import axios from "axios";
import { useEffect } from 'react';
import { message, QRCode, Spin, Typography } from "antd";
import { redirect } from 'next/navigation';
import { configZLP } from '@/configs';
// import { useRouter } from 'next/router';

// const { Title, Paragraph, Text } = Typography;

const CheckOutPage = () => {
    const [isSuccess, setIsSuccess] = useState(false)
    const [appTransId, setAppTransId] = useState()
    useEffect(() => {
      const checkPaymentStatus = setInterval(async () => {
        // interval query order ZLP status
        const res = await axios.post('/api/payment/zalopay_qr/query_status', {
          appTransId: appTransId,
        });
        console.log(':::res:::', res)
        const returnCode = res.data.return_code;
        if (returnCode === 1) {
          setIsSuccess(true)
          clearInterval(checkPaymentStatus);
          // router.push("/status/success");
          console.log("::::::::Thanh toán thành công::::::::")
        }
      }, 2000);

      // setTimeout(() => {
      //   clearInterval(checkPaymentStatus);
      // }, 60*1000)
      return () => {
        clearInterval(checkPaymentStatus);
      };
    });


  return (
    <div>
       <h1>Thông tin đơn hàng</h1>
       <ul>
         <li>Mã đơn hàng: {}</li>
         <li>Trạng thái đơn: {isSuccess?'Thanh toán thành công.' :''}</li>
       </ul>
    </div>
  )
}

export default CheckOutPage