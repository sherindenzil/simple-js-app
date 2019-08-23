var repository = [
  { name: "bulbasaur",height: 0.7,types: ["grass", "poison"]},
  { name: "venusaur",height: 1.2,types: ["grass","poison"]},
  { name: "charizard", height: 1.5, types: ["fire","flying"]},
  { name: "charmeleon", height: 1.6, types: ["fire"]},
  { name:"caterpie",height: 1.8, types: ["bug"]},
  { name:"blastoise",height: 2.5,types: ["water"]},
  { name:"pikachu",height:1.7,types:["electric"]}
];
for(i=0;i<repository.length;i++){
  var size;
  if (repository[i].height>2) {
    size = "Wow, that’s big!";
  }else {
    size = "Small Pokemon";
  }
  var result;
  for (var typeItem = 0; typeItem < repository[i].types.length; typeItem++) {
      if (repository[i].types[typeItem] == "grass") {
        result = '<span style="color:green;"> ';
      } else if (repository[i].types[typeItem] == "fire") {
        result = '<span style="color:red;"> ';
      } else if (repository[i].types[typeItem] == "water") {
        result = '<span style="color:blue;"> ';
      } else if (repository[i].types[typeItem] == "poison") {
        result = '<span style="color:green;"> ';
      }else if (repository[i].types[typeItem] == "electric") {
        result = '<span style="color:rgb(255, 204, 0);"> ';
      }else if (repository[i].types[typeItem] == "bug") {
        result = '<span style="color:rgb(0, 255, 0);"> ';
      }

    }
  document.write('<p>' + repository[i].name + ' ' +'( height:' + repository[i].height +')  -' +' '+ size + result +' '+repository[i].types +'<br>' + '</p>');
}
