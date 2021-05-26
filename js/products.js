import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.11/vue.esm-browser.js';

let productModal;
let delProductModal;

const app = {
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/',
      apiPath: 'jayredk-hex',
      loading: false,
      product: [],
      tempProduct: {
        imagesUrl:[]
      },
      action: ''
    }
  },
  methods: {
    getProduct() {
      this.loading = true;
      axios.get(`${this.apiUrl}api/${this.apiPath}/admin/products`)
        .then((res) => {
          this.loading = false;
          if (res.data.success) {
            this.product = res.data.products;
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => console.log(err));
    },
    updateProduct() {
      let url = `${this.apiUrl}api/${this.apiPath}/admin/product`;
      let method = 'post';
      let uploadData = {
        data: {...this.tempProduct}
      };
      this.loading = true;

      if (this.action === 'edit') {
        url = `${this.apiUrl}api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
        method = 'put';
      }

      axios[method](url, uploadData)
        .then((res) => {
          this.loading = false;
          if (res.data.success) {
            productModal.hide();
            this.getProduct();
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => console.log(err));
      
    },
    deleteProduct() {
      this.loading = true;
      axios.delete(`${this.apiUrl}api/${this.apiPath}/admin/product/${this.tempProduct.id}`)
        .then((res) => {
          this.loading = false;
          if (res.data.success) {
            delProductModal.hide();
            this.getProduct();
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => console.log(err));
    },
    openModal(item) {
      this.action = window.event.target.dataset.action;

      switch (this.action) {
        case 'create':
          this.tempProduct = {imagesUrl:[]};
          productModal.show();
          break;
      
        case 'edit':
          this.tempProduct = {...item};
          if (!this.tempProduct.imagesUrl) {
            this.tempProduct.imagesUrl = [];
          }
          productModal.show();
          break;

        case 'remove':
          this.tempProduct = {...item};
          delProductModal.show();
          break;
      }
    }
  },
  created() {
    const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('hextoken='))
        .split('=')[1];
    if (token !== '') {
      axios.defaults.headers.common['Authorization'] = token;
      this.getProduct();
    } else {
      alert('請重新登入');
      window.location = 'login.html';
    }
  },
  mounted() {
    productModal = new bootstrap.Modal(document.getElementById('productModal'));
    delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'));
  }
};

createApp(app).mount('#app');