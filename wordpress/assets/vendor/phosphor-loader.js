var head = document.getElementsByTagName("head")[0];

for (const weight of ["regular", "thin", "light", "bold", "fill", "duotone"]) {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = `https://visiongaiatechnology.de/wp-content/uploads/vgt-shadow-net/assets/phosphor/${weight}/style.css`;
  head.appendChild(link);
}

console.log('VLP Phosphor Patch Active');