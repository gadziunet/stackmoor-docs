---
title: Adres panelu
description: Panel pod własną domeną i opcjonalna blokada wejścia przez adres IP.
---

Gdy [domeny lokalne](/pl/guides/local-domains/) działają, sam panel też może mieć adres.

## Nadaj panelowi adres

**Ustawienia → Domeny → Adres panelu:** wpisz nazwę, np. `stackmoor`, i kliknij **Zapisz**. Panel będzie też dostępny pod `https://stackmoor.dom.example.com`.

Zapis tylko przeładowuje konfigurację Caddy – nic nie jest pobierane ani restartowane.

## Panel tylko pod tym adresem

Możesz zablokować otwieranie panelu przez adres IP (np. `http://192.168.1.50:5001`). Panel otworzy się wtedy tylko pod swoją domeną, a wejścia przez IP zostaną na nią przekierowane.

Żeby nie dało się samemu odciąć:

- opcję **Panel tylko pod tym adresem** można włączyć **tylko wtedy, gdy masz panel otwarty pod jego domeną** – to dowód, że adres działa,
- zapytania z samego serwera (np. sprawdzanie, czy panel działa) nadal przechodzą.

:::note
Dla przeglądarki domena i adres IP to dwie różne strony, więc po przełączeniu zalogujesz się jeszcze raz.
:::

## Gdy domena przestanie działać

Odblokuj panel w terminalu serwera:

```bash
docker exec stackmoor node src/cli.js unlock
```

Na Unraid podaj nazwę swojego kontenera zamiast `stackmoor`. Panel znowu otworzy się przez adres IP.
