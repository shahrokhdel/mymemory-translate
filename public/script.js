document.getElementById('translate-form').addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent traditional form submission

  // Get form values
  const text = document.getElementById('text').value.trim();
  const sourceLang = document.getElementById('sourceLang').value;
  const targetLang = document.getElementById('targetLang').value;

  // Check if text is empty
  if (!text) {
    displayError('Please enter the text to translate.');
    return;
  }

  try {
    // Send POST request to the server
    const response = await fetch('/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, sourceLang, targetLang }),
    });

    const data = await response.json();

    if (response.ok) {
      displayResult(data.translatedText);
    } else {
      displayError(data.error || 'An unknown error occurred.');
    }
  } catch (error) {
    displayError('Failed to connect to the server.');
    console.error('Error:', error);
  }
});

function displayResult(translatedText) {
  const resultDiv = document.getElementById('result');
  resultDiv.style.display = 'block';
  resultDiv.textContent = `Translated Text: ${translatedText}`;

  // Hide the error message
  const errorDiv = document.getElementById('error');
  errorDiv.style.display = 'none';
}

function displayError(message) {
  const errorDiv = document.getElementById('error');
  errorDiv.style.display = 'block';
  errorDiv.textContent = message;

  // Hide the result
  const resultDiv = document.getElementById('result');
  resultDiv.style.display = 'none';
}
