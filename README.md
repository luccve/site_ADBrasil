# Preview

# Instalação

## Guia Windows/Linux/macOS

```bash
git clone https://github.com/luccve/site_ADBrasil.git

cd site_ADBrasil

npm install

```

# Iniciando o cliente na sua máquina

```bash
npm run dev

```

# Stack
Plataforma desenvolvida no Node.js LTS.
## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Componentes

O desenvolvimento da aplicação é funcional e com separação de responsabilidades (Separation of concerns).

## Btn
Ao todo foi desenvolvido 4 botoes. Que segue o padrao com as cores do site.
### btnLink


### BtnRegular

### btnSave

### BtnToggleArrow

## Card

## Carrousel

## Chart

## Footer

## formPTF

## GeoJSONMap

## GetCoordinates

## getLegendsMaps

## getPosition

## handlePositionMap

## icon

## input

## loading

## mapEvents

## miniMap

## modal

## nav

## navMap

## notFound

## opacitySliderMap

## resultadoPTF

## ScrollToHashElemtn

## searchClip

## TilerLayersMapControl

## triangleTexture

## WMSTilerLayersControl


# Pages

## balance

## catalogo

## educacional

## home

## map

## ptf

# Bibliotecas instaladas

A proposta é o desenvolvimento com baixa dependencia, para favorecer o tempo de vida da aplicação e baixa manutenção. E focada em bibliotecas atualizadas constantemente e com baixo risco de obsolescência.

## Tailwind

## Leaflet

## React Router Dom

## Victory Chart

## React Icons

# Arquitetura do site

# Scripts Build and deploy

- Foi elaborado dois scripts _deploy.bat_ e _deploy.sh_ na pasta raiz do projeto que faz o deploy já em produção do site.
- **Obs.:** o arquivo  ***main.tsx*** define as rotas da aplicação e a base url. Por padrão ao dar o deploy é preciso definir a base url para ***adbrasil_site*** em vez de somente a **/**.

- Ex. Ambiente de desenvolvimento: ![Rotas da aplicação utilizando o React Router Dom](./public/rotas.png)
- Ex. Ambiente de producao: ![Rotas da aplicação utilizando o React Router Dom](./public/rotas_producao.png)


- Scripts para automatização
```bash
#no windows
 .\deploy.bat

#no mac/linux
 npm run deploy

#ou
 source ./deploy.sh
```

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
