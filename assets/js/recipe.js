const ingredientsInput = $('#ingredientsInput')
const addButton = $('#add')

addButton.on('click', handleAddingIngredients)

function handleAddingIngredients() {
    // Retrieve Value From Input
    let newIngredient = ingredientsInput.val();
    // Retrieve the current list of ingredients from local storage
    let ingredients = JSON.parse(localStorage.getItem('ingredients')) || [];
    // Add the new ingredient
    if (newIngredient !== ""){
    ingredients.push(newIngredient);
    }
    handleAddingIngredientsToPantry(ingredients);
    localStorage.setItem('ingredients', JSON.stringify(ingredients));
}

$('#includeIngredients').on('click', '.delete-button', function () {
    // Remove appended Item
    $(this).closest('li').remove();

    // Update Array and Local Storage
    let ingredients = JSON.parse(localStorage.getItem('ingredients')) || [];
    let ingredientToRemove = $(this).closest('li').find('span').text();
    ingredients = ingredients.filter(ingredient => ingredient !== ingredientToRemove);
    localStorage.setItem('ingredients', JSON.stringify(ingredients));
})

function handleAddingIngredientsToPantry(ingredients) {
    const includeIngredients = $('#includeIngredients');
    includeIngredients.empty();
    ingredients.forEach(ingredient => {
        // Create New List Item
        let newItem = $('<li>');
        // Create Delete Button
        let deleteButton = $('<button>').addClass('delete-button').text('X');
        // Append Elements
        let newText = $('<span>').text(ingredient)
        newItem.append(newText);
        newItem.append(deleteButton);
        includeIngredients.append(newItem);
        // Clear Input
        ingredientsInput.val('')
    });
}

const logo = $('#logo')
logo.on('click', function() {
    window.location.href = 'index.html'
})

handleAddingIngredients()