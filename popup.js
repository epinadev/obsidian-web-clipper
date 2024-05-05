document.addEventListener('DOMContentLoaded', function() {
  const saveButton = document.getElementById('saveButton');
  const errorMsg = document.getElementById('errorMessage');
  const linkField = document.getElementById('linkField');
  const todoField = document.getElementById('todoField');
  const actionField = document.getElementById('actionField');

  // Populate link field with current tab URL
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    linkField.value = tabs[0].url;
  });

  //Focus the TODO field
  todoField.focus();

  function getFormattedDate() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }


  // Function to save data
  function saveData() {
    const today = getFormattedDate();
    const data = `${todoField.value} -> [Source](${linkField.value})`
    url = 'http://127.0.0.1:27123/'
    url += actionField == 'today' ? 'active' : `vault/Journal/${today}.md`
    console.log(url)


    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/markdown',
        'Authorization': 'Bearer 23da112bd4ce1546e729c6e9094b06820049695ba804c81669992bc1595e0541'
      },
      body: data
    }).then(() => {
      window.close(); // Close the modal after save
    }).catch(err => {
      errorMsg.textContent = "TODO service not running or failed: " + err
    });
  }

  // Click event for save button
  saveButton.onclick = saveData;

  // Keydown event for Enter key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      saveData();
    }
  });
});
