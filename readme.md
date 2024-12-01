# Getting Setup
Download and install node.js from [here](https://nodejs.org/en/download/prebuilt-installer).  
Install Vite using `npm install -D vite`

# How to run website locally
`npm run dev`  
In browser go to `http://localhost:5173/` to see website

# Notes from Creation Process
Used [Mapbox React tutuorial](https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/) to start.  
`npm create vite@latest`  
`npm install`  
`npm run dev`  

## Example React-Mapbox Demo
[Demo site](https://labs.mapbox.com/demo-realestate/)  
[Source code](https://github.com/mapbox/public-tools-and-demos/tree/main/projects/demo-realestate)

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# How to deploy website
Followed [this](https://medium.com/@arifiansaputra43/how-to-host-vite-react-in-github-pages-with-gh-pages-a8a0566c493f) to deploy to github pages.  
You need to be signed into github in the terminal before deployment. Install [GH CLI](https://cli.github.com/) and run `gh auth login` to sign in.  

Once everything is setup:
To create a new deployment, run `npm run deploy`
