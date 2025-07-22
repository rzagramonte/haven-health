## [1.7.0](https://github.com/ncharris93/dsd-east-coast-goats/compare/v1.6.0...v1.7.0) (2025-07-22)

### Features

* **globals.css logo_dark.svg:** added logo in dark mode ([6df5136](https://github.com/ncharris93/dsd-east-coast-goats/commit/6df5136b6c3942de2be20769c0360a9884c78c83))

### Bug Fixes

* **globals.css:** typo fix ([c62b8d7](https://github.com/ncharris93/dsd-east-coast-goats/commit/c62b8d78cb427c88f776c98620dcf62682a99464))

## [1.6.0](https://github.com/ncharris93/dsd-east-coast-goats/compare/v1.5.3...v1.6.0) (2025-07-22)

### Features

* **cd.yml:** auto-update supabase types when a migration is added ([#30](https://github.com/ncharris93/dsd-east-coast-goats/issues/30)) ([4184163](https://github.com/ncharris93/dsd-east-coast-goats/commit/41841632db5c78e6336b3bf31f796a52ffb11a8b))
* **components/ui/footer.tsx:** footer component for app layout ([ff59b46](https://github.com/ncharris93/dsd-east-coast-goats/commit/ff59b46b65a08a5d600b41d7a90202733bdcef84))
* **icons:** add clinic logo SVG to public/icons for use across the app ([8e356f8](https://github.com/ncharris93/dsd-east-coast-goats/commit/8e356f8e71af97847f9abb883e6558c268060129))

### Bug Fixes

* Custom CSS Variable Fix ([#35](https://github.com/ncharris93/dsd-east-coast-goats/issues/35)) ([c716ed1](https://github.com/ncharris93/dsd-east-coast-goats/commit/c716ed120db6ac97ef38f393e18bfe39918c7bca))
* **layout.tsx:** updated import in layout.tsx ([257e686](https://github.com/ncharris93/dsd-east-coast-goats/commit/257e6860822f53b4b2e2fe5fd65beab2f7dd6b9c))

### Reverts

* **package.json:** remove dotenv dependency ([31f3172](https://github.com/ncharris93/dsd-east-coast-goats/commit/31f31724427653200cfb759186f135883bd5213c))

### Code Refactoring

* **app:** merged with updated main branch ([66d110b](https://github.com/ncharris93/dsd-east-coast-goats/commit/66d110bf84a8107de6cf0151cd0ed729ff4634c6))
* **footer.tsx:** refactored footer.tsx ([7ed673b](https://github.com/ncharris93/dsd-east-coast-goats/commit/7ed673b491feacee9f4aad5223c5ce9d4a54f945))
* **footer.tsx:** updated icontype import ([7871351](https://github.com/ncharris93/dsd-east-coast-goats/commit/787135128497b00f528914b3736e42d85ab6cca5))

## [1.5.3](https://github.com/ncharris93/dsd-east-coast-goats/compare/v1.5.2...v1.5.3) (2025-07-21)

### Bug Fixes

* typescript v4 fix ([#33](https://github.com/ncharris93/dsd-east-coast-goats/issues/33)) ([78c1d1d](https://github.com/ncharris93/dsd-east-coast-goats/commit/78c1d1d3daddef3329f6cc0ac90b96f0e3d2678c))

## [1.5.2](https://github.com/ncharris93/dsd-east-coast-goats/compare/v1.5.1...v1.5.2) (2025-07-20)

### Bug Fixes

* **(initial.sql):** correct table names, causing false positive success ([1d7c7eb](https://github.com/ncharris93/dsd-east-coast-goats/commit/1d7c7ebc5b5653a34215412f0d656b3d1590f2a9))

## [1.5.1](https://github.com/ncharris93/dsd-east-coast-goats/compare/v1.5.0...v1.5.1) (2025-07-19)

### Bug Fixes

* **bug fix:** bug fix ([552c9e9](https://github.com/ncharris93/dsd-east-coast-goats/commit/552c9e9dbd847e5e68f0b64f34d45bcbe0a326c2))

## [1.5.0](https://github.com/ncharris93/dsd-east-coast-goats/compare/v1.4.0...v1.5.0) (2025-07-19)

### Features

* **app/api:** created placeholder files for all api routes ([c9fcb58](https://github.com/ncharris93/dsd-east-coast-goats/commit/c9fcb5871e97240f99db60fd2487b39add28d53e))

## [1.4.0](https://github.com/ncharris93/dsd-east-coast-goats/compare/v1.3.1...v1.4.0) (2025-07-19)

### Features

* **toast:** add global toast system with success and error handling ([79f8c7b](https://github.com/ncharris93/dsd-east-coast-goats/commit/79f8c7bff46e6ef94941f75706f8ab7e9589c81d)), closes [#ECG-32](https://github.com/ncharris93/dsd-east-coast-goats/issues/ECG-32)

### Code Refactoring

* **toast:** switch to rich colors  and remove custom styling ([7cc30d8](https://github.com/ncharris93/dsd-east-coast-goats/commit/7cc30d825fe6f7b43d78dadcae9e4b9625804036)), closes [#ECG-32](https://github.com/ncharris93/dsd-east-coast-goats/issues/ECG-32)

## [1.3.1](https://github.com/ncharris93/dsd-east-coast-goats/compare/v1.3.0...v1.3.1) (2025-07-19)

### Bug Fixes

* **migrations:** fixed syntax, fk unique names, and renamed file to supabase's requirements ([e258a28](https://github.com/ncharris93/dsd-east-coast-goats/commit/e258a28de1a002fc0a3606ed1b81afdd7bd60ecc))

## [1.3.0](https://github.com/ncharris93/dsd-east-coast-goats/compare/v1.2.1...v1.3.0) (2025-07-18)

### Features

* **migrations:** added migrations folder and sql script to add tables to supabase ([22a8579](https://github.com/ncharris93/dsd-east-coast-goats/commit/22a85799a8101b108df030a2035d012438812dcc))

### Documentation

* bIOS info for docker ([0220b1b](https://github.com/ncharris93/dsd-east-coast-goats/commit/0220b1b19b1cb57ef8714728e8c6985d53b06ff2))

## [1.2.1](https://github.com/ncharris93/dsd-east-coast-goats/compare/v1.2.0...v1.2.1) (2025-07-18)

### Code Refactoring

* **root:** reset entire repository and cleanup ([#15](https://github.com/ncharris93/dsd-east-coast-goats/issues/15)) ([069a1b9](https://github.com/ncharris93/dsd-east-coast-goats/commit/069a1b9d4e7db477f76823bfb9ea3f077dfd8648))

## [1.2.0](https://github.com/ncharris93/dsd-east-coast-goats/compare/v1.1.0...v1.2.0) (2025-07-17)

### Features

* **theme:** add custom color system w/ light and dark modes ([794c891](https://github.com/ncharris93/dsd-east-coast-goats/commit/794c891e0d68e30dac375dd5c3c270feb04e18f4))

### Bug Fixes

* **cd.yml:** use PAT instead of GITHUB_TOKEN for semantic release ([5b36a56](https://github.com/ncharris93/dsd-east-coast-goats/commit/5b36a569ee38f4c1ecf62d8d4e5c7469999e57fd))
* **folder name:** renamed ../message.tsx/page.tsx to ../messages/page.tsx to fix typo ([d650913](https://github.com/ncharris93/dsd-east-coast-goats/commit/d650913a158dfac84cbf3ae8849e5bc3122340ea))

### Documentation

* **readme.md:** Fixed typo in GitHub link and added LinkedIn profile ([#7](https://github.com/ncharris93/dsd-east-coast-goats/issues/7)) ([82a51d0](https://github.com/ncharris93/dsd-east-coast-goats/commit/82a51d05e527bf7d7893dcde8999e47c560da289))
* **readme.md:** pT LinkedIn Updated ([1ee30bf](https://github.com/ncharris93/dsd-east-coast-goats/commit/1ee30bf9062c9f9c4412597a8503cc23ea34fd7a))
* **readme.md:** pT LinkedIn Updated ([f20820a](https://github.com/ncharris93/dsd-east-coast-goats/commit/f20820aea99b339985c80e194f79cafc187fb2f3))

## [1.1.0](https://github.com/ncharris93/dsd-east-coast-goats/compare/v1.0.1...v1.1.0) (2025-07-08)

### Features

* **cd:** enhance CI/CD workflow with Vercel deployment steps and build process ([f34c442](https://github.com/ncharris93/dsd-east-coast-goats/commit/f34c4424be400dea2e892eecd70d9a12bfc2a4a0))

## [1.0.1](https://github.com/ncharris93/dsd-east-coast-goats/compare/v1.0.0...v1.0.1) (2025-07-08)

### Bug Fixes

* **package.json:** add version to manifest ([8d24d67](https://github.com/ncharris93/dsd-east-coast-goats/commit/8d24d6762bf7b610abeacaf1ae6dc6357ae1eed5))

## 1.0.0 (2025-07-08)

### Features

* add contributing guide and update project documentation ([2a2f95d](https://github.com/ncharris93/dsd-east-coast-goats/commit/2a2f95d90e53fa6b06de230cdae5469986a68c1d))
* add husky and lint-staged for pre-commit hooks ([5eb7d37](https://github.com/ncharris93/dsd-east-coast-goats/commit/5eb7d376534e2342302951e4deaf09e6cdfde9ff))
* **husky:** add commitizen cli to git hooks ([8a23098](https://github.com/ncharris93/dsd-east-coast-goats/commit/8a23098a61358e39a86174f457baadb5517204a1))

### Bug Fixes

* **cd:** do not try to release to npm ([db4911b](https://github.com/ncharris93/dsd-east-coast-goats/commit/db4911b1283ec19328a2db53fab48454354fa38f))
* **cd:** ignore commitizen in ci automatic commits ([216a933](https://github.com/ncharris93/dsd-east-coast-goats/commit/216a93386dbe59b8cf7ab76a6f2b94ab8473ca6c))

### Code Refactoring

* run eslint & prettier on whole codebase ([a11394f](https://github.com/ncharris93/dsd-east-coast-goats/commit/a11394fee67148de0e1792736450995a61581a57))
