/*
    Author: Shelley Arnold
    Name:  itinerary-list.js
    Purpose: builds itinerary cards
*/

import apiManager from "./apiManager"

const itineraryList = {
    buildItineraryList: () => {
        return apiManager.getAllPlaces().then((places) => {
            apiManager.getAllInterests().then((interest) => {
                let placesAllHTML = "";
                const beginnerDiv = `<div class="card-deck travel-cards-div width:400px mx-auto">`;
                let endDiv = `</div>`;
                places.forEach(place => {
                    let interestName = interest.filter((oneInterest) => {
                        if(oneInterest.placeId == place.id)
                            return oneInterest
                    });
                    let placesOfInterest = "";
                    interestName.forEach(interest => {
                        placesOfInterest += `
                        <li>${interest.name} 
                        <a href="#" data-toggle="modal" data-target="#edit-post-modal" class="badge badge-info edit-post-link" data-id="${interest.id}">Edit</a>
                        <a href="#" class="badge badge-info delete-post-link" data-id="${interest.id}">Delete</a>
                        </li>
                            <ul>
                                <li>Description: ${interest.description}</li>
                                <li>Cost: ${interest.cost == 0.00 ? "Free" : interest.cost}</li>
                                <li>Review: ${interest.review == null ? "<i>Please add a review</i>" : interest.review}</li>
                            </ul>
                        `
                    });
                    placesAllHTML += `
                        <div class="card">
                            <div class="card-body">
                            <button type="button" class="btn btn-outline-info float-right btn-small delete-place-button">Delete Place</button>
                            <h5 class="card-title">${place.name}</h5>
                            <p class="card-text small text-bottom font-italic">
                            ${place.visa_required == true ? "Don't forget your Visa" : "No Visa required"}
                            </p>
                            <ul class="card-text">
                                ${placesOfInterest}
                            </ul>
                            </div>
                        </div>
                    `
                });
                const outEl = document.querySelector(".itinerary-main-output-container");
                outEl.innerHTML = beginnerDiv + placesAllHTML + endDiv;
                document.querySelectorAll(".edit-post-link").forEach((link) => {
                    link.addEventListener("click", (event) => {
                        apiManager.getOneInterest(event.target.dataset.id).then((interest) => {
                            apiManager.getOnePlace(interest.placeId).then((place) => {
                                editId = interest.id;
                                let placeInput = document.querySelector(".place-edit-field");
                                let editInterest = document.querySelector(".interest-edit-field");
                                let editDescription = document.querySelector(".description-edit-field");
                                let editCost = document.querySelector(".cost-edit-field");
                                let editReview = document.querySelector(".review-edit-field");
                                placeInput.value = place.name;
                                editInterest.value = interest.name;
                                editDescription.value = interest.description;
                                editCost.value = interest.cost;
                                editReview.value = interest.review;
                            })
                        })
                    })
                })
                document.querySelectorAll(".delete-post-link").forEach((link) => {
                    link.addEventListener("click", (event) => {
                        let confirmMessage = confirm("Are you sure?");
                        if(confirmMessage){
                            apiManager.deleteInterest(event.target.dataset.id).then( () => {
                                itineraryList.buildItineraryList();
                            })
                        }
                    })
                })
                // document.querySelectorAll(".delete-place-button").forEach((button) => {
                //     button.addEventListener("click", (event) => {
                //         apiManager.deletePlace(event.target.dataset.id).then( () => {
                //             itineraryList.buildItineraryList();
                //         })
                //     })
                // })
            })
        })
     }
}

export default  itineraryList