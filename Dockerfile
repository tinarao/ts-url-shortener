FROM oven/bun
COPY . .
RUN bun install
CMD "bun run --hot src/index.ts"