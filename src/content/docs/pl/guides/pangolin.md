---
title: Pangolin
description: Publiczne adresy dla wybranych aplikacji przez Twojego Pangolina – obok lokalnej domeny, z logowaniem Pangolina przed aplikacją.
---

[Lokalne domeny](/pl/guides/local-domains/) działają tylko w domu (albo przez VPN). Gdy aplikacja ma być dostępna zewsząd – dla rodziny, z telefonu bez VPN – Stackmoor może dać jej **publiczny adres przez [Pangolina](https://github.com/fosrl/pangolin)**, samodzielnie hostowane reverse proxy z tunelem (zwykle na małym VPS). W domu nie otwiera się żadnych portów: serwer sam łączy się z Pangolinem.

## Zanim zaczniesz

- Działający Pangolin (wersja z Integration API) i ustawiona w nim domena.
- **Integration API** włączone w `config.yml` Pangolina:
  ```yaml
  flags:
    enable_integration_api: true
  ```
  i dostępne pod własnym adresem, np. `https://api.pangolin.example.com/v1` (zobacz dokumentację Pangolina o Integration API).
- **Klucz API** Twojej organizacji: w Pangolinie *Organization → API Keys → Generate*. Potrzebne uprawnienia: lista domen; tworzenie, odczyt i usuwanie site’ów; tworzenie, zmiana i usuwanie zasobów; tworzenie celów.

## Połącz

**Sieć → Pangolin:**

1. Wpisz adres Pangolina (panel), adres Integration API, **ID organizacji** (widać je w pasku adresu Pangolina) i klucz API, potem kliknij **Zapisz i sprawdź**. Stackmoor pokaże znalezione domeny.
2. Kliknij **Połącz ten serwer**. Stackmoor utworzy w Pangolinie site *Stackmoor* i uruchomi jego klienta tunelu **Newt** jako kontener `stackmoor-newt`. Po chwili strona pokaże *Newt: działa* i *W Pangolinie: online*.

<figure class="shot" data-shot="pangolin">
<img class="shot-light" src="/screens/pl/pangolin-light.webp" alt="Sieć → Pangolin" width="996" height="857" loading="lazy" decoding="async" />
<img class="shot-dark" src="/screens/pl/pangolin-dark.webp" alt="Sieć → Pangolin" width="996" height="857" loading="lazy" decoding="async" />
</figure>

## Daj aplikacji publiczny adres

Otwórz stack → zakładka **Domena** → **Adres publiczny (Pangolin)**. Wybierz subdomenę i domenę z Pangolina, usługę i jej port, kliknij **Dodaj adres publiczny**.

<figure class="shot" data-shot="stack-public">
<img class="shot-light" src="/screens/pl/stack-public-light.webp" alt="Adres publiczny w zakładce Domena" width="956" height="386" loading="lazy" decoding="async" />
<img class="shot-dark" src="/screens/pl/stack-public-dark.webp" alt="Adres publiczny w zakładce Domena" width="956" height="386" loading="lazy" decoding="async" />
</figure>

- **Logowanie Pangolina jest domyślnie włączone.** Wejdą tylko użytkownicy, których dopuścisz w Pangolinie (*Resources → adres → Authentication*). Wyłączenie wymaga potwierdzenia – wtedy każdy w internecie może otworzyć aplikację, a jedyną ochroną jest jej własne logowanie.
- Domena **CNAME** w Pangolinie jest używana bez subdomeny.
- Działają też aplikacje z `network_mode: host` i podłączone przez [VPN](/pl/guides/vpn/).
- Aplikacja zachowuje lokalny adres; publiczny jest dodatkowy.

Usunięcie adresu usuwa zasób w Pangolinie. Usunięcie stacka usuwa też jego adresy publiczne. **Odłącz** usuwa z Pangolina site z wszystkimi adresami i zatrzymuje Newt.

## Warto wiedzieć

- W routerze nic się nie otwiera: Newt łączy się z Pangolinem, a Pangolin zajmuje się certyfikatem.
- Newt dołącza do tej samej sieci Dockera co Caddy (`stackmoor`); aplikacje z adresem publicznym są do niej dodawane, tak jak przy adresach lokalnych.
- Jeśli panel nie może połączyć się z API Pangolina, sprawdź adres API (zwykle kończy się na `/v1`) i czy Integration API jest włączone. Zanim coś udostępnisz publicznie, przeczytaj [Bezpieczeństwo](/pl/guides/security/).
