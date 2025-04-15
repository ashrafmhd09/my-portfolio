// resume select event
let resumeSelect = document.querySelector("#resume");

resumeSelect.addEventListener("change", (event) => {
    let val = event.target.value;
    let ele = document.querySelector("#dynamic-container");
    if (val === 'v1') {
        ele.classList = [];
        ele.classList.add('v1');
    } else if (val === 'v2') {
        ele.classList = [];
        ele.classList.add('v2')
    } else if (val === 'v3') {
        ele.classList = [];
        ele.classList.add('v3')
    }
})

var companies = document.querySelectorAll(".companies .title");
var experienceDesc = document.querySelectorAll(".companies .experience .experience-description");
companies.forEach((each, index) => {
    let button = companies[index].querySelector('span button');
    if (button !== null) {
        button.addEventListener("click", (event) => {
            let bcolor = experienceDesc[index].dataset.backgroundcolor;
            let color = experienceDesc[index].dataset.color;
            experienceDesc[index].style.backgroundColor = bcolor;
            experienceDesc[index].style.color = color;
            experienceDesc[index].style.border = '1px solid ' + bcolor;
            experienceDesc[index].style.borderRadius = '20px';
            experienceDesc[index].style.display = 'block';
            if (button.innerText == 'Hide Description') {
                button.innerText = 'Show Description';
                experienceDesc[index].style.display = 'none';
                return;
            }
            button.innerText = 'Hide Description';
        })
    }
})
