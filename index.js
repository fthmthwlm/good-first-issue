(async function () {
  try {
    const version = Math.floor(Math.random() * 1000000);
    const response = await fetch(`./index.json?v=${version}`);
    const data = await response.json();
    const index = document.getElementById("index");

    data.forEach(({ name, link }) => {
      const div = document.createElement("div");
      const anchor = document.createElement("a");
      anchor.href = link;
      anchor.textContent = name;
      div.appendChild(anchor);
      index.appendChild(div);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
})();
