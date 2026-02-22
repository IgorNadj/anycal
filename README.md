## Anycal

WIP

... 

"Add anything to your calendar"

Anycal is a web application that lets you add anything to your calendar.

### Demo

https://anycal.dev.igornadj.io/

### Usage

`yarn dev`

### Deployment

With docker-compose:

```
services:
  anycal:
    image: igornadj/anycal:main
    env_file:
      - .env
    port:
    volumes:
      - anycal:/home/db
      
volumes:
  anycal:
```
