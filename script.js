const SUPERHERO_TOKEN = '2077176909339668';
const BASE_URL = `https://superheroapi.com/api.php/${SUPERHERO_TOKEN}`


const randomHero=document.getElementById('randomHero');
const heroImage=document.getElementById('heroImage');
const input=document.getElementById('input');
const searchButton=document.getElementById('searchButton');


const randomNumber=()=>{
    let num=Math.ceil(Math.random()*731);
    return num;
}

const getSuperHero=(id,name)=>{
    fetch(`${BASE_URL}/${id}`)
    .then(response => response.json())
    .then(json=>{
        //console.log(json)
        const name = `<h2>${json.name}</h2>`;
        const intelligence=`<p>${json.powerstats.intelligence}</p>`
       heroImage.innerHTML=`${name} <img src="${json.image.url}"  height=200 width=200/>intelligence:${intelligence}`;
    })
}

const getStats=(charcater)=>{
     
}

const getSearchSuperHero=(name)=>{
    fetch(`${BASE_URL}/search/${name}`)
    .then(response => response.json())
    .then(json=>{
        const hero = json.results[0];
        const name = `<h2>${hero.name}</h2>`;
       heroImage.innerHTML=`${name}<img src="${hero.image.url}"  height=200 width=200/>`;
    })
}
randomHero.onclick=()=> getSuperHero(randomNumber());
searchButton.onclick=()=>getSearchSuperHero(input.value);

