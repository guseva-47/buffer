## Буффер

Приложение представляет собой буфер в который можно добавлять, а затем единожды считывать записи (строки).


## Установка и запуск

Склонируйте проект
<b>https://github.com/guseva-47/buffer</b>

Установите зависимости командой
```
yarn install
```

Для запуска выполните команду
```
yarn dev
```


## Конфигурация

В .env можно настроить:<br>
<b>PORT</b> - Число. Порт на котором локально будет запущено приложение. Значение по умолчанию: 3003<br>
<b>PERIOD</b> - Объект. Период жизни одной записи. 
Поля объекта могут быть "years" || "months" || "date" || "hours" || "minutes" || "seconds" || "milliseconds".<br>Значения полей - натуральные числа.<br>Значение по умолчанию: { "minutes": 1 }<br>
<b>RECORDS_COUNT</b> - Число. Количество записей, которое будет выдано пользователю. Значение по умолчанию: 10<br>


## Маршруты REST API

Запрос | Описание
---------------|-----------------------------------
POST /api/give | Добавление новой записи в буфер.<br>Body запроса должно содержать JSON: <br>```{ "record" : "<Новая строка>" }```<br>Если тело запроса не соотвествует формату, возвращается код 400.<br>При успехе возвращается код 200, добавленная строка в теле ответа.
GET /api/recive?count={value} | Чтение записей из буфера.<br>Имеет необязательный query-параметр "count" - количество записей, которое вернется из буфера.<br>Если не задавать "count", вернется стандартное количество число записей.
