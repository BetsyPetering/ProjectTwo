$.get("/api/packages")
    .then(function (results) {
        $("#packages").html += `
        <li></li>`
    })
    .catch(function (err) {
        console.log(err);
    });