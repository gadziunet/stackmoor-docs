---
title: Databases
description: How Stackmoor dumps databases while apps keep running, and how to control it.
---

Copying the files of a running database gives a broken copy. Stackmoor therefore dumps databases first and backs up the dump instead of the database's raw files.

## Detected automatically

| Image | Dump |
|---|---|
| `postgres`, `postgis`, `timescaledb`, `pgvecto-rs`, Immich's postgres | `pg_dumpall` |
| `mysql`, `mariadb`, `percona` | `mariadb-dump` / `mysqldump` of all databases |
| `mongo` | `mongodump` |
| `redis`, `valkey`, `keydb` | `SAVE` – its `dump.rdb` is backed up with the data folder |

The dump uses the credentials the container already has: `POSTGRES_USER`, `MYSQL_ROOT_PASSWORD` / `MARIADB_ROOT_PASSWORD` (or the app user and its database when there is no root password), `MONGO_INITDB_ROOT_USERNAME`.

When the dump worked, the database's own folder inside the stack is left out of the backup. A **stopped** database is not dumped – its files are consistent, so they are backed up as they are.

## Set the type yourself

Use the label `stackmoor.backup.dump` on a service:

```yaml
services:
  db:
    image: my-company/custom-postgres
    labels:
      stackmoor.backup.dump: postgres   # postgres | mysql | mongo | redis | none
```

### When to use `none`

If a service uses a database image but is not the database – for example a one-off migration or backup helper built on the `postgres` image – mark it with `none`. Otherwise Stackmoor tries to dump it, fails and stops the backup of that stack:

```yaml
services:
  migrate:
    image: postgres:17
    command: ["psql", "-h", "db", "-f", "/migrate.sql"]
    labels:
      stackmoor.backup.dump: none
```

## When a dump fails

The backup of that stack stops and the error is shown – a backup without a working dump would look fine but could not be restored. Other stacks are still backed up. Before an update, a failed dump stops the update.

## Restore

On restore, the database folder starts empty, the database initialises itself, and the dump is loaded into it. Stackmoor waits until the database accepts connections (up to 5 minutes) before loading the dump.
