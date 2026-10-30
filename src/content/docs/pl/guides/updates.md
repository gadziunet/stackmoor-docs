---
title: Aktualizacje
description: Jak Stackmoor sprawdza nowe wersje siebie i obrazów Twoich stacków.
---

Stackmoor informuje, gdy pojawi się coś nowego. **Nic nie jest aktualizowane bez Twojego potwierdzenia.**

## Ustawienia

**Ustawienia → Aktualizacje:**

- **Sprawdzaj aktualizacje automatycznie** – codziennie albo co tydzień.
- **Sprawdzaj też obrazy stacków** – porównuje lokalne obrazy z rejestrem (Docker Hub, GitHub Container Registry, …).
- **Sprawdź teraz** – sprawdza od razu.

## Aktualizacja stacka

Stack z nowym obrazem ma strzałkę na liście i ramkę z listą obrazów. Otwórz go i kliknij **Aktualizuj**: nowe obrazy zostaną pobrane, a kontenery odtworzone. Dane w `./data` zostają.

Jeśli [kopie zapasowe](/pl/backups/setup/) są skonfigurowane, najpierw robi się kopia stacka. Jeśli się nie uda, aktualizacja się nie wykona.

## Aktualizacja Caddy

Jeśli używasz [domen lokalnych](/pl/guides/local-domains/), sprawdzanie obejmuje też kontener Caddy. Gdy wyjdzie nowy obraz Caddy, **Ustawienia → Aktualizacje** pokazują kartę **Caddy** – kliknij **Aktualizuj Caddy**. Nowy obraz zostanie pobrany, a kontener odtworzony; certyfikaty zostają, a adresy są niedostępne tylko przez kilka sekund.

## Aktualizacja Stackmoor

Gdy wyjdzie nowa wersja, **Ustawienia → Aktualizacje** pokazują, co nowego. Sposób aktualizacji zależy od tego, jak Stackmoor został zainstalowany:

| Instalacja | Jak zaktualizować |
|---|---|
| Skrypt instalacyjny | Kliknij **Aktualizuj Stackmoor**. Panel uruchomi się ponownie na chwilę; stacki działają dalej. |
| Unraid | Zakładka Docker → **Check for Updates** → **Update** przy kontenerze |
| Stały tag wersji (np. `:0.5.0`) | Zmień tag na `latest` albo nową wersję i odtwórz kontener |
| Własny plik compose | `docker compose pull && docker compose up -d` w jego folderze |
