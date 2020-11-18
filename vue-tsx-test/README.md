# Vue Composition API + TSX
1. Create Vue app with:
    - Typescript
    - Use Babel with Typescript
2. Install:
    - `@vue/composition-api` ⇒ For creating components
    - `babel-preset-vca-jsx` ⇒ To make render functions work 
    ```
    yarn add @vue/composition-api babel-preset-vca-jsx -D
    ```
3. Add the following interface to `src/shims-tsx.d.ts`.

   This will tell the TypeScript compiler where to look for props on a component for type checking.
   ```ts
   interface ElementAttributesProperty {
       $props: {}
   }
   ```
4. Add the `vca-jsx` plugin to `babel.config.js`
5. Use the `VueCompositionAPI` in `src/main.ts`
   ```ts
   import VueCompositionAPI from '@vue/composition-api'
   
   Vue.use(VueCompositionAPI)
   ```

Example component:
```tsx
import { defineComponent } from '@vue/composition-api';

export const HelloWorld = defineComponent({
    setup() {
        // Notice the arrow function
        return () => (
            <div>Hello world</div>
        )
    }
})
```