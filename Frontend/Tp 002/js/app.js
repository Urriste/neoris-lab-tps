const tpl = document.createElement("template");

tpl.innerHTML = `
        
    <div>
    
    <div class="container">
          <h1 class="title">Neo-bitacora de personajes</h1>

          <form class="search-bar">
            <input placeholder="Ingrese el ID del personaje" required>
            <div class="botonera">
              <button class="btn-buscar" >Buscar</button> 
           
            </div>
          </form>
          
          <div class="card">
              <img id="img" ></img>
              <div class="card-data" id="name"></div>
              <div class="card-data" id="status"></div>
              <div class="card-data" id="species"></div>
              <div class="card-data" id="type"></div>
              <div class="card-data" id="gender"></div>
              <div class="card-data" id="origin"></div>
              
          <div class="card-footer">
              <div id="identificador"></div>
          </div>
              
          </div>
          <footer>
            <button id="btn-cambio">Play</button>  
            <button id="btn-stop" >Stop</button>
          </footer>
       
        </div>
        <style>

          footer{
            width:100%;
            display:flex;
            justify-content:flex-end;
          }

          footer button{
            margin:0 5px 10px 0;
            background-color: #f5f5f5;
            border:none;
            color:#707070;
            font-size:15px;
            outline:none;
            box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
            border-radius:5px;
          }

          footer button:hover{
            border: 1px solid #c8c8c8;    
            color:#808080;
          }
          footer button:focus{
            border:1px solid #4885ed;
          }

          .container{
            width:100%
            height:100vh;
            display:flex;
            flex-direction:column;
            align-items:center;
            background-color:#526E2DFF;
          }

          .search-bar{
            display:flex;
            flex-direction:column;
            align-items:center;
          }

          input{
            border: none;
            padding: 10px;
            margin: 10px;
            height: 20px;
            width: 500px;
            border:1px solid #eaeaea;
            outline:none;
            border-radius: 10px;
            box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
          }

          input:hover{
            border-color: #a0a0a0 #b9b9b9 #b9b9b9 #b9b9b9;
        }

        input:focus{
          border-color:#4d90fe;
      }


          .botonera{
            margin:0 0 50px 0;
          }

          .btn-buscar{
            background-color: #f5f5f5;
            border:none;
            color:#707070;
            font-size:15px;
            padding: 10px 20px;
            margin:5px;
            border-radius:4px;
            outline:none;
            box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
          }

          .btn-buscar:hover{
            border: 1px solid #c8c8c8;
            padding: 9px 19px;
            color:#808080;
          }
          .btn-buscar:focus{
            border:1px solid #4885ed;
            padding: 9px 19px;
          }
          

            .title{
                font-size:35px;
            }

            .card{
                display:flex;
                flex-direction:column;
                border:1px solid black;
                width:300px;
                height:350px;
                align-items:center;
                margin:15px;
                padding:5px;
                border-radius:10px;
                background-color:white;
                box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
            } 

            img{
                height:150px;
                width:150px;
                border-radius:50%;
                margin:5px 0 25px 0;
                border:5px solid gray;
            }

            .card-footer{
                align-self:flex-end;
                position:absolute;
                justify-self:flex-end;
                font-size:25px;
                font-weight:700;
            }

        
          

        </style>

    <div>`;

