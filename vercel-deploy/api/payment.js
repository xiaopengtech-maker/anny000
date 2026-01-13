// Vercel Serverless Function - POST vào createToken API
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST' || req.method === 'GET') {
    try {
      // Cấu hình mặc định
      const DEFAULT_CONFIG = {
        isdn: '84866793764',
        token: '3c4ac9ef-7566-4601-bfa7-b08649849c60-d2ViXzg0ODY2NzkzNzY0',
        lang: 'vi',
        pay_code: 'topup_web'
      };
      
      // POST vào API createToken (KHÔNG CẦN amount parameter)
      const apiUrl = `https://apigami.viettel.vn/mvt-api/myviettel.php/momo/createToken?lang=${DEFAULT_CONFIG.lang}&pay_code=${DEFAULT_CONFIG.pay_code}&token=${DEFAULT_CONFIG.token}&isdn=${DEFAULT_CONFIG.isdn}`;
      
      console.log('Calling createToken API:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      console.log('API Response:', data);
      
      return res.status(200).json(data);
      
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ 
        errorCode: 1, 
        message: 'Lỗi khi gọi API: ' + error.message 
      });
    }
  }

  return res.status(405).json({ 
    errorCode: 1,
    message: 'Method not allowed' 
  });
}
