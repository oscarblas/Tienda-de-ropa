console.clear();

const elTextGrid = document.querySelector(".text-grid");

function splittingLite(el) {
  let characters = el.innerText
    .split("")
    .filter((char) => char !== " ")
    .map(
      (char, i) =>
        `<span class="char" data-char="${char}" style="--i: ${i}">${char}</span>`
    );
  el.innerHTML = characters.join("");
  el.style.setProperty("--total", characters.length);
  return el.querySelectorAll(".char");
}

const elCharacters = splittingLite(elTextGrid);

function getCharMeasurements() {
  return Array.from(elCharacters, (elChar) => {
    return {
      element: elChar,
      rect: elChar.getBoundingClientRect(),
      distance: 0
    };
  });
}

let charMeasurements = getCharMeasurements();

window.addEventListener("resize", () => {
  charMeasurements = getCharMeasurements();
});

function recalculateDistances(mouseCoords) {
  let containerRect = elTextGrid.getBoundingClientRect();
  let diagonal = Math.hypot(containerRect.width, containerRect.height);
  charMeasurements.forEach(({ element, rect }) => {
    const distance = Math.hypot(
      rect.left - mouseCoords.x,
      rect.top - mouseCoords.y
    );
    const normalizedDistance = 1 - distance / diagonal;
    element.style.setProperty(
      "--distance",
      Math.max(Math.pow(normalizedDistance, 3), 0)
    );
  });
}

document.addEventListener("mousemove", (event) => {
  const { clientX, clientY } = event.touches ? event.touches[0] : event;
  recalculateDistances({ x: clientX, y: clientY });
});
