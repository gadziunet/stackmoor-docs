---
title: Skąd Stackmoor
description: Skąd wziął się Stackmoor, dla kogo jest i kto go tworzy.
---

## Zaczęło się od obawy

Swoje aplikacje trzymam w domu na Docker Compose. Jedną z nich jest [Termix](https://github.com/Termix-SSH/Termix) i pewnego dnia zdałem sobie sprawę, że nie mam dobrej odpowiedzi na proste pytanie: *co się stanie, jeśli stracę jego dane?*

Panele, których używałem, potrafiły uruchamiać i zatrzymywać stacki, ale kopia zapasowa oznaczała sięganie po zewnętrzną aplikację albo skrypt: grzebanie w terminalu, ręczne kopiowanie wszystkiego na lokalny dysk, a potem synchronizację w bezpieczne miejsce. Przywracanie wyglądało tak samo, tylko bardziej nerwowo. Do tego większość takich narzędzi po prostu kopiuje foldery – baza danych, która działa w trakcie kopiowania jej plików, może po przywróceniu nie wstać. Żeby kopia była pewna, trzeba najpierw **zrobić zrzut (dump) bazy**.

Chciałem, żeby robienie i przywracanie kopii było tak proste jak w [Cloudronie](https://www.cloudron.io): kilka kliknięć w panelu, bez terminala.

Z domenami było tak samo: kolejna aplikacja (reverse proxy) do zainstalowania, ustawienia i pilnowania, żeby zgadzała się ze stackami.

## Czego chciałem zamiast tego

Jednego prostego panelu, który robi całą robotę:

- **Zwykły Docker Compose** – bez katalogu aplikacji i bez specjalnego formatu. Uruchamia się dokładnie ten `compose.yaml`, który napiszesz.
- **Bez wpisywania ścieżek** – każda aplikacja trzyma dane we własnym folderze, który tworzy się sam.
- **Kopie zapasowe w panelu** – zrzuty baz przy działających aplikacjach, wszystko zaszyfrowane i wysłane do jednego bucketa S3 albo Backblaze B2, z weryfikacją sum kontrolnych. Przywrócisz jedną aplikację albo cały serwer.
- **Domeny w panelu** – lokalna domena z prawdziwym certyfikatem HTTPS, ustawiana przy stacku, a nie w innym narzędziu.
- **Przejrzysty interfejs** – ustawienia domen i kopii tam, gdzie się ich spodziewasz.

Pomysły są uczciwie zapożyczone: kopie całego serwera do jednego bucketa przy działających aplikacjach pochodzą z [Cloudrona](https://www.cloudron.io), a foldery tworzone automatycznie i zwykłe pliki compose – z [Dockge](https://github.com/louislam/dockge).

## Dla kogo

Dla osób, które wolą **prostotę i wygodę** od nieskończonej konfiguracji – serwer domowy, homelab, małe biuro. Jeśli chcesz, żeby Twoje stacki działały, były pod Twoją domeną i miały bezpieczne kopie, bez sklejania trzech narzędzi – Stackmoor jest dla Ciebie.

## Nazwa

Łódź, która jest **zacumowana** (ang. *moored*), stoi bezpiecznie w porcie. Stackmoor to port dla Twoich stacków: zostają tam, gdzie je postawisz, i nie odpływają, gdy coś pójdzie nie tak. (Pierwsze nazwy, StackPanel i Moorline, były już zajęte.)

## Kto go tworzy

Stackmoor tworzy **[Gadziunet](https://gadziunet.pl)**. Jest darmowy i otwarty, na licencji [AGPL-3.0](https://github.com/gadziunet/stackmoor/blob/main/LICENSE).

Powstaje z pomocą **Claude** – asystenta AI firmy Anthropic. Każda zmiana jest przeglądana i testowana ręcznie na prawdziwych serwerach – Debianie i Unraidzie – zanim trafi do wydania.

Znalazłeś błąd albo masz pomysł? [Zgłoś to na GitHubie](https://github.com/gadziunet/stackmoor/issues).
