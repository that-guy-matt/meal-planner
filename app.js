const mealButton = document.getElementById("meal-button");
const mealContainer = document.getElementById("meal");

mealButton.addEventListener("click", () => {
  getMeal();
});

// get meal using promise
function getMeal() {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((res) => {
      createMeal(res.meals[0]);
      if (res.meals[0].strCategory == "Dessert") {
        console.log("dessert rejected.");
        getMeal();
      }
    })
    .catch((e) => {
      console.warn(e);
    });
}

function createMeal(meal) {
  let ingredients = [];
  //get incredients up to 20
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      //stop if no more ingredients are present
      break;
    }
  }

  const newInnerHTML = `<div class="row">
  <div class="columns five">
      <h2>${meal.strMeal}</h2>
      <img src="${meal.strMealThumb}" alt="Meal Image">
      ${
        meal.strCategory
          ? `<p><strong>Category: </strong>${meal.strCategory}</p>`
          : ""
      }
      ${meal.strArea ? `<p><strong>Area: </strong>${meal.strArea}</p>` : ""}
      ${
        meal.strTags
          ? `<p><strong>Tags: </strong>${meal.strTags
              .split(",")
              .join(", ")}</p>`
          : ""
      }
      <h5>Ingredients: </h5>
      <ul>
          ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
      </ul>
    </div>
        <div class="columns seven">
            <p>${meal.strInstructions}</p>
        </div>
    </div>

    ${
      meal.strYoutube
        ? `
            <div class="row">
                <h5>Recipe Video</h5>
                <div class="videoWrapper">
                    <iframe width="420" height="315"
                    src="https://www.youtube.com/embed/${meal.strYoutube.slice(
                      -11
                    )}" frameborder="0"></iframe>
                </div>
            </div>`
        : ""
    }`;
  mealContainer.innerHTML = newInnerHTML;
}
