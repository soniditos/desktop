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
- [TODO](#todo)
- [Licencia](#licencia)
- [Autor](#autor)

## Introducción

Soniditos Desktop es una aplicación de música en streaming construida con Electron. Proporciona una plataforma para transmitir música con características adicionales como Discord Rich Presence y una barra de título personalizada.

## Instalación

Para comenzar con Soniditos Desktop, sigue estos pasos:

1. Clona el repositorio: `git clone https://github.com/soniditos/desktop.git`
2. Navega al directorio del proyecto: `cd soniditos-desktop`
3. Instala las dependencias: `npm install`

## Uso

Ejecuta la aplicación localmente con el siguiente comando:

npm start

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
- [electron-custom-titlebar](https://www.npmjs.com/package/electron-custom-titlebar): ^4.0.2
- [electron-updater](https://www.npmjs.com/package/electron-updater): ^6.1.7

## Desarrollo

Para fines de desarrollo, se utilizan las siguientes devDependencies:

- [electron](https://www.npmjs.com/package/electron): ^28.1.4
- [electron-builder](https://www.npmjs.com/package/electron-builder): ^24.9.1
- [electron-icon-maker](https://www.npmjs.com/package/electron-icon-maker): ^0.0.5

## TODO

- [ ] Mejorar la presencia en Discord.
- [X] Implementar autenticación de usuarios.
- [X] Agregar soporte para listas de reproducción personalizadas.
- [ ] Mejorar la interfaz de usuario para una mejor experiencia del usuario.
- [X] Mejorar la gestión de errores y el registro.
- [ ] Probar la aplicación en varias plataformas.

## Licencia

Este proyecto está licenciado bajo la Licencia ISC; consulta el archivo [LICENSE](./LICENSE) para obtener más detalles.

## Autor

**• virtuanista**

---

¡Siéntete libre de contribuir y proporcionar comentarios! 🎶✨
