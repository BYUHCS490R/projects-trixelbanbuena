document.getElementById("myform").addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const idnum = document.getElementById("idnum").value.trim();

    if (!name.includes(" ") || name.split(" ").length < 2) {
        alert("Please provide your full name (first and last).");
        return;
    }

    const idPattern = /^[0-9]{7}$/;
    if (!idPattern.test(idnum)) {
        alert("Your BYUH ID must be exactly 7 digits.");
        return;
    }

    alert("Form Submitted Successfully!");

    const formData = {
        name: name,
        idnum: idnum
    };

    console.log(formData);

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "submit.json", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert("Form submitted successfully!");
            const response = JSON.parse(xhr.responseText);
            document.getElementById('myform').innerHTML = '';
            document.getElementById('message').innerText = response.message;
        } else if (xhr.readyState === 4) {
            alert("Error submitting form.");
        }
    };
    xhr.send(JSON.stringify(formData));
});
