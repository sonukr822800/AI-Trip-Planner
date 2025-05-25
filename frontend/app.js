fetch("http://localhost:5000/generate-trip", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ destination, days, budget }),
})
.then(response => response.json())
.then(data => console.log(data));