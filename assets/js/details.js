let recipeId = localStorage.getItem('currentRecipe')
const apiKey = ''
let url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}&includeNutrition=true`

fetchRecipes(url)
    .then(function(data) {
        handleUsingData(data);
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


function handleUsingData (data) {
    console.log(data)

    const results = $('#results');
    let details = $('<div class="grid-x details">')
    let nameOfRecipe = $('<div class="name-of-recipe">').text(data.title);
    let imageContainer = $('<div class="cell small-12 medium-6">')
    let image = $(`<img src=${data.image}>`)
    let linkContainer = $('<div class="cell small-12 medium-6 side-bar">')
    let link = $(`<a class="recipe-link" href="${data.sourceUrl}">`).text('Full Recipe and Instructions')
    let sourceName = $('<h2 class="source-name">').text(`Recipe By: ${data.sourceName}`)

    linkContainer.append(link);
    linkContainer.append(sourceName)
    imageContainer.append(image)
    details.append(nameOfRecipe)
    details.append(imageContainer)
    details.append(linkContainer)

    let extraDetails = $('<div class="grid-x extra-details">')
    let leftDetails = $('<div class="cell small-6 left-details">')
    let recipeInformation = $('<h3>').text('Recipe Information')
    let rightDetails = $('<div class="cell small-6 right-details">')
    let ingredients = $('<h3>').text('Ingredients')
    let leftList = $('<ul class="left-side-container">')
    let rightList = $('<ul class="right-side-container">')
    let servings = $('<li>').text(`Yields ${data.servings} servings`)
    let readyIn = $('<li>').text(`Ready in ${data.readyInMinutes} Minutes`)
    let caloricValue = $('<li>').text(`${data.nutrition.nutrients[0].amount} Calories`)
    let protein = $('<li>').text(`${data.nutrition.nutrients[0].amount}${data.nutrition.nutrients[0].unit} Protein`)

    leftList.append(servings);
    leftList.append(readyIn);
    leftList.append(caloricValue);
    leftList.append(protein);
    
    leftDetails.append(recipeInformation);
    leftDetails.append(leftList);

    let ingredientList = data.extendedIngredients;

    ingredientList.forEach(ingredient => {
        let listItem = $('<li>').text(ingredient.original);
        rightList.append(listItem)
    });

    rightDetails.append(ingredients);
    rightDetails.append(rightList);

    extraDetails.append(leftDetails);
    extraDetails.append(rightDetails);
    
    results.append(details);
    results.append(extraDetails);

}