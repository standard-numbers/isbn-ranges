# Contributing

Please, use the Node.js version specified in `.github/workflows/test.yaml`.

## Pull requests

1. Fork the repository.
2. Clone the fork (`git clone`).
3. `npm ci --ignore-scripts`.
4. Make changes, but do not modify the license text.
5. Run the following commands:

    ```sh
    git diff --check
    npm run lint
    npm run build
    npm test
    ```

    If there are errors, fix them and repeat the step.
6. `npm pack`. If there are errors, fix them and go back to step 5.
7. Commit, then push the changes to the fork repository.
8. Make a [pull request](https://github.com/standard-numbers/isbn-ranges/pulls).
