// sliding navbar logic

// target the menu icon
const menuIcon = document.querySelector('.menu-btn')

// add click event listener to it
menuIcon.addEventListener('click', function () {
    //  target the nav
    const navbar = document.querySelector('nav')
    // use classlist to add a new class name to element in javascript
    navbar.classList.toggle("slider")
})


// upload preview logic goes here

let imgUrl = ""
// target the image previewer
const imgPreviewer = document.querySelector('.profile-img')
// target the input file
const uploadedFile = document.querySelector('#file')

// add  input event listener 
uploadedFile.addEventListener('input', function (event) {
    chosenFile = event.target.files[0]
    imgUrl = URL.createObjectURL(chosenFile)
    imgPreviewer.src = imgUrl
})


// taget the form
// Form Submission Logic
const idForm = document.querySelector('form');
idForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const id_name = document.querySelector('#full-name').value;
    const job_title = document.querySelector('#job').value;
    const email = document.querySelector('#email').value;
    const phone = document.querySelector('#phone').value;
    const relationship = document.querySelector('#relationship').value;
    const age = document.querySelector('#age').value;

    // Validation
    if (imgPreviewer.src.endsWith("avatar.png")) {
        alert("Please upload an image.");
    } else if (!id_name || !job_title || !email || !phone || !relationship || !age) {
        alert("All fields must be filled.");
    } else {
        generateIdCard(id_name, job_title, email, phone, relationship, age);
    }
});

// Generate ID Card
function generateIdCard(id_name, job_title, email, phone, relationship, age) {
    const id_card = `
    <section class="card-section">
        <h3>Anthony Q Da Singer Fan Card</h3>
        <img src="${imgUrl}" alt="">
        <div class="details">
            <p>FULL NAME: ${id_name}</p>
            <p>OCCUPATION: ${job_title}</p>
            <p>EMAIL: ${email}</p>
            <p>PHONE NUMBER: ${phone}</p>
            <p>RELATIONSHIP WITH ANTHONY: ${relationship}</p>
            <p>AGE: ${age}</p>
        </div>
    </section>`;

        // Target the main
        document.querySelector('main').innerHTML = id_card;
        document.querySelector('.card-section').style.display = "flex";
        document.querySelector('.download-btn').style.display = "flex";
    }


const discar_btn = document.querySelector('.discard-btn')

discar_btn.addEventListener('click', function () {

    imgPreviewer.src = "avatar.png"

})

document.addEventListener('DOMContentLoaded', function () {
    // Assuming you have the rest of your form handling logic here

    $(document).ready(function () {
        $('.download-btn').click(function () {
            let HTML_Width = $(".card-section").width();
            let HTML_Height = $(".card-section").height();
            let top_left_margin = 15;
            let PDF_Width = HTML_Width + (top_left_margin * 2);
            let PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
            let canvas_image_width = HTML_Width;
            let canvas_image_height = HTML_Height;

            let totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

            html2canvas($(".card-section")[0]).then(function (canvas) {
                let imgData = canvas.toDataURL("image/jpeg", 1.0);
                let pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
                pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
                for (var i = 1; i <= totalPDFPages; i++) {
                    pdf.addPage(PDF_Width, PDF_Height);
                    pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
                }
                pdf.save("fanID.pdf");
                setTimeout(function() {
                    window.location.href = "/success.html";
                }, 3000); // 3000 milliseconds = 3 seconds
            });
        })
    })
});

