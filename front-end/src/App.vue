<template>
<div id="app">
  <div class="header">
    <router-link to="/">
      <div class="logo">
        <img id="logo_image" src="/controller.png">
      </div>
    </router-link>
    <div class="title">
      <h1>JJ Used Games</h1>
    </div>
  </div>
  <div class="content">
    <router-view />
  </div>
  <hr>
  <div class="footer">
    <router-link to="/admin">Admin</router-link>
    <p>Project's Github: <a href="https://github.com/nielsenjon/creative4">LINK</a></p>
  </div>
</div>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  background: #f0ead2;
  padding: 0px;
  margin: 0px;
}

/* Header */
.header {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 10px 100px 0px 100px;
  background-color: #577590;
}

#logo_image {
  width: 60px;
  height: 60px;
}

.title {
  margin-top: 5px;
}

.title h1 {
  font-size: 30px;
}

.content {
  padding: 20px 100px;
}

/* Footer */
.footer {
  justify-content: center;
  width: 100%;
  padding: 20px 0;
  background: #f0ead2;
  font-size: 20px;
}

.footer p {
  font-size: 15px;
}

.footer a {
  color: #000;
}

h1 {
  font-size: 20px;
}

h2 {
  font-size: 14px;
}

.footer {
  margin: 0px;
  padding-top: 10px;
  padding-bottom: 25px;
  text-align: center;
}

/* Mobile Styles */
@media only screen and (max-width: 800px) {
  .footer {
    justify-content: center;
    width: 100%;
  }

  .header {
    justify-content: center;
    width: 100%;
  }

}

/* Desktop Styles */
@media only screen and (min-width: 801px) {

}
</style>
