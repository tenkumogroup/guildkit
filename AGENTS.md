# AGENTS.md

This file provides guidance to AI agents when working with code in this repository.

## Project Structure

GuildKit is a Next.js application. It follows the directory structure of Next.js.

### Architecture Notes

- GuildKit is built as a Next.js-based web application.
- GuildKit uses [Prisma](https://www.prisma.io/docs/) as the ORM.
- GuildKit uses an S3-compatible object storage. It uses [`@aws-sdk/client-s3` npm package](https://www.npmjs.com/package/@aws-sdk/client-s3).
- GuildKit uses Podman Compose, which is compatible with Docker Compose, to run the database and object storage server on the local development machines.
- GuildKit uses pnpm instead of npm.
- GuildKit does not use npm scripts. We use [mise-en-place](https://mise.jdx.dev) instead. The tasks are defined in mise.toml and the files under .mise/tasks/.

## Quick Start

1. `mise install`
2. `mise build`
3. `mise dev`

## Dev Commands

- `mise install` - Install all dependencies.
- `mise dev` - Start dev servers including application server, database server, and object storage server.
- `mise build` - Build application.
- `mise lint` - Run `tsc --noEmit` and ESLint.
- `mise fix` - Fix linting issues.
- `mise clean` - Delete the Docker containers and gitignore'd files except for mise.local.toml.
- `mise refresh` - Recreate the Docker containers and pnpm-lock.yaml, and update pnpm.
