document.getElementById('intakeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const owner = document.getElementById('owner').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const type = document.getElementById('type').value;
    const goal = document.getElementById('goal').value;
    const servicesChecked = document.querySelectorAll("input[name='services']:checked");
    const pref = document.querySelector("input[name='pref']:checked");

    if (!owner || !owner.includes(' ') || owner.split(' ').length < 2) {
        alert('Please provide the full owner name (first and last).');
        return;
    }

    if (!email || !email.includes('@') || !email.includes('.')) {
        alert('Please enter a valid email address (example@domain.com).');
        return;
    }

    if (!phone || phone.length < 10) {
        alert('Phone number must be exactly 10 digits.');
        return;
    }

    if (!type) {
        alert('Please select a business type.');
        return;
    }

    if (servicesChecked.length === 0) {
        alert('Please choose at least one service you need.');
        return;
    }

    if (!pref) {
        alert('Please select a preferred contact method.');
        return;
    }

    if (!goal) {
        alert('Please tell us a little about your project goals.');
        return;
    }

    alert('Form Submitted Successfully!');

    const formData = {
        owner: owner,
        email: email,
        phone: phone,
        type: type,
        services: Array.from(servicesChecked).map(s => s.value),
        pref: pref.value,
        goal: goal,
    };

    console.log(formData);
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "client.json", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert("Form submitted successfully!");
            const response = JSON.parse(xhr.responseText);
            document.getElementById('intakeForm').innerHTML = '';
            document.getElementById('message').innerText = response.message;
        } else if (xhr.readyState === 4) {
            alert("Error submitting form.");
        }
    };
    xhr.send(JSON.stringify(formData));
});
