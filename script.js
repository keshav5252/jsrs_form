import districtsByState from "./districtData.js";

// Function to populate the districts dropdown based on the selected state

function populateDistricts() {
    const stateSelect = document.getElementById("state");
    const districtSelect = document.getElementById("district");
    const selectedState = stateSelect.value;

    // Clear existing options
    districtSelect.innerHTML = '<option value="" disabled selected>Select your district</option>';

    if (selectedState in districtsByState) {
        const districts = districtsByState[selectedState];
        districts.forEach((district) => {
            const option = document.createElement("option");
            option.value = district;
            option.textContent = district;
            districtSelect.appendChild(option);
        });
    }
}

document.getElementById("state").addEventListener("change", populateDistricts);

// Function to show/hide the other occupation input field based on the selected occupation

function validateOccupation() {
    const occupation = document.getElementById("occupation").value;
    const other_occupation = document.getElementById("other_occupation");

    if (occupation === "other") {
        other_occupation.style.display = "block";
    } else {
        other_occupation.value = "";
        other_occupation.style.display = "none";
    }
}

document.getElementById("occupation").addEventListener("change", validateOccupation);

// Function to validate the form

function validateForm(e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const number = document.getElementById("number").value;
    const country = 'India';
    const state = document.getElementById("state").value;
    const district = document.getElementById("district").value;
    const city = document.getElementById("city").value;
    const pincode = document.getElementById("pincode").value;
    const yob = document.getElementById("yob").value;
    const wnum = document.getElementById("wnum").value;
    const address = document.getElementById("address").value;
    const iccb = document.getElementById("iccb").value;
    const occupation = document.getElementById("occupation").value;
    const other_occupation = document.getElementById("other_occupation").value;
    const emailValidate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (name === "" || email === "" || number === "" || state === "" || district === "" || city === "" || pincode === "" || yob === "") {
        alert("Please fill all the fields");
        return false;
    }

    if (occupation === "other" && other_occupation === "") {
        alert("Please fill the other occupation field");
        return false;
    }

    if (!emailValidate) {
        alert("Please enter a valid email address");
        return false;
    }

    if (number.length !== 10) {
        alert("Please enter a valid number");
        return false;
    }

    if (wnum !== '' && wnum.length !== 10) {
        alert("Please enter a valid whatsapp number");
        return false;
    }

    if (pincode.length !== 6) {
        alert("Please enter a valid pincode");
        return false;
    }

    if (yob.length !== 4) {
        alert("Please enter a valid year of birth");
        return false;
    }

    submitForm();

}

document.getElementById("mainForm").addEventListener("submit", validateForm);

// Function to submit the form data

function submitForm() {
    const loader = document.getElementById("loader");
    loader.style.display = "flex";
    const f = new FormData(document.getElementById("mainForm"));
    fetch("https://script.google.com/macros/s/AKfycbxTG2acheoCyk3kuZrVYqCehEjgPQpcBXJ9r7GeeEl1uSBxNp0OW9EjG8vXh_fBM3bHYg/exec", {
        method: "POST",
        body: f,
    })
    .then(response => response.json())
    .then(result => {
        loader.style.display = "none";
        alert("Form submitted successfully!");
        console.log(result);
    })
    .catch(error => {
        alert("Error submitting form.");
        console.error(error);
    });
}
