---
title: Proxy dla innych serwerów
description: Daj Proxmoxowi, routerowi, NAS-owi albo innemu urządzeniu w sieci adres w Twojej domenie z prawdziwym certyfikatem.
---

[Domeny lokalne](/pl/guides/local-domains/) dają każdemu stackowi adres typu `cloud.home.example.com`. **Proxy** robi to samo dla rzeczy, których Stackmoor nie uruchamia: Proxmoxa, routera, NAS-a, Home Assistanta na innej maszynie. Caddy przekazuje adres do urządzenia i dodaje prawdziwy certyfikat – ten sam certyfikat wildcard, którego używają Twoje stacki.

## Po co

Jeśli używałeś Nginx Proxy Managera tylko po to, żeby nadać nazwy innym serwerom, przy Stackmoor nie jest Ci już potrzebny: panel i tak uruchamia Caddy dla stacków, więc obsłuży też resztę sieci. Jedno miejsce, jeden certyfikat, a na pulpicie widać, czy każdy serwer odpowiada.

## Dodaj proxy

Najpierw potrzebna jest [domena lokalna](/pl/guides/local-domains/).

1. Kliknij **+ Proxy** obok **+ Nowy stack** (na telefonie: **+ Proxy** na pulpicie).
2. **Nazwa** – dowolna, np. `Proxmox`. Adres uzupełni się na jej podstawie (`proxmox`); możesz go zmienić.
3. **Cel** – dokąd idzie ruch: `https://` albo `http://`, adres IP albo nazwa urządzenia i jego port, np. `https://192.168.1.10` i `8006`.
4. Dla celów `https` z własnym certyfikatem – Proxmox, UniFi, większość routerów i NAS-ów – zostaw zaznaczone **Nie sprawdzaj certyfikatu tego serwera**.
5. Kliknij **Sprawdź połączenie**. Zobaczysz, czy serwer odpowiada, jak szybko i jaki ma certyfikat.
6. Kliknij **Zapisz i włącz adres**. Adres działa od razu – nowy certyfikat nie jest potrzebny.

<figure class="shot" data-shot="proxy-form">
<img class="shot-light" src="/screens/pl/proxy-form-light.webp" alt="Nowe proxy: nazwa, adres, cel i sprawdzenie połączenia" width="732" height="414" loading="lazy" decoding="async" />
<img class="shot-dark" src="/screens/pl/proxy-form-dark.webp" alt="Nowe proxy: nazwa, adres, cel i sprawdzenie połączenia" width="732" height="414" loading="lazy" decoding="async" />
</figure>

## Na pulpicie

Proxy mają własną sekcję pod stackami. Ich karty mają przerywaną ramkę i znaczek **PROXY**, żeby nie myliły się z aplikacjami. Każda karta pokazuje cel, adres i to, czy serwer odpowiada.

Panel sprawdza każde proxy **co minutę**. Gdy serwer przestanie (albo znowu zacznie) odpowiadać, pojawi się to w ostatnich zdarzeniach, a pasek stanu pokazuje, ile proxy odpowiada – np. `proxy 2/3`.

Proxy nie ma przycisku **Restart** ani kopii: Stackmoor nie zarządza tym serwerem, tylko daje mu adres. Zakładka **Domeny** pokazuje proxy razem z adresami stacków.

<figure class="shot" data-shot="proxy-dashboard">
<img class="shot-light" src="/screens/pl/proxy-dashboard-light.webp" alt="Proxy na pulpicie" width="1216" height="225" loading="lazy" decoding="async" />
<img class="shot-dark" src="/screens/pl/proxy-dashboard-dark.webp" alt="Proxy na pulpicie" width="1216" height="225" loading="lazy" decoding="async" />
</figure>

## Zaawansowane

- **Wysyłaj w nagłówku Host adres celu** – niektóre serwery odpowiadają tylko na własną nazwę albo IP. Włącz, jeśli adres się otwiera, ale serwer pokazuje błąd albo pustą stronę.
- **Pokazuj stan na pulpicie** – wyłącz dla urządzeń, które często są celowo wyłączone.

## Warto wiedzieć

- Cel musi być osiągalny **z serwera**, na którym działa Stackmoor – to serwer się łączy, nie Twoja przeglądarka.
- WebSockety działają bez ustawień, więc konsole w przeglądarce (noVNC w Proxmoxie, Home Assistant) też działają.
- Gdy cel przekierowuje na swój własny adres (Unraid odsyła na `http://192.168.1.10:8086/Dashboard`), Stackmoor zamienia go z powrotem na Twój adres – tak samo jak Nginx Proxy Manager. Przekierowania na inne adresy zostają bez zmian.
- Stack z `network_mode: host` nie potrzebuje proxy: nadaj mu adres w jego zakładce **Domena**, z portem, na którym słucha.
