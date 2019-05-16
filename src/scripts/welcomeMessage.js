/*
    Author: Shelley Arnold
    Name:  welcomeMessage.js
    Purpose: landing page
*/


const welcomeMessage = {
    buildHome: () => {
        return `
        <div class="jumbotron w-75 mx-auto">
            <h1 class="display-4">Welcome Back!</h1>
            <p class="lead">Would you like to make a new post?</p>
            <hr class="my-4">
            <p class="lead">
                <button type="button" class="btn btn-outline-info btn-lg" data-toggle="modal" data-target="#add-new-post-modal">Add New Post</button>
                <a class="btn btn-outline-info btn-lg view-all-posts" href="#" role="button">View All Posts</a>
            </p>
        </div>
        `
    },
    printToDOM: () => {
        const topEl = document.querySelector(".home-main-output-container");
        let jumbotronHTML = welcomeMessage.buildHome();
        topEl.innerHTML = jumbotronHTML;
        document.querySelector(".view-all-posts").addEventListener("click", () => {
            document.querySelector("#itinerary-tab").click();
          });
    }
}

export default welcomeMessage