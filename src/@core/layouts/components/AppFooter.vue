<template>
  <p class="clearfix mb-0">
    <span class="float-md-left d-block d-md-inline-block mt-25">
      COPYRIGHT  © {{ new Date().getFullYear() }}
      <b-link
        class="ml-25"
        href="https://bic.vn/"
        target="_blank"
      >Bản quyền thuộc về Tổng Công Ty Cổ Phần Bảo Hiểm Ngân Hàng Đầu Tư Và Phát Triển Việt Nam</b-link>
    </span>

  </p>
</template>

<script>
import { BLink } from 'bootstrap-vue'

export default {
  components: {
    BLink,
  },
}
</script>
