<template>
  <v-container>
    <div v-if="currentVolunteer">
      <div class="d-flex align-center mb-6">
        <v-btn icon="mdi-arrow-left" variant="text" class="mr-2" @click="$router.back()"></v-btn>
        <h1 class="text-h4">Detalhes do Voluntário</h1>
      </div>

      <v-row>
        <!-- Informações Pessoais -->
        <v-col cols="12" md="6">
          <v-card class="h-100" elevation="2">
            <v-card-item>
              <v-card-title class="text-h5 mb-1">{{ currentVolunteer.name }}</v-card-title>
              <v-card-subtitle class="mb-4">Informações de Contato e Cargo</v-card-subtitle>
            </v-card-item>

            <v-card-text>
              <v-list density="compact" bg-color="transparent">
                <v-list-item class="px-0">
                  <template #prepend>
                    <v-icon icon="mdi-email" color="primary"></v-icon>
                  </template>
                  <v-list-item-title>{{ currentVolunteer.email }}</v-list-item-title>
                  <v-list-item-subtitle>Email</v-list-item-subtitle>
                </v-list-item>

                <v-list-item class="px-0">
                  <template #prepend>
                    <v-icon icon="mdi-phone" :color="currentVolunteer.phone ? 'green-darken-1' : 'grey'"></v-icon>
                  </template>
                  <v-list-item-title>
                    <a
                      v-if="currentVolunteer.phone"
                      :href="`https://wa.me/${currentVolunteer.phone.replace(/\D/g, '')}`"
                      target="_blank"
                      class="text-decoration-none text-primary"
                    >
                      {{ currentVolunteer.phone }}
                    </a>
                    <span v-else class="text-medium-emphasis">sem dados</span>
                  </v-list-item-title>
                  <v-list-item-subtitle>Telefone / WhatsApp</v-list-item-subtitle>
                </v-list-item>

                <v-list-item class="px-0">
                  <template #prepend>
                    <v-icon icon="mdi-linkedin" :color="currentVolunteer.linkedin ? 'blue-darken-1' : 'grey'"></v-icon>
                  </template>
                  <v-list-item-title>
                    <a
                      v-if="currentVolunteer.linkedin"
                      :href="currentVolunteer.linkedin"
                      target="_blank"
                      class="text-decoration-none text-primary"
                    >
                      {{ currentVolunteer.linkedin }}
                    </a>
                    <span v-else class="text-medium-emphasis">sem dados</span>
                  </v-list-item-title>
                  <v-list-item-subtitle>LinkedIn</v-list-item-subtitle>
                </v-list-item>

                <v-list-item class="px-0">
                  <template #prepend>
                    <v-icon icon="mdi-github" :color="currentVolunteer.github ? 'grey-darken-3' : 'grey'"></v-icon>
                  </template>
                  <v-list-item-title>
                    <a
                      v-if="currentVolunteer.github"
                      :href="currentVolunteer.github"
                      target="_blank"
                      class="text-decoration-none text-primary"
                    >
                      {{ currentVolunteer.github }}
                    </a>
                    <span v-else class="text-medium-emphasis">sem dados</span>
                  </v-list-item-title>
                  <v-list-item-subtitle>GitHub</v-list-item-subtitle>
                </v-list-item>

                <v-list-item class="px-0">
                  <template #prepend>
                    <v-icon icon="fa:fab fa-discord" :color="currentVolunteer.discord ? 'indigo-lighten-1' : 'grey'"></v-icon>
                  </template>
                  <v-list-item-title>
                    <span v-if="currentVolunteer.discord">{{ currentVolunteer.discord }}</span>
                    <span v-else class="text-medium-emphasis">sem dados</span>
                  </v-list-item-title>
                  <v-list-item-subtitle>Discord</v-list-item-subtitle>
                </v-list-item>

                <v-list-item class="px-0">
                  <template #prepend>
                    <v-icon icon="mdi-briefcase" :color="currentVolunteer.jobtitle ? 'grey-darken-1' : 'grey'"></v-icon>
                  </template>
                  <v-list-item-title>
                    <span v-if="currentVolunteer.jobtitle">{{ currentVolunteer.jobtitle.title }}</span>
                    <span v-else class="text-medium-emphasis">sem dados</span>
                  </v-list-item-title>
                  <v-list-item-subtitle>Cargo</v-list-item-subtitle>
                </v-list-item>

                <v-list-item class="px-0">
                  <template #prepend>
                    <v-icon icon="mdi-list-status" color="grey-darken-1"></v-icon>
                  </template>
                  <v-list-item-title class="d-flex align-center">
                    <v-chip
                      v-if="currentVolunteer.status"
                      :color="getStatusColor(currentVolunteer.status.name)"
                      size="small"
                      class="font-weight-bold"
                      variant="flat"
                    >
                      {{ currentVolunteer.status.name }}
                    </v-chip>
                    <span v-else class="text-body-2 text-medium-emphasis"
                      >Não tem dados de histórico de status</span
                    >
                  </v-list-item-title>
                  <v-list-item-subtitle>Status Atual</v-list-item-subtitle>
                </v-list-item>

                <v-list-item class="px-0">
                  <template #prepend>
                    <v-icon icon="mdi-account-group" :color="currentVolunteer.squad ? 'grey-darken-1' : 'grey'"></v-icon>
                  </template>
                  <v-list-item-title>
                    <span v-if="currentVolunteer.squad">{{ currentVolunteer.squad.name }}</span>
                    <span v-else class="text-medium-emphasis">sem dados</span>
                  </v-list-item-title>
                  <v-list-item-subtitle>Squad</v-list-item-subtitle>
                </v-list-item>

                <v-list-item class="px-0">
                  <template #prepend>
                    <v-icon icon="mdi-layers" :color="currentVolunteer.verticals && currentVolunteer.verticals.length > 0 ? 'indigo' : 'grey'"></v-icon>
                  </template>
                  <v-list-item-title class="d-flex flex-wrap gap-2">
                    <template v-if="currentVolunteer.verticals && currentVolunteer.verticals.length > 0">
                      <v-chip
                        v-for="vertical in currentVolunteer.verticals"
                        :key="vertical.id"
                        size="small"
                        color="indigo-lighten-4"
                        text-color="indigo-darken-4"
                        label
                      >
                        {{ vertical.name }}
                      </v-chip>
                    </template>
                    <span v-else class="text-medium-emphasis">sem dados</span>
                  </v-list-item-title>
                  <v-list-item-subtitle>Verticais</v-list-item-subtitle>
                </v-list-item>

                <v-list-item class="px-0">
          <template #prepend>
            <v-icon
              icon="mdi-heart"
              :color="currentVolunteer.is_apoiase_supporter ? 'pink' : 'grey'"
            ></v-icon>
          </template>
          <v-list-item-title class="d-flex align-center">
            <span
              v-if="currentVolunteer.is_apoiase_supporter"
              class="text-pink font-weight-bold"
              >Apoiador APOIA.se</span
            >
            <span v-else>Não é apoiador</span>
            <v-btn
              v-if="authStore.isHead()"
              icon="mdi-refresh"
              size="x-small"
              variant="text"
              color="primary"
              class="ml-2"
              :loading="isCheckingApoiase"
              title="Verificar status APOIA.se"
              @click="checkApoiaseStatus"
            ></v-btn>
          </v-list-item-title>
          <v-list-item-subtitle>Status de Apoio</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</v-col>

