(async function () {
  const response = await fetch("./index.json");
  const data = await response.json();
  const index = document.getElementById("index");
  data.forEach(({ name, link }) => {
    const div = document.createElement("div");
    div.innerHTML = `<a href="${link}">${name}</a>`;
    index.appendChild(div);
  });
})();
