---
title: Konfiguracja kopii
description: Szyfrowana kopia każdego stacka i ustawień panelu w Backblaze B2, Amazon S3 albo dowolnym magazynie zgodnym z S3.
---

Stackmoor robi kopie tak jak Cloudron: najpierw zrzuty baz danych, w trakcie działania aplikacji, potem pliki są szyfrowane i wysyłane do bucketu. Używa programu [restic](https://restic.net).

## Co trafia do kopii

- **Każdy stack:** jego folder z `compose.yaml`, `.env` i całą zawartością `./data` – osobna kopia dla każdego stacka.
- **Bazy danych:** najpierw zrzut; do kopii trafia zrzut zamiast surowych plików bazy. Zob. [Bazy danych](/pl/backups/databases/).
- **Sam panel:** jego baza ustawień, klucz szyfrowania i pliki Caddy (certyfikaty).

**Nie** trafiają do kopii: ścieżki hosta z listy wyjątków (domyślnie `/mnt` i `/media`, np. biblioteki multimediów) oraz nazwane wolumeny Dockera poza folderem stacka – te istnieją tylko wtedy, gdy wyłączysz [automatyczne wolumeny](/pl/guides/automatic-volumes/).

## Magazyn

Działa każdy magazyn zgodny z S3:

| Dostawca | Adres (endpoint) | Klucze |
|---|---|---|
| Backblaze B2 | `s3.<region>.backblazeb2.com` – widoczny przy buckecie | Application Keys → Add a New Application Key |
| Amazon S3 | `s3.<region>.amazonaws.com` | Użytkownik IAM → Security credentials → Create access key |
| Cloudflare R2 | `<account-id>.r2.cloudflarestorage.com`, region `auto` | R2 → Manage API tokens (Object Read & Write) |
| Hetzner Object Storage | `<region>.your-objectstorage.com` (`fsn1`, `nbg1`, `hel1`) | Cloud Console → Object Storage → S3 credentials |
| Wasabi | `s3.<region>.wasabisys.com` | Access Keys → Create new access key |
| Inny (MinIO, Garage, …) | jego adres, np. `minio.example.com:9000` | z tego magazynu |

Utwórz **prywatny bucket** i klucz, który ma dostęp tylko do niego.

## Konfiguracja

1. **Ustawienia → Backup:** wybierz dostawcę. Adres uzupełni się na podstawie regionu.
2. Wpisz **bucket**, opcjonalnie **folder w buckecie** (domyślnie `stackmoor`), **klucz dostępu** i **klucz tajny**.
3. Ustaw **hasło szyfrowania** – wpisz własne (co najmniej 12 znaków) albo kliknij **Wygeneruj**.
4. Wybierz **dni** i **godzinę** oraz [rotację](/pl/backups/retention/).
5. Kliknij **Zapisz i sprawdź połączenie**. Za pierwszym razem w buckecie powstanie repozytorium kopii.

:::danger[Zapisz hasło]
Kopie są zawsze szyfrowane. Bez hasła nikt ich nie przywróci – nawet Ty. Trzymaj je w menedżerze haseł. Jeśli serwer padnie, wystarczy bucket i to hasło.
:::

## Harmonogram

Kopie robią się w wybrane dni o wybranej godzinie, w strefie czasowej przeglądarki, z której zapisałeś ustawienia. Jeśli panel był akurat restartowany, kopia zrobi się do godziny później.

**Zrób kopię teraz** uruchamia kopię od razu. Pojedynczy stack można skopiować z jego zakładki **Kopie**.

<figure class="shot" data-shot="backups-settings">
<img class="shot-light" src="/screens/pl/backups-settings-light.webp" alt="Ustawienia → Kopie zapasowe" width="1020" height="1300" loading="lazy" decoding="async" />
<img class="shot-dark" src="/screens/pl/backups-settings-dark.webp" alt="Ustawienia → Kopie zapasowe" width="1020" height="1300" loading="lazy" decoding="async" />
</figure>

## Przed każdą aktualizacją

Gdy włączone jest **Rób kopię stacka przed jego aktualizacją**, kliknięcie **Aktualizuj** najpierw robi kopię stacka. Jeśli się nie uda, aktualizacja się nie wykona.

## Sumy kontrolne

restic zapisuje każdy kawałek danych pod jego sumą SHA-256, więc uszkodzenie nie przejdzie niezauważone:

- **po każdej kopii** sprawdzana jest struktura repozytorium (kilka sekund, nic nie pobiera),
- **raz w tygodniu** pobieranych i porównywanych jest 10% danych – w ciągu kilku tygodni sprawdzone zostaje praktycznie wszystko,
- **Zweryfikuj wszystko** pobiera i sprawdza wszystkie dane. Zużywa transfer pobierania z magazynu.

Ramka **Stan** na górze **Ustawienia → Backup** pokazuje ostatnią kopię i ostatnią weryfikację.

## Koszty i zapytania API

Lista kopii jest przechowywana w panelu, więc otwarcie zakładki **Kopie** nie łączy się z magazynem. Lista odświeża się po każdej kopii, czyszczeniu i przywróceniu – albo gdy klikniesz **Odśwież**. Niezmienione pliki nigdy nie są wysyłane ponownie.
