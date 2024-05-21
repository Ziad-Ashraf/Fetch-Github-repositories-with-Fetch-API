let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-repos .get-button");
let reposData = document.querySelector(".show-data");

getButton.onclick = function() {
    getRepos();
}

function getRepos() {
    if (theInput.value == "") {
        reposData.innerHTML = "<span>Please Write Github Username.</span>";
    } else {
        fetch(`https://api.github.com/users/${theInput.value}/repos`)
        .then((response) => response.json())
        .then((repos) => {

        reposData.innerHTML = '';

        repos.forEach(repo => {
            console.log(repo.name);

            let mainDiv = document.createElement("div");
            let repoName = document.createTextNode(repo.name);

            mainDiv.appendChild(repoName);


            let repoUrl = document.createElement("a");
            let repoUrlText = document.createTextNode("Visit");

            repoUrl.appendChild(repoUrlText);

            repoUrl.href = `https://github.com/${theInput.value}/${repo.name}`;

            repoUrl.setAttribute("target", '_blank');

            mainDiv.appendChild(repoUrl);

            

            let starsSpan = document.createElement("span");
            let starsText = document.createTextNode(`Stars ${repo.stargazers_count}`)

            starsSpan.appendChild(starsText);
            mainDiv.appendChild(starsSpan);

            mainDiv.className = "repo-box";


            reposData.appendChild(mainDiv);
        });

        })
    }
}