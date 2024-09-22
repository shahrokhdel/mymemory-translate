const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3030;

// Middleware برای تجزیه داده‌های فرم و JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// سرویس فایل‌های استاتیک
app.use(express.static(path.join(__dirname, 'public')));

// مسیر اصلی برای صفحه وب
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// مسیر برای ترجمه
app.post('/translate', async (req, res) => {
  const { text, sourceLang, targetLang } = req.body;

  if (!text || !sourceLang || !targetLang) {
    return res.status(400).json({ error: 'Missing required parameters.' });
  }

  try {
    const response = await axios.get('https://api.mymemory.translated.net/get', {
      params: {
        q: text,
        langpair: `${sourceLang}|${targetLang}`,
      },
    });

    if (response.data && response.data.responseData) {
      return res.json({
        originalText: text,
        translatedText: response.data.responseData.translatedText,
      });
    } else {
      return res.status(500).json({ error: 'Invalid response from translation API.' });
    }
  } catch (error) {
    console.error('Error translating text:', error.message);
    return res.status(500).json({ error: 'Error translating text.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
