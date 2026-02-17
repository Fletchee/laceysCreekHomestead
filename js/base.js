const dropdownContainer = document.getElementById("dropdown-container");
const dropdownPlaceholder = document.getElementById("btn-placeholder")
const dropdownItems = document.querySelectorAll(".dropdown-option");
const contentBlocks = document.querySelectorAll(".content-block");

const STORE_KEY = "activeBlock";

/* -----------------------------
    Dropdown Toggle
----------------------------- */

// Show dropdown when clicked
dropdownContainer.addEventListener("click", () => {
    Array.from(dropdownContainer.children).forEach(item => {
        item.classList.toggle("visible");
    })
})

// Close dropdown when click outside
document.addEventListener("click", (event) => {
    if (!dropdownContainer.contains(event.target)) {
        dropdownPlaceholder.classList.add("visible");
        Array.from(dropdownItems).forEach(item => {
            item.classList.remove("visible");
        })
    }
})

/* -----------------------------
    Set Active Block
----------------------------- */
function setActiveBlock(id) {
    const activeOption = dropdownContainer.querySelector(`[data-target="${id}"]`);
    if (!activeOption) return;

    dropdownPlaceholder.innerHTML = activeOption.innerHTML;
    localStorage.setItem(STORE_KEY, id);
}


/* -----------------------------
    Detect Active Block On Scroll
----------------------------- */
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            setActiveBlock(entry.target.id);
        }
    });
}, {
    threshold: 0.65
});

contentBlocks.forEach(block => observer.observe(block));


/* -----------------------------
    Scroll To Block
----------------------------- */
function scrollToBlock(id) {
    const contentContainer = document.querySelector(".content-container");
    const target = document.getElementById(id);
    if(!target) return;
    target.scrollIntoView({
        block: "start"
    });
    setActiveBlock(id);
    contentContainer.style.visibility = "visible";
}


/* -----------------------------
    Restore On Refresh
----------------------------- */
const savedBlock = localStorage.getItem(STORE_KEY);
if (savedBlock) {
    setTimeout(() => {
        scrollToBlock(savedBlock);
    }, 50);
}