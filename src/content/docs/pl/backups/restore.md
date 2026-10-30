---
title: Przywracanie
description: Przywracanie stacka z kopii albo zrobienie jego klonu.
---

## Przywróć stack

1. Otwórz stack → zakładka **Kopie**. Każda kopia ma datę i rozmiar; kopie sprzed aktualizacji są oznaczone.
2. Kliknij **Przywróć** przy wybranej kopii.
3. Wpisz nazwę stacka, żeby potwierdzić, i kliknij **Przywróć**.

Co się dzieje:

1. stack jest wyłączany,
2. jego obecny folder trafia do `/opt/stacks/.trash/<nazwa>-before-restore-<data>` – nic nie jest kasowane,
3. pliki z kopii wracają,
4. bazy danych startują puste i są wczytywane ze zrzutów,
5. cały stack uruchamia się ponownie.

Wyjście widać na żywo i zapisuje się w **Historii** stacka.

## Przywróć usunięty stack

**Ustawienia → Backup** pokazuje kopie wszystkich stacków, także usuniętych. Kliknij tam **Przywróć**.

## Kopia stacka (klon)

W formularzu przywracania zmień **Przywróć jako stack** na nową nazwę, np. `nextcloud-test`. Kopia zostanie przywrócona jako nowy stack obok oryginału.

:::caution
Klon nie wystartuje, jeśli jego `compose.yaml` używa tych samych publikowanych portów albo `container_name` co oryginał. Zmień je w edytorze klonu i uruchom go.
:::

## Przywrócenie całego serwera

Przywrócenie wszystkiego naraz – ustawień panelu i wszystkich stacków – pojawi się razem z kreatorem instalacji. Ustawienia panelu już są w każdej kopii, więc kopie robione dziś da się do tego użyć.

## Tylko jedna aplikacja, tylko jej dane

Wszystkie stacki są w jednym repozytorium w buckecie, ale przywracanie pobiera tylko dane wybranej kopii. Przywrócenie aplikacji o rozmiarze 500 MB nie pobiera leżącej obok aplikacji o rozmiarze 50 GB.
