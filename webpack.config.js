'use strict';

let path = require('path');

module.exports = {
  mode: 'development', // Есть ДВА режима development и productio.  development режим разработки в он работает быстрее, а когда уже всё готово и нет косякой тогда mode: production он уже оптимизирует код
  entry: './js/script.js', // файл с которго начинаю. Если настройки стандарные то он должен лежать и называться строго src/index.js. Если в ручном режиме и надо подключить несколько файлов тогда это делается через создание объекта, как output, что ниже  или смотри инструкцию в разеде "entry"
  output: {
    filename: 'bundle.js', // как бдет называтся конечный файл
    path: __dirname + '/js' //куда буду складывать фйл в какую папку. Корень папки  __dirname и путь + '/dist/js'
  },
  watch: true, //  watch: true, - будет следить за изминениями в моих файлах 

  devtool: "source-map", // тут хранится инфа об исходном коде и где он лежит

  module: {} // тут разные модули типа TypeScript Sass  Less
};
