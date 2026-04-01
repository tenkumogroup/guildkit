# GuildKit

A CMS for job search services

> [!CAUTION]
> Currently WIP. Do not use in production.

## Development

### Prerequisites

- [mise-en-place](https://mise.jdx.dev/installing-mise.html)
  - mise will install Node.js, corepack, and pnpm.
- [Podman](https://podman.io)
  - Requires Podman engine only. Podman Desktop is optional.

### Run local server

First, start Podman daemon.

Then run the following commands:

```sh
cd /path/to/guildkit
cp ./.env.example ./.env
mise install
mise dev
```

Now GuildKit will be served via http://localhost:3000.

RustFS' dashboard is also available via http://localhost:9001.

### Wording conventions

- organization: The organization (i.e. company in most cases) to hire the candidate(s).
- recruiter: The recruitment staff (user) who belongs to the organization(s).
- employer: Only use this term if you want to express both the organization or its recruitment staff(s).

## License

This repository is licensed under the [Apache License 2.0](./LICENSE.txt).

## Copyright & Credit

Copyright (c) 2025-present Jumpei Ogawa and the contributors

This project includes source code derived from:

- [React Aria Tailwind Starter Kit](https://react-spectrum.adobe.com/react-aria/getting-started.html#starter-kits) by [Adobe](https://www.adobe.com)
  - License: [Apache License 2.0](./docs/legal/LICENSE-react-aria-starter.txt)
- [JOB PORTAL](https://github.com/irakozetony/jobportal) by [**@irakozetony**](https://github.com/irakozetony)
  - License: [MIT](https://github.com/irakozetony/jobportal/blob/69f5478cb18c97e5a703dfc2235e2b9c900f40c0/LICENSE)
  - Hash of the HEAD at the time of fork: [69f5478](https://github.com/irakozetony/jobportal/commit/69f5478cb18c97e5a703dfc2235e2b9c900f40c0)

This project includes thirdparty assets listed in [CREDITS.md](./static/vendor/CREDITS.md)
