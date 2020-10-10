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

const render = async (root, state) => {
    root.innerHTML = App(state)
}


// create content
const App = (state) => {
    let { rovers, apod } = state

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
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS


// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {

    // If image does not already exist, or it is not from today -- request it again
    const today = new Date()
    const photodate = new Date(apod.date)
    console.log(photodate.getDate(), today.getDate());

    console.log(photodate.getDate() === today.getDate());
    if (!apod || apod.date === today.getDate()) {
        getImageOfTheDay(store)
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

// ------------------------------------------------------  API CALLS

// Example API call
const getImageOfTheDay = (state) => {
    let { apod } = state

    fetch(`http://localhost:3000/apod`)
        .then(res => res.json())
        .then(apod => updateStore(store, { apod }))

    // return data
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
            console.log(`${name.charAt(0).toUpperCase() + name.slice(1)} rover data received.`);
            updateState(currentState, roverData);
        })
}

getRoverData('spirit');
