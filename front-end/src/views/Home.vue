<template>
<div class="admin">
  <div class="heading">
    <h2>Games For Sale</h2>
  </div>
  <div class="edit">
    <div class="form">
      <input v-model="findTitle" placeholder="Search">
      <div class="suggestions" v-if="suggestions.length > 0">
        <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectItem(s)">{{s.game}}
        </div>
      </div>
    </div>
  </div>
  <div class="heading">
    <h2>Order Information</h2>
  </div>
  <div class="add">
    <div class="form">
      <input v-model="name" placeholder="Name">
      <p></p>
      <input v-model="streetAdd" placeholder="Street Address">
      <p></p>
      <input v-model="city" placeholder="City">
      <p></p>
      <input v-model="state" placeholder="State">
      <p></p>
      <input v-model="zip" placeholder="Zip">
      <p></p>
      <div class="actions" v-if="findItem">
        <button @click="makeOrder()">Place Order</button>
      </div>
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
      name: "",
      streetAdd: "",
      city: "",
      state: "",
      zip: "",
      addGame: "",
      file: null,
      description: "",
      addItem: null,
      items: [],
      findTitle: "",
      findItem: null,
    }
  },
  created() {
    this.getItems();
  },
  computed: {
    suggestions() {
      let items = this.items.filter(item => (item.game.toLowerCase().indexOf(this.findTitle.toLowerCase()) !== -1));
      return items.sort((a, b) => a.title > b.title);
    }
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
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
    async makeOrder() {
      let r1 = await axios.post('/api/order', {
        game: this.findItem.game,
        name: this.name,
        streetAdd: this.streetAdd,
        city: this.city,
        state: this.state,
        zip: this.zip,
      });
      this.addItem = r1.data;
    },
    async newGame() {
      let r1 = await axios.post('/api/game', {
        game: this.addGame,
      });
      this.addItem = r1.data;
    },
    selectItem(item) {
      this.findTitle = "";
      this.findItem = item;
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
