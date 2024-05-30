'use client'
import React, { useContext, useState } from 'react'
import axios from "axios";
import { useEffect } from 'react';
import { Flex, message, QRCode, Spin, Typography } from "antd";
import { redirect, useRouter } from 'next/navigation';
import { configZLP } from '@/configs';
import { DataContext } from '@/context/DataProvider';

// const { Title, Paragraph, Text } = Typography;

const CheckOutPage = () => {
    const [qrCode, setQrCode] = useState()
    const [appTransId, setAppTransId] = useState()
    const [isSuccess, setIsSuccess] = useState(false)

    const {cartData} = useContext(DataContext)
    const amount = cartData?.reduce((total, item) => {
      return total += parseInt(item.qty)*parseInt(item.product.price)
    }, 0) || 0

    // Gửi yêu cầu tạo order lên zalopay server
    useEffect(() => {
      async function createOrder() {
        // create ZLP order
        const res = await axios.post('/api/payment/zalopay_qr/create_order', {amount: amount})
        console.log("::::zalo create order res::::", res)
        const url = res.data.url
        setQrCode(url);
        setAppTransId(res.data.appTransID);
        window.open(url, '_blank')
      }
      createOrder()
    }, [])

    
    useEffect(() => {
      const checkPaymentStatus = setInterval(async () => {
        // interval query order ZLP status
        const res = await axios.post('/api/payment/zalopay_qr/query_status', {
          appTransId: appTransId,
        });
        // console.log(':::res:::', res)
        const returnCode = res.data.return_code;
        if (returnCode === 1) {
          setIsSuccess(true)
          clearInterval(checkPaymentStatus);
          // router.push("/status/success");
          console.log("::::::::Thanh toán thành công::::::::")
        }
      }, 1000);

      // setTimeout(() => {
      //   clearInterval(checkPaymentStatus);
      // }, 60*1000)
      return () => {
        clearInterval(checkPaymentStatus);
      };
    });

    console.log({qrCode, appTransId})

  return (
    <div>
        {!isSuccess && 
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <h1 style={{textAlign: 'center', color: 'orange'}}>Đang chờ thanh toán...</h1>
              <img src='https://i.pinimg.com/originals/71/3a/32/713a3272124cc57ba9e9fb7f59e9ab3b.gif'/>
          </div>
        }
        {isSuccess && 
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h1 style={{textAlign: 'center', color: 'green', paddingBottom: '80px'}}>Thanh toán thành công!</h1>
            <ul>
              <li>Mã đơn hàng: {appTransId}</li>
              <li>Thành tiền: {amount}đ</li>
            </ul>
          </div>
        }
      {/* <a href={qrCode}>
        <button>
          Chuyển hướng đến zalopay gateway
        </button>
      </a> */}
      {/* <div>
        <QRCode value={qrCode}/>
      </div> */}
       {/* <div className="container xl:max-w-screen-xl mx-auto py-12 px-6">
        <div className="payment-page">
          <div id="payment-modal">
            <div id="qr-code">
              <QRCode value={qrCode} />
            </div>
            <br />
            <Typography>
              <Title type="success" level={4}>
                Waiting for payment ...
              </Title>
              <Paragraph>
                <Spin /> Time to scan QR codes for payment{" "}
                <Text type="danger">{secondsToGo}</Text> seconds
              </Paragraph>
              <br />
              <Title type="secondary" level={4}>
                Pay with{" "}
                <img
                  src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay-Square.png"
                  id="zlp-logo-image"
                  className="checkout-image"
                  alt=""
                  height={40}
                  width={40}
                />{" "}
                by QR code
              </Title>
              <br />
              <div id="payment-steps">
                <Text strong>Payment Guide: </Text>
                <br />
                <br />
                <ul>
                  <li>
                    <p>
                      Step 1: Open <Text strong>ZaloPay</Text> app
                    </p>
                  </li>
                  <li>
                    <p>
                      Step 2: Select <Text strong>"Thanh Toán"</Text>{" "}
                      <img
                        src="/images/qr-scan-zlp.png"
                        className="checkout-image"
                        alt=""
                      />{" "}
                      and scan QR code
                    </p>
                  </li>
                  <li>
                    <p>
                      Step 3: <Text strong>Confirm payment</Text> on ZaloPay app
                    </p>
                  </li>
                </ul>
              </div>
            </Typography>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default CheckOutPage