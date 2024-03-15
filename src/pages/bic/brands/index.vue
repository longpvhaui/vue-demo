<script>
import store from '@/store'
import { defineComponent } from 'vue'
import { VDataTable } from 'vuetify/labs/VDataTable'

export default defineComponent({
  components: {
    VDataTable,
  },
  // eslint-disable-next-line vue/component-api-style
  data() {
    return {
      sortBy: [{ key: 'tensanpham', order: 'asc' }],
      brandName: 'Hello!',
      message: '',
      selected: [],
      editedItem: {},
      isMounted: false,
      headers: [
        {
          title: 'Mã sản phẩm',
          sortable: false,
          key: 'masanpham',
        },
        {
          title: 'Tên sản phẩm',
          key: 'tensanpham',
        },
        {
          title: 'Thời hạn đăng kí tdhp',
          key: 'thoihandktdhp',
        },
        {
          title: 'Thời hạn nộp phí',
          key: 'thoihannophi',
        },
        {
          title: 'Phí tối thiểu',
          key: 'phitoithieu',
        },
        {
          title: 'ACTIONS',
          key: 'actions',
          sortable: false,
        },
      ],
      deleteDialog: false,
      editDialog: false,
    }
  },
  // eslint-disable-next-line vue/component-api-style
  computed: {
    greeting() {
      return  this.brandName + this.message
    },
    dataSource(){
      if(this.isMounted){
        return JSON.parse(JSON.stringify(store.state.brand.brands))
      }else return []
    },
  },
  // eslint-disable-next-line vue/component-api-style
  created() {
    store.dispatch('brand/fetchBrandName')
    this.message =  store.state.brand.brandName
  },

  // eslint-disable-next-line vue/component-api-style
  mounted() {
    this.isMounted = true
  }, 
  
  // eslint-disable-next-line vue/component-api-style
  methods: {
    editItem(item){
      this.editDialog = true
      this.editedItem = item
    },
    close(){
      this.editDialog = false
    },
    save(){
      
    },
    deleteItem(item){
      this.deleteDialog = true,
      this.editedItem  = item
    },
    closeDelete(){
      this.deleteDialog = false
    },
    deleteItemConfirm(){
      this.closeDelete()
    },
  },
})
</script>

<template>
  <div>
    <VDataTable
      v-model:sort-by="sortBy"
      v-model="selected"
      :headers="headers"
      :items="dataSource"
      :items-per-page="10"
      show-select
      :footer="{
        'itemsPerPageText':'products per page'
      }"
    >
      <!-- eslint-disable-next-line -->
    <template #item.actions="{ item }">
        <div class="d-flex gap-1">
          <IconBtn @click="editItem(item)">
            <VIcon icon="tabler-edit" />
          </IconBtn>
          <IconBtn @click="deleteItem(item)">
            <VIcon icon="tabler-trash" />
          </IconBtn>
        </div>
      </template>
    </VDataTable>
    
    <VDialog
      v-model="editDialog"
      max-width="600px"
    >
      <VCard>
        <VCardTitle>
          <span class="headline">Chỉnh sửa</span>
        </VCardTitle>

        <VCardText>
          <VContainer>
            <VRow>
              <VCol
                cols="12"
                sm="6"
                md="4"
              >
                <VTextField
                  v-model="editedItem.tensanpham"
                  label="Tên sản phẩm"
                />
              </VCol>

              <VCol
                cols="12"
                sm="6"
                md="4"
              >
                <VTextField
                  v-model="editedItem.thoihandktdhp"
                  label="Thời hạn đăng kí tdhp"
                />
              </VCol>


              <VCol
                cols="12"
                sm="6"
                md="4"
              >
                <VTextField
                  v-model="editedItem.thoihannophi"
                  label="Thời hạn nộp phí"
                />
              </VCol>


              <VCol
                cols="12"
                sm="6"
                md="4"
              >
                <VTextField
                  v-model="editedItem.phitoithieu"
                  label="Phí tối thiểu"
                />
              </VCol>
            </VRow>
          </VContainer>
        </VCardText>

        <VCardActions>
          <VSpacer />

          <VBtn
            color="error"
            variant="outlined"
            @click="close"
          >
            Cancel
          </VBtn>

          <VBtn
            color="success"
            variant="elevated"
            @click="save"
          >
            Save
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>  
   


    <!-- 👉 Delete Dialog  -->

  
    <VDialog
      v-model="deleteDialog"
      max-width="500px"
    >
      <VCard>
        <VCardTitle>
          Are you sure you want to delete this item?
        </VCardTitle>

        <VCardActions>
          <VSpacer />

          <VBtn
            color="error"
            variant="outlined"
            @click="closeDelete"
          >
            Cancel
          </VBtn>

          <VBtn
            color="success"
            variant="elevated"
            @click="deleteItemConfirm"
          >
            OK
          </VBtn>

          <VSpacer />
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>





<style>
     @import './index.scss';
</style>