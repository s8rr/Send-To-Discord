// Background script
chrome.runtime.onInstalled.addListener(() => {
    // Create a context menu item to send images or links to Discord
    chrome.contextMenus.create({
      id: "sendToDiscordImage",
      title: "Send Image to Discord",
      contexts: ["image"],
      icons: {
        "16": "icon.png",
        "48": "icon.png"
      }
    });
  
    chrome.contextMenus.create({
      id: "sendToDiscordLink",
      title: "Send Link to Discord",
      contexts: ["link"],
      icons: {
        "16": "icon.png",
        "48": "icon.png"
      }
    });
  
    // Add context menu item to send current page URL to Discord
    chrome.contextMenus.create({
      id: "sendPageUrl",
      title: "Send Page URL to Discord",
      contexts: ["page"],
      icons: {
        "16": "icon.png",
        "48": "icon.png"
      }
    });
  });
  
  // Handle click events on context menu items
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
      case "sendToDiscordImage":
        sendMessage(info.srcUrl);
        break;
      case "sendToDiscordLink":
        sendMessage(info.linkUrl);
        break;
      case "sendPageUrl":
        sendMessage(tab.url);
        break;
      default:
        break;
    }
  });
  
  // Function to send message to Discord webhook
  function sendMessage(content) {
    // Get webhook URL from storage
    chrome.storage.sync.get('webhookUrl', function(data) {
      const webhookUrl = data.webhookUrl;
      if (webhookUrl) {
        fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ content })
        })
        .then(response => {
          if (!response.ok) {
            console.error('Error sending message to Discord:', response.statusText);
          }
        })
        .catch(error => {
          console.error('Error sending message to Discord:', error.message);
        });
      } else {
        console.error('Webhook URL not found. Please save a webhook URL in the extension popup.');
      }
    });
  }
  