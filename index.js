const defaultDark = function () {
  return {
    "background-color": "DimGray",
    color: "White",
  };
};

const defaultStyle = function () {
  return {
    "background-color": "LightGray",
    "border-radius": "0.25rem",
    color: "Black",
    margin: "0.5rem",
    padding: "0.5rem",
  };
};

const divRefresh = function () {
  const { divIndex } = this;
  divIndex.innerHTML = "";
  divPage
    .bind(this)()
    .forEach((div) => {
      divIndex.appendChild(div);
    });
  divStyle();
};

const divCard = function (data) {
  const { divName, divPalette } = data;
  const div = document.createElement("div");
  div.appendChild(divName);
  div.appendChild(divPalette);
  Object.assign(div.style, defaultStyle());
  if (localStorage.getItem("color-theme") === "dark") {
    Object.assign(div.style, defaultDark());
  }
  ((div) => {
    const { current, data } = this;
    if (current === null) return;
    const { style, dark } = data[current];
    Object.assign(div.style, style);
    if (localStorage.getItem("color-theme") === "dark") {
      Object.assign(div.style, dark);
    }
  })(div);
  return div;
};

const divName = function (data) {
  const { name, link } = data;
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

const divPage = function () {
  const { data } = this;
  return data.reduce((divCards, row, index) => {
    const { name, link, style } = row;
    if (!name) return divCards;
    return [
      ...divCards,
      divCard.bind(this)({
        divName: divName({ name, link }),
        divPalette: divPalette({
          callback: () => {
            this.current = index;
            divRefresh.bind(this)();
          },
          style,
        }),
      }),
    ];
  }, []);
};

const divPalette = function (data) {
  const { callback, style } = data;
  const div = document.createElement("div");
  if (!style) return div;
  const anchor = document.createElement("a");
  anchor.innerHTML = `
<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 7h0m3.5 1.5h0m-7 0h0M7 12h0m9 4h2.7a2 2 0 0 0 1.9-1.3 9 9 0 1 0-16 2.5A9.1 9.1 0 0 0 12 21a2 2 0 0 0 2-2v-.9a2 2 0 0 1 2-2.1Z"/>
</svg>
  `;
  anchor.href = "#";
  anchor.setAttribute("aria-label", "palette");
  anchor.addEventListener("click", callback);
  div.appendChild(anchor);
  return div;
};

const divStyle = function () {
  document.querySelectorAll("#index > div").forEach((element) => {
    element.classList.add("flex");
    element.classList.add("items-center");
    element.classList.add("space-x-[0.5rem]");
  });
  document.querySelectorAll("#index svg").forEach((element) => {
    element.classList.add("w-[1rem]");
  });
};

const fetchJson = function (data) {
  return (async function (version) {
    const response = await fetch(`./index.json?v=${version}`);
    return await response.json();
  })(data);
};

const start = function () {
  const parent = this;
  document
    .getElementById("theme-toggle")
    .addEventListener("click", function () {
      divRefresh.bind(parent)();
    });
  divRefresh.bind(this)();
};

(async function () {
  try {
    const version = Math.floor(Math.random() * 1000000);
    const data = await fetchJson(version);
    const divIndex = document.getElementById("index");
    const ctx = { current: null, data, divIndex };
    start.bind(ctx)();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
})();
