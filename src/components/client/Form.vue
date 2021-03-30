<template>
  <div class="q-pa-md">
    <q-form ref="myForm"
            class="row q-col-gutter-x-sm">
      <div v-for="(formInput, key) in infoFormInputs"
           :key="key"
           class="col-6"
           :class="{'col-sm-4' : formInput.type === 'number', 'q-mb-md': !formInput.rules}">
        <q-input
          :ref="key"
          :type="formInput.type || 'text'"
          outlined
          :label="formInput.label"
          :rules="formInput.rules || []"
          v-model="initialClient[key]"
          :error="error && key in error.data.message"
        >
          <template v-slot:error>
            <div v-for="(item, index) in error.data.message[key]" :key="index">
              {{ item }}
            </div>
          </template>
        </q-input>
      </div>

      <q-toggle
        v-if="isEdit"
        class="col-12"
        size="xl"
        v-model="initialClient.status"
        :true-value="1"
        :false-value="0"
        :label="labelToggle"
      />
    </q-form>
    <q-card-actions align="right"
                    class="bg-white text-teal">
      <q-btn flat
             label="Save"
             type="submit"
             @click="onSubmit"/>
      <q-btn flat
             label="Close"
             v-close-popup/>
    </q-card-actions>
  </div>
</template>

<script>

export default {
  name: 'Form',
  props: {
    client: {
      type: Object,
      default: () => {
      }
    },
    isSaved: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    error: {
      type: Object,
      default: () => {
      }
    },
    isDetail: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isMultiple: true,
      infoFormInputs: {
        name: {
          label: 'Name',
          rules: [val => !!val || 'Please enter client name']
        },
        address: {
          label: 'Address'
        },
        phoneNumber: {
          label: 'PhoneNumber'
        }
      },
      initialClient: {}
    }
  },
  created () {
    if (this.isEdit) {
      this.initialClient = {
        ...this.client
      }
    }
  },
  computed: {
    labelToggle () {
      return this.initialClient.status === 1 ? 'Active' : 'Deactive'
    }
  },
  methods: {
    onSubmit () {
      this.$refs.myForm.validate().then(success => {
        if (success) {
          this.$emit('save', {
            data: this.initialClient,
            done: () => {
              if (!this.error || this.error.status !== 422) {
                this.handleSubmit()
              }
            }
          })
        }
      })
    },
    handleSubmit () {
      const title = this.error ? 'Failed' : 'Success'
      this.$q.notify({
        color: this.error ? 'red' : 'green-4',
        message: this.initialClient.id ? `Update ${title}` : `Add new ${title}`
      })
      this.$emit('close')
    }
  }
}
</script>
