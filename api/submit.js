/**
 * Vercel Serverless Function: /api/submit
 * Handles form submission from Vercel frontend and forwards data to Google Sheets
 * Target Sheet: https://docs.google.com/spreadsheets/d/1NEL-jetzI51Ok8JkfiGHXVqWAxT5N0jefWPBWgPmff0/edit
 */

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

    const DEFAULT_GAS_URL = 'https://script.google.com/macros/s/AKfycbxpbyAfiuQQYieqINkS3F3s-LqvQBMjamtY8cgtlsPCqYZ-dCE9XBGJKVnlE4YmTMQ5Sw/exec';
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const formData = body.formData || body;
    const gasUrl = body.gasUrl || process.env.GAS_WEBHOOK_URL || DEFAULT_GAS_URL;

    if (gasUrl) {
      const gasResponse = await fetch(gasUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'saveResponses',
          formData: formData
        })
      });
      const text = await gasResponse.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch (e) {
        result = { raw: text };
      }
      return res.status(200).json({ success: true, result });
    }

    // Default response acknowledging receipt
    return res.status(200).json({
      success: true,
      message: 'บันทึกข้อมูลเรียบร้อยแล้ว',
      data: formData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Submission error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
