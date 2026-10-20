# Muvon code standard

Code style and helper tools for all languages that Muvon Un Limited uses

## Common

* pre-commit
* vscode-markdownlint

## PHP

* PHP CodeSniffer for a code style check
* PHPStan for static analyzing

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

## Rust

* rustfmt with tabs and a 120-column limit: [rust/rustfmt.toml](rust/rustfmt.toml)
* Every Rust repo commits an identical copy as `rustfmt.toml` at its root. rustfmt has no remote config, so the copy is required.
* The `style-check` step in [Muvon/ci-workflow](https://github.com/Muvon/ci-workflow) `rust-ci.yml` fails when a repo's copy differs from this file.
* To change the standard: edit this file, then copy it to every Rust repo and run `cargo fmt --all` there.

## Markdown

* We use tabs in `*md` files and as for now there is no such rule for linter
