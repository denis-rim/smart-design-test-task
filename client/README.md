# Установка и настройка клиента

## Установка

### Необходимо установить зависимости для (frontend & backend)

```
cd client
npm install

cd server
npm install
```

Так же необходим запущенный MongoDB на localhost:27017

MongoDB можно запускать командой:
### `docker run -d -p 27017:27017 mongo`

При необходимости uri можно поменять на любой другой в файле server/src/utils/db.ts

### Запуск проекта

### Frontend использует порт :3000,  backend :5000

Для запуска проекта необходимо выполнить команду:

```
cd client
npm start

cd server
npm run dev
```

После запуска клиента и сервера открыть [http://localhost:3000](http://localhost:3000) 
