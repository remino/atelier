default:
    @just --list

build:
    npm run build

docs:
    npm run dev

format:
    npm run format

lint:
    npm run lint

test:
    npm run test

typecheck:
    npm run typecheck

hooks:
    npx lefthook install
