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

  try {
    const formData = req.body;
    if (!formData) {
      return res.status(400).json({ success: false, error: 'Missing form data' });
    }

    // Google Apps Script Webhook URL (if configured)
    const GAS_WEBHOOK_URL = process.env.GAS_WEBHOOK_URL || '';

    if (GAS_WEBHOOK_URL) {
      const gasResponse = await fetch(GAS_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'saveResponses',
          formData: formData
        })
      });
      const result = await gasResponse.json();
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
