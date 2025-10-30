# Vue NVTON

A NVTON plugin for Vue 3.x

## Install

`npm i vue-nvton`

## Example

```ts
//...
import { NVTONPlugin } from 'vue-nvton';
//...
const app = createApp(App);
app.use(NVTONPlugin);
app.mount('#app');

// ...
<script setup lang="ts">
import { useNvton } from 'vue-nvton'

const nvton = useNvton()
nvton.load("[0, 1, ['key', 'value']]")

const value = nvton.get<string>('key')
</script>
``` 