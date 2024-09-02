// app/2fa/page.tsx

'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useEffect } from 'react';
import { QrCode } from 'lucide-react';

export default function TwoFactorAuthPage() {
    const { status, data: session } = useSession();

    console.log('this is the session : ', session)
  const [code, setCode] = useState('');
  const [qrUrl , setQrUrl] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (/^\d{0,6}$/.test(value)) {
      setCode(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();


  };

  useEffect(() =>{
    const fetchQRCode = async () => {
        try {
          const QRcode : string = await axios.post('http://localhost:3000/api/auth/generate-qrcode', {email : session?.user?.email});
          console.log('QR Code:', QRcode);
          setQrUrl(QRcode?.data?.qrCodeDataUrl)
          console.log('this is the qrcode : ', qrUrl)
        } catch (error) {
          console.error('Error fetching QR code:', error);
        }
      };
    
      fetchQRCode();
  }, [])

  return (<>
    {status === 'authenticated' && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            maxWidth: '400px',
            margin: 'auto',
            border: '1px solid #ddd',
            borderRadius: '8px',
          }}
        >
          <h2>Two-Factor Authentication</h2>
          <div style={{ marginBottom: '20px' }}>
            <img
              src={qrUrl}
              alt="QR Code"
              style={{ width: '150px', height: '150px' }}
            />
          </div>
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <input
              type="text"
              value={code}
              onChange={handleChange}
              placeholder="Enter 6-digit code"
              maxLength={6}
              style={{
                padding: '10px',
                fontSize: '18px',
                textAlign: 'center',
                marginBottom: '20px',
                width: '200px',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                fontSize: '16px',
                backgroundColor: '#0070f3',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Submit
            </button>
          </form>
        </div>
      )}
      </>);
}
