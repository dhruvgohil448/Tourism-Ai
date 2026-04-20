const generateHiddenField = (place) => {
    let field = document.createElement('input')
    field.setAttribute('hidden', 'true')
    field.setAttribute('name', 'delete_place[]')
    field.setAttribute('value', place);
    field.setAttribute('class', 'delete-field');

    return field;
}

document.addEventListener("DOMContentLoaded", function () {
    const addItineraryButton = document.getElementById("add-itinerary");
    const itineraryContainer = document.getElementById("itinerary-container");
    const baseItineraryItem = document.getElementById("base-itinerary-group");

    addItineraryButton.addEventListener("click", function (e) {
        e.preventDefault();

        itineraryContainer.appendChild(baseItineraryItem.cloneNode(true));
    });


    const deleteItinerary = document.querySelectorAll('.delete-itinerary');
    const form = document.querySelector('#itinerary-form');

    deleteItinerary.forEach((item, i) => {
        item.addEventListener('click', function(e) {
            let place = item.getAttribute('data-item');
            let index = item.getAttribute('data-index')
            document.querySelector(`#${place}-${index}`).style.display = 'none';
            form.appendChild(generateHiddenField(index));
        });
    });
});
