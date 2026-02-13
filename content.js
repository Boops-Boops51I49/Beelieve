// Prevent duplicate overlay
if (!document.getElementById("focus-freeze-overlay")) {

  // Freeze scrolling
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";

  // Create overlay
  document.body.style.pointerEvents = "none";

  const overlay = document.createElement("div");
  overlay.id = "focus-freeze-popup";
  overlay.style.position = "fixed";
  overlay.style.top = "20px";
  overlay.style.right = "20px";
  overlay.style.width = "300px";
  overlay.style.backgroundColor = "#000000";
  overlay.style.color = "white";
  overlay.style.padding = "20px";
  overlay.style.borderRadius = "12px";
  overlay.style.boxShadow = "0 0 20px rgba(0,0,0,0.6)";
  overlay.style.zIndex = "999999";
  overlay.style.fontFamily = "Helvetica";
  overlay.style.display = "flex";
  overlay.style.flexDirection = "column";
  overlay.style.gap = "10px";

  overlay.innerHTML = `
    <h2 style="color:red; margin:0;">STOP</h2>
    <p style="margin:0;">This is a distracting site.</p>
    <button id="stayBtn">Stay (30 sec)</button>
    <button id="leaveBtn">Leave</button>
    <button id="saveBtn">Save for later</button>
  `;

  document.body.appendChild(overlay);

  // Allow interaction only inside overlay
  overlay.style.pointerEvents = "auto";
  
  document.body.appendChild(overlay);

  // STAY (30 sec)
  document.getElementById("stayBtn").onclick = () => {
    overlay.remove();
    document.documentElement.style.overflow = "auto";
    document.body.style.overflow = "auto";

    setTimeout(() => {
      location.reload();
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
      });

      return browser.storage.local.set({ savedLinks: links });
    }).then(() => {
      browser.runtime.sendMessage({ action: "closeTab" });
    });
  };
}