<!-- Gerenciar Status -->
<v-col v-if="authStore.isHead()" cols="12" md="6">
  <v-card class="h-100" elevation="2">
    <v-card-item>
      <v-card-title class="text-h6">Gerenciar Status</v-card-title>
    </v-card-item>
    <v-card-text>
      <p class="text-body-2 mb-4">Atualize o status do voluntário no processo seletivo.</p>
      <v-select
        v-model="selectedStatusId"
        :items="statuses"
        item-title="name"
        item-value="id"
        label="Selecione o novo status"
        variant="outlined"
        color="primary"
        hide-details
        :loading="isLoadingStatus"
        :disabled="isLoadingStatus"
        @update:model-value="updateVolunteerStatus"
      ></v-select>
    </v-card-text>
  </v-card>
</v-col>

<!-- Gerenciar Squad -->
<v-col v-if="authStore.isHead()" cols="12" md="6">
  <v-card class="h-100" elevation="2">
    <v-card-item>
      <v-card-title class="text-h6">Gerenciar Squad</v-card-title>
    </v-card-item>
    <v-card-text>
      <p class="text-body-2 mb-4">Atualize a Squad do voluntário.</p>
      <v-select
        v-model="selectedSquadId"
        :items="squads"
        item-title="name"
        item-value="id"
        label="Selecione a nova Squad"
        variant="outlined"
        color="primary"
        hide-details
        :loading="isLoadingSquad"
        :disabled="isLoadingSquad"
        @update:model-value="updateVolunteerSquad"
      ></v-select>
    </v-card-text>
  </v-card>
