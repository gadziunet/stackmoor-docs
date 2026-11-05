---
title: Powiadomienia
description: Wiadomość na telefon albo e-mail, gdy nie uda się kopia, stack przestanie działać, padnie VPN albo proxy i nie tylko.
---

Stackmoor może Cię powiadomić, gdy coś wymaga uwagi – na telefon (Telegram, ntfy, Pushover), e-mailem albo przez webhook. Ustawisz to w **Ustawienia → Powiadomienia**.

<figure class="shot" data-shot="notify">
<img class="shot-light" src="/screens/pl/notify-light.webp" alt="Ustawienia → Powiadomienia" width="996" height="1173" loading="lazy" decoding="async" />
<img class="shot-dark" src="/screens/pl/notify-dark.webp" alt="Ustawienia → Powiadomienia" width="996" height="1173" loading="lazy" decoding="async" />
</figure>

## Dodaj kanał

Kliknij **+ Dodaj kanał**, wybierz rodzaj i wypełnij pola. Hasła i tokeny są zapisywane w postaci zaszyfrowanej. **Wyślij test** od razu wysyła wiadomość testową – jeśli nie dotrze, przyczyna pojawi się nad listą i w **Ostatnich powiadomieniach**.

<figure class="shot" data-shot="notify-form">
<img class="shot-light" src="/screens/pl/notify-form-light.webp" alt="Dodawanie kanału Telegram" width="954" height="383" loading="lazy" decoding="async" />
<img class="shot-dark" src="/screens/pl/notify-form-dark.webp" alt="Dodawanie kanału Telegram" width="954" height="383" loading="lazy" decoding="async" />
</figure>

| Rodzaj | Czego potrzebujesz |
|---|---|
| **Telegram** | Utwórz bota przez **@BotFather** (`/newbot`) i skopiuj jego token. Wyślij botowi dowolną wiadomość, kliknij **Znajdź ID czatu** i wybierz swój czat. Grupa też działa – najpierw dodaj do niej bota. |
| **ntfy** | Zainstaluj aplikację ntfy i zasubskrybuj temat. Na publicznym `ntfy.sh` każdy, kto zna temat, może go czytać, więc wybierz długą, trudną do zgadnięcia nazwę – albo użyj własnego serwera ntfy (z tokenem dostępu, jeśli wymaga logowania). |
| **Pushover** | Twój *user key* z pushover.net i token aplikacji, którą tam utworzysz (*Your Applications → Create*). |
| **E-mail** | Dowolny serwer pocztowy. Dla Gmaila: `smtp.gmail.com`, **STARTTLS (587)**, Twój adres jako login i [hasło do aplikacji](https://myaccount.google.com/apppasswords). Dla serwera pocztowego w Twojej sieci z własnym certyfikatem zaznacz *Akceptuj certyfikat z podpisem własnym*. |
| **Webhook** | Adres URL, który dostaje każdą wiadomość jako JSON (POST). Działa z webhookami Discorda, Slacka, Mattermosta i Home Assistanta. |

Możesz dodać kilka kanałów – wiadomości trafiają do każdego **włączonego**.

## O czym dostaniesz wiadomość

**Problemy** (domyślnie włączone):

- kopia się nie udała albo cotygodniowe sprawdzenie kopii wykryło problem,
- stack przestał działać sam z siebie – jego kontenery się zatrzymały, a nikt ich nie zatrzymywał w panelu (i ponownie, gdy znów działa),
- tunel VPN nie działa (i gdy wróci),
- cel [proxy](/pl/guides/proxy/) nie odpowiada (i gdy znów odpowiada),
- [automatyczna aktualizacja](/pl/guides/updates/#automatyczne-aktualizacje) wróciła do poprzedniej wersji albo się nie wykonała,
- serwer wymaga restartu po łatkach systemu (zobacz [Serwer](/pl/guides/server/)).

**Informacje:**

- serwer został uruchomiony ponownie (z listą stacków uruchomionych przez panel) – domyślnie włączone,
- wyszła nowa wersja Stackmoor – domyślnie włączone,
- stack zaktualizował się automatycznie, nowe obrazy dla stacków, nocna kopia skończyła się dobrze – domyślnie wyłączone.

**Nazwa serwera w wiadomościach** dodaje nazwę na początku każdej wiadomości, np. *Dom: VPN office nie działa* – przydaje się przy kilku serwerach.

## Warto wiedzieć

- Stack jest zgłaszany dopiero, gdy jest zatrzymany przy dwóch kolejnych sprawdzeniach (około dwóch minut), więc szybki restart Cię nie obudzi. Uruchomienie, zatrzymanie albo aktualizacja w panelu nigdy nie wysyła wiadomości.
- Ta sama wiadomość nie jest wysyłana ponownie przez 5 minut. Wiadomość, której nie udało się dostarczyć, jest ponawiana po minucie i po pięciu minutach.
- Wiadomości są w języku, którego ostatnio używałeś w panelu, a godziny w strefie czasowej przeglądarki z chwili zapisania ustawień.

### Format webhooka

```json
{
  "event": "vpn.down",
  "level": "error",
  "title": "Dom: VPN office nie działa",
  "message": "Tunel office nie działa…",
  "server": "Dom",
  "at": "2026-11-05T12:00:00.000Z",
  "text": "…",
  "content": "…"
}
```

`level` to `error`, `warn`, `info` albo `ok`. `text` i `content` zawierają całą wiadomość dla Slacka/Mattermosta i Discorda.
