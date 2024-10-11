const SUPERHERO_TOKEN = '2077176909339668';
const BASE_URL = `https://superheroapi.com/api.php/${SUPERHERO_TOKEN}`

const randomHero = document.getElementById('randomHero');
const heroImage = document.getElementById('heroImage');
const input = document.getElementById('input');
const searchButton = document.getElementById('searchButton');

const randomNumber = () => {
    let num = Math.ceil(Math.random() * 731);
    return num;
}

const getSuperHero = (id) => {
    fetch(`${BASE_URL}/${id}`)
    .then(response => response.json())
    .then(json => {
        const name = `<h2>${json.name}</h2>`;
        const intelligence = `<p><strong>Intelligence:</strong> ${json.powerstats.intelligence}</p>`;
        const strength = `<p><strong>Strength:</strong> ${json.powerstats.strength}</p>`;
        const speed = `<p><strong>Speed:</strong> ${json.powerstats.speed}</p>`;
        const image = `<img src="${json.image.url}" height=200 width=200/>`;

        heroImage.innerHTML = `${name} ${image} ${intelligence} ${strength} ${speed}`;
    })
    .catch(error => {
        heroImage.innerHTML = `<p>Error: Could not fetch hero details. Please try again.</p>`;
        console.error("Error fetching superhero data:", error);
    });
}

const getSearchSuperHero = (name) => {
    fetch(`${BASE_URL}/search/${name}`)
    .then(response => response.json())
    .then(json => {
        if (json.response === 'success') {
            const hero = json.results[0];  // Get the first hero from the search results
            const heroName = `<h2>${hero.name}</h2>`;
            const intelligence = `<p><strong>Intelligence:</strong> ${hero.powerstats.intelligence}</p>`;
            const strength = `<p><strong>Strength:</strong> ${hero.powerstats.strength}</p>`;
            const speed = `<p><strong>Speed:</strong> ${hero.powerstats.speed}</p>`;
            const image = `<img src="${hero.image.url}" height=200 width=200/>`;

            heroImage.innerHTML = `${heroName} ${image} ${intelligence} ${strength} ${speed}`;
        } else {
            // If no hero found, display an error message
            heroImage.innerHTML = `<p>No hero found with the name "${name}". Please try again.</p>`;
        }
    })
    .catch(error => {
        // Handle any other errors that occur during the fetch
        heroImage.innerHTML = `<p>Error: Could not fetch hero data. Please try again.</p>`;
        console.error("Error fetching superhero data:", error);
    });
}

randomHero.onclick = () => getSuperHero(randomNumber());
searchButton.onclick = () => getSearchSuperHero(input.value);
