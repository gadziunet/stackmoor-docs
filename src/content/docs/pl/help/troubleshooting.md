---
title: Rozwiązywanie problemów
description: Najczęstsze problemy i jak je naprawić.
---

## Panel

### „Port … is already in use” przy instalacji

Port 5001 zajmuje inny program. Zainstaluj na innym porcie: `curl … | sudo PORT=5002 bash`.

### „Folder stacków … nie jest podpięty z hosta”

Folder stacków musi mieć tę samą ścieżkę w kontenerze i na hoście, a `STACKS_DIR` musi na niego wskazywać. Skrypt instalacyjny robi to sam; na Unraid sprawdź [ustawienia kontenera](/pl/start/unraid/).

### Nie mogę wejść do panelu przez adres IP

Panel jest ustawiony tak, żeby otwierał się tylko pod swoją domeną. Jeśli domena nie działa, odblokuj go:

```bash
docker exec stackmoor node src/cli.js unlock
```

### Po aktualizacji panel wygląda po staremu

Odśwież stronę raz przez **Ctrl+Shift+R** (**Cmd+Shift+R** na Macu).

## Stacki

### Stack nie startuje: port zajęty

Komunikat podaje kontener, który używa portu, i proponuje wolny. Zmień lewą liczbę w `ports:` (np. `"8081:80"`) i uruchom ponownie.

### „Brakuje plików konfiguracyjnych, które aplikacja montuje jako pojedyncze pliki”

Stack montuje pojedynczy plik, którego jeszcze nie ma. Najpierw utwórz go w folderze stacka – inaczej Docker utworzyłby w tym miejscu pusty folder.

## Domeny lokalne

### Certyfikat „jeszcze nie wydany”

Pierwszy certyfikat może potrwać minutę lub dwie (netcup: około 15 minut). Kliknij **Odśwież** w zakładce **Domeny**. Jeśli pojawia się tam błąd, zwykle oznacza zły klucz API albo brak uprawnień do strefy DNS.

### Adres się nie otwiera

- Sprawdź rekord DNS: `*.dom.example.com` → IP serwera.
- Filtry DNS i routery z **ochroną przed DNS rebinding** (Pi-hole, AdGuard, ControlD, część routerów) blokują nazwy wskazujące na prywatne adresy. Dodaj tam swoją domenę do wyjątków.
- Porty 80/443 mogą być zajęte przez coś innego – wybierz inne w **Zaawansowane: porty**.

## Kopie zapasowe

### „W magazynie są już kopie zrobione z innym hasłem szyfrowania”

W buckecie i folderze jest już repozytorium utworzone z innym hasłem. Wpisz tamto hasło albo wybierz inny folder na nowe repozytorium.

### „Zrzut bazy danych … się nie udał”

Sprawdź wyjście pod błędem. Najczęstsze przyczyny: zmienne z użytkownikiem lub hasłem bazy zostały zmienione po jej utworzeniu albo usługa tak naprawdę nie jest bazą – wtedy oznacz ją `stackmoor.backup.dump: none` (zob. [Bazy danych](/pl/backups/databases/)).

### „Weryfikacja sum kontrolnych nie powiodła się”

Część danych w buckecie jest uszkodzona albo jej brakuje. Od razu zrób nową kopię, sprawdź stan usług dostawcy magazynu i uruchom ponownie **Zweryfikuj wszystko**.
