const find = $('#find');
find.on('click', handleGetRecipes)

function handleGetRecipes() {
    let ingredients = JSON.parse(localStorage.getItem('ingredients'));
    handleFetchRequest(ingredients);
}

function handleFetchRequest(ingredients) {
    const apiKey = ''
    let url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=`
    let formattedUrl = url;
    ingredients.forEach((ingredient, index) => {
        if (index ===0) {
            formattedUrl += ingredient
        } else {
            formattedUrl += `,${ingredient}`
        }
    });

    fetch(formattedUrl)
}


