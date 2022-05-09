// const ednpointUrl = "https://reqres.in/api/users";
// const ednpointUrl = "https://reqres.in/api/unknown/23";
const ednpointUrl = "./data/users.json";
// const ednpointUrl = "/Users/vasea/projects/fe12-fetch/data/users.json";

class User {
    constructor(name, email, avatar) {
      this.name = name;
      this.email = email;
      this.avatar = avatar;
      this.userContainer = document.createElement("article");
      this.imgEl = document.createElement("img");
      this.nameEl = document.createElement("div");
      this.emailEl = document.createElement("div");
    }
  
    createUser() {
      this.nameEl.textContent = this.name;
      this.emailEl.textContent = this.email;
      this.imgEl.src = this.avatar;
      this.userContainer.appendChild(this.imgEl);
      this.userContainer.appendChild(this.nameEl);
      this.userContainer.appendChild(this.emailEl);
      return this.userContainer;
    }
  }

const usersContainer = document.getElementById("users");
const errorsContainer = document.getElementById("error");
const nextButton = document.getElementById("next_button");
const prevButton = document.getElementById("prev_button");
const filterInput = document.getElementById("filter_users");

let allUsers;

let currentPage = 1;

nextButton.addEventListener('click', () => changePage('increment'))
prevButton.addEventListener('click', () => changePage('decrement'))
filterInput.addEventListener('change', (e) => {
    const val = e.target.value;
    console.log(val);
})

function changePage(op) {
    usersContainer.innerHTML = '';
    if (op === 'increment') {
        currentPage++;
    } else {
        currentPage--;
    }
    getUsers(currentPage);
}


function getUsers(page) {
    fetch(`${ednpointUrl}?page=${page}`)
    .then((res) => {
    if (res.ok) {
        return res.json()
    } else {
        return Promise.reject('A aparut o problema la afisarea utilizatorilor.')
    }
})
.then(resData => {
    const users = resData.data;
    allUsers = users;
    // console.log(allUsers)
    // const fisrLastNameUsers = allUsers.map(user => {
    //     return {FirstName: user.first_name, LastName: user.last_name};
    // })
    // const filteredUsers = allUsers.filter(user => {
    //     return user.id >= 5;
    // })
    // console.log(filteredUsers);
    // console.log(fisrLastNameUsers);
    users.forEach(user => {
        console.log(user);
        const {first_name, last_name, email, avatar} = user;
        const userContent = new User(`${first_name} ${last_name}`, email, avatar);
        usersContainer.appendChild(userContent.createUser());
    });
}).catch(err => {
    const errorEl = document.createElement('div');
    errorEl.textContent = err;
    errorsContainer.appendChild(errorEl)
});
}

getUsers(currentPage);

// map, filter, find, findIndex, sort


