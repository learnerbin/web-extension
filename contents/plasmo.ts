import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://www.plasmo.com/*"]
}

window.addEventListener("load", () => {
  console.log("content script loaded")
  document.body.style.background = "yellow"

  if (!document.getElementById("myCircleDiv")) {
    // Create a circular div element
    const circleDiv = document.createElement("div")
    circleDiv.id = "myCircleDiv"
    circleDiv.style.width = "50px"
    circleDiv.style.height = "50px"
    circleDiv.style.borderRadius = "50%"
    circleDiv.style.background = "black"
    circleDiv.style.position = "fixed"
    circleDiv.style.top = "30%"
    circleDiv.style.right = "5%"
    circleDiv.style.transform = "translate(-50%, -50%)"
    circleDiv.style.userSelect = "none";
    
    makeDraggable(circleDiv);
    document.body.appendChild(circleDiv)
  }
})

function makeDraggable(element: HTMLElement) {
  let isDragging = false;
  let offsetX: number, offsetY: number;

  // Mouse down event handler
  element.addEventListener("mousedown", (e: MouseEvent) => {
    isDragging = true;

    // Calculate the offset from the mouse pointer to the top-left corner of the div
    offsetX = e.clientX - element.getBoundingClientRect().left;
    offsetY = e.clientY - element.getBoundingClientRect().top;
  });

  // Mouse move event handler
  document.addEventListener("mousemove", (e: MouseEvent) => {
    if (isDragging) {
      // Calculate new position
      const newLeft = e.clientX - offsetX;
      const newTop = e.clientY - offsetY;

      // Constrain the movement to stay within the screen boundaries
      const maxX = window.innerWidth - element.offsetWidth;
      const maxY = window.innerHeight - element.offsetHeight;

      // Update the position of the div based on the mouse movement, considering constraints
      element.style.left = Math.min(maxX, Math.max(0, newLeft)) + "px";
      element.style.top = Math.min(maxY, Math.max(0, newTop)) + "px";
    }
  });

  // Mouse up event handler
  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
}
