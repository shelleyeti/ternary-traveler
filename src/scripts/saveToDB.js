/*
    Author: Shelley Arnold
    Name:  saveToDB.js
    Purpose: posts NEW event to database
*/

import apiManager from "./apiManager"
import itineraryList from "./itinerary-list"


const savetoDB = {
    addNewInterest: () => {
        let placeInput = document.querySelector(".place-input-field").value;
        let newInterest = document.querySelector(".interest-input-field").value;
        let newDescription = document.querySelector(".description-input-field").value;
        let newCost = document.querySelector(".cost-input-field").value;
        //just to start with something, without could not check against place
        let placeId = 0;
        if (newInterest !== "" && newDescription !== "" && newCost !== "") {
            apiManager.getAllPlaces().then((places) => {
                places.forEach(place => {
                    //place already in database
                    if (place.name == placeInput)
                        placeId = place.id;
                });
                //makes new place
                if (placeId === 0) {
                    apiManager.makePlace({
                        name: placeInput,
                        visa_required: false
                    //ties the new interest to the new place
                    }).then((place) => {
                        apiManager.makeInterest({
                            placeId: place.id,
                            name: newInterest,
                            description: newDescription,
                            cost: parseInt(newCost)
                        }).then(() => {
                            itineraryList.buildItineraryList();
                        })
                    });
                //it just ties the interest to the exsisting place
                } else {
                    apiManager.makeInterest({
                        //comes from the if place.name == placeInput
                        placeId: placeId,
                        name: newInterest,
                        description: newDescription,
                        cost: parseInt(newCost)
                    }).then(() => {
                        itineraryList.buildItineraryList();
                    })
                }
            });
        }
    },
    editInterest: () => {
        let placeInput = document.querySelector(".place-edit-field").value;
        let editInterest = document.querySelector(".interest-edit-field").value;
        let editDescription = document.querySelector(".description-edit-field").value;
        let editCost = document.querySelector(".cost-edit-field").value;
        let editReview = document.querySelector(".review-edit-field").value;
        let visaRequired = document.querySelector(".required-edit-field");
        //just to start with something, without could not check against place
        let placeId = 0;
        if (editInterest !== "" && editDescription !== "" && editCost !== "") {
            apiManager.getAllPlaces().then((places) => {
                places.forEach(place => {
                    //place already in database
                    if (place.name == placeInput)
                        placeId = place.id;
                });
                //makes new place
                if (placeId === 0) {
                    apiManager.makePlace({
                        name: placeInput,
                        visa_required: visaRequired.checked ? true : false
                    //ties the new interest to the new place
                    }).then((place) => {
                        apiManager.makeInterest({
                            placeId: place.id,
                            name: editInterest,
                            description: editDescription,
                            cost: parseInt(editCost),
                            review: editReview
                        }).then(() => {
                            itineraryList.buildItineraryList();
                        })
                    });
                //it just ties the interest to the exsisting place
                } else if (placeId !== 0) {
                    //place is undefined
                    apiManager.updatePlace(placeId, {
                        name: placeInput,
                        visa_required: visaRequired.checked ? true : false
                    })
                }
                {
                    apiManager.updateInterest(window.editId, {
                        //comes from the if place.name == placeInput
                        placeId: placeId,
                        name: editInterest,
                        description: editDescription,
                        cost: parseInt(editCost),
                        review: editReview
                    }).then(() => {
                        itineraryList.buildItineraryList();
                    })
                }
            });
        }
    }
};

export default savetoDB