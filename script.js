const apiKey = 'OZ6cIRffKsZ2tXzOtUqdBVFBkd71VnQIlMyeiwZXEsG66RSaX6xIuOmq';
const apiUrl = 'https://api.pexels.com/v1/search';
const secondaryApiUrl = 'https://api.pexels.com/v1/search';
const query = '100'
const secondaryQuery = '200'


const loadImagesButton = document.querySelector('.btn-primary');
const loadSecondaryImagesButton = document.querySelector('.btn-secondary');

loadImagesButton.addEventListener('click', function () {
    fetchImages(apiUrl, query);
});

loadSecondaryImagesButton.addEventListener('click', function () {
    fetchImages(secondaryApiUrl, secondaryQuery);
});



function fetchImages(url, query) {
    const fullUrl = `${url}?query=${query}`;

    fetch(fullUrl, {
        headers: {
            Authorization: apiKey,
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Errore HTTP! Stato: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Risposta API:', data);
            displayImages(data);
        })
        .catch(error => {
            console.error('Errore durante la richiesta API:', error.message);
        });
}

function displayImages(data) {
    const container = document.querySelector('.album .container .row');
    container.innerHTML = '';

    data.photos.forEach(photo => {
        const card = createImageCard(photo);
        container.appendChild(card);
    });
}

function createImageCard(photo) {
    const card = document.createElement('div');
    card.className = 'col-md-4';
    card.innerHTML = `
            <div class="card mb-4 shadow-sm h-100">
                <img src="${photo.src.medium}" class="bd-placeholder-img card-img-top" alt="${photo.alt}">
                <div class="card-body">
                    <h5 class="card-title">${photo.photographer}</h5>
                    <p class="card-text">${photo.photographer_url}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-outline-secondary" onclick="hideCard(this)">Hide</button>
                        </div>
                        <small class="text-muted">${photo.id}</small>
                    </div>
                </div>
            </div>
        `;
    return card;
}

function hideCard(button) {
    const card = button.closest('.card');
    if (card) {
        card.style.display = 'none';
    }
}

const searchInput = document.querySelector('#searchInput');

searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.trim();


    if (searchTerm) {
        const searchUrl = `https://api.pexels.com/v1/search?query=${searchTerm}`;
        fetchImages(searchUrl);
    }
});

