import { createApp } from 'vue';
import App from './pages/index.vue';
import Element from 'element-plus';
import 'element-plus/dist/index.css';
import '@mdi/font/css/materialdesignicons.css';

const app = createApp(App);

app.use(Element);

app.mount('#app');
