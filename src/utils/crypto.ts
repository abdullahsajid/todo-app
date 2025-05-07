import crypto from "crypto-js";

namespace CryptoUtils {
  export const decrypt = (data: string) => {
    const decryptedBytes = crypto.AES.decrypt(data, process.env.NEXT_PUBLIC_SECRET_KEY);
    const decryptedData = decryptedBytes.toString(crypto.enc.Utf8);
    return decryptedData;
  };

  export const encrypt = (data: string) => {
    let encrypted = crypto.AES.encrypt(
      data.toString(),
      process.env.NEXT_PUBLIC_SECRET_KEY
    ).toString();
    return encrypted;
  };
}

export default CryptoUtils;
