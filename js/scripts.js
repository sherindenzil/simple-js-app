var pokemonRepository = (function () {
  var repository = [ ];
       var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=20';

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
function addListItem(pokemon) {
  pokemonRepository.loadDetails(pokemon).then(function() {
      var $row = $(".row");
  var $card = $('<div class="card" style="width:400px"></div>');
  var $cardBody = $('<div class="card-body"></div>');
      var $cardTitle = $("<h4 class='card-title' >" + pokemon.name + "</h4>");
      var $seeProfile = $(
        '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">See Profile</button>'
      );

      $row.append($card);
      //Append the image to each card
      $card.append($cardBody);
      $cardBody.append($cardTitle);
      $cardBody.append($seeProfile);
      $seeProfile.on("click", function(event) {
        showDetails(pokemon);
      });
    });
  }
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function() {
      console.log(item);
      showModal(item);
    });
  }
  function loadList() {
    return $.ajax(apiUrl)
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
    return $.ajax(url)
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
    var modalBody = $(".modal-body");
    var modalTitle = $(".modal-title");
    //clear existing content of the model
    modalTitle.empty();
    modalBody.empty();

    //creating element for name in modal content
     var nameElement = $("<h1>" + item.name + "</h1>");
    // creating img in modal content
    var imageElement = $('<img class="modal-img">');
    imageElement.attr("src", item.imageUrl);
    //creating element for height in modal content
    var heightElement = $("<p>" + "height : " + item.height + "</p>");
    //creating element for weight in modal content
    var weightElement = $("<p>" + "weight : " + item.weight + "</p>");

    //appending modal content to webpage
    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);

  }

 return{
   add: add,
   getAll: getAll,
   addListItem: addListItem,
   loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
  //  hideModal: hideModal
  };
})();
pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
