
// const person = `{
//     "nome": "Mirko",
//     "cognome": "Abbrescia",
//     "età": 37,
//     "contatti": [
//         "33333333",
//         "33333344"
//     ],
//     "indirizzo":{
//         "citta": "bari",
//         "indirizzo": "via",
//         "CAP": "70100"
//     },
//     "sposato": false
// }`

// let obj = JSON.parse(person)

// console.log(obj);

// console.log(JSON.stringify(obj));
// console.log(JSON.stringify(person, null, 2));

// // ---------------------------------------------------------------------------

// let f1 = fetch("/person.json");
// let f2 = f1.then(elaboraFetch);
// f2.then(ottieniOggetti);

// console.log("Ho finito ");

// function elaboraFetch(response) {
//     return response.json();

// function ottieniOggetti(oggetti) {
//         console.log(oggetti);
//     }
// }
// --------------------------------------------------------------------------

                        //   RUBRICA TELEFONI

let selectedContact = -1;
let contactBook = {
    contacts: [
        {
            id: 1,
            nome: "Francesco",
            telefono: "345367373",
            email: "francesco@hotmail.it",
            pokemon: "charizard",
        },
        {
            id: 2,
            nome: "Domenico",
            telefono: "345367345",
            email: "domenico@hotmail.it",
            pokemon: "",
        },
        {
            id: 3,
            nome: "Mirko",
            telefono: "3453673453",
            email: "mirko@hotmail.it",
            pokemon: "bulbasaur",
        },
    ],
    viewContact() {},
    insertContact(nome, telefono, email) {
        // const newId = this.contacts[this.contacts.length - 1].id + 1;
        const newId = this.contacts.reduce(findHighestId, 0) + 1;
        this.contacts.push({
            id: newId,
            nome: nome,
            telefono: telefono,
            email: email,
        });

        function findHighestId(highestId, contact) {
            if (highestId > contact.id) {
                return highestId;
            } else {
                return contact.id;
            }
        }
    },

    updateContact (id, nome, telefono, email) {
        let updateContactIndex = this.contacts.findIndex(findById);
        if (updateContactIndex >= 0) {
            this.contacts[updateContactIndex] = {
            id: id,
            nome: nome,
            telefono: telefono,
            email: email,       
            };
        }

        function findById(contact) {
            return contact.id === id;
        }
    },
    deleteContact (indice) {
        this.contacts.splice(indice, 1);
    },
};

const viewButton = document.querySelector("#viewButton");
viewButton.addEventListener("click", createContactElements);

const modalInsertContact = document.querySelector("#modalInsertContact");
modalInsertContact.addEventListener("click", insertNewContact);

const updateButton = document.querySelector("#updateButton");
updateButton.addEventListener("click", loadContact);

const modalUpdateContact = document.querySelector("#modalUpdateContact");
modalUpdateContact.addEventListener("click", updateContact);

const deleteButton = document.querySelector("#deleteButton");
deleteButton.addEventListener("click", deleteContact);

const searchNome = document.querySelector("#searchNome");
searchNome.addEventListener("input", filterContact);

function createContactElements() {
    const contactsWrapper = document.querySelector("#contactsWrapper");
    contactsWrapper.innerHTML = "";
    // selectedContact = -1;
    contactBook.contacts.forEach(createcontactElement);

    function createcontactElement(contact) {
        const contactElement = document.createElement("div");
        contactElement.id = `${contact.id}`;
        contactElement.classList.add(
            "card", 
            "card-layout",
            "px-3",
            "py-4",
            "justify-content-center", 
            "shadow",
            "m-2"
        );
        contactElement.addEventListener("click", selectContact);
        contactElement.innerHTML = `
        <div class="avatar">
            <img src="https://picsum.photos/60" alt="">
        </div>
        <div class="contact-info d-flex flex-column justify-content-around text-white">
                <span>${contact.nome}</span>
            <div class="d-flex flex-column">
                <span class="caption fw-bolder">Telefono :</span>
                <span class="ms-auto">${contact.telefono}</span>
            </div>
            <div class="d-flex flex-column">
                <span class="caption fw-bolder">Email :</span>
                <span class="ms-auto">${contact.email}</span>
            </div>
        </div>
        `;
         contactsWrapper.appendChild(contactElement);
         function selectContact() {
            const cards = document.querySelectorAll(".card.card-layout");
            for (let  i = 0; i < cards.length; i++) {
                cards[i].classList.remove("card-selected")
            }
            contactElement.classList.add("card-selected")
            // selectedContact = contactIndex
         }
    } 
}

