'use client'
import React, { useState } from 'react'
import axios from "axios";
import { useEffect } from 'react';
import { QRCode } from 'antd';
import { redirect } from 'next/navigation';



const CheckOutPage = () => {
    const [qrCode, setQrCode] = useState()
    const [appTransID, setAppTransId] = useState()

    const createOrder = async () => {
      // create ZLP order
      const res = await axios.post('/api/payment/zalopay_qr/create_order')
      setQrCode(res.data.url);
      setAppTransId(res.data.appTransID);
    }
    
    useEffect(() => {
      createOrder()
    }, [])

    console.log({qrCode, appTransID})

  return (
    <div>
      <a href={qrCode}>
        <button>
          Chuyển hướng đến zalopay gateway
        </button>
      </a>
      {/* <div>
        <QRCode value={qrCode}/>
      </div> */}
    </div>
  )
}

export default CheckOutPage