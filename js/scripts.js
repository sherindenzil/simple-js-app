var pokemonRepository = (function () {

  var repository = [
  { name: "bulbasaur",height: 0.7,types: ["grass", "poison"]},
  { name: "venusaur",height: 1.2,types: ["grass","poison"]},
  { name: "charizard", height: 1.5, types: ["fire","flying"]},
  { name: "charmeleon", height: 1.6, types: ["fire"]},
  { name:"caterpie",height: 1.8, types: ["bug"]},
  { name:"blastoise",height: 2.5,types: ["water"]}
       ];
    function add (pokemon) {
      if(typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "types" in pokemon
    )
    {
     repository.push(pokemon);
   }
 }
function getAll (){
  return repository;
}
 return{
   add: add,
   getAll: getAll
  };
})();

console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: "Pikachu", height: 0.3, types: ["electric"] });
console.log(pokemonRepository.getAll());



pokemonRepository.getAll().forEach(function(item){
  var size;
  if (item.height>2) {
    size = "Wow, that’s big!";
  }else {
      size = "Small Pokemon";
  }
  var result;
  item.types.forEach (function(typeItem) {
      if (typeItem == "grass") {
        result = '<span style="color:green;"> ';
      } else if (typeItem == "fire") {
        result = '<span style="color:red;"> ';
      } else if (typeItem == "water") {
        result = '<span style="color:blue;"> ';
    } else if (typeItem == "poison") {
        result = '<span style="color:green;"> ';
      }else if (typeItem == "electric") {
        result = '<span style="color:rgb(255, 204, 0);"> ';
      }else if (typeItem == "bug") {
        result = '<span style="color:rgb(0, 255, 0);"> ';
   }

    });
  document.write('<p>' + item.name + ' ' +'( height:' + item.height +')  -' +' '+ size + result +' '+item.types +'<br>' + '</p>');
});
