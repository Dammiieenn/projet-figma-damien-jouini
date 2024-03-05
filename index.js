

// const fetchApi = async (url = "http://localhost:5678/api/works") => {
//   try {
//     const response = await fetch(url);
//     return response.ok ? await response.json() : null;
//   } catch (error) {
//     console.error("Une erreur est survenue", error);
//     return null;
//   }
// };

// Appel immédiat de la fonction asynchrone anonyme
// (async () => {
//   const works = await fetchApi();
//   console.log(works);

// const zoneImage = document.querySelector(".zoneImage");
// for (const work of works) {
//   const workDiv = document.createElement("div");
//   const titleParagraph = document.createElement("p");
//   const img = document.createElement("img");
//   img.src = work.imageUrl;
//   img.className ="zoneImage";
//   titleParagraph.innerText = work.title;
//   titleParagraph.className = "zoneImage";
//   workDiv.appendChild(titleParagraph);
//   workDiv.appendChild(img);
//   zoneImage.appendChild(workDiv);
//  }
// })();

// async function fetchAPI(url, options = {}) {
//   try {
//     const response = await fetch(url, options);
//     return response.ok ? await response.json() : null;
//   } catch (error) {
//     console.error("Une erreur est survenue", error);
//     return null;
//   }
// }
// async function getWorks() {
//   const works = await fetchAPI("http://localhost:5678/api/works");
//   const zoneImage = document.querySelector(".zoneImage");
//   if (works && sectionzoneImage) displayWorks(works, sectionzoneImage);

//   console.log("works", works);
// }

// Crée un élément avec du texte
// const createElemWithText = (tag, text) => {
//   const elem = document.createElement(tag);
//   elem.innerText = text;
//   return elem;
// };

// Crée une figure
// const createFigure = ({ id, imageUrl, title }) => {
//   const figure = document.createElement("figure");
//   figure.dataset.id = id;

//   const img = document.createElement("img");
//   img.src = imageUrl;

//   const caption = createElemWithText("figcaption", title);

//   figure.append(img, caption);
//   return figure;
// };
// // Affiche les travaux
// const displayWorks = (works, container) => {
//   container.innerHTML = "";
//   works.forEach((work) => container.appendChild(createFigure(work)));
// };


// Configuration des boutons
// const setupButtons = (works, filterContainer, displayContainer) => {
//   const btnAll = createElemWithText("button", "Tous");
//   btnAll.addEventListener("click", () => displayWorks(works, displayContainer));
//   filterContainer.appendChild(btnAll);
//   const uniqueCategories = [
//     ...new Set(works.map((work) => work.category.name)),
//   ];
//   uniqueCategories.forEach((category) => {
//     const btn = createElemWithText("button", category);
//     btn.addEventListener("click", () => {
//       const filteredWorks = works.filter(
//         (work) => work.category.name === category
//       );
//       displayWorks(filteredWorks, displayContainer);
//     });
//     filterContainer.appendChild(btn);
//   });
// };
// const createElemWithText = (tag, text) => {
//   const elem = document.createElement(tag);
//   elem.innerText = text;
//   return elem;
// };