</v-col>

<!-- Gerenciar Cargo -->
<v-col v-if="authStore.isHead()" cols="12" md="6">
  <v-card class="h-100" elevation="2">
    <v-card-item>
      <v-card-title class="text-h6">Gerenciar Cargo</v-card-title>
    </v-card-item>
    <v-card-text>
      <p class="text-body-2 mb-4">Atualize o cargo do voluntário.</p>
      <v-select
        v-model="selectedJobTitleId"
        :items="jobTitles"
        item-title="title"
        item-value="id"
        label="Selecione o novo cargo"
        variant="outlined"
        color="primary"
        hide-details
        :loading="isLoadingJobTitle"
        :disabled="isLoadingJobTitle"
        @update:model-value="updateVolunteerJobTitle"
      ></v-select>
    </v-card-text>
  </v-card>
</v-col>

<!-- Gerenciar Tipo de Voluntário -->
<v-col v-if="authStore.isHead()" cols="12" md="6">
  <v-card class="h-100" elevation="2">
    <v-card-item>
      <v-card-title class="text-h6">Gerenciar Tipo</v-card-title>
    </v-card-item>
    <v-card-text>
      <p class="text-body-2 mb-4">Atualize o nível/tipo do voluntário.</p>
      <v-select
        v-model="selectedTypeId"
        :items="volunteerTypes"
        item-title="name"
        item-value="id"
        label="Selecione o novo tipo"
        variant="outlined"
        color="primary"
        hide-details
        :loading="isLoadingType"
        :disabled="isLoadingType"
        @update:model-value="updateVolunteerType"
      ></v-select>
    </v-card-text>
  </v-card>
</v-col>

<!-- Gerenciar Verticais -->
<v-col v-if="authStore.isHead()" cols="12" md="6">
  <v-card class="h-100" elevation="2">
    <v-card-item>
      <v-card-title class="text-h6">Gerenciar Verticais</v-card-title>
    </v-card-item>
    <v-card-text>
      <p class="text-body-2 mb-4">Atualize as verticais do voluntário.</p>
      <v-select
        v-model="selectedVerticalIds"
        :items="verticals"
        item-title="name"
        item-value="id"
        label="Selecione as verticais"
        variant="outlined"
        color="primary"
        hide-details
        multiple
        chips
        :loading="isLoadingVerticals"
        :disabled="isLoadingVerticals"
        @update:model-value="updateVolunteerVerticals"
      ></v-select>
    </v-card-text>
  </v-card>
</v-col>

<!-- Gerenciar Certificados -->
<v-col cols="12" md="6">
  <v-card class="h-100" elevation="2">
    <v-card-item>
      <v-card-title class="text-h6">Gerenciar Certificados</v-card-title>
    </v-card-item>
    <v-card-text>
      <p v-if="authStore.isHead()" class="text-body-2 mb-4">Emita um novo certificado para o voluntário.</p>
      <v-btn v-if="authStore.isHead()" color="primary" @click="certificateDialog = true">Emitir Certificado</v-btn>

      <v-list class="mt-4">
        <v-list-item
          v-for="certificate in currentVolunteer.certificates"
          :key="certificate.id"
          :to="{ name: 'certificate', params: { id: certificate.id } }"
        >
          <v-list-item-title>Certificado de {{ certificate.hours }} horas</v-list-item-title>
          <v-list-item-subtitle>
            Emitido em: {{ formatDateTime(certificate.issued_at) }}
            <v-chip v-if="certificate.is_cancelled" color="error" size="x-small" class="ml-2">Cancelado</v-chip>
          </v-list-item-subtitle>
          <template #append>
            <v-btn
              v-if="!certificate.is_cancelled && authStore.isHead()"
              icon="mdi-delete"
              size="small"
              variant="text"
              color="error"
              @click.prevent="confirmCancelCertificate(certificate)"
            ></v-btn>
          </template>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</v-col>

