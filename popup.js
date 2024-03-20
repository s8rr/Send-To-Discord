document.addEventListener('DOMContentLoaded', function() {
    const webhookUrlInput = document.getElementById('webhookUrlInput');
    const saveButton = document.getElementById('saveButton');
    const sendPageUrlButton = document.getElementById('sendPageUrlButton');
  
    // Load saved webhook URL from storage
    chrome.storage.sync.get('webhookUrl', function(data) {
      if (data.webhookUrl) {
        webhookUrlInput.value = data.webhookUrl;
      }
    });
  
    // Save webhook URL to storage
    saveButton.addEventListener('click', function() {
      const webhookUrl = webhookUrlInput.value.trim();
      if (webhookUrl) {
        chrome.storage.sync.set({ 'webhookUrl': webhookUrl }, function() {
          console.log('Webhook URL saved successfully');
          alert('Webhook URL saved successfully');
        });
      } else {
        alert('Please enter a valid webhook URL');
      }
    });
  
    // Send page URL to Discord
    sendPageUrlButton.addEventListener('click', function() {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const pageUrl = tabs[0].url;
        sendMessage(pageUrl);
      });
    });
  });
  