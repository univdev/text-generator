import { createApp } from 'vue';
import App from './pages/index.vue';
import Element from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App);

app.use(Element);

app.mount('#app');
