// Prevent duplicate overlay
if (!document.getElementById("focus-freeze-overlay")) {

  // Freeze scrolling
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";

  // Create overlay
  const overlay = document.createElement("div");
  overlay.id = "focus-freeze-overlay";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0,0,0,0.95)";
  overlay.style.display = "flex";
  overlay.style.flexDirection = "column";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.zIndex = "999999";
  overlay.style.color = "red";
  overlay.style.fontFamily = "Arial";
  overlay.innerHTML = `
    <h1 style="font-size:48px;">STOP</h1>
    <p style="font-size:20px; color:white;">
      This is a distracting site.
    </p>
    <button id="stayBtn">Stay (30 sec)</button>
    <button id="leaveBtn">Leave</button>
    <button id="saveBtn">Save for later</button>
  `;

  document.body.appendChild(overlay);

  // STAY (30 sec)
  document.getElementById("stayBtn").onclick = () => {
    overlay.remove();
    document.documentElement.style.overflow = "auto";
    document.body.style.overflow = "auto";

    setTimeout(() => {
      location.reload(); // re-freeze after 30 sec
    }, 30000);
  };

  // LEAVE
  document.getElementById("leaveBtn").onclick = () => {
    browser.runtime.sendMessage({ action: "closeTab" });
  };

  // SAVE
  document.getElementById("saveBtn").onclick = () => {
    browser.storage.local.get("savedLinks").then((result) => {
      const links = result.savedLinks || [];
      links.push({
        url: window.location.href,
        timestamp: new Date().toISOString()
      });

      return browser.storage.local.set({ savedLinks: links });
    }).then(() => {
      browser.runtime.sendMessage({ action: "closeTab" });
    });
  };
}
