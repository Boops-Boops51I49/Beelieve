const toggle = document.getElementById("toggle");
const statusText = document.getElementById("statusText");

// load saved state
browser.storage.local.get("enabled").then(result => {
  const isEnabled = result.enabled ?? true;
  toggle.checked = isEnabled;
  statusText.textContent = isEnabled ? "ON" : "OFF";
});

// update state when switched
toggle.addEventListener("change", async () => {
  const isEnabled = toggle.checked;
  await browser.storage.local.set({ enabled: isEnabled });
  statusText.textContent = isEnabled ? "ON" : "OFF";
});


document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("openSaved");

  button.addEventListener("click", function () {
    browser.tabs.create({
      url: browser.runtime.getURL("dashboard.html")
    });
  });
});
