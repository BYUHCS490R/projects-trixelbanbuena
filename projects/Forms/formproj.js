document.getElementById('myform').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const idnum = document.getElementById('idnum').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const year = document.getElementById('year').value;
    
    if (!name || !name.includes(' ') || name.split(' ').length < 2) {
        alert('Please provide your full name (first and last).');
        return;
    }

    if (!idnum || idnum.length !== 7) {
        alert('Your BYUH ID must be exactly 7 characters long.');
        return;
}

    if (!email || !email.endsWith('@go.byuh.edu')) {
        alert('Please enter a valid BYUH email.');
        return;
    }

    if (!password || password.length < 6) {
        alert('Your password must be at least 6 characters.');
        return;
    }

    if (!year) {
        alert('Please select your year level.');
        return;
    }

    alert('Form Submitted Successfully!');

    const formData = {
        name: name,
        idnum: idnum,
        email: email,
        password: password,
        year: year
    };

    console.log(formData);

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "submitform.json", true);
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
