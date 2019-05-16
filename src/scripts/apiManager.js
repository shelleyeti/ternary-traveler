/*
    Author: Shelley Arnold
    Name: apiManager.js
    Purpose: Fetch calls to access the database
*/

const apiBaseURL = "http://localhost:8088"

const APImanager = {
    getAllPlaces: () => {
        return fetch(`${apiBaseURL}/places`)
          .then(response => response.json())
    },
    getOnePlace: (placeId) => {
        return fetch(`${apiBaseURL}/places/${placeId}`)
            .then(response => response.json())
    },
    updatePlace: (placeId, placeObj) => {
        return fetch (`${apiBaseURL}/places/${placeId}`,
            {
                method:"PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(placeObj)
            })
        .then(response => response.json())
    },
    makePlace: (placeObj) => {
        return fetch(`${apiBaseURL}/places/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(placeObj)
            })
        .then(response => response.json())
    },
    deletePlace: (placeId) => {
      return fetch(`${apiBaseURL}/places/${placeId}`,
        {
            method: "DELETE"
        })
    },
    getAllInterests: () => {
        return fetch(`${apiBaseURL}/interests`)
          .then(response => response.json())
    },
    getOneInterest: (interestId) => {
        return fetch(`${apiBaseURL}/interests/${interestId}`)
            .then(response => response.json())
    },
    updateInterest: (interestId, interestObj) => {
        return fetch (`${apiBaseURL}/interests/${interestId}`,
            {
                method:"PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(interestObj)
            })
        .then(response => response.json())
    },
    makeInterest: (interestObj) => {
        return fetch(`${apiBaseURL}/interests/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(interestObj)
            })
        .then(response => response.json())
    },
    deleteInterest: (interestId) => {
      return fetch(`${apiBaseURL}/interests/${interestId}`,
        {
            method: "DELETE"
        })
    },
}

export default APImanager
