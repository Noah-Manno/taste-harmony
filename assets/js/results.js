let data = JSON.parse(localStorage.getItem('data'));
const results = $('#results')
const apiKey = ''

function handleGettingInformation (recipe) {
    infoUrl = `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${apiKey}`
    return fetch(infoUrl)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        return data;
    })
    .catch(error => console.error('Error fetching recipe information:', error));
}

function handleAddingRecipes(data){
    data.forEach(recipe => {
    handleGettingInformation(recipe)
    .then(information => {
        let recipeCard = $('<div class="recipe-card card shadow radius bordered">')
        let container = $('<div>')
        let recipeName = $('<a>').addClass('recipe-name').attr("id", 'recipe-name').attr('href', information.sourceUrl).text(information.title);
        let gridX = $('<div>').addClass('grid-x')
        let cell = $('<div class="cell small-6">')
        let img = $('<img>').attr('src', information.image)
        let detailContainer = $('<div class="cell small-6 detail-container">');
        let cookTime = $('<h2>').addClass('details').text(`Ready In ${information.readyInMinutes} Minutes`)
        let cuisine = $('<h2>').addClass('details').text(`Recipe From: ${information.sourceName}`);
        let starContainer = $('<div>').addClass('star-container');
        let star = $('<img class="favorite-star">').attr('src', './assets/images/outlinestar.png')
        let book = $('<img class="recipe-book">').attr('src', './assets/images/recipebook.png')
    
    
        starContainer.append(star)
        starContainer.append(book)
        detailContainer.append(cookTime);
        detailContainer.append(cuisine);
        detailContainer.append(starContainer)
        cell.append(img);
        gridX.append(cell);
        gridX.append(detailContainer);
        container.append(recipeName);
        container.append(gridX);
        recipeCard.append(container);
        results.append(recipeCard);
    
            if (favorites.some(fav => fav.title === recipe.title)) {
                star.attr('src', './assets/images/yellowstar.png')
            }
            star.on('click', function() {
                if (favorites.some(fav => fav.title === recipe.title)) {
                    favorites = favorites.filter(fav => fav.title !== recipe.title);
                    star.attr('src', './assets/images/outlinestar.png');
                } else {
                    favorites.push(recipe);
                    star.attr('src', './assets/images/yellowstar.png');
                }
                localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
            });
        });
    });
}


let favorites = handleFavoriteRecipes();

function handleFavoriteRecipes() {
    let favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (!Array.isArray(favorites)) {
        favorites = []
    }
    return favorites
}


handleAddingRecipes(data)