function loadContact() {
    const cardSelected = document.querySelector(".card-selected");
    if (cardSelected) {
        const id = parseInt(cardSelected.id);
        const updateNome = document.querySelector("#updateNome");
        const updateTelefono = document.querySelector("#updateTelefono");
        const updateEmail = document.querySelector("#updateEmail");

        const contact = contactBook.contacts.find(findById);
        updateNome.value = contact.nome
        updateTelefono.value = contact.telefono
        updateEmail.value = contact.email

        function findById(contact) {
            return contact.id === id;
        }
    } 
}

function insertNewContact() {
        const inputNome = document.querySelector("#inputNome");
        const inputTelefono = document.querySelector("#inputTelefono");
        const inputEmail = document.querySelector("#inputEmail");

        contactBook.insertContact(inputNome.value, inputTelefono.value, inputEmail.value);//METODO PER SAPERE VALORE
        
        createContactElements();//RICHIAMANDOLA POSSIAMO INSERIRE I DATI NELLE CARD E FARE IN MODO, CHE CI FACCIA UNA CARD AL MOMENTO
}

function updateContact() {
        const cardSelected = document.querySelector(".card-selected");
        if (cardSelected) {
            const id = parseInt(cardSelected.id);
        const updateNome = document.querySelector("#updateNome");
        const updateTelefono = document.querySelector("#updateTelefono");
        const updateEmail = document.querySelector("#updateEmail");

        contactBook.updateContact(
            id,
            updateNome.value, 
            updateTelefono.value,
            updateEmail.value
          );
    }
     createContactElements(); 
}

 function deleteContact() {
    const cardSelected = document.querySelector(".card-selected");
    if (cardSelected) {
        const id = parseInt(cardSelected.id);
        contactBook.deleteContact(
        id,
      );
}
 createContactElements(); 
}

function filterContact() {
    const value = searchNome.value;
    if (searchNome.value) {
        const filterContacts = contactBook.contacts.filter((contact) => contact.nome.toLowerCase().includes(value.toLowerCase()));
        createFilteredContactElements(filterContacts);
    } else {
        createContactElements();
    }
}

function createFilteredContactElements(filteredContacts) {
    const contactsWrapper = document.querySelector("#contactsWrapper");
    contactsWrapper.innerHTML = "";
    // selectedContact = -1;
    filteredContacts.forEach(createcontactElement);

    function createcontactElement(contact, contactIndex) {
        const contactElement = document.createElement("div");
        contactElement.id = `${contact.id}`;
        contactElement.classList.add(
            "card", 
            "card-layout",
            "px-3",
            "py-4",
            "justify-content-center", 
            "shadow",
            "m-2"
        );
        contactElement.addEventListener("click", selectContact);
        contactElement.innerHTML = `
        <div class="avatar">
            <img src="https://picsum.photos/60" alt="">
        </div>
        <div class="contact-info d-flex flex-column justify-content-around text-white">
                <span>${contact.nome}</span>
            <div class="d-flex flex-column">
                <span class="caption fw-bolder">Telefono :</span>
                <span class="ms-auto">${contact.telefono}</span>
            </div>
            <div class="d-flex flex-column">
                <span class="caption fw-bolder">Email :</span>
                <span class="ms-auto">${contact.email}</span>
            </div>
        </div>
        `;
         contactsWrapper.appendChild(contactElement);
         function selectContact() {
            const cards = document.querySelectorAll(".card.card-layout");
            for (let  i = 0; i < cards.length; i++) {
                cards[i].classList.remove("card-selected")
            }
            contactElement.classList.add("card-selected")
            // selectedContact = contactIndex
         }
    } 
}