<!-- Gerenciar Badges -->
<v-col cols="12" md="6">
  <v-card class="h-100" elevation="2">
    <v-card-item>
      <v-card-title class="text-h6">Badges (Medalhas)</v-card-title>
    </v-card-item>
    <v-card-text>
      <p v-if="authStore.isMentor()" class="text-body-2 mb-4">Atribua uma nova medalha para reconhecer o voluntário.</p>
      <v-btn v-if="authStore.isMentor()" color="amber-darken-2" prepend-icon="mdi-medal" @click="badgeDialog = true">Atribuir Badge</v-btn>

      <div v-if="!currentVolunteer.badges || currentVolunteer.badges.length === 0" class="text-center text-caption text-medium-emphasis py-4">
        Nenhuma medalha atribuída ainda.
      </div>
      <v-list v-else class="mt-4">
        <v-list-item
          v-for="badge in currentVolunteer.badges"
          :key="badge.id"
        >
          <template #prepend>
            <v-icon icon="mdi-medal" color="amber-darken-2" size="large"></v-icon>
          </template>
          <v-list-item-title class="font-weight-bold">{{ badge.title }}</v-list-item-title>
          <v-list-item-subtitle>
            {{ badge.description }}
          </v-list-item-subtitle>
          <v-list-item-subtitle class="text-caption mt-1">
            Concedida por: {{ badge.issuer_name }} em {{ formatDateTime(badge.created_at) }}
          </v-list-item-subtitle>
          <template #append>
            <v-btn
              v-if="canDeleteBadge(badge)"
              icon="mdi-delete"
              size="small"
              variant="text"
              color="error"
              @click.prevent="confirmDeleteBadge(badge)"
            ></v-btn>
          </template>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</v-col>

<!-- Gerenciar Mentoria -->
<v-col v-if="authStore.isHead()" cols="12" md="6">
  <v-card class="h-100" elevation="2">
    <v-card-item>
      <v-card-title class="text-h6">
        {{ isMentorView ? 'Mentorados' : 'Mentores' }}
      </v-card-title>
    </v-card-item>
    <v-card-text>
      <p class="text-body-2 mb-4">
        {{ isMentorView ? 'Gerencie os voluntários orientados por este mentor.' : 'Gerencie os mentores deste voluntário.' }}
      </p>
      
      <v-btn color="secondary" prepend-icon="mdi-account-plus" @click="mentorshipDialog = true">
        {{ isMentorView ? 'Adicionar Mentorado' : 'Adicionar Mentor' }}
      </v-btn>

      <v-list class="mt-4">
        <v-list-item
          v-for="person in (isMentorView ? currentVolunteer.mentees : currentVolunteer.mentors)"
          :key="person.id"
          :to="{ name: 'volunteer-details', params: { id: person.id } }"
        >
          <template #prepend>
            <v-icon icon="mdi-account"></v-icon>
          </template>
          <v-list-item-title>{{ person.name }}</v-list-item-title>
          <template #append>
            <v-btn
              icon="mdi-delete"
              size="small"
              variant="text"
              color="error"
              @click.prevent="removeMentorship(person.id)"
            ></v-btn>
          </template>
        </v-list-item>
        <div v-if="!(isMentorView ? currentVolunteer.mentees?.length : currentVolunteer.mentors?.length)" class="text-center text-caption text-medium-emphasis py-2">
          Nenhuma relação de mentoria encontrada.
        </div>
      </v-list>
    </v-card-text>
  </v-card>
