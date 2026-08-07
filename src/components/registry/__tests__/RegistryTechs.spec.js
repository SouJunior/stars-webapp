import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import RegistryTechs from '../RegistryTechs.vue'
import { techsFrontendOptions, techsBackendOptions } from '../constants.js'

function createWrapper(props = {}) {
  const vuetify = createVuetify({ components, directives })
  return mount(RegistryTechs, {
    props: {
      showFrontend: false,
      showBackend: false,
      frontend: [],
      frontendOutros: '',
      backend: [],
      backendOutros: '',
      showFrontendError: false,
      showBackendError: false,
      ...props
    },
    global: { plugins: [vuetify] }
  })
}

function findCheckboxes(wrapper) {
  return wrapper.findAll('.tech-checkbox')
}

describe('RegistryTechs', () => {
  describe('rendering', () => {
    it('hides frontend section when showFrontend is false', () => {
      const wrapper = createWrapper({ showFrontend: false })
      expect(wrapper.text()).not.toContain('Tecnologias Front-end')
    })

    it('shows frontend section when showFrontend is true', () => {
      const wrapper = createWrapper({ showFrontend: true })
      expect(wrapper.text()).toContain('Tecnologias Front-end')
      expect(wrapper.text()).toContain('Múltipla escolha')
    })

    it('hides backend section when showBackend is false', () => {
      const wrapper = createWrapper({ showBackend: false })
      expect(wrapper.text()).not.toContain('Tecnologias Back-end')
    })

    it('shows backend section when showBackend is true', () => {
      const wrapper = createWrapper({ showBackend: true })
      expect(wrapper.text()).toContain('Tecnologias Back-end')
    })

    it('shows both sections simultaneously', () => {
      const wrapper = createWrapper({ showFrontend: true, showBackend: true })
      expect(wrapper.text()).toContain('Tecnologias Front-end')
      expect(wrapper.text()).toContain('Tecnologias Back-end')
    })
  })

  describe('frontend checkboxes', () => {
    it('renders all frontend tech options', () => {
      const wrapper = createWrapper({ showFrontend: true })
      const checkboxes = findCheckboxes(wrapper)
      expect(checkboxes).toHaveLength(techsFrontendOptions.length)

      techsFrontendOptions.forEach((tech) => {
        expect(wrapper.text()).toContain(tech)
      })
    })

    it('emits update:frontend when a checkbox is toggled', async () => {
      const wrapper = createWrapper({
        showFrontend: true,
        frontend: [techsFrontendOptions[0]]
      })

      const firstCheckbox = wrapper.findAll('.tech-checkbox').at(0)
      const input = firstCheckbox.find('input')
      await input.setChecked(false)

      const emitted = wrapper.emitted()
      expect(emitted['update:frontend']).toBeTruthy()
    })

    it('shows "Outros" text field when frontend includes Outros', () => {
      const wrapper = createWrapper({
        showFrontend: true,
        frontend: ['React', 'Outros'],
        frontendOutros: 'Vue'
      })
      const inputs = wrapper.findAll('input[type="text"], .v-field input, .v-text-field input')
      expect(inputs.length).toBeGreaterThan(0)
    })

    it('hides error when showFrontendError is false', () => {
      const wrapper = createWrapper({ showFrontend: true })
      expect(wrapper.text()).not.toContain('Selecione ao menos uma tecnologia de Front-end')
    })

    it('shows error when showFrontendError is true', () => {
      const wrapper = createWrapper({
        showFrontend: true,
        showFrontendError: true
      })
      expect(wrapper.text()).toContain('Selecione ao menos uma tecnologia de Front-end')
    })
  })

  describe('backend checkboxes', () => {
    it('renders all backend tech options', () => {
      const wrapper = createWrapper({ showBackend: true })
      const checkboxes = findCheckboxes(wrapper)
      expect(checkboxes).toHaveLength(techsBackendOptions.length)

      techsBackendOptions.forEach((tech) => {
        expect(wrapper.text()).toContain(tech)
      })
    })

    it('emits update:backend when a checkbox is toggled', async () => {
      const wrapper = createWrapper({ showBackend: true, backend: ['Java'] })

      const checkbox = wrapper.findAll('.tech-checkbox').at(1)
      const input = checkbox.find('input')
      await input.setChecked(false)

      const emitted = wrapper.emitted()
      expect(emitted['update:backend']).toBeTruthy()
    })

    it('shows "Outros" text field when backend includes Outros', () => {
      const wrapper = createWrapper({
        showBackend: true,
        backend: ['Java', 'Outros'],
        backendOutros: 'Go'
      })
      const inputs = wrapper.findAll('input[type="text"], .v-field input, .v-text-field input')
      expect(inputs.length).toBeGreaterThan(0)
    })

    it('hides error when showBackendError is false', () => {
      const wrapper = createWrapper({ showBackend: true })
      expect(wrapper.text()).not.toContain('Selecione ao menos uma tecnologia de Back-end')
    })

    it('shows error when showBackendError is true', () => {
      const wrapper = createWrapper({
        showBackend: true,
        showBackendError: true
      })
      expect(wrapper.text()).toContain('Selecione ao menos uma tecnologia de Back-end')
    })
  })

  describe('v-model binding / checked state', () => {
    it('renders checkbox with dirty class when value is in frontend array', () => {
      const wrapper = createWrapper({
        showFrontend: true,
        frontend: ['React']
      })
      const dirty = wrapper.find('.v-selection-control--dirty')
      expect(dirty.exists()).toBe(true)
    })

    it('renders checkbox with dirty class when value is in backend array', () => {
      const wrapper = createWrapper({
        showBackend: true,
        backend: ['Java']
      })
      const dirty = wrapper.find('.v-selection-control--dirty')
      expect(dirty.exists()).toBe(true)
    })

    it('does not render dirty class when no value is selected', () => {
      const wrapper = createWrapper({
        showFrontend: true,
        frontend: []
      })
      expect(wrapper.html()).not.toContain('v-selection-control--dirty')
    })

    it('renders correct number of checked checkboxes', () => {
      const wrapper = createWrapper({
        showFrontend: true,
        frontend: ['React', 'Typescript']
      })
      const dirtyElements = wrapper.findAll('.v-selection-control--dirty')
      expect(dirtyElements).toHaveLength(2)
    })
  })
})
