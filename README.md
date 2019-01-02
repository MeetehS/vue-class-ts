# vue-class-ts
VueClassTs is a good helper for you to use Vue with Class and TypeScript, it's supported by [vue-class-component](https://github.com/vuejs/vue-class-component), [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator) and [vue-tsx-support](https://github.com/wonderful-panda/vue-tsx-support)

## Usage
### Install
```shell
npm install vue-class-ts
```

### Config TypeScript with webpack
#### Install devDependencies
```shell
npm install --save-dev typescript ts-loader babel-plugin-syntax-jsx babel-plugin-transform-vue-jsx babel-helper-vue-jsx-merge-props babel-preset-env
```

#### TypeScript config: [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
```json
{
  "include": [
    "./src/**/*",
    "./types/**/*",
    "./node_modules/vue-class-ts/types/enable-tsx-check.d.ts" // Enable tsx check
  ],
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "es2018", "scripthost"],
    "strict": true,
    "module": "esNext",
    "moduleResolution": "node",
    "sourceMap": true,
    "types": ["node"],
    "experimentalDecorators": true,
    "jsx": "preserve" // Enable tsx
  }
}
```

##### Reference
- [TypeScript in 5 minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [TypeScript: JSX](https://www.typescriptlang.org/docs/handbook/jsx.html)
- [wonderful-panda/vue-tsx-support](https://github.com/wonderful-panda/vue-tsx-support#install-and-enable)

#### webpack config
Add this to your vue webpack config
```js
{
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: [
          'babel-loader', // Transform vue jsx with babel
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.vue', '.ts', '.tsx'],
  },
}
```

##### Reference
- [TypeScript: Integrating with Build Tools: webpack](https://www.typescriptlang.org/docs/handbook/integrating-with-build-tools.html#webpack)
- [Microsoft/TypeScript-Vue-Starter](https://github.com/Microsoft/TypeScript-Vue-Starter)
- [vuejs/babel-plugin-transform-vue-jsx](https://github.com/vuejs/babel-plugin-transform-vue-jsx)

#### babel config
```json
{
  "presets": ["env"],
  "plugins": ["transform-vue-jsx"]
}
```

### Write your first vue component with tsx
#### src/components/NavBar/index.tsx
```tsx
import Vue, { CreateElement } from 'vue'
import { ClassComponent, Component, Emit } from 'vue-class-ts'

import BackButton from '../BackButton'
import StatusBar from '../StatusBar'

import template from './template.vue'

export enum Mode {
  Dark = 'dark',
  Light = 'light',
}

interface IProps {
  mode?: Mode,
}

@ClassComponent({
  mixins: [template],

  props: {
    mode: {
      type: String,
      default: Mode.Dark,
    },
  },
})
export default class NavBar extends Component<IProps> {
  @Emit()
  public back() {
    return
  }

  private render(h: CreateElement) {
    return (
      <div>
        <StatusBar />

        <div class={this.navBarClass}>
          <div class="left">
            <BackButton mode={this.$props.mode} onClick={this.back} />
          </div>
          <div class="middle">
            {this.$slots.default}
          </div>
          <div class="right">

          </div>
        </div>
      </div>
    )
  }

  private get navBarClass() {
    return {
      RealNavBar: true,
      darkMode: this.$props.mode === Mode.Dark,
      lightMode: this.$props.mode === Mode.Light,
    }
  }
}
```

#### src/components/NavBar/template.vue
```html
<style scoped>
  .RealNavBar {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 44px;
    font-size: 18px;
    line-height: 20px;
    font-weight: 500;
  }

  .darkMode {
    background: white;
    color: #333; 
  }

  .lightMode {
    background: transparent;
    color: white;
  }

  .left,
  .middle,
  .right {
    display: flex;
    flex: 1;
    height: 100%;
    align-items: center;
  }

  .middle {
    justify-content: center;
  }
</style>
```