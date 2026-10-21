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
  card.id = `walker-${walker.id}`;
  card.className = "walker-card";
  let walkerMap = null;

  card.onclick = () => {
    const existingDetails = card.querySelector(".walker-details-popup");

    if (existingDetails) {
      if (walkerMap) {
        walkerMap.remove();
        walkerMap = null;
      }
      existingDetails.remove();
      return;
    }

    const walkerDetails = document.createElement("div");
    walkerDetails.className = "walker-details-popup";

    const rating = document.createElement("p");
    rating.textContent = `Rating: ${walker.rating} / 5`;

    const rate = document.createElement("p");
    rate.textContent = `Hourly rate: $${walker.hour_rate.toFixed(2)}`;

    const availability = document.createElement("p");
    availability.textContent = `Availability: ${walker.availability}`;

    const description = document.createElement("p");
    description.textContent = `About: ${walker.description}`;

    const locationStatus = document.createElement("p");
    locationStatus.setAttribute("aria-live", "polite");
    locationStatus.textContent = "Getting your device location...";
    locationStatus.style.display="none"

    const mapElement = document.createElement("div");
    mapElement.id = `walker-map-${walker.id}`;
    mapElement.className = "map";
    mapElement.setAttribute("role", "region");
    mapElement.setAttribute("aria-label", `Map showing ${walker.name}`);
    walkerDetails.addEventListener("click", (event) => event.stopPropagation());

    walkerDetails.append(
      rating,
      rate,
      availability,
      description,
      locationStatus,
      mapElement,
    );
    card.appendChild(walkerDetails);

    walkerMap = L.map(mapElement).setView(
      [walker.location.latitude, walker.location.longitude],
      15,
    );

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(walkerMap);

    const popupContent = document.createElement("strong");
    popupContent.textContent = walker.name;

    const walkerCoordinates = [
      walker.location.latitude,
      walker.location.longitude,
    ];

    L.marker(walkerCoordinates)
      .addTo(walkerMap)
      .bindPopup(popupContent)
      .openPopup();

    if (!navigator.geolocation) {
      locationStatus.textContent =
        "Your browser does not support device location.";
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (!walkerMap || !mapElement.isConnected) {
          return;
        }

        const deviceCoordinates = [
          position.coords.latitude,
          position.coords.longitude,
        ];
        const devicePopup = document.createElement("strong");
        devicePopup.textContent = "Your device location";

        L.marker(deviceCoordinates)
          .addTo(walkerMap)
          .bindPopup(devicePopup);
        L.circle(deviceCoordinates, {
          radius: position.coords.accuracy,
        }).addTo(walkerMap);

        locationStatus.textContent =
          `Your coordinates: ${position.coords.latitude.toFixed(6)}, ` +
          `${position.coords.longitude.toFixed(6)} ` +
          `(accuracy ±${Math.round(position.coords.accuracy)} m)`;

        walkerMap.fitBounds(
          L.latLngBounds([walkerCoordinates, deviceCoordinates]),
          { padding: [24, 24] },
        );
      },
      (error) => {
        const messages = {
          1: "Location permission was denied. Allow location access to show your position on this map.",
          2: "Your device location is currently unavailable.",
          3: "The request for your device location timed out. Try opening this walker again.",
        };
        locationStatus.textContent =
          messages[error.code] ??
          `Could not get your device location: ${error.message}`;
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 },
    );
  };

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