<template>
  <q-page class="q-py-sm q-pl-sm">
    <Table :data="clients"
           :columns="columns"
           :is-loading="isLoading"
           :total="total"
           :filter="filter"
           :error="error"
           :is-deleted="isDeleted"
           @request="onRequest"
           @show="showData"
           @delete="handleDelete"
    >
      <template v-slot:filter-top>
        <FilterTable :filtersAttribute="filtersAttribute"
                     @doFilter="handleFilter"
                     @show="showData"
                     :filter-statuses="filterStatuses"
        />
      </template>
    </Table>
    <q-dialog v-model="isShow">
      <FormDialog :is-edit="isEdit" :is-large="true">
        <Form :client="client"
              :is-saved="isSaved"
              :is-edit="isEdit"
              :error="error"
              @save="handleSave"
              @close="handleClose"
        />
      </FormDialog>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Table from 'src/components/common/Table'
import FormDialog from 'src/components/common/FormDialog'
import FilterTable from 'src/components/common/FilterTable'
import Form from 'components/client/Form'
import { Constants } from 'src/utils/const'

export default {
  name: 'Clients',
  components: {
    Form,
    Table,
    FormDialog,
    FilterTable
  },
  data () {
    return {
      isShow: false,
      isEdit: false,
      isDetail: false,
      filter: {},
      columns: [
        {
          name: 'name',
          label: 'Name',
          align: 'left',
          field: 'name'
        },
        {
          name: 'phoneNumber',
          label: 'Phone Number',
          align: 'left',
          field: 'phoneNumber'
        },
        {
          name: 'address',
          label: 'Address',
          align: 'left',
          field: 'address'
        },
        {
          name: 'created_at',
          align: 'left',
          label: 'Created At',
          field: 'createdAt'
        },
        {
          name: 'status',
          align: 'center',
          label: 'Status',
          field: 'status'
        },
        {
          name: 'action',
          align: 'left',
          label: 'Action'
        }
      ],
      filtersAttribute: [
        {
          label: 'Search',
          field: 'keyword',
          type: 'text'
        },
        {
          label: 'Status',
          field: 'status',
          type: 'select'
        }
      ]
    }
  },
  computed: {
    ...mapState('client', [
      'clients',
      'total',
      'isLoading',
      'client',
      'error',
      'isSaved',
      'currentPage',
      'isDeleted'
    ]),
    filterStatuses () {
      return Constants.Status
    }
  },
  methods: {
    ...mapActions({
      loadClients: 'client/loadClients',
      loadClient: 'client/loadClient',
      saveClient: 'client/saveClient',
      deleteClient: 'client/deleteClient',
      clearError: 'client/clearError'
    }),
    async onRequest ({ data, done }) {
      await this.loadClients({
        filter: this.filter,
        page: data.page,
        limit: data.limit
      })
      if (done) {
        done()
      }
    },
    async handleSave ({ data, done }) {
      await this.saveClient(data)
      if (done) {
        done()
      }
    },
    async showData (id = null) {
      await this.clearError()
      this.isEdit = false
      if (id != null) {
        this.isEdit = true
        await this.loadClient(id)
      }
      this.isShow = true
    },
    async handleDelete ({ id, done }) {
      await this.deleteClient(id)
      if (done) {
        done()
      }
      await this.onRequest({
        data: this.currentPage
      })
    },
    handleFilter (filter) {
      this.filter = { ...filter }
    },
    async handleClose () {
      await this.onRequest({
        data: this.currentPage
      })
      this.isShow = false
    }
  }
}
</script>
