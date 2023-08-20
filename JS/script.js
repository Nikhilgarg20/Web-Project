const imagesByCategory = {
  Background: [
    "Background01.jpeg",
    "Background02.jpeg",
    "Background03.jpeg",
    "Background04.jpeg",
    "Background05.jpeg",
    "Background06.jpeg",
    "Background07.jpeg",
    "Background08.jpeg",
    "Background09.jpeg",
    "Background10.jpeg",
    "Background11.jpeg",
    "Background12.jpeg",
    "Background13.jpeg",
    "Background14.jpeg",
    "Background15.jpeg",
    "Background16.jpeg",
    "Background17.jpeg",
    "Background18.jpeg",
    "Background19.jpeg",
    "Background20.jpeg",
  ],
  Mountain: [
    "Mountain01.jpeg",
    "Mountain02.jpeg",
    "Mountain03.jpeg",
    "Mountain04.jpeg",
    "Mountain05.jpeg",
    "Mountain06.jpeg",
    "Mountain07.jpeg",
    "Mountain08.jpeg",
    "Mountain09.jpeg",
    "Mountain10.jpeg",
    "Mountain11.jpeg",
    "Mountain12.jpeg",
    "Mountain13.jpeg",
    "Mountain14.jpeg",
    "Mountain15.jpeg",
    "Mountain16.jpeg",
    "Mountain17.jpeg",
    "Mountain18.jpeg",
    "Mountain19.jpeg",
    "Mountain20.jpeg",
  ],
  Nature: [
    "Nature01.jpeg",
    "Nature02.jpeg",
    "Nature03.jpeg",
    "Nature04.jpeg",
    "Nature05.jpeg",
    "Nature06.jpeg",
    "Nature07.jpeg",
    "Nature08.jpeg",
    "Nature09.jpeg",
    "Nature10.jpeg",
    "Nature11.jpeg",
    "Nature12.jpeg",
    "Nature13.jpeg",
    "Nature14.jpeg",
    "Nature15.jpeg",
    "Nature16.jpeg",
    "Nature17.jpeg",
    "Nature18.jpeg",
    "Nature19.jpeg",
    "Nature20.jpeg",
  ],
  Abstract: [
    "Abstract01.jpeg",
    "Abstract02.jpeg",
    "Abstract03.jpeg",
    "Abstract04.jpeg",
    "Abstract05.jpeg",
    "Abstract06.jpeg",
    "Abstract07.jpeg",
    "Abstract08.jpeg",
    "Abstract09.jpeg",
    "Abstract10.jpeg",
    "Abstract11.jpeg",
    "Abstract12.jpeg",
    "Abstract13.jpeg",
    "Abstract14.jpeg",
    "Abstract15.jpeg",
    "Abstract16.jpeg",
    "Abstract17.jpeg",
    "Abstract18.jpeg",
    "Abstract19.jpeg",
    "Abstract20.jpeg",
  ],
  Portrait: [
    "Portrait01.jpeg",
    "Portrait02.jpeg",
    "Portrait03.jpeg",
    "Portrait04.jpeg",
    "Portrait05.jpeg",
    "Portrait06.jpeg",
    "Portrait07.jpeg",
    "Portrait08.jpeg",
    "Portrait09.jpeg",
    "Portrait10.jpeg",
    "Portrait11.jpeg",
    "Portrait12.jpeg",
    "Portrait13.jpeg",
    "Portrait14.jpeg",
    "Portrait15.jpeg",
    "Portrait16.jpeg",
    "Portrait17.jpeg",
    "Portrait18.jpeg",
    "Portrait19.jpeg",
    "Portrait20.jpeg",
  ],
  Wildlife: [
    "Wildlife01.jpeg",
    "Wildlife02.jpeg",
    "Wildlife03.jpeg",
    "Wildlife04.jpeg",
    "Wildlife05.jpeg",
    "Wildlife06.jpeg",
    "Wildlife07.jpeg",
    "Wildlife08.jpeg",
    "Wildlife09.jpeg",
    "Wildlife10.jpeg",
    "Wildlife11.jpeg",
    "Wildlife12.jpeg",
    "Wildlife13.jpeg",
    "Wildlife14.jpeg",
    "Wildlife15.jpeg",
    "Wildlife16.jpeg",
    "Wildlife17.jpeg",
    "Wildlife18.jpeg",
    "Wildlife19.jpeg",
    "Wildlife20.jpeg",
  ],
};

