let data = JSON.parse(localStorage.getItem('data'));
const results = $('#results')

function handleAddingRecipes(data){
    data.forEach(recipe => {
    let recipeCard = $('<div class="recipe-card card shadow radius bordered">')
    let container = $('<div>')
    let recipeName = $('<h1>').addClass('recipe-name').attr("id", 'recipe-name').text(recipe.title);
    let gridX = $('<div>').addClass('grid-x')
    let cell = $('<div class="cell small-6">')
    let img = $('<img>').attr('src', recipe.image)
    let detailContainer = $('<div class="cell small-6 detail-container">');
    let cookTime = $('<h2>').addClass('details').text(`Cook Time`)
    let cuisine = $('<h2>').addClass('details').text('Cuisine');

    detailContainer.append(cookTime);
    detailContainer.append(cuisine);
    cell.append(img);
    gridX.append(cell);
    gridX.append(detailContainer);
    container.append(recipeName);
    container.append(gridX);
    recipeCard.append(container);
    results.append(recipeCard);
});
}

handleAddingRecipes(data)