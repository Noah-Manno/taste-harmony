const ingredientsInput = $('#ingredientsInput');
const allergiesInput = $('#allergies');
const dietprefsInput = $('#dietprefs');
const addButton = $('#add');
const addAllergy = $('#addAllergy');
const addDiet = $('#addDiet');

const includeIngredients = $('#includeIngredients');
const includeAllergies = $('#includeAllergies');
const includeDiets = $('#includeDiets');

addButton.on('click', handleAddingIngredients)
addAllergy.on('click', handleAddingIngredients)
addDiet.on('click', handleAddingIngredients)


function handleAddingIngredients() {
    // Retrieve Value From Input
    let newIngredient = ingredientsInput.val();
    let newAllergy = allergiesInput.val();
    let newDiet = dietprefsInput.val();
    // Retrieve the current list of ingredients from local storage
    let ingredients = JSON.parse(localStorage.getItem('ingredients')) || [];
    let allergies = JSON.parse(localStorage.getItem('allergies')) || [];
    let diets = JSON.parse(localStorage.getItem('diets')) || [];
    localStorage.setItem(`ingredients`, JSON.stringify(ingredients));
    localStorage.setItem('allergies', JSON.stringify(allergies));
    localStorage.setItem('diets', JSON.stringify(diets));

    // Add the new ingredient
    if (newIngredient) {
        ingredients.push(newIngredient);
        localStorage.setItem('ingredients', JSON.stringify(ingredients));
        handleAddingIngredientsToPantry(ingredients);
    }
    if (newAllergy) {
        allergies.push(newAllergy);
        localStorage.setItem('allergies', JSON.stringify(allergies));
        handleAddingAllergiesToPantry(allergies);
    }
    if (newDiet) {
        diets.push(newDiet);
        localStorage.setItem('diets', JSON.stringify(diets));
        handleAddingDietsToPantry(diets);
    }
    handleAddingIngredientsToPantry(ingredients);
    handleAddingAllergiesToPantry(allergies);
    handleAddingDietsToPantry(diets);
}

$('#includeIngredients').on('click', '.delete-button', function () {
    // Remove appended Item
    $(this).closest('li').remove();

    // Update Array and Local Storage
    let ingredients = JSON.parse(localStorage.getItem('ingredients')) || [];
    let ingredientToRemove = $(this).closest('li').find('span').text();
    ingredients = ingredients.filter(ingredient => ingredient !== ingredientToRemove);
    localStorage.setItem('ingredients', JSON.stringify(ingredients));
});

$('#includeAllergies').on('click', '.delete-button', function () {
    // Remove appended Item
    $(this).closest('li').remove();

    // Update Array and Local Storage
    let allergies = JSON.parse(localStorage.getItem('allergies')) || [];
    let allergyToRemove = $(this).closest('li').find('span').text();
    allergies = allergies.filter(allergy => allergy !== allergyToRemove);
    localStorage.setItem('allergies', JSON.stringify(allergies));
});

$('#includeDiets').on('click', '.delete-button', function () {
    // Remove appended Item
    $(this).closest('li').remove();

    // Update Array and Local Storage
    let diets = JSON.parse(localStorage.getItem('diets')) || [];
    let dietToRemove = $(this).closest('li').find('span').text();
    diets = diets.filter(diet => diet !== dietToRemove);
    localStorage.setItem('diets', JSON.stringify(diets));
});

function handleAddingIngredientsToPantry(ingredients) {
    includeIngredients.empty();
    ingredients.forEach(ingredient => {
        // Create New List Item
        let newItem = $('<li>');
        // Create Delete Button
        let deleteButton = $('<button>').addClass('delete-button').text('Remove');
        // Append Elements
        let newText = $('<span>').text(ingredient)
        newItem.append(newText);
        newItem.append(deleteButton);
        includeIngredients.append(newItem);
        // Clear Input
        ingredientsInput.val('');
    });
}

function handleAddingAllergiesToPantry(allergies) {
    includeAllergies.empty();
    allergies.forEach(allergy => {
        // Create New List Item
        let newItem = $('<li>');
        // Create Delete Button
        let deleteButton = $('<button>').addClass('delete-button').text('Remove');
        // Append Elements
        let newText = $('<span>').text(allergy)
        newItem.append(newText);
        newItem.append(deleteButton);
        includeAllergies.append(newItem);
        // Clear Input
        allergiesInput.val('');
    });
}

function handleAddingDietsToPantry(diets) {
    includeDiets.empty();
    diets.forEach(diet => {
        // Create New List Item
        let newItem = $('<li>');
        // Create Delete Button
        let deleteButton = $('<button>').addClass('delete-button').text('Remove');
        // Append Elements
        let newText = $('<span>').text(diet)
        newItem.append(newText);
        newItem.append(deleteButton);
        includeDiets.append(newItem);
        // Clear Input
        dietprefsInput.val('');
    });
}

const logo = $('#logo')
logo.on('click', function () {
    window.location.href = 'index.html'
})

handleAddingIngredients()