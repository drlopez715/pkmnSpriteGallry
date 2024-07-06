const apiUrl = "https://pokeapi.co/api/v2";

const searchBox = document.querySelector(".search input");

let pkmnGenerationsValue = {
    "generation-i": {
        "value": 1,
        "games": ["red-blue", "yellow"],
        "gameTitles":["Red-Blue", "Yellow"],
    },
    "generation-ii": {
        "value": 2,
        "games": ["crystal", "gold", "silver"],
        "gameTitles" : ["Crystal", "Gold", "Silver"],

    },
    "generation-iii": {
        "value": 3,
        "games": ["emerald", "firered-leafgreen", "ruby-sapphire"],
        "gameTitles" : ["Emerald", "Firered-Leafgreen", "Ruby-Sapphire"],
    },
    "generation-iv": {
        "value": 4,
        "games": ["diamond-pearl", "heartgold-soulsilver", "platinum"],
        "gameTitles" : ["Diamond-Pearl", "Heartgold-Soulsilver", "Platinum"],

    },
    "generation-v": {
        "value": 5,
        "games": ["black-white"],
        "gameTitles" : ["Black-White"],
    },
    "generation-vi": {
        "value": 6,
        "games": ["omegaruby-alphasapphire", "x-y"],
        "gameTitles" : ["Omegaruby-Alphasapphire", "X-Y"],

    },
    "generation-vii": {
        "value": 7,
        "games": ["ultra-sun-ultra-moon"],
        "gameTitles" : ["Ultra-Sun-Ultra-Moon"],

    },
    "generation-viii": {
        "value": 8,
        "games": ["sword-shield"],
        "gameTitles": ["Sword-Shield"],

    },
    "generation-ix": {
        "value": 9,
        "games": ["scarlet-violet"],
        "gameTitles" : ["Scarlet-Violet"],

    },
}

const pkmnGenerationsString = ["generation-i", "generation-ii", "generation-iii", "generation-iv",
    "generation-v", "generation-vi","generation-vii","generation-viii", "generation-ix"]


const typeBackgroundColor = {
    "Normal": "#B8B8B8",
    "Fire": "#FF1F1F",
    "Water": "#059EE0",
    "Electric": "#F2DD10",
    "Grass": "#0EAF1D",
    "Ice": "#37CABC",
    "Fighting": "#C13717",
    "Poison": "#CA49D5",
    "Ground": "#E1A844",
    "Flying": "#62E9EC",
    "Psychic": "#EF9EE3",
    "Bug": "#559D15",
    "Rock": "#826839",
    "Ghost": "#4967B3",
    "Dragon": "#0B51CE ",
    "Dark": "#34496D ",
    "Steel": "#689CBF ",
    "Fairy": "#EF9EE3 ",
}


async function getPokemonData() { 
    const genEntries = getGeneration();
    const spriteContainer = document.getElementsByClassName("sprite-container")[0];
    const urlParams = new URLSearchParams(window.location.search);
    const gen = urlParams.get("gen");

    const title = document.getElementsByClassName("title")[0];
    title.textContent = `Generation ${gen}`;

    for (let entry = genEntries[0]; entry <= genEntries[1]; entry++) { 
        const response = await fetch(`${apiUrl}/${"pokemon"}/${entry}`);        
        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }
        const pokemonData = await response.json();

        console.log("working")

        const pkmnCard = document.createElement("div");
        pkmnCard.className = "pkmn-card";
        const pkmnInfo = document.createElement("div")
        pkmnInfo.className = "pkmn-info";

        //pkmn image
        const pkmnImage = document.createElement("img");
        pkmnImage.className = "pkmn-image";
        pkmnImage.src = pokemonData.sprites.other["official-artwork"]["front_default"];
        pkmnImage.loading = "lazy";
        pkmnCard.appendChild(pkmnImage);

        //pokemon national dex number
        const pkmnDexNumber = document.createElement("p");
        pkmnDexNumber.className = "pkmn-dex-number";
        pkmnDexNumber.textContent =  `#${entry}`;
        pkmnInfo.appendChild(pkmnDexNumber);

        //pokemon name
        const pkmnName = document.createElement("p");
        pkmnName.className = "pkmn-name";
        const name = pokemonData.forms[0].name;
        pkmnName.textContent = name.charAt(0).toUpperCase() + pokemonData.forms[0].name.slice(1);
        pkmnInfo.appendChild(pkmnName);

        //pokemon types
        const typesArray = pokemonData.types;
        const typeContainer = document.createElement("div");
        typeContainer.className = "type-container";
        for (let i = 0; i < typesArray.length; i++) {
            const typeName = document.createElement("div");
            typeName.className = "type-name";
            const pokemonType = (typesArray[i].type.name).charAt(0).toUpperCase() + typesArray[i].type.name.slice(1);
            typeName.textContent = pokemonType;
            
            if (typeBackgroundColor[pokemonType]) {
                typeName.style.backgroundColor = typeBackgroundColor[pokemonType];
            }
            pkmnInfo.appendChild(typeName);
        }

        pkmnCard.appendChild(pkmnInfo);


        const pkmnLink = document.createElement("a");
        pkmnLink.className = "pkmn-link";
        pkmnLink.href = `/PKMNSpriteGallery/pokemonSprites.html?pokemon=${name}`;
        
        pkmnLink.appendChild(pkmnCard);
        spriteContainer.appendChild(pkmnLink);
    }
}

