/*
    Author: Shelley Arnold
    Name:  saveToDB.js
    Purpose: posts NEW event to database
*/

import apiManager from "./apiManager"


const getPlaceChoices = {
    newMenu: () => {
        let placeMenu = document.querySelector(".new-post-menu-main");
        let placeMenuHTML = "";
        apiManager.getAllPlaces().then((places) => {
            places.forEach(place => {
                placeMenuHTML += `<a class="dropdown-item place-choice-db" data-id="${place.id}" href="#">${place.name}</a>`;
            })
            placeMenu.innerHTML = placeMenuHTML;
            document.querySelectorAll(".place-choice-db").forEach((placeButton) => {
                placeButton.addEventListener("click", () => {
                    document.querySelector(".place-input-field").value = placeButton.textContent;
                })
            })
        })
    },
    editMenu: () => {
        let placeMenu = document.querySelector(".edit-menu-main");
        let placeMenuHTML = "";
        apiManager.getAllPlaces().then((places) => {
            places.forEach(place => {
                placeMenuHTML += `<a class="dropdown-item place-edit-db" data-id="${place.id}" href="#">${place.name}</a>`;
            })
            placeMenu.innerHTML = placeMenuHTML;
            document.querySelectorAll(".place-edit-db").forEach((placeButton) => {
                placeButton.addEventListener("click", () => {
                    document.querySelector(".place-edit-field").value = placeButton.textContent;
                })
            })
        })
    }
}

export default getPlaceChoices