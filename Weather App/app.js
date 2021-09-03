//Cache the DOM
const $form = $("form");
const $input = $form.find("input.search");
const $err = $(".err");
const $list = $("ul");
const apiKey = "4d8fb5b93d4af21d66a2948710284366";

$form.submit((e) => {
  e.preventDefault();
  let inputVal = $input.val();
  //checks if country code is more than 2 letters
  if (inputVal.includes(",") && inputVal.split(",")[1].length > 2) {
    $err.text("That is an invalid country code, please try again");
    $input.focus;
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;
  //gets the data from the API and posts it to the page

  $.get(url)
    .then(function (data) {
      const { main, name, sys, weather } = data;
      const icon = `${weather[0]["icon"]}.svg`;

      const items = Array.from($list.find("li"));
      //checks if name is already contained
      if (
        items.length > 0 &&
        items.some((city) => {
          return (
            $(city).find(".name").text() + $(city).find(".country").text() ==
            name + sys.country
          );
        })
      ) {
        $err.text("You already know the weather for " + name);
        $input.val("");
        $input.focus;
        return;
      }

      const li = document.createElement("li");

      li.innerHTML = `
        <div class="row1">
          <p class="name">${name}</p>
          <button class="x">x</button>
        </div>
        <div class="row2"> 
          <sup class="country">${sys.country}</sup>
          <div class="temp">
            ${Math.round(main.temp)}<sup>°C</sup>
          </div>
        </div>
        <div class="row3">  
            <img class="icon" src="img/${icon}" alt="${
        weather[0]["description"]
      }">
          <div class="block">
            <p class="cap">${weather[0]["description"]}</p>
            <div class="ttext">C<input type="checkbox" class="toggle cel">F</input></div>
          </div>
        </div>
      `;

      $list.append(li);

      //Resizes text to prevent overflow
      while ($(li).find(".name").width() > 0.1788 * $(window).width())
        $(li).find(".name").css("font-size", "-=10");
    })
    .catch(function () {
      $err.text("Invalid City name, please try again");
      $input.focus;
      return;
    });

  $err.text("");
  $input.val("");
  $input.focus;
});

//far to celcius switch
$("ul").delegate(".toggle", "click", function () {
  let conv = $(this).closest("li").find(".temp");
  if ($(this).hasClass("far")) {
    conv.html(
      `${Math.round((parseInt(conv.text()) - 32) * (5 / 9))}<sup>°C</sup>`
    );
    $(this).removeClass("far");
    $(this).addClass("cel");
  } else {
    conv.html(
      `${Math.round(parseInt(conv.text()) * (9 / 5) + 32)}<sup>°F</sup>`
    );
    $(this).removeClass("cel");
    $(this).addClass("far");
  }
});

//Element remove function
$("ul").delegate(".x", "click", function () {
  $(this)
    .closest("li")
    .slideUp(300, function () {
      $(this).remove();
    });
});
