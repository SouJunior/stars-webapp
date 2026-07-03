<template>
  <v-container class="fill-height bg-background pa-0" fluid>
    <v-row justify="center" class="ma-0 h-100">
      <v-col cols="12" sm="8" md="5" lg="4" class="pa-4 h-100 overflow-y-auto">
        <!-- Loading State -->
        <div v-if="!volunteer && !error" class="d-flex justify-center align-center h-100">
          <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
        </div>

        <!-- Error State -->
        <div
          v-else-if="error"
          class="d-flex flex-column justify-center align-center h-100 text-center"
        >
          <v-icon icon="mdi-alert-circle" size="64" color="error" class="mb-4"></v-icon>
          <h2 class="text-h5 text-medium-emphasis">Voluntário não encontrado</h2>
          <v-btn variant="text" color="primary" class="mt-4" to="/">Voltar para Home</v-btn>
        </div>

        <!-- Content -->
        <div v-else class="d-flex flex-column gap-4 pb-6">
          <!-- Header Card -->
          <v-card class="rounded-xl overflow-hidden mb-2" elevation="1">
            <!-- Banner -->
            <div class="position-relative banner-gradient" style="height: 100px"></div>

            <!-- Profile Info -->
            <div class="d-flex flex-column align-center text-center px-4 pb-6 mt-n12">
              <v-avatar size="96" class="elevation-3 mb-3 border-4 border-surface">
                <v-img v-if="volunteer.avatar" :src="volunteer.avatar" cover></v-img>
                <span
                  v-else
                  class="text-h4 font-weight-bold text-white bg-gradient-primary w-100 h-100 d-flex align-center justify-center"
                >
                  {{ getInitials(volunteer.name) }}
                </span>
              </v-avatar>

              <h1 class="text-h5 font-weight-bold text-high-emphasis">{{ volunteer.name }}</h1>
              <p class="text-body-2 text-medium-emphasis mt-1">
                {{ volunteer.jobtitle?.title || 'Voluntário' }} • SouJunior
              </p>

              <div class="d-flex gap-3 w-100 mt-6">
                <v-btn
                  v-if="volunteer.linkedin"
                  class="flex-grow-1 text-capitalize rounded-lg"
                  color="success"
                  elevation="2"
                  height="44"
                  :href="volunteer.linkedin"
                  target="_blank"
                >
                  Conectar
                </v-btn>
                <v-btn
                  v-else
                  class="flex-grow-1 text-capitalize rounded-lg"
                  variant="tonal"
                  height="44"
                  disabled
                >
                  Conectar
                </v-btn>
              </div>
            </div>
          </v-card>

          <!-- Details Card -->
          <v-card class="rounded-xl mb-2" elevation="1">
            <div class="px-6 py-4 border-b">
              <h2 class="text-subtitle-1 font-weight-bold">Contato & Cargo</h2>
            </div>

            <v-list class="py-0" lines="two">
              <!-- LinkedIn -->
              <v-list-item
                v-if="volunteer.linkedin"
                :href="volunteer.linkedin"
                target="_blank"
                link
                class="px-6 py-3"
              >
                <template #prepend>
                  <v-avatar color="blue" variant="tonal" class="mr-4 rounded-circle">
                    <v-icon icon="mdi-linkedin"></v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title class="text-body-2 font-weight-medium text-truncate">
                  {{ volunteer.linkedin.replace('https://', '').replace('www.', '') }}
                </v-list-item-title>
                <v-list-item-subtitle class="text-caption">LinkedIn</v-list-item-subtitle>
                <template #append>
                  <v-icon
                    size="small"
                    class="text-medium-emphasis"
                    icon="mdi-chevron-right"
                  ></v-icon>
                </template>
              </v-list-item>

              <v-divider v-if="volunteer.linkedin" inset></v-divider>

              <!-- GitHub -->
              <v-list-item
                v-if="volunteer.github"
                :href="volunteer.github"
                target="_blank"
                link
                class="px-6 py-3"
              >
                <template #prepend>
                  <v-avatar color="black" variant="tonal" class="mr-4 rounded-circle">
                    <v-icon icon="mdi-github"></v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title class="text-body-2 font-weight-medium text-truncate">
                  {{ volunteer.github.replace('https://', '').replace('www.', '') }}
                </v-list-item-title>
                <v-list-item-subtitle class="text-caption">GitHub</v-list-item-subtitle>
                <template #append>
                  <v-icon
                    size="small"
                    class="text-medium-emphasis"
                    icon="mdi-chevron-right"
                  ></v-icon>
                </template>
              </v-list-item>

              <v-divider v-if="volunteer.github" inset></v-divider>

              <!-- Discord -->
              <v-list-item v-if="volunteer.discord" class="px-6 py-3">
                <template #prepend>
                  <v-avatar
                    color="deep-purple-accent-2"
                    variant="tonal"
                    class="mr-4 rounded-circle"
                  >
                    <v-icon icon="fa:fab fa-discord"></v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title class="text-body-2 font-weight-medium">{{
                  volunteer.discord
                }}</v-list-item-title>
                <v-list-item-subtitle class="text-caption">Discord</v-list-item-subtitle>
                <template #append>
                  <v-btn
                    variant="text"
                    size="small"
                    color="success"
                    class="text-none px-0"
                    @click="copyToClipboard(volunteer.discord)"
                  >
                    Copiar
                  </v-btn>
                </template>
              </v-list-item>

              <v-divider v-if="volunteer.discord" inset></v-divider>

              <!-- Cargo -->
              <v-list-item v-if="volunteer.jobtitle" class="px-6 py-3">
                <template #prepend>
                  <v-avatar color="orange-darken-1" variant="tonal" class="mr-4 rounded-circle">
                    <v-icon icon="mdi-briefcase"></v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title class="text-body-2 font-weight-medium">{{
                  volunteer.jobtitle.title
                }}</v-list-item-title>
                <v-list-item-subtitle class="text-caption">Cargo</v-list-item-subtitle>
              </v-list-item>

              <v-divider v-if="volunteer.jobtitle" inset></v-divider>

              <!-- Status -->
              <v-list-item v-if="volunteer.status" class="px-6 py-3">
                <template #prepend>
                  <v-avatar color="green-darken-1" variant="tonal" class="mr-4 rounded-circle">
                    <v-icon icon="mdi-heart-pulse"></v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title class="d-flex align-center">
                  <v-chip
                    :color="getStatusColor(volunteer.status.name)"
                    size="x-small"
                    label
                    class="font-weight-bold text-uppercase"
                  >
                    {{ volunteer.status.name }}
                  </v-chip>
                </v-list-item-title>
                <v-list-item-subtitle class="text-caption mt-1">Status Atual</v-list-item-subtitle>
              </v-list-item>

              <v-divider v-if="volunteer.status" inset></v-divider>

              <!-- Squad -->
              <v-list-item v-if="volunteer.squad" class="px-6 py-3">
                <template #prepend>
                  <v-avatar color="pink-darken-1" variant="tonal" class="mr-4 rounded-circle">
                    <v-icon icon="mdi-account-group"></v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title class="text-body-2 font-weight-medium">{{
                  volunteer.squad.name
                }}</v-list-item-title>
                <v-list-item-subtitle class="text-caption">Squad</v-list-item-subtitle>
              </v-list-item>

              <v-divider v-if="volunteer.squad || volunteer.verticals.length > 0" inset></v-divider>

              <!-- Verticals -->
              <v-list-item v-if="volunteer.verticals && volunteer.verticals.length > 0" class="px-6 py-3">
                <template #prepend>
                  <v-avatar color="indigo" variant="tonal" class="mr-4 rounded-circle">
                    <v-icon icon="mdi-layers"></v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title class="d-flex flex-wrap gap-2 align-center">
                  <v-chip
                    v-for="vertical in volunteer.verticals"
                    :key="vertical.id"
                    size="small"
                    color="indigo-lighten-4"
                    text-color="indigo-darken-4"
                    label
                  >
                    {{ vertical.name }}
                  </v-chip>
                </v-list-item-title>
                <v-list-item-subtitle class="text-caption mt-2">Verticais</v-list-item-subtitle>
              </v-list-item>

              <v-divider v-if="(volunteer.mentors && volunteer.mentors.length > 0) || (volunteer.mentees && volunteer.mentees.length > 0)" inset></v-divider>

              <!-- Mentoria (Mentores) -->
              <v-list-item v-if="volunteer.mentors && volunteer.mentors.length > 0" class="px-6 py-3">
                <template #prepend>
                  <v-avatar color="deep-purple" variant="tonal" class="mr-4 rounded-circle">
                    <v-icon icon="mdi-school"></v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title class="d-flex flex-wrap gap-2 align-center">
                  <v-chip
                    v-for="mentor in volunteer.mentors"
                    :key="mentor.id"
                    size="small"
                    color="deep-purple-lighten-4"
                    text-color="deep-purple-darken-4"
                    label
                    link
                    :to="{ name: 'public-profile', params: { id: mentor.id } }"
                  >
                    {{ mentor.name }}
                  </v-chip>
                </v-list-item-title>
                <v-list-item-subtitle class="text-caption mt-2">Mentores</v-list-item-subtitle>
              </v-list-item>

              <!-- Mentoria (Mentorados) -->
              <v-list-item v-if="volunteer.mentees && volunteer.mentees.length > 0" class="px-6 py-3">
                <template #prepend>
                  <v-avatar color="teal" variant="tonal" class="mr-4 rounded-circle">
                    <v-icon icon="mdi-account-tie-voice"></v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title class="d-flex flex-wrap gap-2 align-center">
                  <v-chip
                    v-for="mentee in volunteer.mentees"
                    :key="mentee.id"
                    size="small"
                    color="teal-lighten-4"
                    text-color="teal-darken-4"
                    label
                    link
                    :to="{ name: 'public-profile', params: { id: mentee.id } }"
                  >
                    {{ mentee.name }}
                  </v-chip>
                </v-list-item-title>
                <v-list-item-subtitle class="text-caption mt-2">Mentorados</v-list-item-subtitle>
              </v-list-item>

              <v-divider v-if="volunteer.verticals && volunteer.verticals.length > 0 && volunteer.is_apoiase_supporter" inset></v-divider>

              <!-- Apoiador APOIA.se -->
              <v-list-item v-if="volunteer.is_apoiase_supporter" class="px-6 py-3">
                <template #prepend>
                  <v-avatar color="pink-accent-2" variant="tonal" class="mr-4 rounded-circle">
                    <v-icon icon="mdi-heart"></v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title class="text-body-2 font-weight-bold text-pink">
                  Apoiador Oficial
                </v-list-item-title>
                <v-list-item-subtitle class="text-caption">APOIA.se</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card>

          <!-- Certificates Card -->
          <v-card v-if="volunteer.certificates && volunteer.certificates.length > 0" class="rounded-xl" elevation="1">
            <div class="px-6 py-4 border-b">
              <h2 class="text-subtitle-1 font-weight-bold">Certificados</h2>
            </div>
            <v-list class="py-0">
              <v-list-item
                v-for="certificate in volunteer.certificates.filter(c => !c.is_cancelled)"
                :key="certificate.id"
                link
                :to="{ name: 'certificate', params: { id: certificate.id } }"
                class="px-6 py-3"
              >
                <template #prepend>
                  <v-avatar color="yellow-darken-2" variant="tonal" class="mr-4 rounded-circle">
                    <v-icon icon="mdi-certificate"></v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title class="text-body-2 font-weight-medium">
                  Certificado de {{ certificate.hours }} horas
                </v-list-item-title>
                <v-list-item-subtitle class="text-caption">
                  Emitido em: {{ formatDateTime(certificate.issued_at) }}
                </v-list-item-subtitle>
                <template #append>
                  <v-icon
                    size="small"
                    class="text-medium-emphasis"
                    icon="mdi-chevron-right"
                  ></v-icon>
                </template>
              </v-list-item>
            </v-list>
          </v-card>

          <!-- Badges Card -->
          <v-card v-if="volunteer.badges && volunteer.badges.length > 0" class="rounded-xl" elevation="1">
            <div class="px-6 py-4 border-b">
              <h2 class="text-subtitle-1 font-weight-bold">Conquistas (Badges)</h2>
            </div>
            <v-list class="py-0">
              <v-list-item
                v-for="badge in volunteer.badges"
                :key="badge.id"
                class="px-6 py-3"
              >
                <template #prepend>
                  <v-avatar color="amber-darken-1" variant="tonal" class="mr-4 rounded-circle">
                    <v-icon icon="mdi-medal"></v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title class="text-body-2 font-weight-bold">
                  {{ badge.title }}
                </v-list-item-title>
                <v-list-item-subtitle class="text-caption">
                  {{ badge.description }}
                </v-list-item-subtitle>
                <v-list-item-subtitle class="text-caption mt-1">
                  Reconhecido por {{ badge.issuer_name }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card>

          <!-- History Card -->
          <v-card class="rounded-xl" elevation="1">
            <div class="px-6 py-4 border-b">
              <h2 class="text-subtitle-1 font-weight-bold">Histórico na SouJunior</h2>
            </div>
            <div class="px-4 py-4">
              <v-timeline
                density="compact"
                align="start"
                side="end"
                truncate-line="start"
                class="custom-timeline"
              >
                <v-timeline-item
                  v-for="historyItem in sortedStatusHistory"
                  :key="historyItem.id"
                  :dot-color="getStatusColor(historyItem.status.name)"
                  size="x-small"
                  fill-dot
                >
                  <div class="mb-4">
                    <div class="text-subtitle-2 font-weight-bold">
                      {{ historyItem.status.name }}
                    </div>
                    <div class="text-caption text-medium-emphasis">
                      {{ formatDateTime(historyItem.created_at) }}
                    </div>
                    <!-- <div class="text-body-2 mt-1">{{ historyItem.status.description }}</div> -->
                  </div>
                </v-timeline-item>
              </v-timeline>
              <div
                v-if="!sortedStatusHistory.length"
                class="text-center text-caption text-medium-emphasis pa-4"
              >
                Nenhum histórico disponível.
              </div>
            </div>
          </v-card>

          <!-- Feedbacks Card -->
          <v-card class="rounded-xl mt-4" elevation="1">
            <div class="px-6 py-4 border-b d-flex justify-space-between align-center">
              <h2 class="text-subtitle-1 font-weight-bold">Feedbacks</h2>
              <v-btn
                v-if="authStore.auth.email"
                color="primary"
                size="small"
                variant="flat"
                prepend-icon="mdi-plus"
                @click="openFeedbackDialog()"
              >
                Adicionar
              </v-btn>
            </div>

            <div class="px-6 py-4">
              <div
                v-if="!volunteer.feedbacks || volunteer.feedbacks.length === 0"
                class="text-center text-caption text-medium-emphasis py-4"
              >
                <v-icon
                  icon="mdi-message-text-outline"
                  size="large"
                  class="mb-2 text-disabled"
                ></v-icon>
                <div>Nenhum feedback ainda. Seja o primeiro!</div>
              </div>
              <v-list v-else lines="three" class="pa-0">
                <template v-for="(feedback, index) in volunteer.feedbacks" :key="feedback.id">
                  <v-list-item class="px-0">
                    <template #prepend>
                      <v-avatar color="grey-lighten-3" size="40" class="mr-3">
                        <span class="text-h6 font-weight-bold text-grey-darken-2">
                          {{ feedback.author_name ? feedback.author_name[0].toUpperCase() : '?' }}
                        </span>
                      </v-avatar>
                    </template>
                    <v-list-item-title class="text-body-2 font-weight-bold d-flex align-center">
                      {{ feedback.author_name }}
                      <v-btn
                        v-if="feedback.author_linkedin"
                        icon="mdi-linkedin"
                        size="x-small"
                        color="blue"
                        variant="text"
                        density="compact"
                        class="ml-1"
                        :href="feedback.author_linkedin"
                        target="_blank"
                      ></v-btn>
                      <span class="text-caption text-medium-emphasis ml-2">
                        {{ formatDateTime(feedback.created_at) }}
                      </span>
                    </v-list-item-title>
                    <v-list-item-subtitle
                      class="mt-2 text-body-2 text-high-emphasis"
                      style="white-space: pre-wrap"
                    >
                      {{ feedback.content }}
                    </v-list-item-subtitle>

                    <template v-if="canEdit(feedback)" #append>
                      <div class="d-flex gap-1">
                        <v-btn
                          icon="mdi-pencil"
                          size="small"
                          variant="text"
                          color="primary"
                          @click="editFeedback(feedback)"
                        ></v-btn>
                        <v-btn
                          icon="mdi-delete"
                          size="small"
                          variant="text"
                          color="error"
                          @click="confirmDelete(feedback)"
                        ></v-btn>
                      </div>
                    </template>
                  </v-list-item>
                  <v-divider v-if="index < volunteer.feedbacks.length - 1" class="my-2"></v-divider>
                </template>
              </v-list>
            </div>
          </v-card>

          <!-- Feedback Dialog -->
          <v-dialog v-model="feedbackDialog" max-width="500px">
            <v-card class="rounded-xl">
              <v-card-title class="text-h6 px-6 py-4 border-b">
                {{ feedbackForm.id ? 'Editar Feedback' : 'Novo Feedback' }}
              </v-card-title>
              <v-card-text class="pt-4 px-6">
                <v-textarea
                  v-model="feedbackForm.content"
                  label="Seu feedback"
                  placeholder="Escreva aqui seu feedback sobre o voluntário..."
                  variant="outlined"
                  rows="4"
                  auto-grow
                  :rules="[(v) => !!v || 'Campo obrigatório']"
                ></v-textarea>
              </v-card-text>
              <v-card-actions class="px-6 pb-4 pt-0 justify-end">
                <v-btn color="grey-darken-1" variant="text" @click="feedbackDialog = false"
                  >Cancelar</v-btn
                >
                <v-btn
                  color="primary"
                  variant="flat"
                  :loading="feedbackLoading"
                  :disabled="!feedbackForm.content"
                  @click="saveFeedback"
                  >Salvar</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- Delete Dialog -->
          <v-dialog v-model="deleteDialog" max-width="400px">
            <v-card class="rounded-xl">
              <v-card-title class="text-h6 px-6 py-4">Excluir Feedback?</v-card-title>
              <v-card-text class="px-6 pb-2">
                Tem certeza que deseja excluir este feedback? Esta ação não pode ser desfeita.
              </v-card-text>
              <v-card-actions class="px-6 pb-4 justify-end">
                <v-btn color="grey-darken-1" variant="text" @click="deleteDialog = false"
                  >Cancelar</v-btn
                >
                <v-btn
                  color="error"
                  variant="flat"
                  :loading="feedbackLoading"
                  @click="deleteFeedback"
                  >Excluir</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- Badge Dialog -->
          <v-dialog v-model="badgeDialog" max-width="500px">
            <v-card class="rounded-xl">
              <v-card-title class="text-h6 px-6 py-4 border-b">
                Atribuir Medalha (Badge)
              </v-card-title>
              <v-card-text class="pt-4 px-6">
                <v-form ref="badgeFormRef" v-model="badgeValid">
                  <v-text-field
                    v-model="badgeForm.title"
                    label="Título da Medalha"
                    placeholder="Ex: Super Colaborador, Mentor Destaque..."
                    variant="outlined"
                    :rules="[(v) => !!v || 'Campo obrigatório']"
                  ></v-text-field>
                  <v-textarea
                    v-model="badgeForm.description"
                    label="Descrição / Motivo"
                    placeholder="Explique por que o voluntário está recebendo esta medalha..."
                    variant="outlined"
                    rows="3"
                    auto-grow
                  ></v-textarea>
                </v-form>
              </v-card-text>
              <v-card-actions class="px-6 pb-4 pt-0 justify-end">
                <v-btn color="grey-darken-1" variant="text" @click="badgeDialog = false">Cancelar</v-btn>
                <v-btn
                  color="amber-darken-2"
                  variant="flat"
                  :loading="badgeLoading"
                  :disabled="!badgeValid"
                  @click="saveBadge"
                  >Atribuir</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- Delete Badge Dialog -->
          <v-dialog v-model="deleteBadgeDialog" max-width="400px">
            <v-card class="rounded-xl">
              <v-card-title class="text-h6 px-6 py-4">Excluir Medalha?</v-card-title>
              <v-card-text class="px-6 pb-2">
                Tem certeza que deseja remover esta medalha? Esta ação não pode ser desfeita.
              </v-card-text>
              <v-card-actions class="px-6 pb-4 justify-end">
                <v-btn color="grey-darken-1" variant="text" @click="deleteBadgeDialog = false">Cancelar</v-btn>
                <v-btn color="error" variant="flat" :loading="badgeLoading" @click="deleteBadge">Excluir</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import volunteerService from '@/services/volunteer.js'
import feedbackService from '@/services/feedback.js'
import badgeService from '@/services/badge.js'
import { useAuthStore } from '@/stores/auth.js'
import { formatDateTime } from '@/utils/date'

const route = useRoute()
const authStore = useAuthStore()
const volunteer = ref(null)
const error = ref(false)

// Feedback State
const feedbackDialog = ref(false)
const deleteDialog = ref(false)
const feedbackForm = ref({
  id: null,
  content: ''
})
const feedbackToDelete = ref(null)
const feedbackLoading = ref(false)

// Badge State
const badgeDialog = ref(false)
const deleteBadgeDialog = ref(false)
const badgeValid = ref(false)
const badgeLoading = ref(false)
const badgeFormRef = ref(null)
const badgeForm = ref({
  title: '',
  description: ''
})
const badgeToDelete = ref(null)

const canEdit = (feedback) => {
  return authStore.auth.email && feedback.author && authStore.auth.email === feedback.author.email
}

const canDeleteBadge = (badge) => {
  if (authStore.isAdmin()) return true
  return authStore.auth.email && badge.issuer && authStore.auth.email === badge.issuer.email
}

const saveBadge = async () => {
  const { valid } = await badgeFormRef.value.validate()
  if (!valid) return

  badgeLoading.value = true
  try {
    const newBadge = await badgeService.create(volunteer.value.id, {
      title: badgeForm.value.title,
      description: badgeForm.value.description,
      volunteer_id: volunteer.value.id
    })
    
    if (!volunteer.value.badges) volunteer.value.badges = []
    volunteer.value.badges.unshift(newBadge)
    
    badgeDialog.value = false
    badgeForm.value = { title: '', description: '' }
  } catch (e) {
    console.error('Error saving badge', e)
    alert('Erro ao atribuir medalha')
  } finally {
    badgeLoading.value = false
  }
}

const confirmDeleteBadge = (badge) => {
  badgeToDelete.value = badge
  deleteBadgeDialog.value = true
}

const deleteBadge = async () => {
  if (!badgeToDelete.value) return

  badgeLoading.value = true
  try {
    await badgeService.delete(badgeToDelete.value.id)
    volunteer.value.badges = volunteer.value.badges.filter(
      (b) => b.id !== badgeToDelete.value.id
    )
    deleteBadgeDialog.value = false
  } catch (e) {
    console.error('Error deleting badge', e)
    alert('Erro ao excluir medalha')
  } finally {
    badgeLoading.value = false
    badgeToDelete.value = null
  }
}

const openFeedbackDialog = () => {
  feedbackForm.value = { id: null, content: '' }
  feedbackDialog.value = true
}

const editFeedback = (feedback) => {
  feedbackForm.value = {
    id: feedback.id,
    content: feedback.content
  }
  feedbackDialog.value = true
}

const saveFeedback = async () => {
  if (!feedbackForm.value.content) return

  feedbackLoading.value = true
  try {
    if (feedbackForm.value.id) {
      // Update
      const updatedFeedback = await feedbackService.update(feedbackForm.value.id, {
        content: feedbackForm.value.content
      })
      const index = volunteer.value.feedbacks.findIndex((f) => f.id === updatedFeedback.id)
      if (index !== -1) {
        // Update local state, keeping author info
        volunteer.value.feedbacks[index] = {
          ...volunteer.value.feedbacks[index],
          ...updatedFeedback
        }
      }
    } else {
      // Create
      const newFeedback = await feedbackService.create(volunteer.value.id, {
        content: feedbackForm.value.content
      })
      // The backend returns the created feedback. We might need to manually add the author info
      // if the backend response doesn't include the full user object immediately (it returns FeedbackRead which has author)
      // FeedbackRead has author: Optional[UserBase]. Backend creates it and returns it.
      // In create_feedback crud, it returns db_feedback.
      // Does db_feedback have author loaded? No, create_feedback just refreshes db_feedback.
      // But author relation is lazy loaded or not loaded unless accessed.
      // Pydantic validation reads attributes.
      // If I return the Pydantic model, it will try to read author.
      // If it's not eager loaded, it will fetch it.
      // So it should work.

      // However, to be safe and ensure reactivity:
      if (!volunteer.value.feedbacks) volunteer.value.feedbacks = []
      volunteer.value.feedbacks.unshift(newFeedback)
    }
    feedbackDialog.value = false
  } catch (e) {
    console.error('Error saving feedback', e)
    alert('Erro ao salvar feedback')
  } finally {
    feedbackLoading.value = false
  }
}

const confirmDelete = (feedback) => {
  feedbackToDelete.value = feedback
  deleteDialog.value = true
}

const deleteFeedback = async () => {
  if (!feedbackToDelete.value) return

  feedbackLoading.value = true
  try {
    await feedbackService.delete(feedbackToDelete.value.id)
    volunteer.value.feedbacks = volunteer.value.feedbacks.filter(
      (f) => f.id !== feedbackToDelete.value.id
    )
    deleteDialog.value = false
  } catch (e) {
    console.error('Error deleting feedback', e)
    alert('Erro ao excluir feedback')
  } finally {
    feedbackLoading.value = false
    feedbackToDelete.value = null
  }
}

const sortedStatusHistory = computed(() => {
  if (volunteer.value && volunteer.value.status_history) {
    return [...volunteer.value.status_history].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    )
  }
  return []
})

