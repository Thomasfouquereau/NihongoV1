const heursFR = document.getElementById("heureFrance");
const heursJP = document.getElementById("heureJapon");

function updateHeures() {
    const heureFrance = new Date().toLocaleString("fr-FR", {
        timeZone: "Europe/Paris",
        hour: "numeric",
        minute: "numeric",
    });

    const heureJapon = new Date().toLocaleString("fr-FR", {
        timeZone: "Asia/Tokyo",
        hour: "numeric",
        minute: "numeric",
    });

    heursFR.innerHTML = heureFrance;
    heursJP.innerHTML = heureJapon;
}

setInterval(updateHeures, 1000);

updateHeures();