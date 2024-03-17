# Tinker Docs

Tinker Docs is an open technical documentation platform for the Tinker team, aimed at helping team members better learn and share knowledge related to robot development.
Tinker Docs is built with [Docusaurus 2](https://docusaurus.io/).

## Contributing
We welcome contributions to Tinker Docs! If you would like to contribute, please follow the steps below:

1. `fork` the repository to your own GitHub account, for example `Grange007/tinkerdocs`.
2. `clone` your repository and write your article (following the [project structure](https://tinkerfuroc.github.io/tinkerdocs/docs/Intro/project_structure)).
3. `commit` your changes and `push` them to your repository.
4. Create a `pull request` to the `main` branch of the `Tinker/tinkerdocs` repository.
5. Wait for the `github actions` to build and deploy your changes to the site. Once the build is successful, your changes will be live on the site.
6. If the build fails, you will need to fix the issues and push the changes to your repository. The build will automatically be triggered again.

For more information, you can take a look at [how-to-fork-a-github-repository](https://www.freecodecamp.org/chinese/news/how-to-fork-a-github-repository/).

## Commands

If you want to build and deploy the site locally, you can use the following commands:

### Installation

clone this repository and run the following command:

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Testing your Build Locally

```
$ yarn serve
```


### Deployment

#### For Bash
Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

#### For Windows

Using SSH:

```
cmd /C "set "USE_SSH=true" && yarn deploy"
```

Not using SSH:

```
cmd /C "set "GIT_USER=<GITHUB_USERNAME>" && yarn deploy"
```
If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

