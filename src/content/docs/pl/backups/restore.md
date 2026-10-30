---
title: Przywracanie
description: Przywracanie stacka z kopii albo zrobienie jego klonu.
---

## Przywróć stack

1. Otwórz stack → zakładka **Kopie**. Każda kopia ma datę i rozmiar; kopie sprzed aktualizacji są oznaczone.
2. Kliknij **Przywróć** przy wybranej kopii.
3. Wpisz nazwę stacka, żeby potwierdzić, i kliknij **Przywróć**.

Co się dzieje:

1. stack jest wyłączany,
2. jego obecny folder trafia do `/opt/stacks/.trash/<nazwa>-before-restore-<data>` – nic nie jest kasowane,
3. pliki z kopii wracają,
4. bazy danych startują puste i są wczytywane ze zrzutów,
5. cały stack uruchamia się ponownie.

Wyjście widać na żywo i zapisuje się w **Historii** stacka.

<figure class="shot" data-shot="stack-backups">
<img class="shot-light" src="/screens/pl/stack-backups-light.webp" alt="Zakładka Kopie w stacku" width="956" height="297" loading="lazy" decoding="async" />
<img class="shot-dark" src="/screens/pl/stack-backups-dark.webp" alt="Zakładka Kopie w stacku" width="956" height="297" loading="lazy" decoding="async" />
</figure>

## Uruchomienia kopii

**Ustawienia → Backup** pokazuje kopie pogrupowane po **uruchomieniu**: jedno nocne uruchomienie zawiera wszystkie stacki i ustawienia panelu; kopia pojedynczego stacka albo kopia przed aktualizacją to osobne uruchomienie. Rozwiń uruchomienie, żeby zobaczyć jego stacki – także te usunięte później – i przywrócić dowolny z nich.

<figure class="shot" data-shot="backups-runs">
<img class="shot-light" src="/screens/pl/backups-runs-light.webp" alt="Przebiegi kopii ze stackami w każdym z nich" width="956" height="495" loading="lazy" decoding="async" />
<img class="shot-dark" src="/screens/pl/backups-runs-dark.webp" alt="Przebiegi kopii ze stackami w każdym z nich" width="956" height="495" loading="lazy" decoding="async" />
</figure>

## Przywróć wszystkie stacki z uruchomienia

Rozwiń uruchomienie i kliknij **Przywróć wszystkie stacki**. Każdy stack z tego uruchomienia zostanie przywrócony po kolei, dokładnie jak wyżej. Ustawienia samego panelu zostają bez zmian.

## Przywróć usunięty stack

Rozwiń w **Ustawienia → Backup** uruchomienie, które zawiera ten stack, i kliknij przy nim **Przywróć**.

## Kopia stacka (klon)

W formularzu przywracania zmień **Przywróć jako stack** na nową nazwę, np. `nextcloud-test`. Kopia zostanie przywrócona jako nowy stack obok oryginału.

:::caution
Klon nie wystartuje, jeśli jego `compose.yaml` używa tych samych publikowanych portów albo `container_name` co oryginał. Zmień je w edytorze klonu i uruchom go.
:::

## Przywrócenie całego serwera

Gdy serwer padnie, zainstaluj Stackmoor na nowym ([Linux](/pl/start/install/) albo [Unraid](/pl/start/unraid/)) i otwórz panel. Zamiast tworzyć konto:

1. kliknij **Przywróć serwer z kopii zapasowej**,
2. podaj magazyn (dostawcę, adres, bucket, folder, klucze) i **hasło szyfrowania** starego serwera, kliknij **Połącz**,
3. wybierz kopię – pokazywane są tylko pełne uruchomienia (zawierają ustawienia panelu),
4. kliknij **Przywróć tę kopię** i obserwuj postęp.

Stackmoor przywraca po kolei:

- ustawienia panelu: konto administratora (z hasłem), harmonogram i rotację kopii, domeny lokalne i klucze DNS,
- wszystkie stacki z tego uruchomienia, razem z bazami danych,
- Caddy z certyfikatami, jeśli używałeś domen lokalnych.

Potem zaloguj się swoim **poprzednim** kontem.

:::tip
Nowy serwer może mieć inny folder stacków – stacki trafiają do folderu nowej instalacji. Jeśli zmienił się adres IP, popraw rekord DNS.
:::

Da się też użyć kopii z wersji 0.5: ich części są grupowane w uruchomienia po czasie.

<figure class="shot" data-shot="setup-restore">
<img class="shot-light" src="/screens/pl/setup-restore-light.webp" alt="Przywracanie całego serwera w kreatorze pierwszego uruchomienia" width="620" height="706" loading="lazy" decoding="async" />
<img class="shot-dark" src="/screens/pl/setup-restore-dark.webp" alt="Przywracanie całego serwera w kreatorze pierwszego uruchomienia" width="620" height="706" loading="lazy" decoding="async" />
</figure>

## Tylko jedna aplikacja, tylko jej dane

Wszystkie stacki są w jednym repozytorium w buckecie, ale przywracanie pobiera tylko dane wybranej kopii. Przywrócenie aplikacji o rozmiarze 500 MB nie pobiera leżącej obok aplikacji o rozmiarze 50 GB.
