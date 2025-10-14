<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <RouterLink to="/" class="navbar-brand">VK-Monorepo</RouterLink>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <RouterLink to="/" class="nav-link" exact-active-class="active">Home</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/modules" class="nav-link" exact-active-class="active"
                >Modules</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink to="/create-module" class="nav-link" exact-active-class="active"
                >Create Module</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink to="/about" class="nav-link" exact-active-class="active"
                >About</RouterLink
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Main content -->
    <main class="flex-grow-1 w-100">
      <div class="container-fluid py-4">
        <RouterView />
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-light py-3 text-center mt-auto">&copy; 2025 VK-Monorepo</footer>
  </div>
</template>

<style scoped>
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
}
</style>
