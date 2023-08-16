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
};

setBackgroundImage("Background");

function getRandomIndex(arrayLength) {
	return Math.floor(Math.random() * arrayLength);
}

function setBackgroundImage(category) {
	const categoryImages = imagesByCategory[category];
	if (categoryImages && categoryImages.length > 0) {
		const randomIndex = getRandomIndex(categoryImages.length);
		const randomImageFilename = categoryImages[randomIndex];
		const imagePath = `../assets/Background/${randomImageFilename}`;
		document.getElementById("signinBackground").src = imagePath;
	}
}