function getGeneration() { 
    const urlParams = new URLSearchParams(window.location.search);
    const gen = urlParams.get('gen');
    console.log(gen);
    const arr = [];
    switch (gen) {
        case "1":
            arr[0] = 1;
            arr[1] = 151;
            console.log(arr);
            return arr;
        case "2":
            arr[0] = 152;
            arr[1] = 251;
            console.log(arr);
            return arr;
        case "3":
            arr[0] = 252;
            arr[1] = 386;
            console.log(arr);
            return arr;
        case "4":
            arr[0] = 387;
            arr[1] = 493;
            console.log(arr);
            return arr;
        case "5":
            arr[0] = 494;
            arr[1] = 649;
            console.log(arr);
            return arr;
        case "6":
            arr[0] = 650;
            arr[1] = 721;
            console.log(arr);
            return arr;
        case "7":
            arr[0] = 722;
            arr[1] = 809;
            console.log(arr);
            return arr;
        case "8":
            arr[0] = 810;
            arr[1] = 905;
            console.log(arr);
            return arr;
        case "9":
            arr[0] = 906;
            arr[1] = 1025;
            console.log(arr);
            return arr;
     }
}

async function getPokemonSprites() { 
    const urlParams = new URLSearchParams(window.location.search);
    const pkmnName = urlParams.get('pokemon');
    const mainCard = document.getElementsByClassName("main-card")[0];
    const overViewContainer = document.getElementsByClassName("overview-table-container")[0];
    console.log(pkmnName);

    const pkmnResponse = await fetch(`${apiUrl}/${"pokemon"}/${pkmnName}`); 
    const speciesResponse = await fetch(`${apiUrl}/${"pokemon-species"}/${pkmnName}`); 

    if (!pkmnResponse.ok || !speciesResponse.ok) {
        throw new Error("Could not fetch resource");
    }
    const pokemonData = await pkmnResponse.json();
    const speciesData = await speciesResponse.json();

    const pokmonStringIntroduction = speciesData.generation.name;
    let pkmnNumberIntroduction = 0;
    console.log(pokmonStringIntroduction);

    for (let key in pkmnGenerationsValue) {
        if (key === pokmonStringIntroduction) {
            pkmnNumberIntroduction = pkmnGenerationsValue[key]["value"];
        }
    }

    //header
    const pkmnNameHeader = document.getElementById("pkmnName-header");
    pkmnNameHeader.textContent = pkmnName.charAt(0).toUpperCase() + pkmnName.slice(1) + " Sprites";

    //overview
    const overViewTable = document.createElement("table");
    overViewTable.className = "overview-table";
    const overViewBody = document.createElement("tbody");

    //rows for overview
    const generationNumRow = document.createElement("tr");
    const normalSpriteRow = document.createElement("tr");
    const shinySpriteRow = document.createElement("tr")

    const typeCellHeader = document.createElement("th");
    typeCellHeader.textContent = "Type";

    const normalCellTitle = document.createElement("th");
    normalCellTitle.textContent = "Normal";
    normalCellTitle.className = "cell";

    const shinyCellTitle = document.createElement("th");
    shinyCellTitle.textContent = "Shiny";
    shinyCellTitle.className = "cell";


    generationNumRow.appendChild(typeCellHeader);
    normalSpriteRow.appendChild(normalCellTitle);
    shinySpriteRow.appendChild(shinyCellTitle);


    //generation number row
    for (let i = pkmnNumberIntroduction; i <= 9 ; i++) { 
        const cell = document.createElement("th");
        cell.className = "cell";
        cell.textContent = `Generation ` + ` ${i}`;
        generationNumRow.appendChild(cell);
    }
    
    for (let i = pkmnNumberIntroduction; i <= 9; i++) {
        const cell = document.createElement("td");
        cell.className = "cell";


        const pkmnSprite = document.createElement("img");
        const pkmnGenName = pkmnGenerationsString[i - 1];

        //returns array of games for specfic generation
        const pkmnGameNames = pkmnGenerationsValue[`${pkmnGenName}`]["games"];
        const gameName = pkmnGameNames[0];

        if (i === 8) { 
            pkmnSprite.src = pokemonData.sprites.versions[`${pkmnGenName}`]["icons"]["front_default"];
            cell.appendChild(pkmnSprite);
            normalSpriteRow.appendChild(cell);

            continue;
        }

        if (i === 9) { 
            pkmnSprite.src = `https://img.pokemondb.net/sprites/scarlet-violet/normal/${pkmnName}.png`;
            cell.appendChild(pkmnSprite);
            normalSpriteRow.appendChild(cell);
            continue;
            
        }
        if (pokemonData.sprites.versions[`${pkmnGenName}`][`${gameName}`]["front_default"]) {
            pkmnSprite.src = pokemonData.sprites.versions[`${pkmnGenName}`][`${gameName}`]["front_default"];
        }
        else { 
            if (`https://img.pokemondb.net/sprites/${gameName}/normal/${pkmnName}.png`) { 
                pkmnSprite.src = `https://img.pokemondb.net/sprites/${gameName}/normal/${pkmnName}.png`;
            }
            pkmnSprite.src= `https://static.thenounproject.com/png/778835-200.png`
        }       
        
        cell.appendChild(pkmnSprite);
        normalSpriteRow.appendChild(cell);
         
    }


    //shiny sprite images row
    for (let i = pkmnNumberIntroduction; i <= 9 ; i++) {
        const pkmnSprite = document.createElement("img");
        const pkmnGenName = pkmnGenerationsString[i - 1];
        //returns array of games for specfic generation
        const pkmnGameNames = pkmnGenerationsValue[`${pkmnGenName}`]["games"];
        const gameName = pkmnGameNames[0];
        const cell = document.createElement("td");
        cell.className = "cell";



        try {

            if (i === 1 || i === 7 || i === 9) {
                pkmnSprite.src = `https://static.thenounproject.com/png/778835-200.png`;
                pkmnSprite.className = "missing-image";
                cell.appendChild(pkmnSprite);
                shinySpriteRow.appendChild(cell);
                continue;
            }
            if (pokemonData.sprites.versions[`${pkmnGenName}`][`${gameName}`]["front_shiny"]) {
                pkmnSprite.src = pokemonData.sprites.versions[`${pkmnGenName}`][`${gameName}`]["front_shiny"];
            }
            else { 
                if (`https://img.pokemondb.net/sprites/${gameName}/shiny/${pkmnName}.png`) { 
                    pkmnSprite.src = `https://img.pokemondb.net/sprites/${gameName}/shiny/${pkmnName}.png`;
                }
                pkmnSprite.src= `https://static.thenounproject.com/png/778835-200.png`
            }   
            pkmnSprite.src = pokemonData.sprites.versions[`${pkmnGenName}`][`${gameName}`]["front_shiny"];
        } catch (error) {
            if (error.message.includes('404')) {
                console.error('Error: Resource not found');
                // Handle 404 error (e.g., display a message to the user)

            } else {
            // Handle other errors
                console.error('An error occurred:', error.message);
                pkmnSprite.src = `https://static.thenounproject.com/png/778835-200.png`
                pkmnSprite.className = "missing-image";

            }
        }
       
        cell.appendChild(pkmnSprite);
        shinySpriteRow.appendChild(cell);
    }
    

    overViewBody.appendChild(generationNumRow);
    overViewBody.appendChild(normalSpriteRow);
    overViewBody.appendChild(shinySpriteRow);
    overViewTable.appendChild(overViewBody);
    overViewContainer.appendChild(overViewTable);
    overViewTable.setAttribute("border", "2");

  


    //pokemon sprite front, back and shiny versions
    const  generationsTableContainer = document.getElementsByClassName("generations-table-container")[0]

    for (let i = pkmnNumberIntroduction; i <= 9; i++) { 
        const generationContainer = document.createElement("div");
        generationContainer.className = "generation-container";

        const generationTable = document.createElement("table");
        const generationTableBody = document.createElement("tbody");
        const pkmnGenName = pkmnGenerationsString[i - 1];
        const pkmnGameNames = pkmnGenerationsValue[`${pkmnGenName}`]["games"];
        const pkmnGameTitleNames = pkmnGenerationsValue[`${pkmnGenName}`]["gameTitles"];


    
        const genName = document.createElement("h2");
        genName.textContent = `Generation ${i}`;
        genName.className = "gen-number-header";
        generationContainer.appendChild(genName);

        const headerRow = document.createElement("tr");
        const gameNameColumn = document.createElement("th");
        gameNameColumn.textContent = "Game"

        const frontSpriteColumn = document.createElement("th");
        frontSpriteColumn.textContent = "Front";

        const backSpriteColumn = document.createElement("th");
        backSpriteColumn.textContent = "Back"

        const shinyFrontSpriteColumn = document.createElement("th");
        shinyFrontSpriteColumn.textContent = "Shiny Front";

        const shinyBackSpriteColumn = document.createElement("th");
        shinyBackSpriteColumn.textContent = "Shiny Back";

        headerRow.append(gameNameColumn,frontSpriteColumn, backSpriteColumn, shinyFrontSpriteColumn, shinyBackSpriteColumn);
        generationTableBody.appendChild(headerRow);
        generationTable.appendChild(generationTableBody);



        for (let j = 0; j < pkmnGameNames.length; j++) { 
            const gameNameRow = document.createElement("tr");
            const gameNameCell = document.createElement("th");
            gameNameCell.textContent = pkmnGameTitleNames[j];
            gameNameCell.className = "game-name";
            const frontCell = document.createElement("td");
            const backCell = document.createElement("td");
            const shinyFrontCell = document.createElement("td");
            const shinyBackCell = document.createElement("td");

            frontCell.className = "cell";
            backCell.className = "cell";
            shinyFrontCell.className = "cell";
            shinyBackCell.className = "cell";



            const gameName = pkmnGameNames[j];
            const pkmnSpriteFront = document.createElement("img");
            const pkmnSpriteBack = document.createElement("img");
            const pkmnShinyFront = document.createElement("img");
            const pkmnShinyBack = document.createElement("img");




            if (i === 8) {
                if (speciesData.id == 810) {
                    console.log(pkmnName);
                }
                pkmnSpriteFront.src = pokemonData.sprites.versions[`${pkmnGenName}`]["icons"]["front_default"];
                frontCell.appendChild(pkmnSpriteFront);
                pkmnSpriteBack.src = `https://static.thenounproject.com/png/778835-200.png`;
                pkmnShinyFront.src = `https://static.thenounproject.com/png/778835-200.png`;
                pkmnShinyBack.src = `https://static.thenounproject.com/png/778835-200.png`;

                pkmnSpriteBack.className = "missing-image";
                pkmnShinyFront.className = "missing-image";
                pkmnShinyBack.className = "missing-image";
                

                backCell.appendChild(pkmnSpriteBack);
                shinyFrontCell.appendChild(pkmnShinyFront);
                shinyBackCell.appendChild(pkmnShinyBack);
    

                gameNameRow.append(gameNameCell,frontCell,backCell,shinyFrontCell,shinyBackCell);
                generationTableBody.appendChild(gameNameRow);
                generationTable.appendChild(generationTableBody);
                generationContainer.appendChild(generationTable);

                continue;
            }

            if (i === 9) {
                pkmnSpriteFront.src = `https://img.pokemondb.net/sprites/scarlet-violet/normal/${pkmnName}.png`;
                frontCell.appendChild(pkmnSpriteFront);

                pkmnSpriteFront.src = pokemonData.sprites.versions[`${pkmnGenName}`]["icons"]["front_default"];
                frontCell.appendChild(pkmnSpriteFront);
                pkmnSpriteBack.src = `https://static.thenounproject.com/png/778835-200.png`;
                pkmnShinyFront.src = `https://static.thenounproject.com/png/778835-200.png`;
                pkmnShinyBack.src = `https://static.thenounproject.com/png/778835-200.png`;

                pkmnSpriteBack.className = "missing-image";
                pkmnShinyFront.className = "missing-image";
                pkmnShinyBack.className = "missing-image";
                

                backCell.appendChild(pkmnSpriteBack);
                shinyFrontCell.appendChild(pkmnShinyFront);
                shinyBackCell.appendChild(pkmnShinyBack);

                gameNameRow.append(gameNameCell,frontCell,backCell,shinyFrontCell,shinyBackCell);
                generationTableBody.appendChild(gameNameRow);
                generationTable.appendChild(generationTableBody);
                generationContainer.appendChild(generationTable);
                continue;
            }

            //get front sprite for pokemon
            if (pokemonData.sprites.versions[`${pkmnGenName}`][`${gameName}`]["front_default"]) {
                pkmnSpriteFront.src = pokemonData.sprites.versions[`${pkmnGenName}`][`${gameName}`]["front_default"];
                pkmnSpriteFront.className = "cell-image";
            }
            else { 
                continue;
            }
            
            //get back sprite for pokemon
            if (pokemonData.sprites.versions[`${pkmnGenName}`][`${gameName}`]["back_default"]) {
                pkmnSpriteBack.src = pokemonData.sprites.versions[`${pkmnGenName}`][`${gameName}`]["back_default"];
                pkmnSpriteBack.className = "cell-image";

            }
            else { 
                const externalUrl = 'https://img.pokemondb.net/sprites/' + gameName + '/back-normal/' + pkmnName + '.png';
                const isImageValid = await checkImage(externalUrl);

                if (isImageValid) {
                    pkmnSpriteBack.src = externalUrl;
                    pkmnSpriteBack.className = "cell-image";

                } else {
                    pkmnSpriteBack.src = "https://static.thenounproject.com/png/778835-200.png";
                    pkmnSpriteBack.className = "missing-image";

                    
                }
            }

            //get shiny front sprite
            if (pokemonData.sprites.versions[`${pkmnGenName}`][`${gameName}`]["front_shiny"]) {
                pkmnShinyFront.src = pokemonData.sprites.versions[`${pkmnGenName}`][`${gameName}`]["front_shiny"];
                pkmnShinyFront.className = "cell-image";
            } else { 
                if (`https://img.pokemondb.net/sprites/${gameName}/shiny/${pkmnName}.png`) {
                    pkmnShinyFront.src = `https://img.pokemondb.net/sprites/${gameName}/shiny/${pkmnName}.png`;
                }
                pkmnShinyFront.src = "https://static.thenounproject.com/png/778835-200.png";
                pkmnShinyFront.className = "missing-image";
            }
           
            //get shiny back sprite
            if (pokemonData.sprites.versions[`${pkmnGenName}`][`${gameName}`]["back_shiny"]) { 
                pkmnShinyBack.src = pokemonData.sprites.versions[`${pkmnGenName}`][`${gameName}`]["back_shiny"];
                pkmnShinyBack.className = "cell-image";

            }
            else {
                const externalUrl = 'https://img.pokemondb.net/sprites/' + gameName + '/back-shiny/' + pkmnName + '.png';
                const isImageValid = await checkImage(externalUrl);

                if (isImageValid) {
                    pkmnShinyBack.src = externalUrl;
                    pkmnShinyBack.className = "cell-image";

                } else {
                    pkmnShinyBack.className = "missing-image";
                    pkmnShinyBack.src = "https://static.thenounproject.com/png/778835-200.png";
                }

            }


            frontCell.appendChild(pkmnSpriteFront);
            backCell.appendChild(pkmnSpriteBack);
            shinyFrontCell.appendChild(pkmnShinyFront);
            shinyBackCell.appendChild(pkmnShinyBack)
            gameNameRow.append(gameNameCell, frontCell, backCell, shinyFrontCell, shinyBackCell);
            generationTableBody.appendChild(gameNameRow);
            generationTable.appendChild(generationTableBody);
            generationContainer.appendChild(generationTable);

            if (i === 5 && speciesData.id <= 649) { 
                const animationRow = document.createElement("tr");
                const animationRowTitleCell = document.createElement("th")
                animationRowTitleCell.textContent = "Black 2 White 2 Black White (Animated)";
                animationRowTitleCell.className = "cell";
                animationRow.appendChild(animationRowTitleCell);

                const animatedFrontCell = document.createElement("td");
                animatedFrontCell.className = "cell";
                const animatedFrontSprite = document.createElement("img");
                animatedFrontSprite.src = pokemonData.sprites.versions[`${pkmnGenName}`][`${gameName}`]["animated"]["front_default"];
                animatedFrontSprite.className = "cell-image";

                const animatedBackCell = document.createElement("td");
                animatedBackCell.className = "cell";
                const animatedBackSprite = document.createElement("img");
                animatedBackSprite.src = pokemonData.sprites.versions[`${pkmnGenName}`][`${gameName}`]["animated"]["back_default"];
                animatedBackSprite.className = "cell-image";


                const animatedShinyFrontCell = document.createElement("td");
                animatedShinyFrontCell.className = "cell";
                const animatedShinyFrontSprite = document.createElement("img");
                animatedShinyFrontSprite.src = pokemonData.sprites.versions[`${pkmnGenName}`][`${gameName}`]["animated"]["front_shiny"];
                animatedShinyFrontSprite.className = "cell-image";

                const animatedShinyBackCell = document.createElement("td");
                animatedShinyBackCell.className = "cell";
                const animatedShinyBackSprite = document.createElement("img");
                animatedShinyBackSprite.src = pokemonData.sprites.versions[`${pkmnGenName}`][`${gameName}`]["animated"]["back_shiny"];
                animatedShinyBackSprite.className = "cell-image";


                animatedFrontCell.appendChild(animatedFrontSprite);
                animatedBackCell.appendChild(animatedBackSprite);
                animatedShinyBackCell.appendChild(animatedShinyBackSprite);
                animatedShinyFrontCell.appendChild(animatedShinyFrontSprite);

                animationRow.append(animatedFrontCell,animatedBackCell,animatedShinyFrontCell,animatedShinyBackCell);

                generationTableBody.appendChild(animationRow);
                generationTable.appendChild(generationTableBody);
                generationContainer.appendChild(generationTable);
            }
        }
        generationsTableContainer.appendChild(generationContainer)
        generationTable.setAttribute("border", "2");

    }
}


searchBox.addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        redirectPokemon(searchBox.value)
    }
});

function redirectPokemon(pkmnName) { 
    const name = pkmnName.toLowerCase()
    window.location.href = `/PKMNSpriteGallery/pokemonSprites.html?pokemon=${name}`;
}

function checkImage(url) {
    //Promise an operation that isn't completed yet but expected in the future and takes in the executor: resolve
    return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        
        //event listener onload which is exciyed when image is loaded correctly, resolve called with true
        img.onload = () => resolve(true);
        //resolve function is called with the argument false. 
        //This indicates that the image failed to load, and the Promise is resolved with a value of false.
        img.onerror = () => resolve(false);
    });
}
