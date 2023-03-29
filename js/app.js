// function for toggling loading
const toggleLoading = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("d-none");
  } else {
    loadingSpinner.classList.add("d-none");
  }
};

// function for loading phone data based on search
const loadPhoneData = async (searchText) => {
  try {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    displayPhoneData(data.data);
    displayAllPhoneData(data.data);
  } catch (error) {
    console.log(error);
  }
};

// phone details button handler
const phoneDetailsHandler = async(id) => {
  const url=`https://openapi.programming-hero.com/api/phone/${id}`
  const res= await fetch(url);
  const data= await res.json();
  displayPhoneDetails(data.data);
};

// function for template for data display
const phoneDisplayTemplate = (phones) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  phones?.forEach((phone) => {
    const cardItem = document.createElement("div");
    cardItem.classList.add("col");
    cardItem.innerHTML = `
        <div class="card h-100">
          <img src=${phone.image ? phone.image : "../phone.jpg"} class="card-img-top p-3" alt="phone" />
          <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">
            This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than
            the first to show that equal height action.
            </p>
          </div>
          <div class="card-footer p-0">
            <button onclick="phoneDetailsHandler('${phone.slug}')" type="button" class="btn btn-primary w-100
            rounded rounded-top-0" data-bs-toggle="modal" data-bs-target="#phoneModal">Phone Details</button>
          </div>
        </div>
    `;
    cardContainer.appendChild(cardItem);
  });
};

// function for display limited phones
const displayPhoneData = (phones) => {
  // display only six phones and load more button hide or show based on data limit
  const loadMoreBtn = document.getElementById("load-more-btn");
  if (phones?.length > 6) {
    phones = phones?.slice(0, 6);
    loadMoreBtn.classList.remove("d-none");
  } else {
    loadMoreBtn.classList.add("d-none");
  }
  // display no phone found message
  const noPhoneFound = document.getElementById("no-phone-found");
  if (phones.length === 0) {
    noPhoneFound.classList.remove("d-none");
  } else {
    noPhoneFound.classList.add("d-none");
  }
  // display phones using forEach
  phoneDisplayTemplate(phones);
  // stop loading
  toggleLoading(false);
};

// function for display all phones
const displayAllPhoneData = (phones) => {
  // load more button click handler
  const loadMoreBtn = document.getElementById("load-more-btn");
  loadMoreBtn.addEventListener("click", function () {
    phoneDisplayTemplate(phones);
  });
};


// function for display phone details
const displayPhoneDetails=(phone)=>{
const modalTitle=document.getElementById("phoneBackdropLabel");
modalTitle.textContent=phone.name;
const releaseDate=document.getElementById("release-date");
releaseDate.innerText=phone.releaseDate;
}

// search button click handler
const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", function () {
  // start loading
  toggleLoading(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // console.log(searchText);
  loadPhoneData(searchText);
  searchField.value = "";
});

// search enter handler
const searchField = document.getElementById("search-field");
searchField.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    // start loading
    toggleLoading(true);
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhoneData(searchText);
    searchField.value = "";
  }
});


// ================end===============
