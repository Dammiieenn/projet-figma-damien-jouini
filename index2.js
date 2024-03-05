function createElemWithText(tag, text) {
  const elem = document.createElement(tag); // Crée l'élément HTML
  elem.innerText = text; // Définit le texte de l'élément
  return elem; // Retourne l'élément créé
}

// const create = createElemWithText("H1","Arcachon c'est poussiéreux");
// const maDivDeTexte = document.querySelector(".text1");
// maDivDeTexte.appendChild(create);

// const create2 = createElemWithText("H1","Gujan-mestras");
// const maDivDeTexte2 = document.querySelector(".text2");
// maDivDeTexte2.appendChild(create2);

// const create3 = createElemWithText("H1","La teste");
// const maDivDeTexte3 = document.querySelector(".text3");
// maDivDeTexte3.appendChild(create3);

// const create4 =  createElemWithText("H1", "La Hume");
// const maDivDeTexte4 = document.querySelector(".text4");
// maDivDeTexte4.appendChild(create4);

// Fonction pour récupérer des données depuis une API de manière asynchrone
async function fetchAPI(url, options = {}) {
  try {
    // Effectue la requête HTTP à l'URL fournie avec les options données
    const response = await fetch(url, options);
    // Si la réponse est ok, convertit et retourne le corps de la réponse en JSON
    return response.ok ? await response.json() : null;
  } catch (error) {
    // Affiche l'erreur dans la console si la requête échoue
    console.error("Une erreur est survenue", error);
    return null;
  }
}

// Fonction pour créer un élément HTML avec du texte à l'intérieur
function createElemWithText(tag, text) {
  const elem = document.createElement(tag); // Crée l'élément HTML
  elem.innerText = text; // Définit le texte de l'élément
  return elem; // Retourne l'élément créé
}

// Fonction pour créer une figure (élément <figure>) avec une image et une légende
function createFigure({ id, imageUrl, title }) {
  const figure = document.createElement("figure");
  figure.dataset.id = id; // Stocke l'ID dans l'attribut data-id de la figure

  const img = document.createElement("img"); // Crée l'élément image
  img.src = imageUrl; // Définit l'URL de l'image

  const caption = createElemWithText("figcaption", title); // Crée la légende

  figure.append(img, caption); // Ajoute l'image et la légende à la figure
  return figure; // Retourne la figure créée
}

// Fonction pour afficher les travaux dans un conteneur
function displayWorks(works, container) {
  container.innerHTML = ""; // Vide le conteneur
  works.forEach((work) => container.appendChild(createFigure(work))); // Crée et ajoute chaque travail au conteneur
}

// Fonction pour configurer et ajouter des boutons de filtre basés sur les catégories des travaux
function setupButtons(works, filterContainer, displayContainer) {
  // Crée un bouton qui permet d'afficher tous les travaux
  const btnAll = createElemWithText("button", "Tous");
  // Ajoute un écouteur d'événement sur le bouton pour afficher tous les travaux lorsqu'il est cliqué
  btnAll.addEventListener("click", () => displayWorks(works, displayContainer));
  // Ajoute le bouton au conteneur de filtres
  filterContainer.appendChild(btnAll);

  // Détermine les catégories uniques parmi tous les travaux pour éviter les doublons
  const uniqueCategories = [
    ...new Set(works.map((work) => work.category.name)),
  ];

  // Pour chaque catégorie unique trouvée, crée un nouveau bouton de filtre
  uniqueCategories.forEach((category) => {
    // Crée un bouton avec le nom de la catégorie
    const btn = createElemWithText("button", category);
    // Ajoute un écouteur d'événement sur le bouton pour filtrer et afficher les travaux de cette catégorie lorsqu'il est cliqué
    btn.addEventListener("click", () => {
      // Filtre les travaux pour ne garder que ceux qui appartiennent à la catégorie cliquée
      const filteredWorks = works.filter(
        (work) => work.category.name === category
      );
      // Affiche les travaux filtrés dans le conteneur d'affichage
      displayWorks(filteredWorks, displayContainer);
    });
    // Ajoute le bouton de catégorie au conteneur de filtres
    filterContainer.appendChild(btn);
  });
}
// Explications supplémentaires :

// works : un tableau contenant les données de tous les travaux, où chaque travail a une catégorie.
// filterContainer : l'élément DOM (Document Object Model) dans lequel les boutons de filtre seront ajoutés. Cela permet à l'utilisateur de choisir les travaux à afficher en fonction de la catégorie.
// displayContainer : l'élément DOM où les travaux filtrés seront affichés.
// createElemWithText : une fonction qui crée un élément HTML (dans ce cas, un bouton) et définit son texte. Cette fonction est appelée pour créer le bouton "Tous" et les boutons pour chaque catégorie unique.
// displayWorks : une fonction appelée pour afficher les travaux dans le displayContainer. Elle prend en compte le filtre appliqué par les boutons de catégorie.
// Ce code utilise des fonctions d'ordre supérieur comme .map(), .filter(), et .forEach() pour travailler avec des tableaux, ainsi que l'utilisation de Set pour filtrer les valeurs uniques, ce qui sont des concepts importants en JavaScript.

// Initialisation
async function recupererTousMesProjets() {
  console.log("Page entièrement chargée");

  const works = await fetchAPI("http://localhost:5678/api/works");
  const sectionProjet = document.querySelector(".zoneImage");
  if (works && sectionProjet)
    displayWorks(works, sectionProjet);

  const filtresDiv = document.querySelector(".choixProjet");
  if (works && filtresDiv) setupButtons(works, filtresDiv, sectionProjet);
}
recupererTousMesProjets();

