# Muvon code standard

Code style and helper tools for all languages that Muvon Un Limited uses

## Common

* pre-commit
* vscode-markdownlint

## PHP

* PHP CodeSniffer for a code style check
* VK noverify for static analyzing

## React + TS

To run new projects just run

```bash
npx create-react-app test --template typescript
```

Once it's done you should install the code style to the directory by running
 npx create-react-app test --template typescript
```bash npx create-react-app test --template typescript
cd codestyle
bin/install "path/to/test/app/folder" react-ts
```

Do not forget to enable hooks by using [pre-commit](https://pre-commit.com) by running inside the test app folder:


For more information about codestyle for this setup [read here](react-ts/README.md).
```bash
pre-commit install
```

## Markdown

* We use tabs in `*md` files and as for now there is no such rule for linter
