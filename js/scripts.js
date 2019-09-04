var pokemonRepository = (function () {
  var repository = [ ];
       var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add (pokemon) {
      if(
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    )
    {
     repository.push(pokemon);
   }
 }
function getAll (){
  return repository;
}
function addListItem(pokemon = {}) {
    var pokemonList = document.querySelector(".pokemon-list");
    var $listItem = document.createElement("li");
    var button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("my-class");
    $listItem.appendChild(button);
    pokemonList.appendChild($listItem);
    button.addEventListener("click", function(event) {
      showDetails(pokemon);
    });
  }
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function() {
      console.log(item);
      showModal(item);
    });
  }
  function loadList() {
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          var pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
          console.log(pokemon);
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    var url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = Object.keys(details.types);
      })
      .catch(function(e) {
        console.error(e);
      });
  }
  // show the modal content
  function showModal(item) {
    var $modalContainer = document.querySelector("#modal-container");
    //clear existing content of the model
    $modalContainer.innerHTML = "";
    //creating div element in DOM
    var modal = document.createElement("div");
    //adding class to div DOM element
    modal.classList.add("modal");
    //creating closing button in modal content
    var closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "Close";
    // adding event listener to close modal when clicked on button
    closeButtonElement.addEventListener("click", hideModal);
    //creating element for name in modal content
    var nameElement = document.createElement("h1");
    nameElement.innerText = item.name;
    // creating img in modal content
    var imageElement = document.createElement("img");
    imageElement.classList.add("modal-img");
    imageElement.setAttribute("src", item.imageUrl);
    //creating element for height in modal content
    var heightElement = document.createElement("p");
    heightElement.innerText = "height : " + item.height;
    //creating element for weight in modal content
    var weightElement = document.createElement("p");
    weightElement.innerText = "weight : " + item.weight;
    //appending modal content to webpage
    modal.appendChild(closeButtonElement);
    modal.appendChild(nameElement);
    modal.appendChild(imageElement);
    modal.appendChild(heightElement);
    modal.appendChild(weightElement);
    $modalContainer.appendChild(modal);
    //adds class to show the modal
    $modalContainer.classList.add("is-visible");
  }
  //hides modal when clicked on close button
  function hideModal() {
    var $modalContainer = document.querySelector("#modal-container");
    $modalContainer.classList.remove("is-visible");
  }
  //hides modal when clicked on ESC on keyboard
  window.addEventListener("keydown", e => {
    var $modalContainer = document.querySelector("#modal-container");
    if (
      e.key === "Escape" &&
      $modalContainer.classList.contains("is-visible")
    ) {
      hideModal();
    }
  });
  //hides modal if clicked outside of it
  var $modalContainer = document.querySelector("#modal-container");
  $modalContainer.addEventListener("click", e => {
    var target = e.target;
    if (target === $modalContainer) {
      hideModal();
    }
  });

 return{
   add: add,
   getAll: getAll,
   addListItem: addListItem,
   loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal
  };
})();
pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
