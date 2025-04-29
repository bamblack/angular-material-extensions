# Angular Material Extensions

A modular Angular component library designed for seamless integration with Angular Material.

## 🚀 Getting Started

This project leverages Docker and VS Code Dev Containers to ensure a consistent development environment across different systems.

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Dev Containers Extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

### Cloning the Repository

```bash
git clone https://github.com/bamblack/angular-material-extensions.git
cd angular-material-extensions
```

### Opening in VS Code with Dev Container

1. Open the project folder in VS Code.
2. Press `F1` to open the Command Palette.
3. Select `Dev Containers: Reopen in Container`.

VS Code will build the Docker container as defined in `.devcontainer/devcontainer.json` and open the project within this containerized environment.

## 📖 Storybook Integration

Storybook is integrated for isolated component development and documentation.

### Running Storybook

To start Storybook within the Docker container:

```bash
ng run components:storybook
```

Access Storybook at [http://localhost:6006](http://localhost:6006).

### Building Storybook

To build the static Storybook site:

```bash
ng run components:build-storybook
```

The static files will be generated in the `storybook-static` directory.

## 🧪 Testing Components

Component tests can be written using Angular's testing utilities. To run tests:

```bash
ng test
```

Ensure tests are added alongside their respective components in the `src/lib` directory.

## 📄 License

This project is licensed under the [MIT License](LICENSE).
