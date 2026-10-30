---
title: Łącz przez VPN
description: Wybrane aplikacje wysyłają ruch Twoim tunelem WireGuard – jak drugie łącze internetowe tylko dla nich.
---

## Po co to jest

Stackmoor działa w domu, a domowe łącze zwykle ma **zmienny adres IP**. Serwery na zewnątrz – np. VPS-y – często mają firewall, który wpuszcza SSH tylko ze znanych adresów. Przy zmiennym domowym IP taki firewall albo wpuszcza wszystkich, albo blokuje Ciebie.

Typowe rozwiązanie to **tunel WireGuard do serwera ze stałym adresem**: firewalle VPS-ów wpuszczają tylko ten adres. Z tunelu skorzysta Twój laptop – ale aplikacja działająca w Dockerze na domowym serwerze, np. webowy klient SSH [Termix](https://github.com/Termix-SSH/Termix), już nie.

**Łącz przez VPN** daje takiej aplikacji własne wyjście: jej ruch idzie Twoim tunelem, więc serwery widzą stały adres tunelu. Reszta domowego serwera dalej korzysta ze zwykłego łącza.

## Jak to działa

To jak **drugie łącze internetowe, tylko dla wybranych aplikacji**:

- Stackmoor uruchamia mały kontener z Twoim plikiem WireGuard (`stackmoor-vpn-<nazwa>`).
- Wybrane usługi korzystają z sieci tego kontenera. Wszystko, co wysyłają na zewnątrz, idzie tunelem.
- **To, co idzie tunelem, wynika z `AllowedIPs` w Twoim pliku:** `0.0.0.0/0` – cały ruch aplikacji; konkretne adresy (np. Twoje VPS-y) – tylko ten ruch, a reszta zwykłym łączem.
- Sieć lokalna działa dalej: aplikację nadal otwierasz w przeglądarce pod jej [domeną](/pl/guides/local-domains/) albo `IP:port`, a aplikacja nadal łączy się ze swoją bazą danych.

:::caution[Blokada (kill switch) – zawsze włączona]
Gdy tunel nie działa, aplikacje za nim **nie mają w ogóle internetu**. Nigdy nie przechodzą na domowe łącze, więc nigdy nie pokażą na zewnątrz domowego IP. Panel pokazuje czerwone ostrzeżenie na każdej stronie i oznacza stack jako **VPN ✕**.
:::

## Dodaj tunel

1. **Ustawienia → VPN → Dodaj tunel.**
2. Wpisz nazwę (np. `dom`) i wklej plik WireGuard albo wybierz plik `.conf`.
3. Kliknij **Dodaj i uruchom**. Po kilku sekundach tunel pokaże **połączony** i czas ostatniego kontaktu z serwerem.

Dla bezpieczeństwa polecenia z pliku (`PostUp`, `PostDown`, …) i linie `DNS` są usuwane. Dodawany jest keepalive, żeby tunel nie zasypiał za routerem.

## Puść aplikację przez tunel

1. Otwórz stack → zakładka **VPN**.
2. Wybierz tunel i zaznacz **usługi**, które mają z niego korzystać – zwykle tylko samą aplikację, np. `termix`. Jej baza danych może zostać bez zmian.
3. Kliknij **Zapisz i zastosuj**. Usługa zostanie odtworzona; jej opublikowane porty i domena działają dalej.

Żeby przestać używać VPN, wybierz **— bez VPN —** i zapisz.

## Stan

**Ustawienia → VPN** pokazują dla każdego tunelu:

- **połączony** – kontakt z serwerem WireGuard w ciągu ostatnich 3 minut;
- **łączenie…** – tunel właśnie wystartował i czeka na pierwszy kontakt;
- **nie działa** – brak kontaktu od 2 minut; aplikacje za nim są odcięte.

Gdy kontener tunelu się zrestartuje (np. po ponownym uruchomieniu serwera), Stackmoor sam podłączy z powrotem aplikacje, które go używają. **Uruchom ponownie** startuje tunel od nowa; **Zmień plik** wczytuje nowy plik.

## Wymagania

- Obsługa WireGuard w jądrze serwera – standard w Debianie 11+, Ubuntu 20.04+, Raspberry Pi OS i Unraidzie.
- Docker Compose 2.24 lub nowszy (instaluje go skrypt instalacyjny Stackmoor).
- Usługa z własnym trybem sieci (`network_mode: host`) nie może iść przez VPN.
