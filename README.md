# URL Shortener / TS

Simple url shortener made with bun & hono

<hr />

<p align="center">
    <img alt="ts" width=50 src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" />
    <img alt="bun" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bun/bun-original.svg" />
    <img alt="mongoose" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongoose/mongoose-original.svg" />
    <img alt="mongodb" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" />
</p>

<hr />

| Path             | Method | Возвращает | Body |
|------------------|--|--|--|
| /:alias  		   | POST | Редирект |  |
| /info/:alias         | GET |  Информацию о ссылке | |
| /shorten | GET  | Объект ссылки | { link: string, alias: string } |