</v-col>

        <!-- Histórico -->
        <v-col cols="12">
          <v-card elevation="2">
            <v-card-item>
              <v-card-title class="text-h6">Histórico de Alterações</v-card-title>
            </v-card-item>
            <v-card-text>
              <v-timeline
                v-if="sortedStatusHistory && sortedStatusHistory.length > 0"
                density="compact"
                align="start"
              >
                <v-timeline-item
                  v-for="historyItem in sortedStatusHistory"
                  :key="historyItem.id"
                  :dot-color="getStatusColor(historyItem.status.name)"
                  size="small"
                >
                  <div class="d-flex flex-column">
                    <div class="d-flex align-center">
                      <strong class="mr-2">{{ historyItem.status.name }}</strong>
                      <span class="text-caption text-medium-emphasis">{{
                        formatDateTime(historyItem.created_at)
                      }}</span>
                    </div>
                    <div class="text-body-2 text-medium-emphasis mt-1">
                      {{ historyItem.status.description }}
                    </div>
                  </div>
                </v-timeline-item>
              </v-timeline>
              <v-alert v-else type="info" variant="tonal" class="mt-2">
                Nenhum histórico de status encontrado para este voluntário.
              </v-alert>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Feedbacks -->
        <v-col cols="12">
          <v-card elevation="2">
            <v-card-item class="d-flex justify-space-between align-center">
              <div class="d-flex justify-space-between w-100 align-center">
                <v-card-title class="text-h6">Feedbacks</v-card-title>
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
            </v-card-item>
            <v-card-text>
              <div
                v-if="!currentVolunteer.feedbacks || currentVolunteer.feedbacks.length === 0"
                class="text-center text-caption text-medium-emphasis py-4"
              >
                <v-icon
                  icon="mdi-message-text-outline"
                  size="large"
                  class="mb-2 text-disabled"
                ></v-icon>
                <div>Nenhum feedback ainda.</div>
              </div>
              <v-list v-else lines="three" class="pa-0">
                <template
                  v-for="(feedback, index) in currentVolunteer.feedbacks"
                  :key="feedback.id"
                >
                  <v-list-item class="px-0">
                    <template #prepend>
                      <v-avatar color="grey-lighten-3" size="40" class="mr-3">
                        <span class="text-h6 font-weight-bold text-grey-darken-2">
                          {{ feedback.author?.email?.[0]?.toUpperCase() || '?' }}
                        </span>
                      </v-avatar>
                    </template>
                    <v-list-item-title class="text-body-2 font-weight-bold">
                      {{ feedback.author?.email }}
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
                  <v-divider
                    v-if="index < currentVolunteer.feedbacks.length - 1"
                    class="my-2"
                  ></v-divider>
                </template>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Feedback Dialog -->
      <v-dialog v-model="feedbackDialog" max-width="500px">
        <v-card class="rounded-lg">
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
        <v-card class="rounded-lg">
          <v-card-title class="text-h6 px-6 py-4">Excluir Feedback?</v-card-title>
          <v-card-text class="px-6 pb-2">
            Tem certeza que deseja excluir este feedback? Esta ação não pode ser desfeita.
          </v-card-text>
          <v-card-actions class="px-6 pb-4 justify-end">
            <v-btn color="grey-darken-1" variant="text" @click="deleteDialog = false">Cancelar</v-btn>
            <v-btn color="error" variant="flat" :loading="feedbackLoading" @click="deleteFeedback">Excluir</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Certificate Dialog -->
      <v-dialog v-model="certificateDialog" max-width="500px">
        <v-card class="rounded-lg">
          <v-card-title class="text-h6 px-6 py-4 border-b">
            Emitir Certificado
          </v-card-title>
          <v-card-text class="pt-4 px-6">
            <v-form ref="certificateForm" v-model="certificateValid">
              <v-text-field
                v-model.number="certificateHours"
                label="Horas"
                type="number"
                :rules="[v => !!v || 'Horas é obrigatório', v => v > 0 || 'Horas deve ser maior que 0']"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="px-6 pb-4 pt-0 justify-end">
            <v-btn color="grey-darken-1" variant="text" @click="certificateDialog = false">Cancelar</v-btn>
            <v-btn
              color="primary"
              variant="flat"
              :loading="certificateLoading"
              @click="createCertificate"
            >Emitir</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Cancel Certificate Dialog -->
      <v-dialog v-model="cancelCertificateDialog" max-width="400px">
        <v-card class="rounded-lg">
          <v-card-title class="text-h6 px-6 py-4">Cancelar Certificado?</v-card-title>
          <v-card-text class="px-6 pb-2">
            Tem certeza que deseja cancelar este certificado? Esta ação não pode ser desfeita.
          </v-card-text>
          <v-card-actions class="px-6 pb-4 justify-end">
            <v-btn color="grey-darken-1" variant="text" @click="cancelCertificateDialog = false">Voltar</v-btn>
            <v-btn color="error" variant="flat" :loading="certificateLoading" @click="cancelCertificate">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Badge Dialog -->
      <v-dialog v-model="badgeDialog" max-width="500px">
        <v-card class="rounded-lg">
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
        <v-card class="rounded-lg">
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

      <!-- Mentorship Dialog -->
      <v-dialog v-model="mentorshipDialog" max-width="500px">
        <v-card class="rounded-lg">
          <v-card-title class="text-h6 px-6 py-4 border-b">
            {{ isMentorView ? 'Adicionar Mentorado' : 'Adicionar Mentor' }}
          </v-card-title>
          <v-card-text class="pt-4 px-6">
            <v-text-field
              v-model="mentorshipSearch"
              label="Buscar Voluntário por nome"
              placeholder="Digite ao menos 3 caracteres..."
              variant="outlined"
              append-inner-icon="mdi-magnify"
              hide-details
              class="mb-4"
              @update:model-value="searchVolunteersForMentorship"
            ></v-text-field>

            <v-list v-if="mentorshipResults.length > 0" class="border rounded">
              <v-list-item
                v-for="volunteer in mentorshipResults"
                :key="volunteer.id"
                @click="addMentorship(volunteer.id)"
              >
                <v-list-item-title>{{ volunteer.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ volunteer.email }}</v-list-item-subtitle>
                <template #append>
                  <v-btn icon="mdi-plus" variant="text" size="small" color="success"></v-btn>
                </template>
              </v-list-item>
            </v-list>
            <div v-else-if="mentorshipSearch.length >= 3 && !isSearchingMentorship" class="text-center py-4 text-medium-emphasis">
              Nenhum voluntário encontrado.
            </div>
            <div v-else-if="isSearchingMentorship" class="text-center py-4">
              <v-progress-circular indeterminate size="24" color="primary"></v-progress-circular>
            </div>
          </v-card-text>
          <v-card-actions class="px-6 pb-4 pt-0 justify-end">
            <v-btn color="grey-darken-1" variant="text" @click="mentorshipDialog = false">Fechar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <div v-else class="d-flex justify-center align-center w-100" style="min-height: 400px">
      <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useVolunteerStore } from '@/stores/volunteer.js'
