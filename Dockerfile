FROM oven/bun
WORKDIR /usr/src/app
COPY . .
RUN bun install