const categoryLinks = document.querySelectorAll(".category_navbar-links li");
const dropdownToggle = document.querySelector(".dropdown-toggle");
const dropdownMenu = document.querySelector(".dropdown-menu");
const imageCard = document.querySelectorAll(".card");
let selectedValue = "Category";

// Set the initial selected value
function initialState(selected) {
  let selectedValue = selected;
  dropdownToggle.textContent = selectedValue;
  setBackgroundImage("Background");
  updateImageGallery();
  imageCard.forEach((card, index) => {
    const downloadButton = card.querySelector(".download-button");
    downloadButton.removeEventListener("click", handleDownloadClick);
  });
}

window.addEventListener("load", function () {
  initialState("Category");
});

// Add an event listener for dropdown menu items
dropdownMenu.addEventListener("click", function (event) {
  const clickedItem = event.target;
  if (clickedItem.tagName === "A") {
    selectedValue = clickedItem.getAttribute("data-value");
    dropdownToggle.textContent = selectedValue;
    // updateImageGallery();
    initialState(selectedValue);
  }
});

function updateImageGallery() {
  let images = null;
  if (selectedValue == "Category") {
    images = getRandomImages(imagesByCategory);
  } else {
    images = imagesByCategory[selectedValue];
    highlightingNavbar();
    dropdownToggle.textContent = selectedValue;
  }

  const shuffledImages = shuffleArray(images);

  imageCard.forEach((card, index) => {
    const imgElement = card.querySelector("img");
    const downloadButton = card.querySelector(".download-button");
    selectedValue = shuffledImages[index].slice(0, -7);
    let path = `../assets/${selectedValue}/${shuffledImages[index]}`;
    imgElement.src = path;
    imgElement.alt = selectedValue + index;

    downloadButton.addEventListener("click", () => {
      downloadButton.addEventListener("click", handleDownloadClick);
    });
  });
}

function handleDownloadClick(event) {
  const imgElement = event.target.closest(".card").querySelector("img");
  const selectedValue = imgElement.alt.slice(0, -1);
  const index = imgElement.alt.slice(-1);
  downloadImage(imgElement.src, `${selectedValue}_${index}`);
}

function highlightingNavbar() {
  // Remove 'selected' class from all li elements
  categoryLinks.forEach((li) => {
    li.classList.remove("selected");
  });

  // Add 'selected' class to the clicked li element
  if (selectedValue != "Category") {
    const selectedLink = document.querySelector(
      `[data-category="${selectedValue}"]`
    );
    selectedLink.classList.add("selected");
  }
}

// Add event listeners to category Navbar
categoryLinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    selectedValue = link.getAttribute("data-category");
    initialState(selectedValue);
    // updateImageGallery();
  });
});

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getRandomImages(imagesByCategory) {
  const allImages = Object.values(imagesByCategory).flat();
  const shuffledImages = shuffleArray([...allImages]);

  return shuffledImages.slice(0, 18);
}

// Function to download the image
function downloadImage(url, filename) {
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.style.display = "none";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

function getRandomIndex(arrayLength) {
  return Math.floor(Math.random() * arrayLength);
}

function setBackgroundImage(category) {
  const categoryImages = imagesByCategory[category];
  if (categoryImages && categoryImages.length > 0) {
    const randomIndex = getRandomIndex(categoryImages.length);
    const randomImageFilename = categoryImages[randomIndex];
    const imagePath = `../assets/Background/${randomImageFilename}`;
    document.getElementById("background").src = imagePath;
  }
}
