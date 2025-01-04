# Taller 2 IDWM - Ionic

El proyecto fue construido con [Ionic](https://github.com/ionic-team) en base a [Angular CLI](https://github.com/angular/angular-cli) version 18.2.12.

## Levantamiento del proyecto
### Necesita instalar Ionic, JavaScript, Node.js y npm en su computadora, de lo contrario no va a funcionar correctamente.
### Pasos para levantarlo

1. Debe de ubicarse en alguna carpeta en su computadora

2. Abrir la consola

3. En la consola, escribir lo siguiente: "git clone https://github.com/AlbertoLyons/taller-2-idwm-ionic-8ecdh5.git" y esperar a que el proyecto se clone

4. Una vez que termine de clonarse y guardarse en su computadora, debe de dirigirse a la carpeta creada desde la consola utilizando: "cd taller-2-idwm-ionic-8ecdh5"

5. Dentro de la carpeta desde la consola, escribir "npm install" para restaurar los paquetes necesarios para el funcionamiento del proyecto

6. Una vez instalados los paquetes, para iniciar la página debe de escribir "ionic serve"

7. Para acceder a la página, debe de abrir un navegador y ingresar la dirección "localhost:8100" para poder visualizarla
### Importante 

El proyecto se conecta a una API REST de ASP .NET CORE 8 de manera local a través de la dirección "localhost:5225/api". Sin esa API levantada y corriendo, en el proyecto no funcionarán los metodos HTTP que realiza. El proyecto de la API REST es el siguiente:

- https://github.com/AlbertoLyons/Taller1IDWM.git

Si no tiene el proyecto de la API REST, clonelo y siga los pasos para levantarlo mediante el README que tiene