import { useSquadStore } from '@/stores/squad.js'
import { useVolunteerTypeStore } from '@/stores/volunteerType.js'
import { useVerticalStore } from '@/stores/vertical.js'
import { useJobtitleStore } from '@/stores/jobtitle.js'
import volunteerService from '@/services/volunteer.js'
import feedbackService from '@/services/feedback.js'
import certificateService from '@/services/certificate.js'
import badgeService from '@/services/badge.js'
import { useAuthStore } from '@/stores/auth.js'
import { formatDateTime } from '@/utils/date'

const route = useRoute()
const volunteerStore = useVolunteerStore()
const squadStore = useSquadStore()
const volunteerTypeStore = useVolunteerTypeStore()
const verticalStore = useVerticalStore()
const jobtitleStore = useJobtitleStore()
const authStore = useAuthStore()

const selectedStatusId = ref(null)
const selectedSquadId = ref(null)
const selectedTypeId = ref(null)
const selectedJobTitleId = ref(null)
const selectedVerticalIds = ref([])
const isLoadingStatus = ref(false)
const isLoadingSquad = ref(false)
const isLoadingType = ref(false)
const isLoadingJobTitle = ref(false)
const isLoadingVerticals = ref(false)
const isCheckingApoiase = ref(false)

// Certificate State
const certificateDialog = ref(false)
const certificateForm = ref(null)
const certificateValid = ref(false)
const certificateHours = ref(null)
const certificateLoading = ref(false)
const cancelCertificateDialog = ref(false)
const certificateToCancel = ref(null)

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

// Mentorship State
const mentorshipDialog = ref(false)
const mentorshipSearch = ref('')
const mentorshipResults = ref([])
const isSearchingMentorship = ref(false)
const mentorshipLoading = ref(false)
const isMentorView = computed(() => currentVolunteer.value?.volunteer_type?.name === 'Mentor')

const searchVolunteersForMentorship = async () => {
  if (!mentorshipSearch.value || mentorshipSearch.value.length < 3) {
    mentorshipResults.value = []
    return
  }
  
  isSearchingMentorship.value = true
  try {
    const params = { name: mentorshipSearch.value }
    // 1 is Junior, 2 is Mentor based on DB seed
    if (isMentorView.value) {
      params.volunteer_type_id = 1 // Looking for Juniors to mentor
    } else {
      params.volunteer_type_id = 2 // Looking for Mentors
    }

    const results = await volunteerService.fetchAll(params)
    // Filter out already related or self, and ensure they are ACTIVE
    const relatedIds = isMentorView.value 
      ? (currentVolunteer.value.mentees || []).map(m => m.id)
      : (currentVolunteer.value.mentors || []).map(m => m.id)
    
    mentorshipResults.value = results.filter(v => {
      const isSelf = v.id === currentVolunteer.value.id
      const isRelated = relatedIds.includes(v.id)
      const isActive = v.status?.name === 'ACTIVE'
      return !isSelf && !isRelated && isActive
    })
  } catch (e) {
    console.error('Error searching volunteers', e)
  } finally {
    isSearchingMentorship.value = false
  }
}

