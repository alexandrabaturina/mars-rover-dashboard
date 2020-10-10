let currentState = Immutable.Map({
    apod: '',
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

const toLowerCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

// Listen for clicks on rover name
const addRoverLinks = (li, callback) => {
    li.addEventListener('click', event => {
        const activeLink = event.target.innerText;
        const activeRoverName = callback(activeLink);
        getRoverData(activeRoverName);

    });
}

const createImageDescription = (image) => {
    return `
    <img src="${image[0]}">
    <p>${image[1]}</p>
    <p>${image[2]}</p>
    `
}

const generatePhotoGrid = (photos, callback) => {
    let photoGridHTML = '';
    for (photo of photos) {
        photoGridHTML += `
        <div class="one-image">
            ${callback(photo)}
        </div>
    `
    };
    return photoGridHTML;
};

// Display rover data
const displayRoverData = (activeRoverData, callback) => {

    const { name, landingDate, launchDate, status, photos } = activeRoverData;

    return `
        <div>
            <h1>${callback(name)} Rover Data</h1>
            <p> Landing date: ${landingDate} </p>
            <p> Launch date: ${launchDate} </p>
            <p> Status: ${status} </p>
            <div class="images">
                ${generatePhotoGrid(photos, createImageDescription)}
            </div>
        </div>
    `;
};

// create content
const App = (currentState) => {
    let { activeRoverData, apod } = currentState

    if (apod) {
        return `
            <header></header>
            <main>
                <section>
                    <p>
                        One of the most popular websites at NASA is the Astronomy Picture of the Day. In fact, this website is one of
                        the most popular websites across all federal agencies. It has the popular appeal of a Justin Bieber video.
                        This endpoint structures the APOD imagery and associated metadata so that it can be repurposed for other
                        applications. In addition, if the concept_tags parameter is set to True, then keywords derived from the image
                        explanation are returned. These keywords could be used as auto-generated hashtags for twitter or instagram feeds;
                        but generally help with discoverability of relevant imagery.
                    </p>
                    ${ImageOfTheDay(apod)}
                </section>
            </main>
            <footer></footer>
    `
    } else if (activeRoverData) {
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
const createMenu = (rovers) => {
    return `
    <ul>
        ${rovers
            .map((rover) => `<li><a href="#">${rover}</a></li>`)
            .join("")}
    </ul>
    `;
}



// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {

    // If image does not already exist, or it is not from today -- request it again
    const today = new Date()
    const photodate = new Date(apod.date)
    console.log(photodate.getDate(), today.getDate());

    console.log(photodate.getDate() === today.getDate());
    if (!apod || apod.date === today.getDate()) {
        getImageOfTheDay(currentState)
    }

    // check if the photo of the day is actually type video!
    if (apod.media_type === "video") {
        return (`
            <p>See today's featured video <a href="${apod.url}">here</a></p>
            <p>${apod.title}</p>
            <p>${apod.explanation}</p>
        `)
    } else {
        return (`
            <img src="${apod.image.url}" height="350px" width="100%" />
            <p>${apod.image.explanation}</p>
        `)
    }
}


// Example API call
const getImageOfTheDay = (currentState) => {
    let { apod } = currentState

    fetch(`http://localhost:3000/apod`)
        .then(res => res.json())
        .then(apod => updateStore(currentState, { apod }))

    return data
}

// Fetch rover data from server
const getRoverData = (name) => {
    fetch(`http://localhost:3000/rover-data/${name}`)
        .then(res => res.json())
        .then((data) => {
            let roverData = {
                activeRoverData: {
                    'name': name,
                    'landingDate': `${data.data.photos[0].rover.landing_date}`,
                    'launchDate': `${data.data.photos[0].rover.launch_date}`,
                    'status': `${data.data.photos[0].rover.status}`,
                    'photos': [
                        [data.data.photos[0].img_src, data.data.photos[0].camera.full_name, data.data.photos[0].earth_date],
                        [data.data.photos[1].img_src, data.data.photos[1].camera.full_name, data.data.photos[1].earth_date],
                        [data.data.photos[2].img_src, data.data.photos[2].camera.full_name, data.data.photos[2].earth_date],
                        [data.data.photos[3].img_src, data.data.photos[3].camera.full_name, data.data.photos[3].earth_date],
                        [data.data.photos[4].img_src, data.data.photos[4].camera.full_name, data.data.photos[4].earth_date],
                        [data.data.photos[5].img_src, data.data.photos[5].camera.full_name, data.data.photos[5].earth_date],
                        [data.data.photos[6].img_src, data.data.photos[6].camera.full_name, data.data.photos[6].earth_date],
                        [data.data.photos[7].img_src, data.data.photos[7].camera.full_name, data.data.photos[7].earth_date],
                        [data.data.photos[8].img_src, data.data.photos[8].camera.full_name, data.data.photos[8].earth_date]
                    ]
                }
            };
            console.log(data);
            console.log(`${toLowerCase(name)} rover data received.`);
            updateState(currentState, roverData);
        })
}

