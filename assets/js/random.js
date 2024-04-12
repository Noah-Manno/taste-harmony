let favorites = handleFavoriteRecipes();
const apiKey = ''
const refresh = $('#refresh');
const results = $('#results')
let url = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=10`


fetchRecipes(url)
.then(function(data) {
    console.log(data)
    handleAddingRecipes(data);
})
.catch(function(error) {
   console.log(error) 
})


function fetchRecipes(url) {
return fetch(url)
.then(function (response) {
    if (!response.ok) {
        throw response.json();
    }
    return response.json();
})
}


function handleAddingRecipes(data){
console.log(data.recipes);
const dataRecipes = data.recipes;
    dataRecipes.forEach(recipe => {
        console.log(recipe.title)
    let recipeCard = $('<div class="recipe-card card shadow radius bordered">')
    let container = $('<div>')
    let recipeName = $('<h1>').addClass('recipe-name').attr("id", 'recipe-name').text(recipe.title);
    let gridX = $('<div>').addClass('grid-x')
    let cell = $('<div class="cell small-6">')
    let img = $('<img>').attr('src', recipe.image)
    let detailContainer = $('<div class="cell small-6 detail-container">');
    let cookTime = $('<h2>').addClass('details').text(`Cook Time`)
    let cuisine = $('<h2>').addClass('details').text('Cuisine');
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
}

function handleFavoriteRecipes() {
    let favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (!Array.isArray(favorites)) {
        favorites = []
    }
    return favorites
}

refresh.on('click', function(){
    location.reload();
})