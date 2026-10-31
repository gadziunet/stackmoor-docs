---
title: Domeny lokalne
description: Adres typu chmura.dom.example.com z prawdziwym certyfikatem HTTPS dla każdego stacka.
---

Stackmoor może nadać każdemu stackowi adres typu `chmura.dom.example.com` z prawidłowym certyfikatem HTTPS – bez pamiętania portów. Serwer **nie** musi być dostępny z internetu: certyfikat jest wydawany przez API Twojego dostawcy DNS.

## Jak to działa

- Przed stackami stoi kontener Caddy (`stackmoor-caddy`).
- Ma **jeden certyfikat wildcard** (`*.dom.example.com`) z Let's Encrypt, potwierdzony przez API dostawcy DNS (DNS-01).
- Stacki z adresem dołączają do wspólnej sieci Dockera, a Caddy kieruje każdy adres do właściwego kontenera i portu.

## Konfiguracja

Możesz to zrobić zaraz po instalacji – po założeniu konta panel pyta *Jak chcesz otwierać panel?* – albo w każdej chwili w zakładce **Domeny**.

1. **Wybierz domenę**, którą masz, np. `dom.example.com`. Aplikacje dostaną `<nazwa>.dom.example.com`, a sam panel `my.dom.example.com`.
2. **Wybierz dostawcę DNS** i wklej klucz API. Klucze są zapisywane w formie zaszyfrowanej.
3. **Adres IP serwera** – adres w Twojej sieci, np. `192.168.1.50` – jest wykrywany automatycznie. Odznacz *Wykrywaj automatycznie*, żeby wpisać go samemu (przydatne przy kilku kartach sieciowych albo VLAN-ach).
4. Kliknij **Zapisz i zastosuj** (w kreatorze: **Sprawdź i ustaw**). Stackmoor najpierw [sprawdza domenę](#przed-zapisaniem-domena-jest-sprawdzana), potem dodaje rekord DNS i uruchamia Caddy. Pierwszy certyfikat może potrwać minutę lub dwie (w netcup około 15 minut).
5. **Stack → Domena:** dodaj adres – subdomenę, usługę i port, na którym aplikacja nasłuchuje **w swoim kontenerze** (prawa liczba w `"8080:80"`).

:::tip
Stack z adresem nie musi publikować żadnego portu.
:::

<figure class="shot" data-shot="domains-form">
<img class="shot-light" src="/screens/pl/domains-form-light.webp" alt="Zakładka Domeny: domena, dostawca DNS, IP serwera i rekordy DNS" width="732" height="718" loading="lazy" decoding="async" />
<img class="shot-dark" src="/screens/pl/domains-form-dark.webp" alt="Zakładka Domeny: domena, dostawca DNS, IP serwera i rekordy DNS" width="732" height="718" loading="lazy" decoding="async" />
</figure>
<figure class="shot" data-shot="stack-domain">
<img class="shot-light" src="/screens/pl/stack-domain-light.webp" alt="Zakładka Domena w stacku z adresem" width="956" height="332" loading="lazy" decoding="async" />
<img class="shot-dark" src="/screens/pl/stack-domain-dark.webp" alt="Zakładka Domena w stacku z adresem" width="956" height="332" loading="lazy" decoding="async" />
</figure>

## Rekordy DNS dodają się same

Twoje adresy potrzebują dwóch rekordów DNS wskazujących na IP serwera: `dom.example.com` (sama domena) i `*.dom.example.com` (każda nazwa pod nią). U tych dostawców Stackmoor dodaje je (albo aktualizuje) przez API, więc w panelu dostawcy nie trzeba nic robić:

**Cloudflare, Bunny DNS, Hetzner, DigitalOcean, Porkbun, deSEC, DuckDNS**

U pozostałych dostawców formularz pokazuje rekordy do dodania ręcznie: rekordy `A` dla `dom.example.com` i `*.dom.example.com` wskazujące na IP serwera. Lokalny adres, np. `192.168.1.50`, jest w porządku. Jeśli wolisz zarządzać rekordami sam, odznacz *Dodaj rekordy DNS automatycznie*.

**Gdy adres serwera się zmieni** (np. router da nowy IP), Stackmoor zauważy to przy starcie serwera, zaktualizuje rekordy i pokaże informację w zakładce **Domeny**.

Certyfikat obejmuje obie nazwy, a sama domena prowadzi do adresu panelu.

## Przed zapisaniem domena jest sprawdzana

Przy pierwszym zapisie domeny Stackmoor sprawdza, czy:

- **klucz API działa** i domena jest na tym koncie – zły klucz wychodzi od razu, a nie po kilku minutach jako brak certyfikatu;
- **domena nie jest już używana** – jeśli `*.dom.example.com` wskazuje już na inny serwer (np. Twój Cloudron), zobaczysz ostrzeżenie z tym adresem. Wybierz inną domenę (np. subdomenę) albo kliknij **Użyj mimo to**, żeby przestawić ją na ten serwer.

## Pobieranie certyfikatu

Żeby udowodnić, że domena jest Twoja, Caddy dodaje przez API dostawcy tymczasowy rekord weryfikacyjny (`TXT`), a Let's Encrypt go sprawdza. Caddy czeka, aż publiczny DNS naprawdę pokaże ten rekord (do 10 minut), i dopiero wtedy prosi o sprawdzenie.

Niektórzy dostawcy potrzebują dodatkowego czasu, aż rekord trafi na wszystkie ich serwery DNS. Ustawisz go w **Zaawansowane → Czekaj przed weryfikacją Let's Encrypt** – działa jak *Propagation seconds* w Nginx Proxy Manager. Bunny DNS domyślnie czeka 120 sekund, netcup 900.

Karta **Stan** odświeża się sama, dopóki nie ma certyfikatu. Jeśli próba się nie udała (np. *No TXT record found*), Caddy spróbuje ponownie sam – albo kliknij **Pobierz certyfikat ponownie**, żeby od razu zacząć nową próbę.

<figure class="shot" data-shot="domains-status">
<img class="shot-light" src="/screens/pl/domains-status-light.webp" alt="Stan: Caddy, certyfikat i adres panelu" width="464" height="248" loading="lazy" decoding="async" />
<img class="shot-dark" src="/screens/pl/domains-status-dark.webp" alt="Stan: Caddy, certyfikat i adres panelu" width="464" height="248" loading="lazy" decoding="async" />
</figure>

## Dostawcy DNS

| Dostawca | Co jest potrzebne | Skąd to wziąć |
|---|---|---|
| Cloudflare | Token API | My Profile → API Tokens → token z *Zone:Read* i *Zone:DNS:Edit* dla domeny |
| Bunny DNS | Klucz API | dash.bunny.net → Account settings → API key |
| OVHcloud | Endpoint, application key, application secret, consumer key | api.ovh.com/createToken z uprawnieniami do `/domain/zone/*`. Europa: endpoint `ovh-eu` |
| Hetzner | Token API | Hetzner Console → projekt → Security → API tokens (read & write) |
| DigitalOcean | Personal access token | API → Generate new token z prawem zapisu |
| Porkbun | API key, secret API key | Account → API Access, potem włącz *API Access* dla domeny |
| Namecheap | API user, API key | Profile → Tools → API Access; dodaj publiczny IP serwera do białej listy |
| GoDaddy | API key, API secret | developer.godaddy.com → API Keys → klucz Production |
| IONOS | Klucz API (`prefix.secret`) | developer.hosting.ionos.de → API keys |
| netcup | Numer klienta, API key, API password | CCP → Stammdaten → API |
| Gandi | Personal access token | account.gandi.net → Personal Access Tokens z uprawnieniami LiveDNS |
| AWS Route 53 | Access key ID, secret access key, hosted zone ID (opcjonalnie) | Użytkownik IAM z prawem do listy stref i zmiany rekordów |
| deSEC | Token | desec.io → Token management |
| DuckDNS | Token | Na górze duckdns.org po zalogowaniu; domena np. `mojdom.duckdns.org` |

Dostawcę można zmienić w każdej chwili; zapisane klucze nie są już pokazywane, widać tylko ich ostatnie znaki.

**Twojego dostawcy nie ma na liście?** Wybierz *Bez dostawcy – certyfikat wewnętrzny*. Caddy użyje wtedy własnego urzędu certyfikacji, a przeglądarki będą ostrzegać, dopóki nie zaufasz certyfikatowi głównemu Caddy na swoich urządzeniach.

## Porty

Caddy używa na serwerze portów 80 i 443. Jeśli są zajęte (na Unraid przez jego panel), wybierz inne w **Zaawansowane: porty**.

## Aplikacje w sieci hosta

Usługi z `network_mode: host` nie mogą dołączyć do sieci Caddy. Caddy łączy się z nimi przez hosta – wystarczy podać port, na którym aplikacja nasłuchuje.

## Ochrona przed DNS rebinding

Niektóre filtry DNS i routery (Pi-hole, AdGuard, ControlD, Fritz!Box, część routerów operatorów) blokują publiczne nazwy wskazujące na prywatne adresy typu `192.168.x.x`. Jeśli adres nie otwiera się w przeglądarce, dodaj swoją domenę do wyjątków w takim filtrze.
