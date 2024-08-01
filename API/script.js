const apiKey = 'admTSZe1f2vuYgIGxwcR4DwXjt67275I0HSaVJpr';  // Replace with your API key if you have one
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

async function fetchData(date) {
    try {
        const url = `${apiUrl}&date=${date}`;
        const response = await fetch(url);
        const data = await response.json();
        displayData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayData(data) {
    const imageContainer = document.getElementById('image-container');
    imageContainer.innerHTML = `
        <h2>${data.title}</h2>
        <img src="${data.url}" alt="${data.title}" class="img-fluid mb-3">
        <p>${data.explanation}</p>
    `;
}

function getRandomDate() {
    // Generate a random date within the past year
    const start = new Date();
    start.setFullYear(start.getFullYear() - 1);
    const end = new Date();
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
        .toISOString()
        .split('T')[0]; // Format date as YYYY-MM-DD
}

function handleRefresh() {
    // Use a random date for demonstration
    fetchData(getRandomDate());
}

document.addEventListener('DOMContentLoaded', () => {
    fetchData(new Date().toISOString().split('T')[0]); // Load today's image initially
    document.querySelector('button').addEventListener('click', handleRefresh);
});
