const divBuild = function () {
  const { data } = this;
  return data.reduce((divCards, { name, link, style }) => {
    if (!name) return divCards;
    return [
      ...divCards,
      divCard({
        divName: divName({ name, link }),
        divPallette: divPallette({
          style,
          callback: paletteOnClick.bind(this),
        }),
      }),
    ];
  }, []);
};

const divCard = function ({ divName, divPallette }) {
  const div = document.createElement("div");
  div.appendChild(divName);
  div.appendChild(divPallette);
  div.style.display = "flex";
  return div;
};

const divName = function ({ name, link }) {
  const div = document.createElement("div");
  if (link) {
    const anchor = document.createElement("a");
    anchor.textContent = name;
    anchor.href = link;
    div.appendChild(anchor);
  } else {
    div.textContent = name;
  }
  return div;
};

const divPallette = function ({ style, callback }) {
  const div = document.createElement("div");
  if (!style) return div;
  const anchor = document.createElement("a");
  anchor.innerHTML = `
<svg style="width:1rem" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 7h0m3.5 1.5h0m-7 0h0M7 12h0m9 4h2.7a2 2 0 0 0 1.9-1.3 9 9 0 1 0-16 2.5A9.1 9.1 0 0 0 12 21a2 2 0 0 0 2-2v-.9a2 2 0 0 1 2-2.1Z"/>
</svg>
  `;
  anchor.href = "#";
  anchor.addEventListener("click", () => callback({ div, style }));
  div.appendChild(anchor);
  return div;
};

const paletteOnClick = function ({ style }) {
  const { divIndex } = this;
  divIndex.innerHTML = "";
  divBuild
    .bind(this)()
    .forEach((div) => {
      divIndex.appendChild(div);
      Object.assign(div.style, style);
    });
};

(async function () {
  try {
    const version = Math.floor(Math.random() * 1000000);
    const response = await fetch(`./index.json?v=${version}`);
    const data = await response.json();

    const divIndex = document.getElementById("index");

    const ctx = { data, divIndex };

    divBuild
      .bind(ctx)()
      .forEach((div) => {
        divIndex.appendChild(div);
      });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
})();
