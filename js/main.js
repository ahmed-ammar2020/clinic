"use strict"; //catches uncommon mistakes and "unsafe" actions

//navbar functionality
function communicationSection() {
  if ($(window).width() <= 975) {
    $(".communication-section").addClass("up");
    setTimeout(() => {
      $(".communication-section").css("display", "none");
    }, 300);
  } else {
    $(".communication-section").removeClass("up");
    setTimeout(() => {
      $(".communication-section").css("display", "block");
    }, 300);
  }
}

function communicationScroll() {
  $(window).scroll(function () {
    if ($(this).width() > 975) {
      if ($(this).scrollTop() >= 110) {
        $("nav").addClass("up");
      } else {
        $("nav").removeClass("up");
      }
    }
  });
}
communicationScroll();
communicationSection();
$(window).resize(communicationSection);
$(window).resize(communicationScroll);

//back to top button
let btn = $("#button");

$(window).scroll(function () {
  if ($(window).scrollTop() > 300) {
    btn.addClass("show");
  } else {
    btn.removeClass("show");
  }
});

btn.on("click", function (e) {
  e.preventDefault();
  $("html, body").animate({ scrollTop: 0 }, 1500);
});

//hamburger functionality
$(".hamburger").click(function (e) {
  $(this).css("visibility", "hidden");
  const overlay = document.createElement("div");
  const body = document.body;
  body.append(overlay);
  overlay.classList.add("overlay");
  $("body").css("overflow", "hidden");
  $(".overlay").html(`
    <div class="close-btn">&times;</div>
    <div class="container">
        <div class="content">
            <ul class="nav-list-mobile list-unstyled list-inline">
                <li class="list-inline-item">
                    <a href="#" class="active">Home</a>
                </li>
                <li class="list-inline-item">
                    <a href="#">About</a>
                </li>
                <li class="list-inline-item">
                    <a href="#">Services</a>
                </li>
                <li class="list-inline-item">
                    <a href="#">Departments</a>
                </li>
                <li class="list-inline-item">
                    <a href="#">Doctors</a>
                </li>
                <li class="list-inline-item overlay-dropdown-1-container"  >
                    <a data-toggle="collapse" href="#dropdownOne" role="button">Dropdown <i class="ri-arrow-down-s-line"></i></a>
                    <ul class="list-unstyled overlay-dropdown-1 collapse" id="dropdownOne">
                      <li><a href="#">dropdown 1</a></li>
                      <li><a data-toggle="collapse" href="#dropdownTwo" role="button"> Deep dropdown<i class="ri-arrow-down-s-line"></i></a>
                        <ul class="list-unstyled overlay-dropdown-1 collapse" id="dropdownTwo">
                          <li><a href="#">Deep dropdown 1</a></li>
                          <li><a href="#">Deep dropdown 2</a></li>
                          <li><a href="#">Deep dropdown 3</a></li>
                          <li><a href="#">Deep dropdown 4</a></li>
                        </ul>
                      </li>
                      <li><a href="#">dropdown 2</a></li>
                      <li><a href="#">dropdown 3</a></li>
                      <li><a href="#">dropdown 4</a></li>
                    </ul>
                </li>
                <li class="list-inline-item">
                    <a href="#">Contact</a>
                </li>
            </ul>
        </div>
    </div>
  `);
  $(".close-btn").click(function () {
    $(".overlay").css("display", "none");
    $("body").css("overflow", "auto");
    $(".hamburger").css("visibility", "visible");
  });
  $(window).click(function (e) {
    let target = e.target;
    if (target.className === "content") {
      $(".overlay").css("display", "none");
      $("body").css("overflow", "auto");
      $(".hamburger").css("visibility", "visible");
    }
  });
});
//counter nums
let a = 0;
$(window).scroll(function () {
  let oTop = $("#counter").offset().top - window.innerHeight;
  if (a == 0 && $(window).scrollTop() > oTop) {
    $(".counter-value").each(function () {
      let $this = $(this),
        countTo = $this.attr("data-count");
      $({
        countNum: $this.text(),
      }).animate(
        {
          countNum: countTo,
        },
        {
          duration: 1400,
          easing: "swing",
          step: function () {
            $this.text(Math.floor(this.countNum));
          },
          complete: function () {
            $this.text(this.countNum);
            //alert('finished');
          },
        }
      );
    });
    a = 1;
  }
});

//FAQ functionality
const collapseElems = document.querySelectorAll("button[data-toggle]");
collapseElems.forEach((item) => {
  const paragraph = $(item).parents(".card-header").siblings(".collapse");
  item.addEventListener("click", function () {
    checkClassShowInParagraph(paragraph, item);
  });
});

let firstParagraph = document.querySelector(".collapse.show");
let arrows = document.querySelectorAll(".loop");
if ($(firstParagraph).hasClass("show")) {
  for (let elem of collapseElems) {
    elem.classList.remove("active");
  }
  for (let elem of arrows) {
    elem.classList.remove("ri-arrow-up-s-line");
  }

  $("button[data-toggle]").first().addClass("active");
  $("button[data-toggle]")
    .first()
    .find(":last-child")
    .addClass("ri-arrow-up-s-line");
} else {
  $("button[data-toggle]").first().removeClass("active");
  $("button[data-toggle]")
    .first()
    .find(":last-child")
    .removeClass("ri-arrow-up-s-line");
  $("button[data-toggle]")
    .first()
    .find(":last-child")
    .addClass("ri-arrow-down-s-line");
}

function checkClassShowInParagraph(paragraph, item) {
  if (!$(paragraph).hasClass("show")) {
    //when click on the button to show the paragraph
    for (let elem of collapseElems) {
      elem.classList.remove("active");
    }
    for (let elem of arrows) {
      elem.classList.remove("ri-arrow-up-s-line");
    }

    $(item).addClass("active");
    $(item).find(":last-child").addClass("ri-arrow-up-s-line");
  } else {
    //when click on the button to hide the paragraph
    $(item).removeClass("active");
    $(item).find(":last-child").removeClass("ri-arrow-up-s-line");
    $(item).find(":last-child").addClass("ri-arrow-down-s-line");
  }
}

//form validation
(function () {
  "use strict";
  window.addEventListener(
    "load",
    function () {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      let forms = document.getElementsByClassName("needs-validation");
      // Loop over them and prevent submission
      let validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener(
          "submit",
          function (event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add("was-validated");
          },
          false
        );
      });
    },
    false
  );
})();

//scrollspy navbar function
$(window).bind("scroll", function () {
  let currentTop = $(window).scrollTop();
  let elems = $(".scrollspy");
  elems.each(function (index) {
    let elemTop = $(this).offset().top - 70;
    let elemBottom = elemTop + $(this).height();
    if (currentTop >= elemTop && currentTop <= elemBottom) {
      let id = $(this).attr("id");
      let navElem = $('a[href="#' + id + '"]');
      navElem.parent().addClass("active").siblings().removeClass("active");
    }
  });
});
