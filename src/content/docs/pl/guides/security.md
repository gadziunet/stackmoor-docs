---
title: Bezpieczeństwo
description: Co zabezpieczyć na serwerze ze Stackmoor i jak – krok po kroku.
---

Stackmoor steruje Dockerem na Twoim serwerze. Kto zaloguje się do panelu, może uruchomić dowolny kontener – w praktyce ma władzę nad całym serwerem. Tak samo jest w każdym panelu do Dockera (Portainer, Dockge…). Dlatego najważniejsza zasada jest prosta: **do panelu masz dostęp tylko Ty.**

## Najważniejsze

### Panel nie może być dostępny z internetu

- **Nie przekierowuj portów na serwer** w routerze – ani portu panelu (5001), ani 80/443. Lokalna domena (`*.dom.example.com`) wskazuje na adres prywatny, więc działa tylko w domu – i tak ma zostać.
- **Z zewnątrz łącz się przez VPN** do sieci domowej (WireGuard, VPN w routerze, Tailscale…) i otwieraj panel tak, jakbyś był w domu.
- Jeśli chcesz wystawić jakąś aplikację publicznie, nie przekierowuj 80/443 na Caddy ze Stackmoor – publiczny stałby się też adres panelu. Publiczne adresy przez Pangolina są w planach.

### Mocne hasło

Panel wymaga co najmniej 10 znaków. Użyj długiego, losowego hasła z menedżera haseł (16 znaków i więcej). Po 10 błędnych próbach w ciągu 15 minut logowanie z tego adresu jest na chwilę blokowane.

### Wszystko aktualne

- **Panel** – pasek *Nowa wersja panelu* pokaże, że jest aktualizacja. Zobacz [Aktualizacje](/pl/guides/updates/).
- **Stacki** – aktualizuj je sam albo włącz [automatyczne aktualizacje](/pl/guides/updates/#automatyczne-aktualizacje).
- **System** – włącz automatyczne łatki bezpieczeństwa w [Ustawienia → Serwer](/pl/guides/server/) (Debian/Ubuntu).

### Kopie zapasowe

Skonfiguruj [kopie zapasowe](/pl/backups/setup/). Są szyfrowane – hasło do kopii trzymaj gdzie indziej niż na serwerze, np. w menedżerze haseł. Bez niego nikt ich nie przywróci, także Ty.

## Serwer

### SSH

- Loguj się **kluczem** zamiast hasłem i nie loguj się jako root. W `/etc/ssh/sshd_config`:
  ```
  PermitRootLogin no
  PasswordAuthentication no
  ```
  Potem `sudo systemctl restart ssh`. Sprawdź, że logowanie kluczem działa, **zanim** zamkniesz obecną sesję.

### Zapora – i pułapka z Dockerem

Zapora taka jak `ufw` ogranicza, kto może łączyć się z usługami serwera, np. tylko sieć domowa:

```
sudo ufw allow from 192.168.1.0/24 to any port 22 proto tcp
sudo ufw enable
```

:::caution[Docker omija ufw]
Porty, które publikują kontenery (`ports:` w compose), są dostępne nawet wtedy, gdy ufw je blokuje – Docker dodaje własne reguły przed ufw. Prawdziwą ochroną jest więc router (brak przekierowań portów), a w compose: publikuj tylko to, co potrzebne.
:::

### Publikuj tylko to, co potrzebne

Jeśli aplikację otwierasz przez jej adres w [lokalnej domenie](/pl/guides/local-domains/), w ogóle nie potrzebuje własnego portu na serwerze – Caddy łączy się z nią wewnątrz Dockera. Usuń jej `ports:` albo ogranicz je do samego serwera:

```yaml
ports:
  - "127.0.0.1:8080:80"   # tylko z samego serwera, nie z sieci
```

## Aplikacje (stacki)

- **Obrazy z zaufanych źródeł** – oficjalne albo od autorów aplikacji (na Docker Hub *Official* / *Verified*, GitHub projektu). Unikaj przypadkowych obrazów podszywających się pod popularne nazwy.
- **Hasła w `.env`**, nie w `compose.yaml` – edytor ma na to osobne pole. Oba pliki są w kopii zapasowej, zaszyfrowane.
- **Ostrożnie z:**
  - `privileged: true` – kontener może prawie wszystko na serwerze,
  - montowaniem `/var/run/docker.sock` do aplikacji – aplikacja dostaje taką samą władzę jak panel,
  - `network_mode: host` – aplikacja widzi całą sieć serwera. Czasem jest potrzebne (np. Wake-on-LAN albo skanowanie sieci), ale tylko wtedy.
- **Bazy danych** – przypnij wersję (`postgres:16`, nie `latest`) i wyłącz je z [automatycznych aktualizacji](/pl/guides/updates/#automatyczne-aktualizacje), jeśli wolisz aktualizować je sam.

## Co już robią Docker i Stackmoor

- **Docker** zamyka każdy kontener w AppArmor (Debian/Ubuntu) albo SELinux (Fedora) i seccomp, który blokuje niebezpieczne wywołania systemu. Sprawdzisz to poleceniem:
  ```
  docker info --format '{{.SecurityOptions}}'
  ```
  Powinno być `apparmor` (albo `selinux`) i `seccomp`. Kontenery z `privileged: true` tracą tę ochronę.
- **Stackmoor:**
  - sesja logowania w ciasteczku, którego skrypty na stronie nie mogą odczytać i które działa tylko na stronach panelu,
  - limit prób logowania,
  - klucze API dostawców DNS i dane do kopii zapisane w postaci zaszyfrowanej,
  - szyfrowane kopie zapasowe,
  - [panel tylko przez swoją domenę](/pl/guides/panel-address/) – wejście po adresie IP przekierowuje na domenę z certyfikatem,
  - usunięcie stacka przenosi jego folder do `.trash/` zamiast kasować dane.
- Stackmoor łączy się z internetem tylko w tym, czego używasz: sprawdzanie aktualizacji (GitHub), pobieranie obrazów, Twój dostawca DNS i miejsce na kopie. Nie wysyła żadnych danych o Tobie.

## Lista kontrolna

- [ ] Panel nie jest dostępny z internetu – brak przekierowań portów w routerze
- [ ] Z zewnątrz tylko przez VPN
- [ ] Długie hasło z menedżera haseł
- [ ] Automatyczne łatki systemu włączone ([Ustawienia → Serwer](/pl/guides/server/))
- [ ] Kopie zapasowe skonfigurowane, hasło do kopii trzymane poza serwerem
- [ ] SSH kluczem, bez logowania jako root
- [ ] Aplikacje publikują tylko potrzebne porty
