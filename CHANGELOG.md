## [1.17.3](https://github.com/ncharris93/dsd-east-coast-goats/compare/v1.17.2...v1.17.3) (2025-08-01)

### Bug Fixes

* **page.tsx:** import fixed ([6e44936](https://github.com/ncharris93/dsd-east-coast-goats/commit/6e44936817e4f4a823f80564f404de1c6e1ad3dd))

## [1.17.2](https://github.com/ncharris93/dsd-east-coast-goats/compare/v1.17.1...v1.17.2) (2025-08-01)

### Reverts

* **page.tsx:** branched off of main instead of styling branch ([f960cb9](https://github.com/ncharris93/dsd-east-coast-goats/commit/f960cb9c67e2ff975e5b235ffab6a1091fd8b537))

## [1.17.1](https://github.com/ncharris93/dsd-east-coast-goats/compare/v1.17.0...v1.17.1) (2025-08-01)

### Bug Fixes

* **component:** fix: patient intake form two sex titles bug ([615eb1e](https://github.com/ncharris93/dsd-east-coast-goats/commit/615eb1ebf727a7dee3fceb16863da3972a3bac8a))
* **componeny:** moved Date of Birth title from DatePicker component to parent component ([df7f765](https://github.com/ncharris93/dsd-east-coast-goats/commit/df7f765930595e241ae4080b644ca1387422cafa))

## [1.17.0](https://github.com/ncharris93/dsd-east-coast-goats/compare/v1.16.0...v1.17.0) (2025-07-31)

### Features

* **app/patient/dashboard/page.tsx components/dashboard/messages.tsx:** fetching data ([3bdc2d0](https://github.com/ncharris93/dsd-east-coast-goats/commit/3bdc2d06f752f38400c08418fc97b7034ca4316a))
* migrate IDs to UUID, add messages table, and restructure schema ([9f5dde7](https://github.com/ncharris93/dsd-east-coast-goats/commit/9f5dde7ad8f87c752f98246476c7a43d605e3e9a))
* update dashboard ([446d626](https://github.com/ncharris93/dsd-east-coast-goats/commit/446d626dd7b295334a2ad1f630a7faf90f558a92))
* updated column names within dashboard to match tables ([8321809](https://github.com/ncharris93/dsd-east-coast-goats/commit/832180953d8f610fe80207505065237da318090d))
* working on patient dashboard ([8655e28](https://github.com/ncharris93/dsd-east-coast-goats/commit/8655e28fcd78758c766c23d11896e5bb74f7599d))

## [1.16.0](https://github.com/ncharris93/dsd-east-coast-goats/compare/v1.15.0...v1.16.0) (2025-07-31)

### Features

* **server/auth/actions.ts:** implemented logout functionality in server ([4b584cb](https://github.com/ncharris93/dsd-east-coast-goats/commit/4b584cb9a98058f7ae6f1d846eecfec7efb2bd0b)), closes [PR#54](https://github.com/ncharris93/PR/issues/54) [#54](https://github.com/ncharris93/dsd-east-coast-goats/issues/54)

### Bug Fixes

* **migrations:** fixed script to appropriately rewrite id values with uuid, id pulled from auth uuid ([5ecae6f](https://github.com/ncharris93/dsd-east-coast-goats/commit/5ecae6f9f1c4deda16709ae32392a7ee9c9f80d0))

### Code Refactoring

* **server/auth/actions.ts:** added redirect to login for logout server action ([a4c4feb](https://github.com/ncharris93/dsd-east-coast-goats/commit/a4c4feb064fffe650d248cf0b0e031c506a8db69))

## [1.15.0](https://github.com/ncharris93/dsd-east-coast-goats/compare/v1.14.0...v1.15.0) (2025-07-28)

### Features

* **app/error404:** created an error404page component ([d750d18](https://github.com/ncharris93/dsd-east-coast-goats/commit/d750d188792af1ef8ff86a9a0e76c0752914d953))
* **app/error404:** css variables not working ([e39abbd](https://github.com/ncharris93/dsd-east-coast-goats/commit/e39abbdfc89acc8ed9c04c532fb7f4a8964a886a))
* **app:** merge main ([27c4cba](https://github.com/ncharris93/dsd-east-coast-goats/commit/27c4cbabd0bfd3e87e63c07316a417d97522d4ac))
* **error.tsx:** error.tsx file created ([25ad800](https://github.com/ncharris93/dsd-east-coast-goats/commit/25ad800fe761d479deb4ee37800cdcd6a2094b12))
* **error404/page.tsx:** created error404 component ([a68549b](https://github.com/ncharris93/dsd-east-coast-goats/commit/a68549be78c8d3a49b2edc8b7f7315f4d848238f))
* **not-found.tsx:** moved error404 page to not-found.tsx ([fafebe3](https://github.com/ncharris93/dsd-east-coast-goats/commit/fafebe3435fdf439fa1a184c0f0be0d3704dfcdc))
* **not-found.tsx:** removed card background ([98d1b60](https://github.com/ncharris93/dsd-east-coast-goats/commit/98d1b6026d1f5a6c998caa745758d115a4e6afda))
* **package-lock.json:** package-lock json merge conflict resolved ([04f3e91](https://github.com/ncharris93/dsd-east-coast-goats/commit/04f3e915c21479d2747aa590fbfec7591440b0af))

### Bug Fixes

* **error.tsx:** add use client to top of error.tsx ([60970da](https://github.com/ncharris93/dsd-east-coast-goats/commit/60970da81adb11265a354f528c3a99a13b322d2e))
* **error404:** googleye img successfully uploaded ([6f39716](https://github.com/ncharris93/dsd-east-coast-goats/commit/6f39716c9799c124f5642eaafd4a0212ffd22010))
* **not-found.tsx:** fixed padding on mobile ([b8ec2f3](https://github.com/ncharris93/dsd-east-coast-goats/commit/b8ec2f38df5f4210c7d1255ca11ad6385c11dd60))
* **not-found.tsx:** responsive bug on img and div container ([7928996](https://github.com/ncharris93/dsd-east-coast-goats/commit/7928996f77d149b015ba8e44611124a4d1fa543a))
* **package-lock.json layout.tsx:** merge conflict resolved ([6efe021](https://github.com/ncharris93/dsd-east-coast-goats/commit/6efe02157a1fe95f3fdcbda6ac1e28d8c57aecef))

### Code Refactoring

* **error404:** tried adding svg ([28448e5](https://github.com/ncharris93/dsd-east-coast-goats/commit/28448e5006c659a813ab6ac4c022cdb5a00a14c1))

## [1.14.0](https://github.com/ncharris93/dsd-east-coast-goats/compare/v1.13.0...v1.14.0) (2025-07-27)

### Features

* **app/layout.tsx:** added footer back to root layout ([3aaa40b](https://github.com/ncharris93/dsd-east-coast-goats/commit/3aaa40bd57d10ccc90f826b71f074b0038b8dff7))
* **app/provider:** installed card component from shad-ui and installed shad ([2114cbb](https://github.com/ncharris93/dsd-east-coast-goats/commit/2114cbb19adc01b02b55732ffbe7ef2743c29982))
* **provider/profile/page.tsx:** provider icon and button implemented ([171aafe](https://github.com/ncharris93/dsd-east-coast-goats/commit/171aafe8edabe818b549381d42759f3df869c8ef))
* **provider/profile:** cancel and save buttons ([ab46c7d](https://github.com/ncharris93/dsd-east-coast-goats/commit/ab46c7d6258904a7fa321c5cb504524fd0d6423f))
* **provider/profile:** completed the card component for showing dynamic provider data ([d40c3af](https://github.com/ncharris93/dsd-east-coast-goats/commit/d40c3afb659d81cff423ae172715678d708d2422))
* **provider/profile:** edit toggle ([ada6b87](https://github.com/ncharris93/dsd-east-coast-goats/commit/ada6b8786fb957adf91eeb0fb6a7f90c3a43b40c))
* **provider/profile:** editProfileReducer ([5c7f693](https://github.com/ncharris93/dsd-east-coast-goats/commit/5c7f693b53c395f31bfe5e6569a44b78ceec6de8))
* **providerprofile/editproviderprofile:** editProviderProfile component ([3e27345](https://github.com/ncharris93/dsd-east-coast-goats/commit/3e273453657a8740d6d4e3762ae55e14df63f725))
* **ui/providerprofile:** editableBooleanField and editableStringField ([a8851bd](https://github.com/ncharris93/dsd-east-coast-goats/commit/a8851bd852bbee1f315ec7e6bf3e9955a94d8c24))

### Bug Fixes

* **app/provider/profile:** fixed white space beneath footer ([ac3b254](https://github.com/ncharris93/dsd-east-coast-goats/commit/ac3b254319a371e9b153edb3e0bf13f8fb3d0a40))
* **provider/profile:** fixed checkbox bug ([c47d4cb](https://github.com/ncharris93/dsd-east-coast-goats/commit/c47d4cbc7e16bc72ec8441928ff536702e26a6c4))

### Code Refactoring

* **editablebooleanfield:** removed ternary logic ([94bdcba](https://github.com/ncharris93/dsd-east-coast-goats/commit/94bdcba1c4831a3511faa4706d31774547d37306))
* **editableemergencycontactfield.tsx:** added early return for null value ([9b8b172](https://github.com/ncharris93/dsd-east-coast-goats/commit/9b8b172c065092988f3e7001d53beeb57368a8bc))
* **editablestringfield.tsx:** refactored conditional logic ([29eae9b](https://github.com/ncharris93/dsd-east-coast-goats/commit/29eae9bbf28d170ceb49dfb5424d5adec76eea10))

## [1.13.0](https://github.com/ncharris93/dsd-east-coast-goats/compare/v1.12.0...v1.13.0) (2025-07-26)

### Features

* **component:** made the patient intake form mobile-friendly ([7413379](https://github.com/ncharris93/dsd-east-coast-goats/commit/741337917a15c89f5f425ce87e661f510f9b970e))
* **file name:** create a patient intake form and rendered it on the patient-intake route ([f1d8a09](https://github.com/ncharris93/dsd-east-coast-goats/commit/f1d8a09d368aecb6afa79bca574ee9f2a1618bf7))
* **intake page and component:** added patient intake form to /intake-form route ([7ec4751](https://github.com/ncharris93/dsd-east-coast-goats/commit/7ec4751f6cf9c31095b82132a911b7f2a2940c28))
* worked on refining the patient intake form ([2a19c94](https://github.com/ncharris93/dsd-east-coast-goats/commit/2a19c94d672ef4abda3e243a96567040de11cd24))

### Reverts

* **page:** added a patient intake form to a intake_form route ([7f99f14](https://github.com/ncharris93/dsd-east-coast-goats/commit/7f99f14ba5d8a935bf9838d74c7a756b6d5471f7))

## [1.12.0](https://github.com/ncharris93/dsd-east-coast-goats/compare/v1.11.0...v1.12.0) (2025-07-25)

### Features

* **light/dark toggle:** added toggle, changed buttons to theme colors ([bea1afc](https://github.com/ncharris93/dsd-east-coast-goats/commit/bea1afc8cfad7285ccb7fce46600a2a9007780ea))

## [1.11.0](https://github.com/ncharris93/dsd-east-coast-goats/compare/v1.10.0...v1.11.0) (2025-07-25)

### Features

* **auth:** implement signup with supabase integration ([#44](https://github.com/ncharris93/dsd-east-coast-goats/issues/44)) ([5b72500](https://github.com/ncharris93/dsd-east-coast-goats/commit/5b7250034dbec44217d66bd216e89a81a3397ce0))

## [1.10.0](https://github.com/ncharris93/dsd-east-coast-goats/compare/v1.9.0...v1.10.0) (2025-07-25)

### Features

* **auth headers:** added patient and provider auths with profile dropdown feature ([261ba8c](https://github.com/ncharris93/dsd-east-coast-goats/commit/261ba8c338daa03c55043e9c6f175502da3e467f))
* **auth-headers:** added patientauthheader and providerauthheader ([a59819e](https://github.com/ncharris93/dsd-east-coast-goats/commit/a59819e0a23e1c58e88c26050b83b78d3623ad26))

### Bug Fixes

* **auth headers:** fixed links for provider header, cleaned up header.tsx to remove background color ([ab9adf5](https://github.com/ncharris93/dsd-east-coast-goats/commit/ab9adf5504bf9a5e25b9308a45ad593e18aaf0fa))
* **delete header file:** delete unused header component and merge ([fb34924](https://github.com/ncharris93/dsd-east-coast-goats/commit/fb34924588b8422b5490338d3c5163d45676510e))
* **removed unused file:** removed unused file in headers ([8289f34](https://github.com/ncharris93/dsd-east-coast-goats/commit/8289f34ac12a83449ef94a072a5f91f7c4d78b27))


## [1.9.0](https://github.com/ncharris93/dsd-east-coast-goats/compare/v1.8.1...v1.9.0) (2025-07-24)

### Features

* **server/auth/actions.ts:** created server actions for authentication ([1dd092a](https://github.com/ncharris93/dsd-east-coast-goats/commit/1dd092af239edc18934ea62130103882377d0140))
* **server:** created placeholder files for all server actions, queries, and mutations ([e4fd3e7](https://github.com/ncharris93/dsd-east-coast-goats/commit/e4fd3e72ad726cec131954fd8cdc78600243dde4))

## [1.8.1](https://github.com/ncharris93/dsd-east-coast-goats/compare/v1.8.0...v1.8.1) (2025-07-23)

### Bug Fixes

* **migrations:** added foreign key to appointment, made patient's person_id unique to prevent dupes ([a49164d](https://github.com/ncharris93/dsd-east-coast-goats/commit/a49164dc8c620b36d64d39dc40b2af4f1b12aeaa))

## [1.8.0](https://github.com/ncharris93/dsd-east-coast-goats/compare/v1.7.0...v1.8.0) (2025-07-22)

### Features

* **googly.svg:** added googly 404 ([4c5daab](https://github.com/ncharris93/dsd-east-coast-goats/commit/4c5daab063983aa85c2cd4d3ea662f8b9a4cdbd8))

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
