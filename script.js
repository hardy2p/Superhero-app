const SUPERHERO_TOKEN = '2077176909339668';
const BASE_URL = `https://superheroapi.com/api.php/${SUPERHERO_TOKEN}`;

const randomHero = document.getElementById('randomHero');
const heroImage = document.getElementById('heroImage');
const input = document.getElementById('input');
const searchButton = document.getElementById('searchButton');

// When nothing is written in value button 
searchButton.onclick = () => {
    if (input.value.trim() === "") {
        heroImage.innerHTML = `<p>Please enter a superhero name!</p>`;
    } else {
        getSearchSuperHero(input.value.trim());
    }
};

// Panel element
const panel = document.createElement('div');
panel.classList.add('panel');  // Add the 'panel' class for styling
document.body.appendChild(panel);  // Append the panel to the body

const randomNumber = () => {
    return Math.ceil(Math.random() * 731);  // Generate a random number for hero ID
}

const getSuperHero = (id) => {
    fetch(`${BASE_URL}/${id}`)
    .then(response => response.json())
    .then(json => {
        const name = `<h2>${json.name}</h2>`;
        let intelligence, strength, speed, image, fullName, firstAppearance, publisher, connections;
        
        if (json.powerstats.intelligence == "null") {
            intelligence = `<p><strong>Intelligence:</strong> Sorry, no information!</p>`;
            strength = `<p><strong>Strength:</strong> Sorry, no information!</p>`;
            speed = `<p><strong>Speed:</strong> Sorry, no information!</p>`;
            image = `<img src="${json.image.url}" height=200 width=200/>`;
        } else {
            intelligence = `<p><strong>Intelligence:</strong> ${json.powerstats.intelligence}</p>`;
            strength = `<p><strong>Strength:</strong> ${json.powerstats.strength}</p>`;
            speed = `<p><strong>Speed:</strong> ${json.powerstats.speed}</p>`;
            image = `<img src="${json.image.url}" height=200 width=200/>`;
        }
        
        // Add other information
        fullName = `<p><strong>Full Name:</strong> ${json.biography["full-name"]}</p>`;
        firstAppearance = `<p><strong>First Appearance:</strong> ${json.biography["first-appearance"]}</p>`;
        publisher = `<p><strong>Publisher:</strong> ${json.biography["publisher"]}</p>`;
        connections = `<p><strong>Connections:</strong> ${json.connections["group-affiliation"]}</p>`;

        // Set content inside the panel
        panel.innerHTML = `${name} ${image} ${intelligence} ${strength} ${speed} ${fullName} ${firstAppearance} ${publisher} ${connections}`;
        input.value=`${json.name}`;
        // Show the panel with animation
        panel.classList.add('show');

        //From an js lib to change the bg of the app with the newly developed with the dominant color in the image
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = json.image.url;

        img.onload = () => {
            const colorThief = new ColorThief();
            const dominantColor = colorThief.getColor(img);
            document.body.style.backgroundColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
        };
    })
    .catch(error => {
        panel.innerHTML = `<p>Error: Could not fetch hero details. Please try again.</p>`;
        panel.classList.add('show');
        console.error("Error fetching superhero data:", error);
    });
}

const getSearchSuperHero = (name) => {
    fetch(`${BASE_URL}/search/${name}`)
    .then(response => response.json())
    .then(json => {
        if (json.response === 'success') {
            let intelligence, strength, speed, image, fullName, firstAppearance, publisher, connections;
            const hero = json.results[0];  // Get the first hero from the search results
            const heroName = `<h2>${hero.name}</h2>`;
            if (hero.powerstats.intelligence == "null") {
                intelligence = `<p><strong>Intelligence:</strong> Sorry, no information!</p>`;
                strength = `<p><strong>Strength:</strong> Sorry, no information!</p>`;
                speed = `<p><strong>Speed:</strong> Sorry, no information!</p>`;
                image = `<img src="${hero.image.url}" height=200 width=200/>`;
            } else {
                intelligence = `<p><strong>Intelligence:</strong> ${hero.powerstats.intelligence}</p>`;
                strength = `<p><strong>Strength:</strong> ${hero.powerstats.strength}</p>`;
                speed = `<p><strong>Speed:</strong> ${hero.powerstats.speed}</p>`;
                image = `<img src="${hero.image.url}" height=200 width=200/>`;
            }
            
            // Add other information
            fullName = `<p><strong>Full Name:</strong> ${hero.biography["full-name"]}</p>`;
            firstAppearance = `<p><strong>First Appearance:</strong> ${hero.biography["first-appearance"]}</p>`;
            publisher = `<p><strong>Publisher:</strong> ${hero.biography["publisher"]}</p>`;
            connections = `<p><strong>Connections:</strong> ${hero.connections["group-affiliation"]}</p>`;

            // Set content inside the panel
            panel.innerHTML = `${heroName} ${image} ${intelligence} ${strength} ${speed} ${fullName} ${firstAppearance} ${publisher} ${connections}`;
            panel.classList.add('show');  // Show the panel with animation
        } else {
            // If no hero found, display an error message
            panel.innerHTML = `<p>No hero found with the name "${name}". Please try again.</p>`;
            panel.classList.add('show');
        }
    })
    .catch(error => {
        // Handle any other errors that occur during the fetch
        panel.innerHTML = `<p>Error: Could not fetch hero data. Please try again.</p>`;
        panel.classList.add('show');
        console.error("Error fetching superhero data:", error);
    });
}

// Add event listeners to the buttons
randomHero.onclick = () => getSuperHero(randomNumber());
searchButton.onclick = () => getSearchSuperHero(input.value);
