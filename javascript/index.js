function updateTime() {
  // Los Angeles
  let losAngelesElement = document.querySelector("#los-angeles");
  if (losAngelesElement) {
    let losAngelesDateElement = losAngelesElement.querySelector(".date");
    let losAngelesTimeElement = losAngelesElement.querySelector(".time");
    let losAngelesTime = moment().tz("America/Los_Angeles");
    let hourLA = losAngelesTime.format("H");
    let iconLA = hourLA >= 6 && hourLA < 18 ? "☀️" : "🌙";

    losAngelesDateElement.innerHTML =
      losAngelesTime.format("dddd, MMMM Do YYYY");
    losAngelesTimeElement.innerHTML = losAngelesTime.format(
      `h:mm:ss [<small>]A[</small>] ${iconLA}`,
    );
  }

  // Paris
  let parisElement = document.querySelector("#paris");
  if (parisElement) {
    let parisDateElement = parisElement.querySelector(".date");
    let parisTimeElement = parisElement.querySelector(".time");
    let parisTime = moment().tz("Europe/Paris");
    let hourParis = parisTime.format("H");
    let iconParis = hourParis >= 6 && hourParis < 18 ? "☀️" : "🌙";

    parisDateElement.innerHTML = parisTime.format("dddd, MMMM Do YYYY");
    parisTimeElement.innerHTML = parisTime.format(
      `h:mm:ss [<small>]A[</small>] ${iconParis}`,
    );
  }
}

function updateCity(event) {
  let cityTimeZone = event.target.value;
  if (cityTimeZone === "current") {
    cityTimeZone = moment.tz.guess();
  }

  let cityName = cityTimeZone.replace("_", " ").split("/")[1];
  cityName = cityName === "Sao Paulo" ? "São Paulo" : cityName;
  let flagCode = flags[cityName] || "un";
  let cityTime = moment().tz(cityTimeZone);
  let hour = cityTime.format("H");
  let icon = hour >= 6 && hour < 18 ? "☀️" : "🌙";
  let citiesElement = document.querySelector("#cities");
  citiesElement.innerHTML = `
  <div class="city">
    <div>
      <h2>
        <img src="https://flagcdn.com/24x18/${flagCode}.png" />
       ${cityName}</h2>
      <div class="date">${cityTime.format("dddd, MMMM Do YYYY")}</div>
    </div>
    <div class="time">${cityTime.format("h:mm:ss")}<small>${cityTime.format(
      "A",
    )}</small></div><span style="font-size: 48px;">${icon}</span>
  </div>
`;
  document.querySelector("#all-cities").style.display = "block";
}

updateTime();
setInterval(updateTime, 1000);

let citiesSelectElement = document.querySelector("#city");
citiesSelectElement.addEventListener("change", updateCity);

let flags = {
  London: "gb",
  "New York": "us",
  Auckland: "nz",
  Montreal: "ca",
  Tokyo: "jp",
  "São Paulo": "br",
  Luanda: "ao",
  Lisbon: "pt",
};

function reload() {
  let pageReload = document.querySelector("#all-cities");
  pageReload.addEventListener("click", function () {
    location.reload();
  });
}

reload();