const fetchVolunteer = async (id) => {
  if (!id) return
  volunteer.value = null
  error.value = false
  try {
    volunteer.value = await volunteerService.getPublicProfile(id)
  } catch (e) {
    console.error(e)
    error.value = true
  }
}

onMounted(() => {
  fetchVolunteer(route.params.id)
})

watch(() => route.params.id, (newId) => {
  fetchVolunteer(newId)
})

const getStatusColor = (statusName) => {
  switch (statusName) {
    case 'INTERESTED':
      return 'warning'
    case 'CONTACTED':
      return 'info'
    case 'SCREENING':
      return 'deep-purple'
    case 'ACTIVE':
      return 'success'
    case 'INACTIVE':
      return 'error'
    default:
      return 'grey'
  }
}

const getInitials = (name) => {
  if (!name) return ''
  const parts = name.split(' ')
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
  // TODO: Add feedback (toast/snackbar)
}
</script>

<style scoped>
.bg-gradient-primary {
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
}
.banner-gradient {
  background: linear-gradient(to right, #e0e0e0, #f5f5f5);
}
.v-theme--dark .banner-gradient {
  background: linear-gradient(to right, #333333, #424242);
}
.gap-2 {
  gap: 8px;
}
.gap-3 {
  gap: 12px;
}
.gap-4 {
  gap: 16px;
}
.border-4 {
  border-width: 4px !important;
}
.border-surface {
  border-color: rgb(var(--v-theme-surface)) !important;
}
.border-b {
  border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}
:deep(.v-timeline--vertical.v-timeline) {
  height: auto;
}
:deep(.v-list-item__prepend) {
  margin-right: 0 !important;
}
</style>
