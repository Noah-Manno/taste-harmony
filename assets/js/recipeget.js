const find = $('#find');
let noRecipeModal = $('#noRecipeModal');
find.on('click', handleGetRecipes)

function handleGetRecipes() {
    let ingredients = JSON.parse(localStorage.getItem('ingredients'));
    let allergies = JSON.parse(localStorage.getItem('allergies'));
    let diets = JSON.parse(localStorage.getItem('diets'));
    handleFetchRequest(ingredients, allergies, diets);
}

function handleFetchRequest(ingredients, allergies, diets) {
    const apiKey = ''
    let url = `https://api.spoonacular.com/recipes/`
    if (allergies.length === 0 && diets.length === 0) {
        url += `findByIngredients?apiKey=${apiKey}&ingredients=${ingredients.join(',')}`
    } else {
        url += `complexSearch?apiKey=${apiKey}&includeIngredients=${ingredients.join(',')}&diet=${diets.join(',')}&intolerances=${allergies.join(',')}`
    }

    let formattedUrl = url
    console.log(formattedUrl)

    fetchRecipes(formattedUrl)
        .then(function (data) {
            if (data.totalResults === 0) {
                noRecipeModal.foundation('open')
                console.log('no recipes found')
            } else {
                localStorage.setItem('data', JSON.stringify(data))
                window.location.href = 'results.html'
            }
        })
        .catch(function (error) {
            console.log(error)
        })
}

function fetchRecipes(formattedUrl) {
    return fetch(formattedUrl)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
}