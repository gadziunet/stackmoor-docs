---
title: Bazy danych
description: Jak Stackmoor robi zrzuty baz danych w trakcie działania aplikacji i jak tym sterować.
---

Kopiowanie plików działającej bazy danych daje uszkodzoną kopię. Dlatego Stackmoor najpierw robi zrzut bazy i do kopii trafia zrzut zamiast surowych plików bazy.

## Wykrywane automatycznie

| Obraz | Zrzut |
|---|---|
| `postgres`, `postgis`, `timescaledb`, `pgvecto-rs`, postgres z Immicha | `pg_dumpall` |
| `mysql`, `mariadb`, `percona` | `mariadb-dump` / `mysqldump` wszystkich baz |
| `mongo` | `mongodump` |
| `redis`, `valkey`, `keydb` | `SAVE` – jego `dump.rdb` trafia do kopii razem z folderem danych |

Zrzut używa danych logowania, które kontener już ma: `POSTGRES_USER`, `MYSQL_ROOT_PASSWORD` / `MARIADB_ROOT_PASSWORD` (albo użytkownika aplikacji i jego bazy, gdy nie ma hasła roota), `MONGO_INITDB_ROOT_USERNAME`.

Gdy zrzut się uda, własny folder bazy w stacku jest pomijany w kopii. **Zatrzymana** baza nie jest zrzucana – jej pliki są spójne, więc trafiają do kopii bez zmian.

## Ustaw typ samodzielnie

Użyj etykiety `stackmoor.backup.dump` przy usłudze:

```yaml
services:
  db:
    image: moja-firma/wlasny-postgres
    labels:
      stackmoor.backup.dump: postgres   # postgres | mysql | mongo | redis | none
```

### Kiedy użyć `none`

Jeśli usługa używa obrazu bazy danych, ale nie jest bazą – na przykład jednorazowa migracja albo pomocnik zbudowany na obrazie `postgres` – oznacz ją jako `none`. Inaczej Stackmoor spróbuje zrobić jej zrzut, nie uda mu się i zatrzyma kopię tego stacka:

```yaml
services:
  migrate:
    image: postgres:17
    command: ["psql", "-h", "db", "-f", "/migrate.sql"]
    labels:
      stackmoor.backup.dump: none
```

## Gdy zrzut się nie uda

Kopia tego stacka zostaje przerwana i widać błąd – kopia bez działającego zrzutu wyglądałaby dobrze, ale nie dałoby się jej przywrócić. Pozostałe stacki są kopiowane normalnie. Przed aktualizacją nieudany zrzut zatrzymuje aktualizację.

## Przywracanie

Przy przywracaniu folder bazy startuje pusty, baza sama się inicjuje, a potem wczytywany jest do niej zrzut. Stackmoor czeka, aż baza zacznie przyjmować połączenia (do 5 minut), zanim wczyta zrzut.
