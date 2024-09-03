// app/2fa/page.tsx

"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function TwoFactorAuthPage() {
  const { status, data: session } = useSession();
 const router = useRouter()
  console.log("this is the session : ", session);
  const [code, setCode] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [twofactorsecret , settwofactorsecret] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (/^\d{0,6}$/.test(value)) {
      setCode(value);
    }
  };
  const fetchQRCode = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/auth/generate-qrcode"
      );
      console.log("this is the response in the 2FA page : ", res);
      setQrUrl(res.data.qrcode);
      settwofactorsecret(res.data.twofactorsecret)
    } catch (error) {
      throw error
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log("this is the code in the handle submit: ", code);
      console.log("this is the 2fa secret in the handle submit: ", twofactorsecret);


      const res = await axios.post(
        "http://localhost:3000/api/auth/verify-otp",
        {
          secret: ascii,
          token: code,
          twoFa : twofactorsecret
        }
      );
      if(res.data.verified === true){
       router.push('/')
      }else{
        toast.error('verificatoin failed!')
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchQRCode();
  }, []);

  return (
    <>
      {status === "authenticated" && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
            maxWidth: "400px",
            margin: "auto",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <h2>Two-Factor Authentication</h2>
          <div style={{ marginBottom: "20px" }}>
            <img
              src={qrUrl}
              alt="QR Code"
              style={{ width: "150px", height: "150px" }}
            />
          </div>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              value={code}
              onChange={handleChange}
              placeholder="Enter 6-digit code"
              maxLength={6}
              style={{
                padding: "10px",
                fontSize: "18px",
                textAlign: "center",
                marginBottom: "20px",
                width: "200px",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#0070f3",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
}
