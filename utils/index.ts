import fetch from "node-fetch"; // If using Node <18, run: npm install node-fetch
import CryptoJS from 'crypto-js'

function generateCustomId(): string {
  const prefix = "test";
  const number = Math.floor(Math.random() * 100); // e.g. 14
  const randomHex = Math.random().toString(16).substring(2, 26); // e.g. 68a2ff317f34abc3a8a9a9
  return `${prefix}-${number}-${randomHex}`;
}
function generateNonce(length = 16): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let nonce = '';
  for (let i = 0; i < length; i++) {
    nonce += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return nonce;
}
export async function MakeCashiaPayment(amount:number, payer: string) {
    const body = {
        "requestId": generateCustomId(),
        "amount": amount,
        "currency": "KES",
        "successRedirectUrl": "https://your-merchant-domain.com/success",
        "errorRedirectUrl": "https://your-merchant-domain.com/error",
        "webhookUrl": "https://5p7n1xdx-8081.uks1.devtunnels.ms/api/pay/callback",
        "orderDetails": [
            {
                "name": "Solar power for schools",
                "currency": "KES",
                "quantity": 1,
                "description": "Enable solar power for schools",
                "price": 1
            }
        ],
        "deliveryDetails": {
            "currency": "KES",
            "fee": 0
        }
    }
    const secret = process.env.CASHIA_API_SECRET??""
    const host = 'https://staging.cashia.com';
    const timestamp = Math.floor(Date.now() / 1000);
    const keyID = process.env.CASHIA_API_KEY??"";
    const nonce = 'nonce';
    const signatureRaw = `${host}POST${timestamp}${nonce}${keyID}`;
    
    const bodyHash = CryptoJS.HmacSHA256(JSON.stringify(body), secret).toString(CryptoJS.enc.Hex);
    const headers = {
        "Content-Type": "application/json",
        'X-Cashia-Key-ID': keyID,
        'X-Cashia-Timestamp': timestamp.toString(),
        'X-Cashia-Signature': CryptoJS.HmacSHA256(signatureRaw, secret).toString(CryptoJS.enc.Hex),
        'X-Cashia-Nonce': nonce,
        'X-Cashia-Hash': bodyHash,
    }
    try {
        const response = await fetch(host+"/api/v1/hosted-checkout", {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        });

        const data = await response.json();
        console.log("Response on server:", data);
        return data
    } catch (error) {
        console.error("Error:", error);
    }
}
