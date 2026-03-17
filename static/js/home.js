document.addEventListener("DOMContentLoaded", () => {
    const title = document.querySelector(".hero-title");
    const subtitle = document.querySelector(".hero-subtitle");
    const car = document.querySelector(".f1-car");

    setTimeout(() => {
        if (car) {
            car.classList.add("car-visible");
        }
    }, 300);

    setTimeout(() => {
        if (title) {
            title.classList.add("show");
        }
    }, 1000);

    setTimeout(() => {
        if (subtitle) {
            subtitle.classList.add("show");
        }
    }, 1400);
});
