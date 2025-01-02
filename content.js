function modifyAnchors() {
    document.querySelectorAll("a[target='_blank']").forEach(anchor => {
        anchor.setAttribute("target", "_self")
        anchor.setAttribute("data-modified", "true")
    })
}

function revertAnchors() {
    document.querySelectorAll("a[data-modified='true']").forEach(anchor => {
        anchor.setAttribute("target", "_blank")
        anchor.removeAttribute("data-modified")
    })
}

// check if the extrension is enabled
chrome.storage.local.get(["isEnabled"], (result => {
    const isEnabled = result.isEnabled !== false;
    if (isEnabled) {
        modifyAnchors()
    } else {
        revertAnchors()
    }

        
}))

// Monitor dynamically added links
const observer = new MutationObserver(mutations => {
    chrome.storage.local.get(["isEnabled"], (result) => {
      const isEnabled = result.isEnabled !== false; // Default to true
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length) {
          mutation.addedNodes.forEach(node => {
            if (node.tagName === "A" && node.getAttribute("target") === "_blank") {
              if (isEnabled) {
                node.setAttribute("target", "_self");
                node.setAttribute("data-modified", "true");
              }
            } else if (node.querySelectorAll) {
              node.querySelectorAll("a[target='_blank']").forEach(anchor => {
                if (isEnabled) {
                  anchor.setAttribute("target", "_self");
                  anchor.setAttribute("data-modified", "true");
                }
              });
  
              node.querySelectorAll("a[data-modified='true']").forEach(anchor => {
                if (!isEnabled) {
                  anchor.setAttribute("target", "_blank");
                  anchor.removeAttribute("data-modified");
                }
              });
            }
          });
        }
      });
    });
  });
  
  observer.observe(document.body, { childList: true, subtree: true });
    

// document.querySelectorAll("a").forEach(anchor => {
//     anchor.setAttribute("target", "_self");
//   });
  
  
  