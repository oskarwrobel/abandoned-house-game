import "./loader.css";

let loadingTimerId: ReturnType<typeof setTimeout>;

export function showLoader() {
  loadingTimerId = setTimeout(() => {
    document.body.classList.add("loading");
    document.querySelector("#root").classList.add("loader");
  }, 100);
}

export function hideLoader() {
  clearTimeout(loadingTimerId);
  document.body.classList.remove("loading");
  document.querySelector("#root").classList.remove("loader");
}
