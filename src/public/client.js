let currentState = Immutable.Map({
    activeRoverData: {
        'name': '',
        'landingDate': '',
        'launchDate': '',
        'status': '',
        'photos': [],
    },
    rovers: [
        'Curiosity',
        'Opportunity',
        'Spirit'
    ]
});

const root = document.getElementById('root')

// Update current state
const updateState = (currentState, newState) => {
    currentState = Object.assign(currentState, newState);
    render(root, currentState);
}

// Render page
const render = async (root, state) => {
    root.innerHTML = App(state);
    const roverLinks = Array.from(document.querySelectorAll('li'));
    roverLinks.map(li => addRoverLinks(li, toLowerCase));
}

// Listen for load
window.addEventListener('load', () => {
    render(root, currentState);
})

const toLowerCase = str => str.charAt(0).toUpperCase() + str.slice(1);

// Listen for clicks on rover name
const addRoverLinks = (li, callback) => {
    li.addEventListener('click', event => {
        const activeLink = event.target.innerText;
        const activeRoverName = callback(activeLink);
        getRoverData(activeRoverName);

    });
};

const createImageDescription = image => (
    `
    <img src="${image[0]}">
    <p class="image-description">${image[1]}</p>
    <p class="image-description">${image[2]}</p>
    `
)

const generatePhotoGrid = (photos, callback) => {

    let photoGridHTML = '';
    photos.map(photo => {
        photoGridHTML += `
        <div class="one-image">
            ${callback(photo)}
        </div>
    `
    })
    return photoGridHTML;
};

// Display rover data
const displayRoverData = (activeRoverData, callback) => {

    const { name, landingDate, launchDate, status, photos } = activeRoverData;

    return `
        <div class='rover-data'>
            <h1>${callback(name)} Rover</h1>
            <p class="lanading-date"> Landing date: ${landingDate} </p>
            <p class="launch-date"> Launch date: ${launchDate} </p>
            <p class="mission-status"> Mission status: ${status} </p>
            <div class='images'>
                ${generatePhotoGrid(photos, createImageDescription)}
            </div>
        </div>
    `
};

// create content
const App = (currentState) => {
    let { activeRoverData } = currentState

    if (activeRoverData) {
        displayRoverData(activeRoverData, toLowerCase);

        return `
            ${createMenu(currentState.get('rovers'))}
            ${displayRoverData(activeRoverData, toLowerCase)}
        `
    }

    return `
        ${createMenu(currentState.get('rovers'))}
        <p> Select rover name to explore data.</p>
    `;
}

// Create navigation menu
const createMenu = rovers => (
    `
    <ul>
        ${rovers.map(rover =>
        `<li>
            <a href="#">${rover}</a>
        </li>`).join("")}
    </ul>
    `
)


// Fetch rover data from server
const getRoverData = (name) => {
    fetch(`http://localhost:3000/rover-data/${name}`)
        .then(res => res.json())
        .then(data => {

            let { name, landing_date, launch_date, status } = data.data[0].rover
            let photoData = [];
            let getPhotoData = data.data.map(rover => photoData.push([rover.img_src, rover.camera.full_name, rover.earth_date]))
            let roverData = {
                activeRoverData: {
                    'name': name,
                    'landingDate': landing_date,
                    'launchDate': launch_date,
                    'status': status,
                    'photos': photoData
                }
            }
            updateState(currentState, roverData);
        })
};
