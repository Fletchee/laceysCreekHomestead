const btnBack = document.querySelector(".desc-back");
const btnForward = document.querySelector(".desc-forward");
const descContentContainer = document.querySelector(".desc-content-container")

// Event listeners for forward and back buttons

btnForward.addEventListener("click", () => {
    const ScrollDistace = descContentContainer.getBoundingClientRect().width;
    descContentContainer.scrollLeft = ScrollDistace
})

btnBack.addEventListener("click", () => {
    const ScrollDistace = descContentContainer.getBoundingClientRect().width;
    descContentContainer.scrollLeft -= ScrollDistace

})

// Detect when block becomes visible and update block number
const descBlocks = document.querySelectorAll(".desc-content-item");
const descOptions = {
    root: descContentContainer,
    rootMargin: '0px',
    threshold: 0.6,
}

const callback = (entries) => {
    entries.forEach(entry => {
        
        if (entry.isIntersecting) {
            const activeBlock = entry.target.classList[1];
            if (activeBlock == "desc-slide-one") {
                document.getElementById("block-num-one").classList.add("active-block")
                document.getElementById("block-num-two").classList.remove("active-block")
            } else if (activeBlock == "desc-slide-two") {
                document.getElementById("block-num-two").classList.add("active-block")
                document.getElementById("block-num-one").classList.remove("active-block")
            }
        }
    })
}

const descObserver = new IntersectionObserver(callback, descOptions)

Array.from(descBlocks).forEach(block => {
    descObserver.observe(block);
})
