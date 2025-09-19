# Flujo de trabajo en los repositorios, branch strategy y PR's

Este documento definira el flujo de trabajo para los repositorios de front-end (Angular) y back-end (Laravel) en el proyecto, utilizando los servidores de pruebas (f_testing) y producción (f_production).

---

## Índice

- [Objetivos](#objetivos)
- [Estructura de ramas](#estructura-de-ramas)
- [Creación de ramas](#creación-de-ramas)
- [Despliegues en el frontend](#despliegues-en-el-front)
- [Notas importantes](#notas-importantes)
- [Resumen final](#resumen-final)

## Objetivos

- Mantener un **código limpio y estable** en producción.
- Garantizar que **todas las funcionalidades** pasen por pruebas antes de llegar a producción.
- Estandarizar **nombres de ramas**, **commits** y **pull requests**.
- Reducir errores en despliegues y evitar subir código sin probar.

## Estructura de ramas

| Rama          | Uso                                                                                           |
| ------------- | --------------------------------------------------------------------------------------------- |
| custom_branch | Esta rema será particular a cada desarrollador de acuerdo a la tarea que tenga asignada .     |
| develop       | Rama de integración donde se unen todas las tareas probadas en local por los desarrolladores. |
| f_testing     | Servidor de pruebas. Aquí se despliega el código para validaciones de QA y equipo.            |
| f_production  | Servidor de producción. Código listo y aprobado.                                              |
| master        | Respaldo de producción para hotfix en casos de emergencia.                                    |

Teniendo en cuenta la anterior descripción, el proceso de integración se realizara de la siguiente manera

1.  Cada desarrollador, tendrá como base la rama develop, es decir que desde allí deberá sacar las ramas especificas según la tarea asignada (mas adelante en este documento se encontrara la guía para crear y nombrar las ramas)
2.  Una vez finalizado el desarrollo, se procederá a crear un **PR** hacia `develop`
3.  Cuando el PR se haya aprobado e integrado en develop, se debe eliminar la rama de trabajo (`feature/T#` o `fix/#`) para prevenir saturar el repositorio con ramas viejas e inutilizadas.
4.  Posteriormente, la persona encargada de los despliegues se encargara de hacer **Pull Request (PR)** para integrar `develop` con `f_testing`, y de la misma forma para integrar `f_testing` con `f_production`.
5.  Al comprobar que los cambios son estables a lo largo de todas las ramas, se abrira un PR para integrar con `master`.

> Sera responsabilidad del encargado de los despliegues mantener las ramas al día e informar sobre actualizaciones

![gitflow-backend](https://github.com/user-attachments/assets/ea9bd56d-d7b2-4886-9ec8-b4a88b7d1574)

---

## Creación de ramas

Cada desarrollador debe crear ramas a partir de `develop` siguiendo esta nomenclatura:

```
<tipo>/T<número_ticket>_<descripción>
```

> En este caso **T** es el sufijo de **Ticket**

> La descripción debe estar separada por guiones al piso (\_)

**Tipos de ramas**

- **feature**: Nueva funcionalidad
- **fix**: Corrección de errores
- **refactor**: Refactorización y migración

**Ejemplos**

- feature/T5059_crear_crud_usuarios
- fix/T5060_corregir_validacion_login
- refactor/T5070_optimizar_consulta_clientes

**Numero de ticket**

El numero del ticket hace referencia al numero de la tarea creada en el [K-project](https://kproject.garantiascomunitarias.com/), entonces, al crear la tarea el tablero genera un identificador

Entonces, según la imagen, el nombre de la rama podría ser

`feature/T4983_matriz_eventos`

<img width="1578" height="717" alt="image" src="https://github.com/user-attachments/assets/cc77bd61-62b5-4b5b-921e-7afdb68186b6" />

---

## Pull requests (PR)

Todos los **Pull Requests** deben incluir una **descripción clara y concisa** sobre lo que se está integrando en el proyecto. Se recomienda que esta descripción resuma los cambios, las mejoras o las correcciones que se están proponiendo. Aquí se propone esta estructura básica, sin embargo se sugiere ser lo mas especifico posible

```markdown
## Descripción

Explica el objetivo de este PR y los cambios realizados.

## Cambios/mejoras realizados

- Cambio/mejora 1
- Cambio/mejora 2
- Cambio/mejora 3

## Notas adicionales

Puntos adicionales que puedan ser de valor para el pr
```

---

## Despliegues en el front

Para ambos repositorios se seguirá la misma lógica de integración y despliegue, con una pequeña diferenciación, para el caso especifico del front, debido a los archivos compilados que se deben subir a pruebas o producción, se seguira el siguiente flujo

1. Crear rama desde `develop`.
2. Desarrollar y probar en local.
3. Hacer **pull de develop** para estar sincronizado.
4. Crear **PR hacia develop**.

5. Una vez aprobado, el responsable de despliegue se encargara de realizar los pasos necesarios para subir los cambios al servidor correspondiente, todos los despliegues se realizaran desde la rama **develop** y no desde ramas particulares, y solo los realizara una persona, esto con el fin de prevenir que se compilen modificaciones especificas del ambiente de trabajo del desarrollador

## Notas importantes

Al subir cambios al repositorio remoto, cada desarrollador debe asegurarse de incluir únicamente los archivos estrictamente necesarios. No se deben subir configuraciones específicas del entorno local, como modificaciones en direcciones IP dentro de package.json. Los cambios en este archivo solo deben ser enviados cuando:

- El proyecto requiera agregar una nueva dependencia.
- Se deban realizar actualizaciones necesarias para el funcionamiento general del proyecto.

## Resumen final

- Solo habrá una persona designada para realizar los despliegues. En caso de ausencia, se debe asignar a otra persona que pueda asumir la tarea.
- Cada pull request debe incluir una descripción clara de la tarea realizada, los ajustes aplicados y cualquier información adicional que aporte valor al PR.
- Se debe respetar la convención de nombres de ramas establecida al inicio de este documento.
- Al integrar ramas personales en las ramas de desarrollo (develop), producción (f_production) o master, estas deben eliminarse para evitar acumulación innecesaria en el repositorio remoto.
- Los cambios directos en master o f_production solo están permitidos para casos de hotfix. Todos los demás despliegues deben gestionarse a través de la rama develop.
