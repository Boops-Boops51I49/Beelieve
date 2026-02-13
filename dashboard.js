const container = document.getElementById("linksContainer");
const clearAllBtn = document.getElementById("clearAll");


function loadLinks() {

  browser.storage.local.get("savedLinks").then((result) => {
    container.innerHTML = "";
    const links = result.savedLinks || [];

    if (links.length === 0) {
      container.innerHTML = "<p>No saved links.</p>";
      return;
    }

    links.forEach((item, index) => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      const div = document.createElement("div");
      div.className = "link-item";

      const link = document.createElement("a");
      link.className = "list-group-item list-group-item-action"
      link.href = item.url;
      link.textContent = item.url;
      link.target = "_blank";

      const deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.className = "btn btn-dark";
      deleteBtn.textContent = "Delete";
      deleteBtn.onclick = () => deleteLink(index);

      div.appendChild(link);
      div.appendChild(deleteBtn);
      li.appendChild(div)

      container.appendChild(li);
    });
  });
}

function deleteLink(index) {
  browser.storage.local.get("savedLinks").then((result) => {
    const links = result.savedLinks || [];
    links.splice(index, 1);
    return browser.storage.local.set({ savedLinks: links });
  }).then(loadLinks);
}

clearAllBtn.onclick = () => {
  browser.storage.local.set({ savedLinks: [] }).then(loadLinks);
};

document.addEventListener("DOMContentLoaded", loadLinks);
