chrome.storage.onChanged.addListener((changes, namespace) => {
  console.log("changes", changes);
  console.log("namespace", namespace);
});

chrome.storage.local.get(null, () => {
  console.log("chrome.storage.local.get");
});
