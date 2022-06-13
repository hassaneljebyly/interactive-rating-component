const submitButton = document.getElementById("rating-card__btn");
const ratingOptionsList = document.querySelectorAll(".rating-card__rating-list-item");
const ratingListContainer = document.getElementById("rating-card__rating-list");
const ratingScale = (document.getElementById("rating-scale").innerHTML = ratingOptionsList.length); // for a dynamic rating scale
const selectedRating = document.getElementById("selected-rating");
const greetingCard = document.getElementsByClassName("js-thankyou-card")[0];
const ratingCard = document.getElementsByClassName("rating-card")[0];

ratingOptionsList.forEach((option) => {
  option.addEventListener("click", () => {
    removeActiveClass();
    selectedRating.innerHTML = option.innerHTML;
    submitButton.disabled = false;
    submitButton.classList.add("js-rating-card__btn");
    submitButton.style.cursor = "pointer";
  });
});

ratingListContainer.addEventListener("mouseleave", () => {
  /*
  if no rting is selected it returned the body element, 
  which didn't have any classes so I just used that to indecate if any rating was selected or not,
  body didn't have any classes, my trgeted element did, not the optimal solution but did the job
  */
  if (document.activeElement.classList.length === 0) return;
  document.activeElement.classList.add("js-active");
});

submitButton.addEventListener("click", () => {
  sendData(selectedRating);
  SlideGreetingCarToView(greetingCard);
  ratingCard.style = "opacity:0; transition: opacity 0.1s ease;";
});

const SlideGreetingCarToView = (cardElement) => {
  return (cardElement.style.transform = "translateY(-100%)");
};

const removeActiveClass = () => {
  ratingOptionsList.forEach((option) => {
    option.classList.contains("js-active") === true ? option.classList.remove("js-active") : "";
  });
};

// a small demo of how it might work when submiting the data, since a form element wasn't used

const sendData = (selectedRating) => {
  const result = fetch("https://reqres.in/api/users/23", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ rating: selectedRating.innerHTML, user: "user 1" }),
  })
    .then((res) => console.log(res.json()))
    .then((jsonObject) => jsonObject)
    .catch((error) => error);
  return result;
};
