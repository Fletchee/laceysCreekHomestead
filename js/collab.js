const collabPhotoContainer = document.querySelector(".photo-container");
const imgs = collabPhotoContainer.querySelectorAll(".img")
const backButton = document.querySelector(".prev-photo");
const nextButton = document.querySelector(".next-photo");

countImgs = imgs.length

backButton.addEventListener('click', () => {

    let activeIndex = 0;

    Array.from(imgs).forEach((img, index) => {
        if (img.classList[1] == "active-img") {
            activeIndex = index
        }
    })

    const nextElementIndex = ((activeIndex - 1 + imgs.length) % imgs.length)

    console.log(activeIndex, nextElementIndex)

    imgs[activeIndex].classList.remove("active-img");
    imgs[nextElementIndex].classList.add("active-img");
})

nextButton.addEventListener('click', () => {

    let activeIndex = 0;

    Array.from(imgs).forEach((img, index) => {
        if (img.classList[1] == "active-img") {
            activeIndex = index
        }
    })
   
    const nextElementIndex = (activeIndex + 1) % (imgs.length)
    
    imgs[activeIndex].classList.remove("active-img");
    imgs[nextElementIndex].classList.add("active-img");

})