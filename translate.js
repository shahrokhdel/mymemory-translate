const axios = require('axios');

async function translateText(text, sourceLang, targetLang) {
  try {
    const response = await axios.get('https://api.mymemory.translated.net/get', {
      params: {
        q: text,
        langpair: `${sourceLang}|${targetLang}`,
      },
    });

    if (response.data && response.data.responseData) {
      return response.data.responseData.translatedText;
    } else {
      throw new Error('Invalid response from translation API');
    }
  } catch (error) {
    console.error('Error translating text:', error.message);
    return null;
  }
}

// äãæäå ÇÓÊÝÇÏå
(async () => {
  const textToTranslate = 'Hello, how are you?';
  const translatedText = await translateText(textToTranslate, 'en', 'de');
  console.log(`Original Text: ${textToTranslate}`);
  console.log(`Translated Text: ${translatedText}`);
})();