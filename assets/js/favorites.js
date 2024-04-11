let favorites = handleFavoriteRecipes();
const results = $('#results')
const refresh = $('#refresh');

function handleAddingRecipes(favorites){
    favorites.forEach(recipe => {
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

handleAddingRecipes(favorites)