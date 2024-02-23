# Soniditos Desktop

![Soniditos Logo](https://soniditos.com/storage/branding_media/959516b0-83c4-41f5-ac62-c56766df775a.png)

## Tabla de Contenidos

- [Introducción](#introducción)
- [Instalación](#instalación)
- [Uso](#uso)
- [Scripts](#scripts)
- [Construcción y Distribución](#construcción-y-distribución)
- [Dependencias](#dependencias)
- [Desarrollo](#desarrollo)
- [TO-DO](#to-do)
- [Licencia](#licencia)
- [Autor](#autor)

## Introducción

Soniditos Desktop es una aplicación de música en streaming construida con Electron.
Proporciona acceso a la plataforma de música con características adicionales como Discord Rich Presence en tiempo real.

## Instalación

Para comenzar con Soniditos Desktop, sigue estos pasos:

1. Clona el repositorio: `git clone https://github.com/soniditos/desktop.git`
2. Navega al directorio del proyecto: `cd soniditos-desktop`
3. Instala las dependencias: `npm install`
4. Inicia una distribución: `npm run dist`
5. ¡Busca en la carpeta generada `/dist` Soniditos Setup.exe y disfruta! 

## Uso

Haz cambios y ejecuta la aplicación localmente con el siguiente comando para editarla antes de hacer una distribución:

npm run start

## Scripts

**• start:** Inicia la aplicación utilizando Electron.

**• pack:** Crea una versión empaquetada de la aplicación en el directorio `./dist`.

**• dist:** Construye paquetes distribuibles para la aplicación.

**• generate-icons:** Crea iconos específicos de la plataforma utilizando Electron Icon Maker.

## Construcción y Distribución

La aplicación se construye y distribuye utilizando Electron Builder. La configuración de construcción incluye ajustes para las plataformas Windows, macOS y Linux.

**• Windows:** Icono - `./build/icons/win/icon.ico`

**• macOS:** Icono - `./build/icons/mac/icon.icns`

**• Linux:** Icono - `./build/icons/png/32x32.png`

La distribución se gestiona a través de las versiones de GitHub.

## Dependencias

- [discord-rpc](https://www.npmjs.com/package/discord-rpc): ^4.0.1

## Desarrollo

Para fines de desarrollo, se utilizan las siguientes devDependencies:

- [electron](https://www.npmjs.com/package/electron): ^28.1.4
- [electron-builder](https://www.npmjs.com/package/electron-builder): ^24.9.1
- [electron-icon-maker](https://www.npmjs.com/package/electron-icon-maker): ^0.0.5

## TO-DO

- [X] Compilar la aplicación en varias plataformas.
- [X] Mejorar la presencia en Discord.
- [ ] Habilitar la posibilidad de seleccionar cuentas de Google Chrome.
- [ ] Mejorar la ventana con sus propios estilos.
- [ ] Mejorar la gestión de errores y el registro.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT; consulta el archivo [LICENSE](./license) para obtener más detalles.

## Autor

**• virtuanista**

---

¡Siéntete libre de contribuir y proporcionar comentarios! 🎶✨
