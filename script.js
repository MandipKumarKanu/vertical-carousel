const carousel = document.querySelector(".carousel");
const cards = document.querySelectorAll(".card");

let positions = ["top", "center", "bottom"];
let isDragging = false;
let startY;
let startScrollY;
let currentTranslateY = 0;
let previousTranslateY = 0;

cards.forEach((card, index) => {
  card.addEventListener("click", () => {
    const currentPostion = positions[index];
    if (currentPostion === "top") {
      moveDown();
    } else if (currentPostion === "bottom") {
      moveUp();
    }
  });
});

/**
 * Removes last element and adds it to the beginning
 */
function moveUp() {
  positions.unshift(positions.pop());
  updateCards();
}

/**
 * Removes first element and adds it to the end
 */
function moveDown() {
  positions.push(positions.shift());
  updateCards();
}

/**
 * Updates the class names of all cards based on their current positions (i.e. top, center, or bottom)
 */
function updateCards() {
  cards.forEach((card, index) => {
    card.className = `card ${positions[index]}`;
  });
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", drag);
carousel.addEventListener("mouseup", dragEnd);
carousel.addEventListener("mouseleave", dragEnd);

/**
 * Initializes drag operation when mouse button is pressed
 */
function dragStart(e) {
  startY = e.pageY;
  isDragging = true;
  carousel.classList.add("dragging");
}

/**
 * Handles the dragging motion of the carousel
 * Determines direction and triggers move if drag distance is more than 50
 */
function drag(e) {
  if (!isDragging) return;

  e.preventDefault();

  const currentY = e.type === "mousemove" ? e.pageY : "";
  const diff = currentY - startY;

  if (Math.abs(diff) > 50) {
    if (diff < 0) {
      moveUp();
    } else {
      moveDown();
    }
    isDragging = false;
    carousel.classList.remove("dragging");
  }
}

/**
 * Ends the drag operation and removes dragging visual state
 */
function dragEnd() {
  isDragging = false;
  carousel.classList.remove("dragging");
}
