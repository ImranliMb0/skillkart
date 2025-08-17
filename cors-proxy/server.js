const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxAMJy2OmBu5JEiTFWFUSEdqwkNguskkrx9-e-XRvM16OLMkzeAebBVf7p3I5-KkafV/exec';

app.post('/send-order', async (req, res) => {
  try {
    const fetch = (await import('node-fetch')).default;
    console.log('Sending to GAS:', JSON.stringify(req.body));

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const data = await response.text();
    res.send(data);
  } catch (err) {
    console.error('Error forwarding request:', err);
    res.status(500).send('Something went wrong');
  }
});

app.listen(5000, () => {
  console.log('🚀 CORS Proxy running at http://localhost:5000');
});
