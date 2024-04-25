let loading = document.querySelector(".loading");
let seeMoreBtn = document.querySelector(".see__more__btn");
let limitCount = 4;
let count = 1;

createLoadingCard(limitCount);

const API__URL = "https://fakestoreapi.com";

async function fetchData(api) {
  const data = await fetch(`${api}/products?limit=${limitCount * count}`, {
    method: "GET",
  });
  data
    .json()
    .then((res) => createCard(res))
    .catch((err) => console.log(err))
    .finally(() => {
      loading.style.display = "none";
      seeMoreBtn.innerHTML = "See more";
      seeMoreBtn.removeAttribute("disabled");
    });
}

seeMoreBtn.addEventListener("click", () => {
  count++;
  fetchData(API__URL);
  seeMoreBtn.innerHTML = "Loading...";
  seeMoreBtn.setAttribute("disabled", true);
});

fetchData(API__URL);

let wrapper = document.querySelector(".wrapper");

function createCard(data) {
  let cards = "";

  data.forEach((product) => {
    cards += `
            <div class="card">
                <img class="card__img"  data-id=${product.id} src=${product.image} alt="">
                <div class="card__desc">
                <div class="rating">
                  <h3>${product.rating.rate}</h3> <img class="star" src="/images/star.svg" alt="">
                </div>
                 <h3>${product.title}</h3>
                 <p>${product.price} ₽</p>
                 <button data-id=${product.id} class="card__btn">See more details</button>
                </div>
            </div>
        `;
  });
  wrapper.innerHTML = cards;
}

wrapper.addEventListener("click", (e) => {
  if (
    e.target.className === "card__img" ||
    e.target.className === "card__btn"
  ) {
    let id = e.target.dataset.id;
    window.open(`/pages/products.html?id=${id}`, "_self");
  }
});

function createLoadingCard(count) {
  let loadCard = "";
  for (let i = 0; i < count; i++) {
    loadCard += `   
          <div class="loading__item">
          <div class="loading__img bg__animation"></div>
          <div class="loading__title bg__animation"></div>
          <div class="loading__title bg__animation"></div>
        </div>
            `;
    loading.innerHTML = loadCard;
  }
}

createLoadingCard(90);
