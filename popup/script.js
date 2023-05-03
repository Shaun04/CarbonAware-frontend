const button = document.querySelector("button");
const submit = document.getElementById("submit");
const urlName = document.querySelector("#content");
const infoDets = document.querySelector("#info");
const caution = document.querySelector("#caution");
const emissionData = document.querySelector("#emission");

function url_formatter(url_raw) {
  let url_split = url_raw.split("/");
  let newArr = url_split.filter((a) => a);
  let url_formatted = newArr[1];
  if (url_formatted == undefined) {
    url_formatted = newArr[0];
  }
  console.log(url_formatted);
  apiCall(url_formatted);
}

function apiCall(url) {
  urlToApi = "https://vast-rose-agouti-hem.cyclic.app/" + url;
  // urlToApi = "http://127.0.0.1:3000/" + url; //for local development
  urlApi = "http://127.0.0.1:3000/" + url; //for local development
  fetch(urlToApi).then((res) => {
    return res.json();
  });
  fetch(urlApi)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const urlNameFront = "<h3>" + data["0"].url + "</h3>";
      urlName.insertAdjacentHTML("beforeend", urlNameFront);
      const deets = "<h3> Estimated CO2 produced per <br> page view is </h3>";
      infoDets.insertAdjacentHTML("beforeend", deets);
      const dataEmis = Math.floor(data["0"].emis * 1000) / 1000;
      const dataFrontEmis = "<h3>" + dataEmis + " grams </h3>";
      emissionData.insertAdjacentHTML("beforeend", dataFrontEmis);
    })
    .catch((error) => console.log("Error"));
}

// button.addEventListener("click", function fun() {
//     const url = document.getElementById("search").value;
//     apiCall(url); //calls the function inwhich when you search the url it shows
// })

// function below listens to the open tabs
submit.addEventListener("click", function checkThis() {
  document.getElementById("submit").disabled = true;
  browser.tabs.query({ currentWindow: true, active: true }).then((tabs) => {
    let tab = tabs[0];
    url_formatter(tab.url);
  }, console.error);
});
