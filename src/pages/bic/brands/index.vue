
<template>
  <div>
    <VCard>
      <VContainer>
        <VRow>
          <VCol
            cols="3"
            md="3"
            sm="12"
          >
            <VSelect
              v-model="searchSelect"
              :items="itemsSearch"
              label="Chọn trường"
              clearable
              density="compact"
            />
          </VCol>
          <VCol
            cols="2"
            md="2"
            sm="12"
          >
            <VTextField
              v-model="searchText"
              label="Từ khóa"
            />
          </VCol>
          <VCol
            cols="2"
            md="2"
            sm="12"
          >
            <VSelect
              v-model="searchOrganization"
              :items="itemsOrganization"
              label="Đại lý?"
              clearable
              density="compact"
            />
          </VCol>
          <VCol
            cols="2"
            md="2"
            sm="12"
          >
            <VSelect
              v-model="searchCredit"
              :items="itemsCredit"
              label="Tổ chức tín dụng?"
              clearable
              density="compact"
            />
          </VCol>
          <VCol
            cols="2"
            md="2"
            sm="12"
          >
            <VSelect
              v-model="searchStatus"
              :items="itemsStatus"
              label="Trạng thái??"
              density="compact"
              clearable
              clear-icon="tabler-x"
            />
          </VCol>
          <VSpacer />
          <VCardActions class="custom-btn-search">
            <!--
              <VBtn
              color="success"
              variant="flat"
              @click="search"
              >
              Tìm kiếm
              </VBtn> 
            -->
            <VTooltip location="top">
              <template #activator="{ props }">
                <VBtn
                  v-bind="props"
                  icon="tabler-search"
                  variant="outlined"
                  color="success"
                  size="x-small"
                  @click="search"
                />
              </template>
              <span>Tìm kiếm</span>
            </VTooltip>

            <VTooltip location="top">
              <template #activator="{ props }">
                <VBtn
                  v-bind="props"
                  icon="tabler-arrow-bar-to-down"
                  variant="outlined"
                  color="info"
                  size="x-small"
                  @click="search"
                />
              </template>
              <span>Xuất Excel</span>
            </VTooltip>
          </VCardActions>
        </VRow>
      </VContainer>
      <!-- </VCardText> -->
    </VCard>
    <br>
  
    <VDataTable
      v-model:sort-by="sortBy"
      v-model="selected"
      :headers="headers"
      :items="dataSource"
      :items-per-page="10"
      striped
      :group-by="groupBy"
      no-data-text="Không có dữ liệu"
      density="comfortable"
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

     
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.TrangThai="{ item }">
        <VChip
          :color="getColor(item.value.TrangThai)"

          size="small"
          class="font-weight-medium"
        >
          {{ getStatus(item.value.TrangThai) }}
        </VChip>
      </template> 
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.TenToChuc="{item}">
        <a @click="editItem(item.value)"> {{ item.value.TenToChuc }}</a>
      </template>
      
      <template #data-table-group="{ props, item, count }">
        <td>
          <VBtn
            v-bind="props"
            variant="text"
            density="comfortable"
          >
            <VIcon
              class="flip-in-rtl"
              :icon="props.icon"
            />
          </VBtn>

          <span>{{ item.value }}</span>
          <span>({{ count }})</span>
        </td>
      </template>
    </VDataTable>


    <VDialog
      v-model="editDialog"
      max-width="800px"
    >
      <VCard class="pa-sm-8 pa-5">
        <VCardItem>
          <VCardTitle class="text-h4 mb-3">
            Chi tiết đại lý/ tổ chức
          </VCardTitle>
        </VCardItem>

        
      
        <VContainer>
          <div class="mx-sm-4">
            <div class="d-flex align-center">
              <VRadioGroup
                v-model="radioGroup"
                inline
              >
                <VCol
                  cols="6"
                  md="6"
                >
                  <VRadio
                    label="Đại lý"
                    value="radio-1"
                    density="compact"
                  />
                </VCol>
                <VCol
                  cols="6"
                  md="6"
                >
                  <VRadio
                    label="Không phải đại lý"
                    value="radio-2"
                    density="compact"
                  />
                </VCol>
              </VRadioGroup>
            </div>
          </div>
          <div class="mx-sm-4">
            <div class="d-flex align-center">
              <VRadioGroup
                v-model="radioGroup2"
                inline
              >
                <VCol
                  cols="6"
                  md="6"
                >
                  <VRadio
                    label="Tổ chức tín dụng"
                    value="radio-3"
                    density="compact"
                  />
                </VCol>
                <VCol
                  cols="6"
                  md="6"
                >
                  <VRadio
                    label="Không phải tổ chức tín dụng"
                    value="radio-4"
                    density="compact"
                  />
                </VCol>
              </VRadioGroup>
            </div>
          </div>
          <div class="mx-sm-4">
            <div class="d-flex align-center">
              <VCol
                cols="3"
                md="3"
              >
                <h6 class="text-sm font-weight-medium me-10">
                  Mã tổ chức:
                </h6>
              </VCol>
              <VCol
                cols="9"
                md="9"
              >
                <AppTextField v-model="editedItem.MaToChuc" />
              </VCol>
            </div>
          </div>
      
          <!--
            <AppTextField
            v-model="editedItem.LoaiToChuc"
            label="Loại tổ chức"
            /> 
          -->

          <div class="mx-sm-4">
            <div class="d-flex align-center">
              <VCol
                cols="3"
                md="3"
              >
                <h6 class="text-sm font-weight-medium me-10">
                  Loại tổ chức:
                </h6>
              </VCol>
              <VCol
                cols="9"
                md="9"
              >
                <AppTextField v-model="editedItem.LoaiToChuc" />
              </VCol>
            </div>
          </div>
            

          <div class="mx-sm-4">
            <div class="d-flex align-center">
              <VCol
                cols="3"
                md="3"
              >
                <h6 class="text-sm font-weight-medium me-10">
                  Địa chỉ:
                </h6>
              </VCol>

              <VCol
                cols="9"
                md="9"
              >
                <AppTextarea
                  v-model="editedItem.DiaChi"
                  auto-grow
                />
              </VCol>
            </div>
          </div>
                
          <div class="mx-sm-4">
            <div class="d-flex align-center">
              <VCol
                cols="3"
                md="3"
              >
                <h6 class="text-sm font-weight-medium me-10">
                  Số điện thoại:
                </h6>
              </VCol>
              <VCol
                cols="9"
                md="9"
              >
                <AppTextField v-model="editedItem.SoDienThoai" />
              </VCol>
            </div>
          </div>
          <div class="mx-sm-4">
            <div class="d-flex align-center">
              <VCol
                cols="3"
                md="3"
              >
                <h6 class="text-sm font-weight-medium me-10">
                  Mã số thuế:
                </h6>
              </VCol>
              <VCol
                cols="9"
                md="9"
              >
                <AppTextField v-model="editedItem.MaSoThue" />
              </VCol>
            </div>
          </div>
          <div class="mx-sm-4">
            <div class="d-flex align-center">
              <VCol
                cols="3"
                md="3"
              >
                <h6 class="text-sm font-weight-medium me-10">
                  Số tài khoản:
                </h6>
              </VCol>
              <VCol
                cols="9"
                md="9"
              >
                <AppTextField v-model="editedItem.SoTaiKhoan" />
              </VCol>
            </div>
          </div>
          <div class="mx-sm-4">
            <div class="d-flex align-center">
              <VCol
                cols="3"
                md="3"
              >
                <h6 class="text-sm font-weight-medium me-10">
                  Tại ngân hàng:
                </h6>
              </VCol>
              <VCol
                cols="9"
                md="9"
              >
                <AppTextField v-model="editedItem.TaiNganHang" />
              </VCol>
            </div>
          </div>
          <div class="mx-sm-4">
            <div class="d-flex align-center">
              <VCol
                cols="3"
                md="3"
              >
                <h6 class="text-sm font-weight-medium me-10">
                  Hiệu lực từ ngày:
                </h6>
              </VCol>
              <VCol
                cols="9"
                md="9"
              >
                <AppTextField v-model="editedItem.HieuLucTuNgay" />
              </VCol>
            </div>
          </div>
          <div class="mx-sm-4">
            <div class="d-flex align-center">
              <VCol
                cols="3"
                md="3"
              >
                <h6 class="text-sm font-weight-medium me-10">
                  Hiệu lực đến ngày:
                </h6>
              </VCol>
              <VCol
                cols="9"
                md="9"
              >
                <AppTextField v-model="editedItem.HieuLucDenNgay" />
              </VCol>
            </div>
          </div>
          <div class="mx-sm-4">
            <div class="d-flex align-center">
              <VCol
                cols="3"
                md="3"
              >
                <h6 class="text-sm font-weight-medium me-10">
                  Trạng thái:
                </h6>
              </VCol>
              <VCol
                cols="9"
                md="9"
              >
                <VChip
                  :color="getColor(editedItem.TrangThai)"
                  size="default"
                  class="font-weight-medium"
                >
                  {{ getStatus(editedItem.TrangThai) }}
                </VChip>
              </VCol>
            </div>
          </div>
        </VContainer>
  
       
      
        <VCardActions>
          <VSpacer />

          <VBtn
            color="error"
            variant="outlined"
            @click="close"
          >
            Đóng
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>  
   


    <!-- 👉 Delete Dialog  -->

    <!--   
      <VDialog
      v-model="deleteDialog"
      max-width="800px"
      >
      <VCard class="pa-sm-8 pa-5">
      <VCardItem class="text-center">
      <VCardTitle class="text-h5 mb-3">
      Bạn có chắc chắn xóa sản phẩm {{ editedItem.raw.tensanpham }} này không?
      </VCardTitle>
      </VCardItem>
      <VCardActions>
      <VSpacer />

      <VBtn
      color="error"
      variant="outlined"
      @click="closeDelete"
      >
      Hủy
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
    -->
  </div>
