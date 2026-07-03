<template>
  <v-app :class="ef">
    <v-navigation-drawer v-model="drawer" temporary class="d-md-none">
      <v-list>
        <v-list-item v-if="logged === true && auth.isMentor()" :to="{ name: 'onboarding' }">
          <v-list-item-title>Onboarding</v-list-item-title>
        </v-list-item>
        <v-list-item :to="{ name: 'dashboard' }">
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="logged === true && auth.isMentor()" :to="{ name: 'volunteers' }">
          <v-list-item-title>Voluntários</v-list-item-title>
        </v-list-item>
        <template v-if="logged === true">
          <v-list-item :to="{ name: 'squads-list' }">
            <v-list-item-title>Squads</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'projects-list' }">
            <v-list-item-title>Projetos</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'jobs-list' }">
            <v-list-item-title>Vagas</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'verticals-list' }">
            <v-list-item-title>Verticais</v-list-item-title>
          </v-list-item>
        </template>
        <template v-else>
          <v-list-item :to="{ name: 'registry' }">
            <v-list-item-title>Registro</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'search' }">
            <v-list-item-title>Pesquise</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'jobs-list' }">
            <v-list-item-title>Vagas</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'squads-list' }">
            <v-list-item-title>Squads</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'verticals-list' }">
            <v-list-item-title>Verticais</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'projects-list' }">
            <v-list-item-title>Projetos</v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      v-if="route.name !== 'public-profile' && route.name !== 'certificate'"
      class="header px-4"
      color="transparent"
      app
      elevation="4"
    >
      <div class="w-100 d-flex align-center justify-space-between main-container">
        <div class="d-flex align-center">
          <v-app-bar-nav-icon class="d-md-none" @click="drawer = !drawer"></v-app-bar-nav-icon>
          <router-link :to="{ name: 'home' }" class="d-flex align-center logo text-decoration-none">
            <h1
              class="d-none d-sm-block text-h5 font-weight-bold font-semibold primary-color ml-3 logo-text"
            >
              Stars
            </h1>
          </router-link>
        </div>

        <div class="d-none d-md-flex align-center ga-2">
          <v-btn
            v-if="logged === true && auth.isMentor()"
            variant="text"
            class="font-weight-semibold"
            :to="{ name: 'onboarding' }"
          >
            Onboarding
          </v-btn>
          <v-btn
            variant="text"
            class="font-weight-semibold"
            :to="{ name: 'dashboard' }"
          >
            Dashboard
          </v-btn>
          <v-btn
            v-if="logged === true && auth.isMentor()"
            variant="text"
            class="font-weight-semibold"
            :to="{ name: 'volunteers' }"
          >
            Voluntários
          </v-btn>
          <v-btn
            v-if="logged === true"
            variant="text"
            class="font-weight-semibold"
            :to="{ name: 'squads-list' }"
          >
            Squads
          </v-btn>
          <v-btn
            v-if="logged === true"
            variant="text"
            class="font-weight-semibold"
            :to="{ name: 'projects-list' }"
          >
            Projetos
          </v-btn>
          <v-btn
            v-if="logged === true"
            variant="text"
            class="font-weight-semibold"
            :to="{ name: 'jobs-list' }"
          >
            Vagas
          </v-btn>
          <v-btn
            v-if="logged === true"
            variant="text"
            class="font-weight-semibold"
            :to="{ name: 'verticals-list' }"
          >
            Verticais
          </v-btn>
          <v-btn
            v-if="logged === false"
            variant="text"
            class="font-weight-semibold"
            :to="{ name: 'registry' }"
          >
            Registro
          </v-btn>
          <v-btn
            v-if="logged === false"
            variant="text"
            class="font-weight-semibold"
            :to="{ name: 'search' }"
          >
            Pesquise
          </v-btn>
          <v-btn
            v-if="logged === false"
            variant="text"
            class="font-weight-semibold"
            :to="{ name: 'jobs-list' }"
          >
            Vagas
          </v-btn>
          <v-btn
            v-if="logged === false"
            variant="text"
            class="font-weight-semibold"
            :to="{ name: 'squads-list' }"
          >
            Squads
          </v-btn>
          <v-btn
            v-if="logged === false"
            variant="text"
            class="font-weight-semibold"
            :to="{ name: 'verticals-list' }"
          >
            Verticais
          </v-btn>
          <v-btn
            v-if="logged === false"
            variant="text"
            class="font-weight-semibold"
            :to="{ name: 'projects-list' }"
          >
            Projetos
          </v-btn>
        </div>

        <div class="d-flex align-center ga-2">
          <v-menu v-if="logged === true" open-on-hover>
            <template #activator="{ props }">
              <v-btn
                variant="text"
                class="font-weight-semibold"
                v-bind="props"
                style="max-width: 200px"
              >
                <span class="text-truncate">
                  {{ formattedName }}
                </span>
                <v-icon right>mdi-chevron-down</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item link :to="{ name: 'profile' }">
                <v-list-item-title>Profile</v-list-item-title>
              </v-list-item>
              <v-list-item v-if="auth.isAdmin()" link :to="{ name: 'users-management' }">
                <v-list-item-title>Gerenciar Usuários</v-list-item-title>
              </v-list-item>
              <v-list-item link @click="auth.logout()">
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
    </v-app-bar>

    <transition name="fade" mode="out-in">
      <v-main
        class="d-flex flex-grow-1"
        :style="
          route.name !== 'public-profile' && route.name !== 'certificate'
            ? 'margin-top: 64px'
            : ''
        "
      >
        <RouterView />

        <v-snackbar
          v-model="snackbarStore.snack.show"
          v-bind="snackbarStore.snack"
          location="top right"
        >
          {{ snackbarStore.snack.text }}
          <template #actions>
            <v-btn variant="text" @click="snackbarStore.snack.show = false"> Close </v-btn>
          </template>
        </v-snackbar>
      </v-main>
    </transition>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useSnackbarStore } from '@/stores/snackbar'

const snackbarStore = useSnackbarStore()

const auth = useAuthStore()

const route = useRoute()

const drawer = ref(false)

const logged = computed(() => auth.getName() != '')

console.log('logged', route.path)
const ef = computed(() => (route.path === '/' ? 'homeBackgroundEffect' : ''))

const formattedName = computed(() => {
  const name = auth.getName()
  if (!name) return ''

  // Se for email, pega a parte antes do @
  if (name.includes('@')) {
    return name.split('@')[0]
  }

  // Se for nome completo, pega o primeiro e segundo nome se couber, senão só o primeiro
  const parts = name.split(' ')
  if (parts.length > 1) {
    // Tenta primeiro + segundo nome
    const shortName = `${parts[0]} ${parts[1]}`
    if (shortName.length <= 15) return shortName
  }

  return parts[0]
})
</script>

<style lang="scss">
.header {
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.main-container {
  margin-left: 240px;
  margin-right: 240px;
  padding: 0;

  @media (max-width: 1600px) {
    margin-left: 120px;
    margin-right: 120px;
  }

  @media (max-width: 1200px) {
    margin-left: 40px;
    margin-right: 40px;
  }

  @media (max-width: 600px) {
    margin-left: 0;
    margin-right: 0;
  }
}

.logo {
  cursor: pointer;
  transition: ease-in-out 0.2s;

  &:hover {
    filter: brightness(1.25);
    transition: ease-in-out 0.2s;
  }
}

.drag-none {
  user-select: none;
  -moz-drag-over: none;
  -webkit-user-drag: none;
}

.logo-text {
  font-family: 'Radio Canada', serif !important;
}
</style>
