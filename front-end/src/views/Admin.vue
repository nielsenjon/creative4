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
    <div class="actions" v-if="findItem">
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
.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.form {
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}

/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}

</style>
