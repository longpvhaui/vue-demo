
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
            cols="3"
            md="3"
            sm="12"
          >
            <VTextField
              v-model="searchText"
              label="Từ khóa"
            />
          </VCol>
          <VCol
            cols="3"
            md="3"
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
                  @click="download"
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
      no-data-text="Không có dữ liệu"
      show-current-page
      density="comfortable"
    >
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
      <template #item.TenCTTV="{item}">
        <a @click="editItem(item.value)"> {{ item.value.TenCTTV }}</a>
      </template>
    </VDataTable>

    <VDialog
      v-model="detailDialog"
      max-width="800px"
    >
      <VCard class="pa-sm-8 pa-5">
        <VCardItem>
          <VCardTitle class="text-h4 mb-3">
            Chi tiết thông tin Công ty thành viên
          </VCardTitle>
        </VCardItem>
        <VContainer>
          <div class="mx-sm-4">
            <div class="d-flex align-center">
              <VCol
                cols="3"
                md="3"
              >
                <h6 class="text-sm font-weight-medium me-10">
                  Mã CTTV/ CN:
                </h6>
              </VCol>
              <VCol
                cols="9"
                md="9"
              >
                <AppTextField v-model="editedItem.MaCTTV" />
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
                  Tên CTTV/ CN:
                </h6>
              </VCol>
              <VCol
                cols="9"
                md="9"
              >
                <AppTextField v-model="editedItem.TenCTTV" />
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
                  Đại diện:
                </h6>
              </VCol>
              <VCol
                cols="9"
                md="9"
              >
                <AppTextField v-model="editedItem.NguoiDaiDien" />
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
                  Điện thoại:
                </h6>
              </VCol>
              <VCol
                cols="9"
                md="9"
              >
                <AppTextField v-model="editedItem.DienThoai" />
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
                  Email:
                </h6>
              </VCol>
              <VCol
                cols="9"
                md="9"
              >
                <AppTextField v-model="editedItem.Email" />
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
                  Địa chỉ
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
  </div>
</template>

<script>
import store from '@/store'
import { defineComponent } from 'vue'
import { VDataTable } from 'vuetify/labs/VDataTable'
import * as XLSX from 'xlsx/xlsx.mjs'

export default defineComponent({
  components: {
    VDataTable,
  },
  // eslint-disable-next-line vue/component-api-style
  data(){
    return {
      isMounted: false,
      sortBy: [{ key: 'ToChucId', order: 'asc' }],
      selected: [],
      detailDialog: false,
      editedItem: {},
      headers: [
        {
          title: 'Mã CTTV',
          sortable: true,
          key: 'MaCTTV',
        },
        {
          title: 'Tên CTTV',
          key: 'TenCTTV',
        },
        {
          title: 'Mã số thuế',
          key: 'MaSoThue',
        },
        {
          title: 'Người đại diện',
          key: 'NguoiDaiDien',
        },
        {
          title: 'Số tài khoản',
          key: 'SoTaiKhoan',
        },
        {
          title: 'Tại ngân hàng',
          key: 'TaiNganHang',
        },
        {
          title: 'Điện thoại',
          key: 'DienThoai',
        },
        {
          title: 'Email',
          key: 'Email',
        },
        {
          title: 'Trạng thái',
          key: 'TrangThai',
        },
      ],
      itemsSearch: [
        { title: 'Tên CTTV/ CN', value: 0 }, 
        { title: 'Mã số thuế', value: 1 }, 
        { title: 'Số điện thoại', value: 2 }, 
        { title: 'Email', value: 3 }, 
      ],
      itemsStatus: [
        { title: 'Đang hoạt động', value: 1 }, 
        { title: 'Không hoạt động', value: 0 },
      ],
      searchSelect: { title: 'Tên CTTV', value: 0 },
      searchText: '',
      searchStatus: {
        title: 'Đang hoạt động',
        value: 1,
      },

    
    }
  },
  // eslint-disable-next-line vue/component-api-style
  computed: {
    dataSource(){
      if(this.isMounted){
        return store.state.cttv.listCTTV
      }else return []
    },
  },
  // eslint-disable-next-line vue/component-api-style
  mounted() {
    this.isMounted = true
  }, 
  // eslint-disable-next-line vue/component-api-style
  created() {
    store.dispatch('cttv/fetchListCTTV')
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
    async search(){
      let searchModel = {
        'searchSelect': this.searchSelect.value,
        'searchText': this.searchText,
        'searchStatus': this.searchStatus.value,
      }
      await store.dispatch('cttv/search', searchModel)
    },
    async editItem(item){
      this.detailDialog = true

      // await store.dispatch('brand/getDetail', item.ToChucID)
      // console.log('long:', store.state.brand.brand)
      this.editedItem = item  

    },
    close(){
      this.detailDialog = false
    },
    download(){
      const data = [
        { name: 'CTTV1', email: 'cttv1@gmail.com', phone: '091231232131' },
        { name: 'CTTV2', email: 'cttv2@gmail.com', phone: '091231232331' },
        { name: 'CTTV3', email: 'cttv3@gmail.com', phone: '091233123211' },
        { name: 'CTTV4', email: 'cttv4@gmail.com', phone: '091231243131' },
        { name: 'CTTV5', email: 'cttv5@gmail.com', phone: '091235464131' },
        { name: 'CTTV6', email: 'cttv6@gmail.com', phone: '091231232341' },
      ]

      const workbook = XLSX.utils.book_new()
      const worksheet = XLSX.utils.json_to_sheet(this.dataSource)

      XLSX.utils.book_append_sheet(workbook, worksheet, "template")
      XLSX.writeFile(workbook, 'template.xlsx')
    },
  },
})
</script>

 <!-- eslint-disable-next-line vue/no-empty-component-block -->
<style>
</style>