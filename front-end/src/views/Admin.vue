<template>
<div class="admin">
  <h1>The Admin Page!</h1>
    <div class="heading">
    <h2>Add New Game For Sale</h2>
  </div>
  <div class="add">
    <div class="form">
      <input v-model="addGame" placeholder="Game">
      <p></p>
      <button @click="newGame()">Add</button>
    </div>
  </div>
  <div class="heading">
    <h2>Edit/Delete an Item</h2>
  </div>
  <div class="edit">
    <div class="form">
      <input v-model="findTitle" placeholder="Search">
      <div class="suggestions" v-if="suggestions.length > 0">
        <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectItem(s)">{{s.game}}
        </div>
      </div>
    </div>
    <div class="upload" v-if="findItem">
      <input v-model="findItem.game">
      <p></p>
      <button @click="deleteGame(findItem)">Delete</button>
      <button @click="editGame(findItem)">Edit</button>
    </div>
  </div>
  <div class="heading">
    <h2>Edit Orders</h2>
  </div>
  <div class="edit">
    <div class="form">
      <input v-model="findTitle2" placeholder="Search">
      <div class="suggestions" v-if="suggestions2.length > 0">
        <div class="suggestion" v-for="s2 in suggestions2" :key="s2.id" @click="selectItem2(s2)">{{s2.game}}
        </div>
      </div>
    </div>
    <div class="actions" v-if="findItem2">
      <p>{{findItem2.game}}</p>
      <p>{{findItem2.name}}</p>
      <p>{{findItem2.streetAdd}}</p>
      <p>{{findItem2.city}}</p>
      <p>{{findItem2.state}}</p>
      <p>{{findItem2.zip}}</p>
      <button @click="deleteOrder(findItem2)">Fulfilled</button>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Admin',
  data() {
    return {
      title: "",
      file: null,
      description: "",
      addItem: null,
      items: [],
      findTitle: "",
      findTitle2: "",
      findItem: null,
      findItem2: null,
      name: "",
      streetAdd: "",
      city: "",
      state: "",
      zip: "",
      addGame: "",
      orders: [],
    }
  },
  created() {
    this.getItems();
    this.getOrders();
  },
  computed: {
    suggestions() {
      let items = this.items.filter(item => (item.game.toLowerCase().indexOf(this.findTitle.toLowerCase()) !== -1));
      return items.sort((a, b) => a.game > b.game);
    },
    suggestions2() {
      let ourOrders = this.orders.filter(order => (order.game.toLowerCase().indexOf(this.findTitle2.toLowerCase()) !== -1));
      return ourOrders.sort((a, b) => a.game > b.game);
    }
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async newGame() {
      let r1 = await axios.post('/api/game', {
        game: this.addGame,
      });
      this.addItem = r1.data;
      this.getItems();
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/items', {
          title: this.title,
          path: r1.data.path,
          description: this.description
        });
        this.addItem = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getItems() {
      try {
        let response = await axios.get("/api/game");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async getOrders() {
      try {
        let response = await axios.get("/api/order");
        this.orders = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectItem(item) {
      this.findTitle = "";
      this.findItem = item;
    },
    selectItem2(item) {
      this.findTitle = "";
      this.findItem2 = item;
    },
    async deleteItem(item) {
      try {
        await axios.delete("/api/items/" + item._id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteGame(game) {
      try {
        await axios.delete("/api/game/" + game._id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteOrder(order) {
      try {
        await axios.delete("/api/order/" + order._id);
        this.findItem2 = null;
        this.getOrders();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editGame(item) {
      try {
        await axios.put("/api/game/" + item._id, {
          game: this.findItem.game,
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editItem(item) {
      try {
        await axios.put("/api/items/" + item._id, {
          title: this.findItem.title,
          description: this.findItem.description,
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>

.heading {
  display: flex;
  justify-content: center !important;
  margin-bottom: 8px;
  margin-top: 20px;
}
h1 {
text-align: center;
}
.heading h2 {
  margin-top: 8px;
}

.add,
.edit {
  display: flex;
  flex-direction: column;
}


/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  width: 200px;
  min-height: 20px;
  border: .5px solid #577590;
}

.suggestion:hover {
  background-color: #000;
  color: #fff;
}

.upload,
.actions {
margin-top: 25px;
}

.upload button {
  margin: 5px;
}

/* Mobile Styles */
@media only screen and (max-width: 800px) {
.heading {
  margin-top: 10px;
  margin-bottom: 0;
}
.add,
.edit {
  display: flex;
  flex-direction: column;
}



}

/* Desktop Styles */
@media only screen and (min-width: 801px) {


}

* {
  align-items: center !important;
}

</style>
