const walkers = [
  {
    id: 1,
    image_url: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Liisa Tamm",
    rating: 5,
    hour_rate: 12.5,
    availability: "Monday to Friday, 09:00 - 17:00",
    description:
      "Liisa is a passionate dog lover with 5 years of experience walking dogs of all sizes. She enjoys long walks in the park and ensures each dog gets the attention they need.",
    location: {
      latitude: 59.437,
      longitude: 24.7536,
    },
  },
  {
    id: 2,
    image_url: "https://randomuser.me/api/portraits/men/45.jpg",
    name: "Mihkel Saar",
    rating: 4,
    hour_rate: 10,
    availability: "Saturday and Sunday, 10:00 - 16:00",
    description:
      "Mihkel is an active outdoorsman who loves spending weekends walking dogs. He has experience with high-energy breeds and loves playing fetch with them.",
    location: {
      latitude: 59.427,
      longitude: 24.7194,
    },
  },
  {
    id: 3,
    image_url: "https://randomuser.me/api/portraits/women/65.jpg",
    name: "Laura Mägi",
    rating: 4,
    hour_rate: 15,
    availability: "Monday, Wednesday, Friday, 08:00 - 12:00",
    description:
      "Laura is a veterinary student who takes great care in understanding the unique needs of every dog. She’s great with elderly dogs and those with special needs.",
    location: {
      latitude: 59.4489,
      longitude: 24.7535,
    },
  },
  {
    id: 4,
    image_url: "https://randomuser.me/api/portraits/men/64.jpg",
    name: "Karl Kask",
    rating: 3,
    hour_rate: 8.75,
    availability: "Tuesday and Thursday, 18:00 - 21:00",
    description:
      "Karl is a university student who enjoys walking dogs in his free time. He is energetic and good with younger dogs who need extra playtime.",
    location: {
      latitude: 59.4402,
      longitude: 24.7795,
    },
  },
  {
    id: 5,
    image_url: "https://randomuser.me/api/portraits/women/12.jpg",
    name: "Mari-Liis Õun",
    rating: 5,
    hour_rate: 20,
    availability: "Every day, 07:00 - 15:00",
    description:
      "Mari-Liis is an experienced dog walker and trainer. She has worked with dogs for over 10 years and specializes in training basic obedience during walks.",
    location: {
      latitude: 59.4323,
      longitude: 24.7453,
    },
  },
];

const walkerList = document.querySelector("#walker-list");

for (const walker of walkers) {
  const card = document.createElement("li");
  console.log(walker["name"].split(" ")[0]);
  card.id = `walker-${walker["name"].split(" ")[0]}`;
  card.className = "walker-card";
  card.onclick = () => {
    if (!Boolean(document.getElementById(`walker-${walker["name"].split(" ")[0]}`).querySelector(".walker-details-popup"))) {
    let walkerDetails = document.createElement("div");
    walkerDetails.className = "walker-details-popup";
    walkerDetails.innerHTML = `
      <h2>${walker.name}</h2>
      <p><strong>Rating:</strong> ${walker.rating} / 5</p>
      <p><strong>Hourly Rate:</strong> $${walker.hour_rate.toFixed(2)}</p>
      <p><strong>Availability:</strong> ${walker.availability}</p>
      <p><strong>Description:</strong> ${walker.description}</p>
    `;
    document.getElementById(`walker-${walker["name"].split(" ")[0]}`).appendChild(walkerDetails);
    console.log(walker.name);
    console.log(walker.rating);
    console.log(walker.hour_rate);
    console.log(walker.availability);
    console.log(walker.description);
    }
    else {
      document.getElementById(`walker-${walker["name"].split(" ")[0]}`).querySelector(".walker-details-popup").remove();
    }
  }
  const image = document.createElement("img");
  image.className = "walker-image";
  image.src = walker.image_url;
  image.alt = `Portrait of ${walker.name}`;
  image.loading = "lazy";

  const details = document.createElement("div");
  details.className = "walker-details";

  const name = document.createElement("h2");
  name.className = "walker-name";
  name.textContent = walker.name;

  const rating = document.createElement("p");
  rating.className = "walker-rating";
  rating.setAttribute("aria-label", `Rating: ${walker.rating} out of 5`);
  rating.textContent = `★ ${walker.rating} / 5`;

  const availability = document.createElement("p");
  availability.className = "walker-availability";
  availability.textContent = walker.availability;

  const rate = document.createElement("p");
  rate.className = "walker-rate";
  rate.textContent = `${walker.hour_rate.toFixed(2)} / hour`;

  details.append(name, rating, availability);
  card.append(image, details, rate);
  walkerList.append(card);
}

const map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);