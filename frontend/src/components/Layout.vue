<template>
    <header>
        <slot name="header"></slot>
    </header>
    <main>
        <slot></slot>
    </main>
    <footer>
        <slot name="footer"></slot>
    </footer>
</template>

<style lang="css" scoped>
header {
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 65px;
}

main {
  top: 65px;
  overflow-y: scroll;
  height: calc(100vh - 130px);
  position: fixed;
  width: 100%;
}

footer {
  padding: 8px;
  background-color: #fff;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  justify-content: space-between;
}
</style>