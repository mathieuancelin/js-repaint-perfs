babel -e 0 -L all app.js | uglifyjs -bec unused,pure_funcs="['_objectDestructuringEmpty','_classCallCheck']" > app.compiled.js
babel -e 0 -L all functional.js > functional.compiled.js
