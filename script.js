let map = L.map("map").setView([48.866667, 2.333333], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// let marker = L.marker([48.866667, 2.333333]).addTo(map);

let formMap = document.querySelector("#formMap");

formMap.addEventListener("submit", (event) => {
  event.preventDefault();

  let search = document.querySelector("#search").value;

  console.log(search);

  if (search !== "") {
    fetch(`https://nominatim.openstreetmap.org/search?q=${search}&format=json`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.length <= 0) {
          Swal.fire({
            title: "Error!",
            text: "Do you want to continue",
            icon: "error",
            confirmButtonText: "Cool",
          });
          console.log(Swal);
        } else {
          let marker = L.marker([data[0].lat, data[0].lon]).addTo(
            map.setView([data[0].lat, data[0].lon], 13)
          );

          marker.bindPopup(search).openPopup();
        }
      });
  }
});
