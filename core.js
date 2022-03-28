let $;
pokemonInfo = [];
pokeStats = [];
pokeMoves = [];

var input = document.getElementById("pokeNameInput");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("pokeNameButton").click();
  }
});

const consultaPokemon = () =>{
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    document.getElementById("pokeMoves").innerHTML = "";
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {
      if (res.status != "200") {
          console.log(res);
          pokeImage("./assets/img/404.png");
          document.getElementById("pokeName").innerHTML = "";
          document.getElementById("pokeType").innerHTML = "";
          document.getElementById("pokeStats").innerHTML = "<h1>Pokemon not found 🥺</h1>";
          document.getElementById("pokeMoves").innerHTML = "";
      }
      else {
          return res.json();
      }
  }).then((data) => {
      if (data) {
          console.log(data);
          pokemonInfo = data;
          pokeStats = data.stats
          pokeMoves = data.moves
          //console.log(pokeMoves[0].move.name)


          let pokemonImg = pokemonInfo.sprites.other["official-artwork"].front_default;
          pokeImage(pokemonImg);
          pokeInfo(pokemonInfo, pokeStats, pokeMoves);
          console.log(pokemonImg);
          
      }
  });
  
  document.getElementById("pokeNameInput").value="";
}
const pokeImage = (url) => {
  const pokePhoto = document.getElementById("pokemonImg");
  pokePhoto.src = url;
}
const pokeInfo = (info, stats, moves) =>{
  document.getElementById("pokeName").innerHTML = info.name;
  document.getElementById("pokeType").innerHTML = "";
  for(var i = 0; i < info.types.length; i++ ){
    document.getElementById("pokeType").innerHTML += info.types[i].type.name + " ";
  }
  document.getElementById("pokeStats").innerHTML = 
    "HP: " + stats[0].base_stat + "<br>" +
    "Attack: " + stats[1].base_stat + "<br>" +
    "Deffense: " + stats[2].base_stat + "<br>" +
    "Special attack: " + stats[3].base_stat + "<br>" +
    "Special deffense: " + stats[4].base_stat + "<br>" +
    "Speed: " + stats[5].base_stat + "<br>";
    document.getElementById("pokeMoves").innerHTML += "<h4>Moves: </h4> <br>";
    for (var i = 0; i < moves.length; i++) {
      if(i != (moves.length - 1) ){
     document.getElementById("pokeMoves").innerHTML += moves[i].move.name + ", ";
     }else{
      document.getElementById("pokeMoves").innerHTML += moves[i].move.name + ". ";
     };
   };
  


}