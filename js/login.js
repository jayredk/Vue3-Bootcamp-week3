import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.11/vue.esm-browser.js';

createApp({
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/',
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      axios.post(`${this.apiUrl}admin/signin`, this.user)
        .then((res) => {
          if (res.data.success) {
            let {token, expired} = res.data;
            document.cookie = `hextoken=${token}; expires=${new Date(expired)}`;
            window.location = 'products.html';
          } else {
            failMsg.classList.toggle('invisible');
            this.emailInput = '';
            this.passwordInput = '';
          }
        })
        .catch((err) => console.log(err));
    }
  }
}).mount('#app');
