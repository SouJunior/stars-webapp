<template>
  <v-dialog :model-value="terms" max-width="600" scrollable @update:model-value="$emit('update:terms', $event)">
    <v-card rounded="lg">
      <v-card-title class="text-h6 bg-primary text-white pa-4">Termos e Condições</v-card-title>
      <v-divider />
      <v-card-text class="pa-4 text-body-2 dialog-terms-body">
        <p>
          Todas as participações no SouJunior são <strong>VOLUNTÁRIAS</strong>, não remuneradas e
          sem qualquer vínculo empregatício. As participações visam, unicamente, servir de
          experiência ao voluntário que também contribuirá com o crescimento do projeto.
        </p>
        <p class="mt-4">
          A SouJunior não garante vaga de trabalho à pessoa voluntária, embora exista a
          possibilidade de que receba convites para oportunidades em empresas parceiras, externas
          e/ou recrutadores.
        </p>
      </v-card-text>
      <v-divider />
      <v-card-actions class="pa-4 justify-end">
        <v-btn variant="text" color="error" @click="$emit('reject-terms')">Recusar</v-btn>
        <v-btn color="primary" variant="elevated" @click="$emit('accept-terms')">
          Aceitar e Concordar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog :model-value="cancel" max-width="440" @update:model-value="$emit('update:cancel', $event)">
    <v-card rounded="lg" class="pa-2">
      <v-card-title class="text-h6 font-weight-bold pa-4 text-wrap text-primary">
        Tem certeza de que deseja <br />
        desistir do cadastro?
      </v-card-title>

      <v-card-text class="text-body-2 px-4 pb-2 text-medium-emphasis text-disabled">
        Todas as informações preenchidas serão perdidas
      </v-card-text>

      <v-card-actions class="pa-4 justify-end">
        <v-btn
          class="text-none font-weight-bold"
          variant="outlined"
          color="primary"
          @click="$emit('update:cancel', false)"
        >
          Não continuar
        </v-btn>
        <v-btn
          class="text-none font-weight-bold"
          color="primary"
          variant="elevated"
          @click="$emit('confirm-cancel')"
        >
          Continuar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog
    :model-value="success"
    max-width="400"
    persistent
    @update:model-value="$emit('update:success', $event)"
  >
    <v-card rounded="xl" class="text-center pa-6">
      <v-icon size="72" color="success" class="mb-4">mdi-check-circle</v-icon>

      <v-card-title
        class="text-h5 text-primary font-weight-bold justify-center text-wrap line-height-sm px-4"
      >
        Cadastro realizado com sucesso!
      </v-card-title>

      <v-card-text class="text-body-2 text-grey-darken-1 px-4 py-2">
        Seu perfil agora faz parte do banco de talentos da SouJunior.
      </v-card-text>

      <v-card-actions class="justify-center pt-2">
        <v-btn
          color="primary"
          variant="flat"
          block
          class="text-none text-body-1 font-weight-medium py-3 rounded-lg"
          :to="{ name: 'home' }"
          @click="$emit('reset')"
        >
          Fechar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
defineProps({
  terms: { type: Boolean, default: false },
  cancel: { type: Boolean, default: false },
  success: { type: Boolean, default: false }
})

defineEmits([
  'update:terms',
  'update:cancel',
  'update:success',
  'accept-terms',
  'reject-terms',
  'confirm-cancel',
  'reset'
])
</script>

<style scoped>
.dialog-terms-body {
  max-height: 400px;
}
</style>
