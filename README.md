# Календарь звонков

[![CI](https://github.com/Keeller/ai-for-developers-project-386/actions/workflows/ci.yml/badge.svg)](https://github.com/Keeller/ai-for-developers-project-386/actions/workflows/ci.yml)
[![hexlet-check](https://github.com/Keeller/ai-for-developers-project-386/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Keeller/ai-for-developers-project-386/actions)

Учебный сервис для создания типов встреч, публикации страницы бронирования и
записи на свободные временные слоты. Сейчас в репозитории находится базовый
технический каркас без предметной функциональности.

## Стек

- Node.js 24 и npm workspaces
- Fastify и TypeScript — backend
- React, Vite и Mantine — frontend
- Vitest — тесты
- ESLint и Prettier — статические проверки
- GitHub Actions и release-please — CI и релизы
- Docker — единый production-образ frontend и backend

## Установка

```bash
git clone https://github.com/Keeller/ai-for-developers-project-386.git
cd ai-for-developers-project-386
npm ci
```

## Локальный запуск

```bash
npm run dev
```

После запуска доступны:

- frontend — <http://localhost:5173>;
- проверка backend — <http://127.0.0.1:3000/api/health>.

Vite перенаправляет запросы frontend с префиксом `/api` на локальный Fastify.
Порт backend можно изменить переменной `PORT`, адрес — переменной `HOST`.

## Запуск в Docker

Production-образ собирает оба приложения и запускает один Fastify-процесс,
который отдаёт API и статические файлы frontend:

```bash
npm run docker:build
npm run docker:run
```

После запуска приложение доступно на <http://localhost:3000>, health endpoint —
на <http://localhost:3000/api/health>. Аналогичный запуск через Compose:

```bash
docker compose up --build
```

Контейнер запускается от непривилегированного пользователя и содержит встроенную
проверку работоспособности. Переменные `HOST` и `PORT` внутри готового образа по
умолчанию равны `0.0.0.0` и `3000`.

## Проверки

```bash
npm test              # дымовой HTTP-тест
npm run lint          # ESLint
npm run format:check  # Prettier без изменения файлов
npm run build         # production-сборка обоих приложений
npm run check         # все проверки последовательно
```

GitHub Actions выполняет `npm run check`, собирает Docker-образ и проверяет в
контейнере frontend и `/api/health` на каждый push и pull request.

## Отчёты качества

```bash
npm run report
```

Команда собирает неблокирующие отчёты type-aware ESLint и SonarJS, Knip,
jscpd и Vitest Coverage в каталог `reports`. Основная точка входа —
`reports/README.md`; подробные HTML-отчёты создаются для покрытия и
дублирования кода.

На GitHub каждый CI-прогон прикрепляет каталог как artifact
`quality-reports`. Найденные проблемы пока не влияют на итог CI и служат только
для наблюдения; обязательными остаются проверки `npm run check`.

## Релизы

Сообщения коммитов следуют [Conventional Commits](https://www.conventionalcommits.org/):
например, `feat: add booking page` или `fix: validate slot duration`.
После изменений в `main` release-please поддерживает release PR с версией и
`CHANGELOG.md`.

Для стандартного `GITHUB_TOKEN` в настройках репозитория должны быть включены
права Actions на запись и создание pull request.

## Документы продукта

- [Исследование пользовательских сценариев](product/research.md)
- [Business Requirements Document](product/brd.md)

---

<details>
<summary>Автоматические тесты Хекслета</summary>

Тесты запускаются на каждый коммит. За запуск отвечает файл
`.github/workflows/hexlet-check.yml` — не удаляйте и не переименовывайте ни его,
ни репозиторий.

</details>

Учебный проект [Хекслета](https://ru.hexlet.io/programs/ai-for-developers).
