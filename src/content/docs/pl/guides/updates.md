---
title: Aktualizacje
description: Jak Stackmoor sprawdza nowe wersje siebie i obrazów Twoich stacków.
---

Stackmoor informuje, gdy pojawi się coś nowego. Stacki aktualizują się same tylko po włączeniu [automatycznych aktualizacji](#automatyczne-aktualizacje); sam panel zawsze czeka na Twoje potwierdzenie.

## Ustawienia

**Ustawienia → Aktualizacje:**

- **Sprawdzaj aktualizacje automatycznie** – codziennie albo co tydzień.
- **Sprawdzaj też obrazy stacków** – porównuje lokalne obrazy z rejestrem (Docker Hub, GitHub Container Registry, …).
- **Sprawdź teraz** – sprawdza od razu.

<figure class="shot" data-shot="updates">
<img class="shot-light" src="/screens/pl/updates-light.webp" alt="Ustawienia → Aktualizacje" width="996" height="705" loading="lazy" decoding="async" />
<img class="shot-dark" src="/screens/pl/updates-dark.webp" alt="Ustawienia → Aktualizacje" width="996" height="705" loading="lazy" decoding="async" />
</figure>

## Aktualizacja stacka

Stack z nowym obrazem ma na pulpicie oznaczenie **Aktualizacja**, a na liście stacków strzałkę. Kliknij **Aktualizuj** na jego karcie (albo otwórz go i kliknij **Aktualizuj**): nowe obrazy zostaną pobrane, a kontenery odtworzone. Dane w `./data` zostają.

Jeśli [kopie zapasowe](/pl/backups/setup/) są skonfigurowane, najpierw robi się kopia stacka. Jeśli się nie uda, aktualizacja się nie wykona.

## Automatyczne aktualizacje

Jak w Cloudronie, stacki mogą aktualizować się same. Domyślnie jest to **wyłączone**. Włączysz to w **Ustawienia → Aktualizacje → Automatyczne aktualizacje stacków**:

- wybierz dni i godzinę (np. codziennie o 4:00 – po nocnej kopii),
- odznacz stacki, które wolisz aktualizować sam, np. bazy danych. Nowe stacki są zaznaczone.

<figure class="shot" data-shot="auto-updates">
<img class="shot-light" src="/screens/pl/auto-updates-light.webp" alt="Automatyczne aktualizacje stacków" width="996" height="885" loading="lazy" decoding="async" />
<img class="shot-dark" src="/screens/pl/auto-updates-dark.webp" alt="Automatyczne aktualizacje stacków" width="996" height="885" loading="lazy" decoding="async" />
</figure>

Co dzieje się o tej porze, stack po stacku:

1. Aktualizowane są tylko **działające** stacki z nowszym obrazem. Zatrzymane są pomijane.
2. Jeśli [kopie zapasowe](/pl/backups/setup/) są skonfigurowane, najpierw robi się kopia stacka. Jeśli się nie uda, stack nie jest aktualizowany.
3. Pobierane są nowe obrazy i odtwarzane kontenery – tak samo jak przyciskiem **Aktualizuj**.
4. Panel obserwuje kontenery przez chwilę. Jeśli któryś zatrzyma się z błędem, ciągle się restartuje albo zgłasza *unhealthy*, stack **wraca do obrazów, które miał wcześniej**.

Każde uruchomienie widać w **Ostatnie automatyczne aktualizacje** i w historii stacka (*Automatyczna aktualizacja*, *Powrót do poprzedniej wersji*). **Uruchom teraz** startuje od razu.

Sam panel nigdy nie aktualizuje się automatycznie – zawsze czeka na Twoje potwierdzenie.

:::note
Powrót przywraca poprzednie **obrazy**, nie dane. Jeśli nowa wersja zdążyła zmienić swoją bazę danych i potem się wywaliła, przywróć kopię zrobioną przed aktualizacją w zakładce **Kopie** stacka.
:::

## Caddy aktualizuje się razem z panelem

Jeśli używasz [domen lokalnych](/pl/guides/local-domains/), nie ma nic osobnego do aktualizowania. Każde wydanie Stackmoor ma własny obraz Caddy (z najnowszymi poprawkami Caddy z chwili wydania), a po aktualizacji panel sam przełącza na niego Caddy. Certyfikaty zostają, a adresy są niedostępne tylko przez kilka sekund.

Jeśli nowego obrazu Caddy nie da się pobrać (np. bez internetu), obecny Caddy działa dalej, zakładka **Domeny** pokazuje informację, a panel próbuje ponownie co kilka godzin.

## Aktualizacja Stackmoor

Gdy wyjdzie nowa wersja, pod górnym menu pojawia się czarny pasek *Nowa wersja panelu*, a wersja w pasku stanu na dole dostaje strzałkę. **Co nowego** albo **Aktualizuj** otwiera okno z opisem wydania; **×** chowa pasek do następnej wersji. To samo jest w **Ustawienia → Aktualizacje**.

Po kliknięciu **Aktualizuj teraz** okno pokazuje kolejne kroki. Strona odświeża się sama, gdy nowy panel odpowie – najpóźniej po 30 sekundach – a potem jeszcze raz sprawdza wersję, więc stary komunikat nie zostaje.

Sposób aktualizacji zależy od tego, jak Stackmoor został zainstalowany:

| Instalacja | Jak zaktualizować |
|---|---|
| Skrypt instalacyjny | Kliknij **Aktualizuj teraz**. Panel uruchomi się ponownie na chwilę; stacki działają dalej. |
| Unraid | Zakładka Docker → **Check for Updates** → **Update** przy kontenerze |
| Stały tag wersji (np. `:0.5.0`) | Zmień tag na `latest` albo nową wersję i odtwórz kontener |
| Własny plik compose | `docker compose pull && docker compose up -d` w jego folderze |

<figure class="shot" data-shot="update-dialog">
<img class="shot-light" src="/screens/pl/update-dialog-light.webp" alt="Nowa wersja panelu: pasek pod menu i okno z opisem wydania" width="1280" height="860" loading="lazy" decoding="async" />
<img class="shot-dark" src="/screens/pl/update-dialog-dark.webp" alt="Nowa wersja panelu: pasek pod menu i okno z opisem wydania" width="1280" height="860" loading="lazy" decoding="async" />
</figure>
