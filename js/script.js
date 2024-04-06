"use strict";

toggleHeader();
burgerMenu();
accordion(".questions__item-head");
if (document.documentElement.clientWidth <= 1024) {
  accordion(".menu__link--accordion");
}
sendForm();

function toggleHeader() {
  const header = document.querySelector(".header");
  let scrollPrev = 0;

  window.addEventListener("scroll", () => {
    let scrolled = window.scrollY;
    if (scrolled > 60 && scrolled > scrollPrev) {
      header.classList.add("hidden");
      header.classList.remove("show");
    } else {
      header.classList.remove("hidden");
      header.classList.add("show");
    }
    scrollPrev = scrolled;
  });
}

function burgerMenu() {
  const menu = document.querySelector(".menu--js");
  const burger = document.querySelector(".burger--js");
  const footer = document.querySelector(".footer");

  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    menu.classList.toggle("active");
    footer.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  });
}

if (document.body.classList.contains("main-page")) {
  const feedbackSlider = new Swiper(".feedback__slider", {
    spaceBetween: 20,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      1140: {
        slidesPerView: 2.3,
      },
      800: {
        slidesPerView: 1.5,
      },
      500: {
        slidesPerView: 1.1,
      },
      320: {
        slidesPerView: 1,
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
        },
      },
    },
  });
}

function accordion(className) {
  let accBtn = document.querySelectorAll(className);

  for (let i = 0; i < accBtn.length; i++) {
    accBtn[i].addEventListener("click", function () {
      this.classList.toggle("active");
      let accPanel = this.nextElementSibling;
      if (accPanel.style.maxHeight) {
        accPanel.style.maxHeight = null;
        accPanel.style.marginBottom = null;
      } else {
        accPanel.style.maxHeight = `${accPanel.scrollHeight}px`;
        accPanel.style.marginBottom = "30px";
      }
    });
  }
}

function sendForm() {
  const form = document.getElementById("form");
  const succes = document.querySelector(".succes");
  const formClose = document.querySelectorAll(".form__close");

  if (document.body.classList.contains("course-program")) {
    const btnModal = document.querySelector(".btn--js");
    btnModal.addEventListener("click", function () {
      form.classList.add("active");
      document.body.classList.add("overlay");
    });
  }

  formClose.forEach((item) => {
    item.addEventListener("click", function () {
      succes.classList.remove("active");
      form.classList.remove("active");
      document.body.classList.remove("overlay");
    });
  });

  form.addEventListener("submit", formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);

    if (error === 0) {
      form.classList.add("sending");
      let response = await fetch("sendmail.php", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        /* let result = await response.json(); */
        /* alert(result.message); */
        form.reset();
        succes.classList.add("active");
        form.classList.remove("active");
        form.classList.remove("sending");
        document.body.classList.add("overlay");
      } else {
        alert(
          "Данные не отправились. Попытайтесь ещё раз или перезвоните по номеру указанному в контактах"
        );
        form.classList.remove("sending");
        document.body.classList.remove("overlay");
      }
    }
  }

  function formValidate() {
    let error = 0;
    let formReq = document.querySelectorAll(".required");
    let formTel = document.querySelector(".tel");

    for (let i = 0; i < formReq.length; i++) {
      const input = formReq[i];
      formRemoveError(input);

      if (input.value === "" || formTel.value.length < 9) {
        formAddError(input);
        error++;
      } else if (input.value.length > 2 || formTel.value.length >= 9) {
        formRemoveError(input);
        /* error--; */
      }
    }

    return error;
  }

  function formAddError(input) {
    input.classList.add("error");
  }

  function formRemoveError(input) {
    input.classList.remove("error");
  }
}
