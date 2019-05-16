# @funbox/blueprinter-frontend

Рендерер API Blueprint - утилита, получающая на вход AST API в формате Elements и генерирующая HTML-страницу с документацией.

## Установка библиотеки

```
npm install --save @funbox/blueprinter-frontend
```

## Использование библиотеки

Добавить команды в `package.json`:

```json
{
  "scripts": {
    "dev": "node node_modules/@funbox/blueprinter-frontend/bin/index.js -i doc.apib -s -p 3000",
    "doc": "node node_modules/@funbox/blueprinter-frontend/bin/index.js -i doc.apib -o index.html"
  }
}
```
