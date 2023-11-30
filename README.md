# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.



<template>
    <div class="w-full h-full flex" v-if="cekToken">
        <Sidebar :dataOpenSideBar="openSideBar.openSideBar" class=" z-10">
        </Sidebar>
        <div :class="{
            'md:ml-[200px] lg:ml-[300px] w-full duration-300': openSideBar.openSideBar,
            'w-full duration-300': !openSideBar.openSideBar
        }">
            <TopBar class=" hidden md:block" :toggleSideBar="openSideBar.toggleSideBar"
                :openSideBar="openSideBar.openSideBar"
                :class="openSideBar.openSideBar ? ' max-w-max: duration-300' : 'max-2xl duration-300'" />
            <TopBarResponsif :toggleSideBar="openSideBar.toggleSideBar" :openSideBar="openSideBar.openSideBar"
                class=" md:hidden "></TopBarResponsif>
            <div @click="toggleCloseBar">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

        <div :class="openSideBar.openSideBar ? ' md:ml-[200px] lg:ml-[300px] w-full duration-300' : 'w-full duration-300' >

