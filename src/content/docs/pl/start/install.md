---
title: Instalacja na Linuksie
description: Instalacja Stackmoor jednym poleceniem na Debianie, Ubuntu albo Raspberry Pi OS.
---

Stackmoor działa na każdym Linuksie z Dockerem. Skrypt instalacyjny działa na czystym **Debianie**, **Ubuntu** albo **Raspberry Pi OS** (x86_64 lub arm64).

## Instalacja

Uruchom jako root (albo przez `sudo`):

```bash
curl -fsSL https://raw.githubusercontent.com/gadziunet/stackmoor/main/install.sh | sudo bash
```

Skrypt:

1. instaluje Dockera, jeśli go nie ma,
2. tworzy `/opt/stackmoor` (panel) i `/opt/stacks` (Twoje stacki),
3. uruchamia kontener `stackmoor`,
4. wypisuje adres, np. `http://192.168.1.50:5001`.

Otwórz ten adres i utwórz konto administratora – to jedyne konto w panelu. Hasło musi mieć co najmniej 10 znaków.

Przenosisz się ze starego serwera? Wybierz zamiast tego **Przywróć serwer z kopii zapasowej** – zob. [Przywrócenie całego serwera](/pl/backups/restore/#przywrócenie-całego-serwera).

## Opcje

Ustawia się je przed `bash`, np. `curl … | sudo PORT=8080 bash`:

| Zmienna | Domyślnie | Do czego służy |
|---|---|---|
| `PORT` | `5001` | Port panelu |
| `STACKS_DIR` | `/opt/stacks` | Gdzie są stacki (ścieżka bezwzględna) |
| `INSTALL_DIR` | `/opt/stackmoor` | Gdzie są pliki samego panelu |
| `STACKMOOR_IMAGE` | `ghcr.io/gadziunet/stackmoor:latest` | Uruchamiany obraz, np. `:edge` dla wersji testowych |

Wybrane wartości zapisują się w `/opt/stackmoor/.env`. Zmieniaj je tam, a nie w wygenerowanym `compose.yaml` – skrypt nadpisuje ten plik przy każdym uruchomieniu.

Jeśli port jest zajęty, skrypt się zatrzyma i o tym powie; wybierz inny przez `PORT=`.

## Aktualizacja

Kliknij **Aktualizuj Stackmoor** w **Ustawienia → Aktualizacje** albo uruchom polecenie instalacji jeszcze raz. Stacki i ustawienia zostają.

## Wersje testowe

Żeby wypróbować najnowszą, niewydaną wersję, przełącz obraz na `edge`:

```bash
cd /opt/stackmoor
sed -i 's|^STACKMOOR_IMAGE=.*|STACKMOOR_IMAGE=ghcr.io/gadziunet/stackmoor:edge|' .env
docker compose pull && docker compose up -d
```

Na wersję stabilną wracasz tak samo, wpisując `:latest`.

:::caution[Panel tylko w sieci lokalnej]
Stackmoor steruje Dockerem, czyli ma pełną kontrolę nad serwerem. Trzymaj go w sieci lokalnej albo za VPN-em – nigdy nie wystawiaj portu 5001 do internetu.
:::
