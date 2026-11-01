---
title: Serwer
description: Restart serwera z panelu albo według harmonogramu, informacja o wymaganym restarcie i automatyczne łatki systemu.
---

**Ustawienia → Serwer** dotyczy maszyny, na której działa Stackmoor: jak długo działa, czy wymaga restartu, restarty (od razu albo według harmonogramu) i aktualizacje bezpieczeństwa samego systemu.

<figure class="shot" data-shot="server">
<img class="shot-light" src="/screens/pl/server-light.webp" alt="Ustawienia → Serwer" width="996" height="1092" loading="lazy" decoding="async" />
<img class="shot-dark" src="/screens/pl/server-dark.webp" alt="Ustawienia → Serwer" width="996" height="1092" loading="lazy" decoding="async" />
</figure>

## Restart serwera

**Uruchom ponownie serwer** po potwierdzeniu restartuje całą maszynę. Panel i wszystkie stacki zatrzymują się na minutę lub dwie; strona czeka i odświeża się sama, gdy panel wróci.

Po każdym restarcie – z panelu, według harmonogramu, po łatce albo po braku prądu – Stackmoor uruchamia stacki, które działały wcześniej. Także te bez `restart:` w compose, które Docker zostawiłby zatrzymane. Stack, który sam zatrzymałeś, zostaje zatrzymany.

Gdy trwa kopia zapasowa albo automatyczna aktualizacja, panel nie restartuje serwera – spróbuj ponownie, gdy się skończy.

## Restarty według harmonogramu

Włącz **Uruchamiaj serwer ponownie według harmonogramu** i wybierz dni oraz godzinę, np. niedziela 5:00. Jeśli o tej porze trwa jeszcze kopia albo automatyczna aktualizacja, panel poczeka, aż się skończy (najwyżej dwie godziny). Zaraz po restarcie nigdy nie restartuje ponownie.

## Łatki systemu

Na **Debianie i Ubuntu** system może codziennie sam instalować aktualizacje bezpieczeństwa (standardowy pakiet `unattended-upgrades`):

- **Włącz automatyczne łatki** – w razie potrzeby instaluje `unattended-upgrades` i go włącza. To samo proponuje instalator podczas instalacji Stackmoor.
- **Restart po łatce** – niektóre łatki (np. nowe jądro) działają dopiero po restarcie. Po włączeniu serwer uruchomi się ponownie sam o wybranej godzinie, ale tylko wtedy, gdy łatka tego wymaga. Wybierz godzinę po nocnej kopii.

Gdy system wymaga restartu, strona to pokazuje razem z pakietami, które go wymagają.

Na Unraidzie system aktualizujesz w samym Unraidzie (**Tools → Update OS**).

## Warto wiedzieć

- Stackmoor działa w kontenerze. Żeby zrestartować serwer i odczytać jego stan, uruchamia krótko działający kontener pomocniczy z dostępem do systemu. Panel i tak steruje Dockerem, więc nie dostaje przez to nic nowego.
- Jeśli panel pokazuje, że nie może dostać się do serwera, to Stackmoor nie działa na nim jako kontener (np. przy uruchomieniu na laptopie do testów).