const addMentorship = async (otherId) => {
  mentorshipLoading.value = true
  try {
    const mentorId = isMentorView.value ? currentVolunteer.value.id : otherId
    const menteeId = isMentorView.value ? otherId : currentVolunteer.value.id
    
    const updatedVolunteer = await volunteerStore.addMentee(mentorId, menteeId)
    
    // Update local state
    if (isMentorView.value) {
      if (!currentVolunteer.value.mentees) currentVolunteer.value.mentees = []
      // We need the full object or at least ID/Name from the results
      const selected = mentorshipResults.value.find(v => v.id === otherId)
      currentVolunteer.value.mentees.push({ id: selected.id, name: selected.name })
    } else {
      if (!currentVolunteer.value.mentors) currentVolunteer.value.mentors = []
      const selected = mentorshipResults.value.find(v => v.id === otherId)
      currentVolunteer.value.mentors.push({ id: selected.id, name: selected.name })
    }
    
    mentorshipDialog.value = false
    mentorshipSearch.value = ''
    mentorshipResults.value = []
  } catch (e) {
    console.error('Error adding mentorship', e)
    alert('Erro ao adicionar mentoria')
  } finally {
    mentorshipLoading.value = false
  }
}

const removeMentorship = async (otherId) => {
  if (!confirm('Tem certeza que deseja remover esta relação de mentoria?')) return
  
  mentorshipLoading.value = true
  try {
    const mentorId = isMentorView.value ? currentVolunteer.value.id : otherId
    const menteeId = isMentorView.value ? otherId : currentVolunteer.value.id
    
    await volunteerStore.removeMentee(mentorId, menteeId)
    
    // Update local state
    if (isMentorView.value) {
      currentVolunteer.value.mentees = currentVolunteer.value.mentees.filter(m => m.id !== otherId)
    } else {
      currentVolunteer.value.mentors = currentVolunteer.value.mentors.filter(m => m.id !== otherId)
    }
  } catch (e) {
    console.error('Error removing mentorship', e)
    alert('Erro ao remover mentoria')
  } finally {
    mentorshipLoading.value = false
  }
}

const canEdit = (feedback) => {
  if (authStore.isAdmin()) return true
  return authStore.auth.email && feedback.author && authStore.auth.email === feedback.author.email
}

const canDeleteBadge = (badge) => {
  if (authStore.isAdmin()) return true
  // In the real app, we should check if the current user is the issuer
  // For now, if we have the issuer info, we can compare emails
  return authStore.auth.email && badge.issuer && authStore.auth.email === badge.issuer.email
}

