//Recuperamos los elementos por id
let result = document.getElementById("result"); 
let searchBtn = document.getElementById("search-btn");


//Url de la api
let url = "https://thecocktaildb.com/api/json/v1/1/search.php?s=";


let getInfo = () => {

  //Recuperamos los elementos por id
let userInp = document.getElementById("user-inp").value;


//Si la conexion a la api es 0 ejecuta esto, de lo contrario ejecuta el else.
if(userInp.length == 0){
    result.innerHTML = `<h3 class = "msg">The input field cannot be empty</h3>`;
}

else {

    fetch(url + userInp)
     .then(response => response.json())
     .then((data) => {
      console.log(data);                       //Ver las bebidas en la consola.
      console.log(data.drinks[0]);              //Accediendo a las bebidas "drinks" id = 0.
      let myDrink = data.drinks[0];              //Variable que contiene la bebida id 0.
      console.log(myDrink.strDrink);              //Accediendo a la propiedad strDrink de la api, muestra el nombre de la bebida.
      console.log(myDrink.strDrinkThumb);          //Accediendo a la propiedad de la imagen de la api.
      console.log(myDrink.strInstructions);         //Accediendo a la propiedad instruciones de la api

      
      let count = 1;
      let ingredientss =[];

      for(let elemento in myDrink){

          let ingredient = "";
          let measure = "";

          if(elemento.startsWith("strIngredient") && myDrink[elemento]) {  //Accediendo a las propiedades de los ingredientes de la api.
           ingredient = myDrink[elemento];

           if(myDrink[`strMeasure` + count]){
            measure = myDrink[`strMeasure` + count];

           }
           else{
            measure = "";
           }
           count += 1;
           ingredientss.push(`${measure} ${ingredient}`);
          }  
      }

      console.log(ingredientss);
      result.innerHTML = `<img src = ${myDrink.strDrinkThumb}>
                          <h2>${myDrink.strDrink}</h2>
                          <h3>Ingredients:</h3>
                          <ul class = "ingredients"></ul>
                          <h3>Instructions:</h3>
                          <p>${myDrink.strInstructions}</p>
      `;

      let ingredientesCon = document.querySelector(".ingredients");

      ingredientss.forEach(item => {
        let listItem = document.createElement("li");
        listItem.innerHTML = item;
        ingredientesCon.appendChild(listItem);
      });

    }).catch(() =>{
        result.innerHTML = `<h3 class = "img">Please enter a valid drink</h3>`;
    });
}
    
};

window.addEventListener("load", getInfo); //Cuando abra la paquina que cargue el LOAD dentro del getINFO
searchBtn.addEventListener("click", getInfo); //Cuando le de click al boton, llamar getInfor que carga con load