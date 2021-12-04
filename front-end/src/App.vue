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
  <div class="footer">
    <router-link to="/admin">Admin</router-link>
    <p class="footer">My Project's Github: <a href="https://github.com/nielsenjon/creative4">LINK</a></p>
  </div>
</div>
</template>

<style>
html {
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  background: #fff;
  padding: 0px;
  margin: 0px;
}

/* Header */
.header {
  display: flex;
  justify-content: center;
  padding: 10px 100px 0px 100px;
  background-color: #bfbfbd;
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
  min-height: 500px;
}

/* Footer */
.footer {
  height: 50px;
  padding: 20px 100px 0px 100px;
  background: #bfbfbd;
  font-size: 12px;
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
  padding-top: 0px;
  padding-bottom: 25px;
  text-align: center;
}
</style>
