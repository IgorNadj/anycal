## Anycal


Run with e.g. docker-compose:

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

