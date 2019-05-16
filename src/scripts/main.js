import itineraryList from "./itinerary-list"
import welcomeMessage from "./welcomeMessage"
import saveToDB from "./saveToDB"
import getPlaceChoices from "./populateMenu"
import APImanager from "./apiManager";

welcomeMessage.printToDOM();
itineraryList.buildItineraryList();
getPlaceChoices.newMenu();
getPlaceChoices.editMenu();

//global edit id
window.editId = 0;


document.querySelector(".save-input-button").addEventListener("click", (event) => {
    saveToDB.addNewInterest();
});

document.querySelector(".update-input-button").addEventListener("click", (event) => {
    saveToDB.editInterest();
})