const saveBadge = async () => {
  const { valid } = await badgeFormRef.value.validate()
  if (!valid) return

  badgeLoading.value = true
  try {
    const newBadge = await badgeService.create(currentVolunteer.value.id, {
      title: badgeForm.value.title,
      description: badgeForm.value.description,
      volunteer_id: currentVolunteer.value.id
    })
    
    if (!currentVolunteer.value.badges) currentVolunteer.value.badges = []
    currentVolunteer.value.badges.unshift(newBadge)
    
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
    currentVolunteer.value.badges = currentVolunteer.value.badges.filter(
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
      const index = currentVolunteer.value.feedbacks.findIndex((f) => f.id === updatedFeedback.id)
      if (index !== -1) {
        // Update local state, keeping author info
        currentVolunteer.value.feedbacks[index] = {
          ...currentVolunteer.value.feedbacks[index],
          ...updatedFeedback
        }
      }
    } else {
      // Create
      const newFeedback = await feedbackService.create(currentVolunteer.value.id, {
        content: feedbackForm.value.content
      })
      if (!currentVolunteer.value.feedbacks) currentVolunteer.value.feedbacks = []
      currentVolunteer.value.feedbacks.unshift(newFeedback)
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
    currentVolunteer.value.feedbacks = currentVolunteer.value.feedbacks.filter(
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

const createCertificate = async () => {
  const { valid } = await certificateForm.value.validate()

  if (valid) {
    certificateLoading.value = true
    try {
      const certificate = await certificateService.create(currentVolunteer.value.id, {
        volunteer_id: currentVolunteer.value.id,
        hours: certificateHours.value
      })
      
      if (!currentVolunteer.value.certificates) {
        currentVolunteer.value.certificates = []
      }
      currentVolunteer.value.certificates.push(certificate)

      certificateDialog.value = false
      certificateHours.value = null
    } catch (error) {
      console.error(error)
      // TODO: show error to user
    } finally {
      certificateLoading.value = false
    }
  }
}

const confirmCancelCertificate = (certificate) => {
  certificateToCancel.value = certificate
  cancelCertificateDialog.value = true
}

const cancelCertificate = async () => {
  if (!certificateToCancel.value) return

  certificateLoading.value = true
  try {
    await certificateService.cancel(certificateToCancel.value.id)
    const index = currentVolunteer.value.certificates.findIndex(
      (c) => c.id === certificateToCancel.value.id
    )
    if (index !== -1) {
      currentVolunteer.value.certificates[index].is_cancelled = true
    }
    cancelCertificateDialog.value = false
  } catch (error) {
    console.error(error)
    // TODO: show error to user
  } finally {
    certificateLoading.value = false
    certificateToCancel.value = null
  }
}

const currentVolunteer = computed(() => volunteerStore.currentVolunteer)
const statuses = computed(() => volunteerStore.statuses)
const squads = computed(() => squadStore.squads)
const volunteerTypes = computed(() => volunteerTypeStore.data)
const verticals = computed(() => verticalStore.data)
const jobTitles = computed(() => jobtitleStore.data)

const sortedStatusHistory = computed(() => {
  if (currentVolunteer.value && currentVolunteer.value.status_history) {
    return [...currentVolunteer.value.status_history].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    )
  }
  return []
})

const fetchData = async () => {
  const volunteerId = route.params.id
  if (!volunteerId) return

  // Clear current volunteer to avoid showing stale data
  volunteerStore.currentVolunteer = null

  await Promise.all([
    volunteerStore.fetchStatuses(),
    squadStore.fetchAllSquads(),
    volunteerTypeStore.fetchVolunteerTypes(),
    verticalStore.fetchVerticals(),
    jobtitleStore.fetchJobtitles(),
    volunteerStore.fetchVolunteer(volunteerId)
  ])

  if (currentVolunteer.value) {
    selectedStatusId.value = currentVolunteer.value.status_id
    selectedSquadId.value = currentVolunteer.value.squad_id
    selectedTypeId.value = currentVolunteer.value.volunteer_type_id
    selectedJobTitleId.value = currentVolunteer.value.jobtitle_id
    selectedVerticalIds.value = currentVolunteer.value.verticals
      ? currentVolunteer.value.verticals.map((v) => v.id)
      : []
  }
}

onMounted(fetchData)

// Watch for ID changes to refetch data when navigating between volunteers
watch(() => route.params.id, (newId) => {
  if (newId) {
    fetchData()
  }
})

const checkApoiaseStatus = async () => {
  if (!currentVolunteer.value) return

  isCheckingApoiase.value = true
  try {
    await volunteerStore.checkApoiaseStatus(currentVolunteer.value.id)
  } finally {
    isCheckingApoiase.value = false
  }
}

const updateVolunteerStatus = async () => {
  if (
    selectedStatusId.value &&
    currentVolunteer.value &&
    selectedStatusId.value !== currentVolunteer.value.status_id
  ) {
    isLoadingStatus.value = true
    try {
      await volunteerStore.updateVolunteerStatus(currentVolunteer.value.id, selectedStatusId.value)
    } finally {
      isLoadingStatus.value = false
    }
  }
}

const updateVolunteerSquad = async () => {
  if (
    selectedSquadId.value &&
    currentVolunteer.value &&
    selectedSquadId.value !== currentVolunteer.value.squad_id
  ) {
    isLoadingSquad.value = true
    try {
      await volunteerStore.updateVolunteerSquad(currentVolunteer.value.id, selectedSquadId.value)
    } finally {
      isLoadingSquad.value = false
    }
  }
}

const updateVolunteerType = async () => {
  if (
    selectedTypeId.value &&
    currentVolunteer.value &&
    selectedTypeId.value !== currentVolunteer.value.volunteer_type_id
  ) {
    isLoadingType.value = true
    try {
      await volunteerStore.updateVolunteerType(currentVolunteer.value.id, selectedTypeId.value)
    } finally {
      isLoadingType.value = false
    }
  }
}

const updateVolunteerJobTitle = async () => {
  if (
    selectedJobTitleId.value &&
    currentVolunteer.value &&
    selectedJobTitleId.value !== currentVolunteer.value.jobtitle_id
  ) {
    isLoadingJobTitle.value = true
    try {
      await volunteerStore.updateVolunteerJobTitle(currentVolunteer.value.id, selectedJobTitleId.value)
    } finally {
      isLoadingJobTitle.value = false
    }
  }
}

const updateVolunteerVerticals = async () => {
  if (currentVolunteer.value) {
    isLoadingVerticals.value = true
    try {
      await verticalStore.updateVolunteerVerticals(currentVolunteer.value.id, selectedVerticalIds.value)
      // Update the current volunteer's verticals in the store
      if (currentVolunteer.value.verticals) {
        currentVolunteer.value.verticals = verticals.value.filter((v) =>
          selectedVerticalIds.value.includes(v.id)
        )
      }
    } finally {
      isLoadingVerticals.value = false
    }
  }
}

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
</script>
