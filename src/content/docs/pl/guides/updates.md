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

## Caddy aktualizuje się razem z panelem

Jeśli używasz [domen lokalnych](/pl/guides/local-domains/), nie ma nic osobnego do aktualizowania. Każde wydanie Stackmoor ma własny obraz Caddy (z najnowszymi poprawkami Caddy z chwili wydania), a po aktualizacji panel sam przełącza na niego Caddy. Certyfikaty zostają, a adresy są niedostępne tylko przez kilka sekund.

Jeśli nowego obrazu Caddy nie da się pobrać (np. bez internetu), obecny Caddy działa dalej, **Ustawienia → Domeny** pokazują informację, a panel próbuje ponownie co kilka godzin.

## Aktualizacja Stackmoor

Gdy wyjdzie nowa wersja, **Ustawienia → Aktualizacje** pokazują, co nowego. Sposób aktualizacji zależy od tego, jak Stackmoor został zainstalowany:

| Instalacja | Jak zaktualizować |
|---|---|
| Skrypt instalacyjny | Kliknij **Aktualizuj Stackmoor**. Panel uruchomi się ponownie na chwilę; stacki działają dalej. |
| Unraid | Zakładka Docker → **Check for Updates** → **Update** przy kontenerze |
| Stały tag wersji (np. `:0.5.0`) | Zmień tag na `latest` albo nową wersję i odtwórz kontener |
| Własny plik compose | `docker compose pull && docker compose up -d` w jego folderze |