// LOGIN

// Poste des données à l'API
const postToAPI = async (url, body) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return { data: await response.json(), status: response.status };
  } catch (error) {
    console.error("Une erreur est survenue", error);
    return null;
  }
};

// Cette fonction est appelée lors de la soumission du formulaire de connexion
async function handleFormSubmission(event) {
  // Empêche le comportement par défaut du formulaire (rechargement de la page)
  event.preventDefault();

  // Récupère les valeurs saisies par l'utilisateur dans les champs du formulaire
  const email = document.querySelector("#login-email").value;
  const password = document.querySelector("#login-password").value;

  // Envoie une requête asynchrone à l'API pour tenter de connecter l'utilisateur
  const response = await postToAPI("http://localhost:5678/api/users/login", {
    email,
    password,
  });

  // Si la réponse est positive (statut 200), stocke les informations de l'utilisateur et redirige vers la page d'accueil
  if (response && response.status === 200) {
    console.log("connexion utilisateur réussie");
    // Stocke l'identifiant de l'utilisateur et le token dans le stockage local du navigateur
    localStorage.setItem("user", JSON.stringify(response.data.userId));
    localStorage.setItem("token", response.data.token);
    // Redirige l'utilisateur vers la page d'accueil
    location.href = "index.html";
  } else {
    // Si les identifiants sont incorrects, affiche un message d'erreur
    document.getElementById("error-message").textContent =
      "Identifiant ou mot de passe incorrect";
  }
}

// Sélectionne le formulaire de connexion dans le DOM
const form = document.getElementById("identification");
// Si le formulaire existe, lui ajoute un écouteur d'événements pour gérer sa soumission
if (form) {
  form.addEventListener("submit", handleFormSubmission);
}
// Fonction appelée pour déconnecter l'utilisateur
const handleLogout = () => {
  // Supprime les informations de l'utilisateur et le token d'authentification du stockage local
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  // Recharge la page pour refléter l'état déconnecté de l'utilisateur
  location.reload();
  // Réinitialise les champs du formulaire de connexion pour effacer les entrées précédentes
  const emailElem = document.getElementById("login-email");
  const passwordElem = document.getElementById("login-password");
  if (emailElem && passwordElem) {
    emailElem.value = "";
    passwordElem.value = "";
  }
};

// Vérifie si un token d'authentification est présent et ajuste l'interface en conséquence
function checkTokenLogin() {
  // Récupère le token d'authentification du stockage local
  const tokenAuth = localStorage.getItem("token");
  // Sélectionne différents éléments de l'interface
  const loginLink = document.querySelector(".login-link");
  const adminBar = document.querySelector(".admin-bar");
  const allFilterBtn = document.querySelector(".choixProjet");
  const modifierBtn = document.querySelector(".buttonEdition");
  // Si un token est présent, ajuste l'interface pour un utilisateur connecté
  if (tokenAuth) {
    if (loginLink) loginLink.textContent = "logout"; // Change le texte du lien de connexion en "logout"
    // Rend visible la barre d'administration et le bouton de modification, et cache le bouton de filtre
    if (adminBar) adminBar.classList.remove("hidden");
    if (allFilterBtn) allFilterBtn.classList.add("hidden");
    if (modifierBtn) modifierBtn.classList.remove("hidden");
    // Ajoute un écouteur d'événement pour gérer la déconnexion
    loginLink.addEventListener("click", handleLogout);
  } else {
    // Ajuste l'interface pour un utilisateur non connecté
    if (loginLink) loginLink.textContent = "login"; // Garde ou remet le texte du lien en "login"
    // Cache la barre d'administration et le bouton de modification
    if (adminBar) adminBar.classList.add("hidden");
    if (modifierBtn) modifierBtn.parentNode.removeChild(modifierBtn);
  }
}
checkTokenLogin();

function toggleModal(isVisible) {
  const editModal = document.querySelector(".grandeModal");
  if (editModal) {
    // Ajoute ou retire la classe "hidden" en fonction de l'argument isVisible
    editModal.classList.toggle("hidden", !isVisible);
  }
}

////////////////Modal/////////////////
function openModal() {
  // Sélectionne tous les boutons qui ouvrent la modale
  const allEditBtn = document.querySelectorAll(".buttonEdition");
  // Pour chaque bouton, ajoute un écouteur d'événement qui ouvre la modale

  allEditBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      toggleModal(true); // Affiche la modale

      // Clone le contenu existant des projets pour l'afficher dans la modale

      const existingProjects = document
        .querySelector(".zoneImage")
        .cloneNode(true);
      const modalProjects = document.querySelector(".existing-projects");
      modalProjects.innerHTML = ""; // Vide le contenu actuel
      // Pour chaque image dans les projets clonés, crée un conteneur et l'ajoute à la modale
      existingProjects.querySelectorAll("img").forEach((img) => {
        const imgContainer = document.createElement("div");
        imgContainer.setAttribute("class", "img-container");
        imgContainer.setAttribute("data-id", img.closest("figure").dataset.id);
        imgContainer.innerHTML = `${img.outerHTML}<button class="delete-icon"><i class="fa-solid fa-trash-can"></i></button>`;
        modalProjects.appendChild(imgContainer);
      });
    });
  });
}
openModal();

function closeModalBtn() {
  // Ajoute un écouteur d'événement au bouton de fermeture
  const closeModalBtn = document.querySelector(".fermetureModal");
  const editModal = document.querySelector(".grandeModal");
  if(editModal) {
    closeModalBtn.addEventListener("click", () =>{
      toggleModal(false);}) // Ferme la modale
  } 
}
closeModalBtn();
