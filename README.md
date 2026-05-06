# Learning Tracker

## Описание проекта

Learning Tracker - это веб-приложение для отслеживания и организации самообразовательной деятельности. Оно помогает пользователям управлять своими учебными материалами, такими как курсы и книги, ставить цели, а также фиксировать время, затраченное на обучение.

Основная идея проекта — предоставить единое пространство для систематизации процесса обучения, визуализации прогресса и повышения мотивации. Пользователи могут добавлять новые учебные материалы, распределять их по категориям, отслеживать прогресс по каждому из них и анализировать свою продуктивность с помощью дашборда.

## Как запустить проект

Проект состоит из двух частей: frontend и backend. Их нужно запускать в отдельных терминалах.

### Backend

```bash
cd back-end
npm i
npm run dev
```
Backend запускается на `http://localhost:3002`.

### Frontend

```bash
cd front-end
npm i
npm run dev
```
После запуска frontend будет доступен по адресу, который выведет Vite.

## Архитектура проекта

```text
learning-tracker/
├── front-end/                 # Клиентская часть приложения
│   ├── src/
│   │   ├── app/               # Инициализация приложения, роутер, store, провайдеры
│   │   ├── entities/          # Бизнес-сущности: курсы, книги, цели, сессии, категории
│   │   ├── features/          # Пользовательские сценарии (например, формы создания)
│   │   ├── pages/             # Страницы приложения (Дашборд, Курсы, Книги и т.д.)
│   │   ├── shared/            # Общие API-клиенты, конфигурация, хуки и UI-компоненты
│   │   ├── widgets/           # Крупные UI-блоки (например, списки сущностей, метрики)
│   │   ├── index.css          # Глобальные стили
│   │   └── main.tsx           # Точка входа React-приложения
│   ├── vite.config.ts         # Конфигурация Vite и proxy для backend
│   └── package.json           # Скрипты и зависимости frontend
│
├── back-end/                  # Серверная часть приложения
│   ├── data/
│   │   └── db.json            # Локальное JSON-хранилище данных
│   ├── src/
│   │   └── server.js          # Express-сервер и REST API
│   └── package.json           # Скрипты и зависимости backend
│
├── .gitignore
└── README.md
```

Frontend построен по модульному подходу, близкому к [Feature-Sliced Design](https://feature-sliced.design/):
- **shared:** Переиспользуемый код, не зависящий от бизнес-логики (UI-кит, хуки, API-клиенты).
- **entities:** Бизнес-сущности (книга, курс, цель) и работа с ними.
- **features:** Взаимодействия с пользователем, которые имеют бизнес-ценность (создание книги, запись сессии).
- **widgets:** Композиционный слой для объединения `entities` и `features` в самостоятельные блоки (список курсов, метрики дашборда).
- **pages:** Страницы приложения, которые компонуют виджеты и `features`.
- **app:** Глобальные стили, провайдеры и настройки приложения.

Backend представляет собой простой Express API с JSON-хранилищем в файле `back-end/data/db.json`.

## Используемые технологии

- **Frontend:**
  - React 18
  - TypeScript
  - Vite
  - Redux Toolkit (для управления состоянием)
  - TanStack Router (для клиентской маршрутизации)
  - CSS Modules (для стилизации компонентов)

- **Backend:**
  - Node.js
  - Express
  - CORS

## Backend API

Реализованы CRUD-операции для всех основных сущностей:

- **Категории:**
  - `GET /api/categories`
  - `POST /api/categories`
  - `PATCH /api/categories/:id`
  - `DELETE /api/categories/:id`
- **Курсы:**
  - `GET /api/courses`
  - `POST /api/courses`
  - `PATCH /api/courses/:id`
  - `DELETE /api/courses/:id`
- **Книги:**
  - `GET /api/books`
  - `POST /api/books`
  - `PATCH /api/books/:id`
  - `DELETE /api/books/:id`
- **Цели:**
  - `GET /api/goals`
  - `POST /api/goals`
  - `PATCH /api/goals/:id`
  - `DELETE /api/goals/:id`
- **Учебные сессии:**
  - `GET /api/learning-sessions`
  - `POST /api/learning-sessions`
  - `PATCH /api/learning-sessions/:id`
  - `DELETE /api/learning-sessions/:id`
