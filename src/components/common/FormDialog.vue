<template>
  <q-card :class="isLarge ? 'large' : 'normal'">
    <q-card-section v-if="isPayment === false">
      <div class="text-h6" >{{ title }}</div>
    </q-card-section>
    <slot/>
  </q-card>
</template>

<script>
export default {
  name: 'FormDialog',
  props: {
    isEdit: {
      type: Boolean,
      default () {
        return false
      }
    },
    isPayment: {
      type: Boolean,
      default () {
        return false
      }
    },
    isLarge: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  computed: {
    title () {
      const routeTitle = this.$route.meta.title
      return this.isEdit ? `Update ${routeTitle}` : ` ${routeTitle}`
    }
  }
}
</script>
<style scoped>
.normal {
  width: 700px;
  max-width: 80vw;
}

.large {
  width: 1000px;
  max-width: 80vw;
}
</style>