</template>

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
      sortBy: [{ key: 'ToChucId', order: 'asc' }],
      brandName: 'Hello!',
      message: '',
      selected: [],
      editedItem: {},
      isMounted: false,
      radioGroup: 'radio-1',
      radioGroup2: 'radio-3',
      groupBy: [{ key: 'TenToChucCha' }],
      headers: [
        {
          title: 'Đại lý/ Tổ chức cha',
          key: 'data-table-group',
        },

        // {
        //   title: 'ID',
        //   sortable: true,
        //   key: 'ToChucID',
        // },
        {
          title: 'Mã Tổ chức',
          key: 'MaToChuc',
        },
        {
          title: 'Tên Tổ Chức',
          key: 'TenToChuc',
        },
        {
          title: 'Loại Tổ Chức',
          key: 'LoaiToChuc',
        },
        {
          title: 'Mã số thuế',
          key: 'MaSoThue',
        },
        {
          title: 'Số ĐT',
          key: 'SoDienThoai',
        },
        {
          title: 'Trạng Thái',
          key: 'TrangThai',
        },

        // {
        //   title: 'Hành động',
        //   key: 'actions',
        //   sortable: false,
        // },
      ],
      deleteDialog: false,
      editDialog: false,
      itemsSearch: [
        { title: 'Tên đại lý/ Tổ chức', value: 0 }, 
        { title: 'Mã đại lý / Tổ chức', value: 1 }, 
        { title: 'Tên CN đại lý/ Tổ chức', value: 2 }, 
        { title: 'Mã CN đại lý/ Tổ chức', value: 3 }, 
      ],
      itemsStatus: [
        { title: 'Đang hoạt động', value: 1 }, 
        { title: 'Không hoạt động', value: 0 },
      ],
      itemsOrganization: [
        { title: 'Đại lý', value: 0 },
        { title: 'Không phải đại lý', value: 1 },
      ],
      itemsCredit: [
        { title: 'Tổ chức tín dụng', value: 0 },
        { title: 'Không phải TCTD', value: 1 },
      ],
   
      searchSelect: { title: 'Tên đại lý/ Tổ chức', value: 0 },
      searchText: '',
      searchStatus: {
        title: 'Đang hoạt động',
        value: 1,
      },
      searchCredit: { title: 'Tổ chức tín dụng', value: 0 },
      searchOrganization: { title: 'Đại lý', value: 0 },
      
    }
  },
  // eslint-disable-next-line vue/component-api-style
  computed: {
    greeting() {
      return  this.brandName + this.message
    },
    dataSource(){
      if(this.isMounted){
        return store.state.brand.brands
      }else return []
    },
  },
  // eslint-disable-next-line vue/component-api-style
  created() {
    store.dispatch('brand/fetchBrandName')
  },

  // eslint-disable-next-line vue/component-api-style
  mounted() {
    this.isMounted = true
  }, 
  
  // eslint-disable-next-line vue/component-api-style
  methods: {
    getColor(status) {
      if (status == 1){
        return  'success' 
      }
      else 
        return 'danger' 

    },
    getStatus(status) {
      if (status == 1){
        return 'Đang hoạt động'
      }
      else 
        return 'Ngừng hoạt động'
    },
    async editItem(item){
      this.editDialog = true

      await store.dispatch('brand/getDetail', item.ToChucID)
      console.log('long:', store.state.brand.brand)
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
    async search(){
      let searchModel = {
        'searchText': this.searchText,
        'searchSelect': this.searchSelect.value,
        'searchStatus': this.searchStatus.value,
        'searchCredit': this.searchCredit.value,
        'searchOrganization': this.searchOrganization.value,
      } 
      await store.dispatch('brand/search', searchModel)
    },
  },
})
</script>

<style>
     @import './index.scss';
     .custom-btn-search{
      margin-top: 13px;
     }
</style>

<route lang="yaml">
  meta:
    layout: default
    action: read
    subject: Auth
  </route>