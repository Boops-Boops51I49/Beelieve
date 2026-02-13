document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("openSaved");

  button.addEventListener("click", function () {
    browser.tabs.create({
      url: browser.runtime.getURL("dashboard.html")
    });
  });
});
