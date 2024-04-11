const find = $('#find');
find.on('click', handleGetRecipes)

function handleGetRecipes() {
    let ingredients = JSON.parse(localStorage.getItem('ingredients'));
    handleFetchRequest(ingredients);
}

function handleFetchRequest(ingredients) {
    const apiKey = '5dcf2842282340f9ab86232b5ff3c1ce'
    let url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=`
    let formattedUrl = url;
    ingredients.forEach((ingredient, index) => {
        if (index ===0) {
            formattedUrl += ingredient
        } else {
            formattedUrl += `,${ingredient}`
        }
    });

    fetchRecipes(formattedUrl)
    .then(function(data) {
        handleUsingData(data);
    })
    .catch(function(error) {
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

function handleUsingData(data) {
    localStorage.setItem('data', JSON.stringify(data))
    window.location.href = 'results.html'
}