class Bitacora extends HTMLElement {
  constructor() {
    super();
    console.log("holi");
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(tpl.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ["id"];
  }

  connectedCallback() {
    //las siguientes variables son todas para los datos del card
    this.species = this._shadowRoot.querySelector("#species");
    this.identificador = this._shadowRoot.querySelector("#identificador");
    this.name = this._shadowRoot.querySelector("#name");
    this.status = this._shadowRoot.querySelector("#status");
    this.type = this._shadowRoot.querySelector("#type");
    this.gender = this._shadowRoot.querySelector("#gender");
    this.origin = this._shadowRoot.querySelector("#origin");
    this.img = this._shadowRoot.querySelector("#img");

    //variables de la botonera
    this.input = this._shadowRoot.querySelector("input");
    this.b = this._shadowRoot.querySelector("button");
    this.btnCambio = this._shadowRoot.querySelector("#btn-cambio");
    this.btnStop = this._shadowRoot.querySelector("#btn-stop");

    //para falicitar el uso del usuario, agregamos un boton play y stop
    //para que pueda interactuar tranquilamente con la web
    this.btnStop.addEventListener("click", () => {
      clearInterval(intervalo);

      fetch(`https://rickandmortyapi.com/api/character/${1}`)
        .then((res) => res.json())
        .then((data) => {
          this.img.setAttribute("src", data.image);
          this.name.innerHTML = `<span style="font-weight:700">Name:</span>  ${data.name}`;
          this.status.innerHTML = `<span style="font-weight:700">Status:</span> ${data.status}`;
          this.species.innerHTML = `<span style="font-weight:700">Species:</span> ${data.species}`;
          this.gender.innerHTML = `<span style="font-weight:700">Gender:</span> ${data.gender}`;
          this.origin.innerHTML = `<span style="font-weight:700">Origin:</span>${data.origin.name}`;
          if (data.type) {
            this.type.innerHTML = `<span style="font-weight:700">Type:</span> ${data.type}`;
          } else {
            this.type.innerHTML = ` <span style="font-weight:700">Type:</span> Unknown`;
          }
          this.identificador.innerHTML = data.id;
        });
    });

    let intervalo = null;
    this.btnCambio.addEventListener("click", () => {
      let i = 1;

      intervalo = setInterval(() => {
        fetch(`https://rickandmortyapi.com/api/character/${i}`)
          .then((res) => res.json())
          .then((data) => {
            this.img.setAttribute("src", data.image);
            this.name.innerHTML = `<span style="font-weight:700">Name:</span>  ${data.name}`;
            this.status.innerHTML = `<span style="font-weight:700">Status:</span> ${data.status}`;
            this.species.innerHTML = `<span style="font-weight:700">Species:</span> ${data.species}`;
            this.gender.innerHTML = `<span style="font-weight:700">Gender:</span> ${data.gender}`;
            this.origin.innerHTML = `<span style="font-weight:700">Origin:</span>${data.origin.name}`;
            if (data.type) {
              this.type.innerHTML = `<span style="font-weight:700">Type:</span> ${data.type}`;
            } else {
              this.type.innerHTML = ` <span style="font-weight:700">Type:</span> Unknown`;
            }
            this.identificador.innerHTML = data.id;
          });
        i++;
      }, 3000);
    });

    this.b.addEventListener("click", (e) => {
      if (this.input.value > 671) {
        e.preventDefault();
        alert("Ingrese un valor entre 1 y 671");
      } else {
        fetch(`https://rickandmortyapi.com/api/character/${this.input.value}`)
          .then((res) => res.json())
          .then((data) => {
            this.img.setAttribute("src", data.image);
            this.name.innerHTML = `<span style="font-weight:700">Name:</span>  ${data.name}`;
            this.status.innerHTML = `<span style="font-weight:700">Status:</span> ${data.status}`;
            this.species.innerHTML = `<span style="font-weight:700">Species:</span> ${data.species}`;
            this.gender.innerHTML = `<span style="font-weight:700">Gender:</span> ${data.gender}`;
            this.origin.innerHTML = `<span style="font-weight:700">Origin:</span>${data.origin.name}`;
            if (data.type) {
              this.type.innerHTML = `<span style="font-weight:700">Type:</span> ${data.type}`;
            } else {
              this.type.innerHTML = ` <span style="font-weight:700">Type:</span> Unknown`;
            }
            this.identificador.innerHTML = data.id;
          });
      }
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    fetch(`https://rickandmortyapi.com/api/character/${newValue}`)
      .then((res) => res.json())
      .then((data) => {
        this.img.setAttribute("src", data.image);
        this.name.innerHTML = `<span style="font-weight:700">Name:</span>  ${data.name}`;
        this.status.innerHTML = `<span style="font-weight:700">Status:</span> ${data.status}`;
        this.species.innerHTML = `<span style="font-weight:700">Species:</span> ${data.species}`;
        this.gender.innerHTML = `<span style="font-weight:700">Gender:</span> ${data.gender}`;
        this.origin.innerHTML = `<span style="font-weight:700">Origin:</span>${data.origin.name}`;
        if (data.type) {
          this.type.innerHTML = `<span style="font-weight:700">Type:</span> ${data.type}`;
        } else {
          this.type.innerHTML = ` <span style="font-weight:700">Type:</span> Unknown`;
        }
        this.identificador.innerHTML = data.id;
      });
  }
}

window.customElements.define("bitacora-personajes", Bitacora);
