---
title: Pytania i odpowiedzi
description: Pytania o Stackmoor i porównanie z innymi panelami.
---

## Czy Stackmoor jest darmowy?

Tak. To otwarte oprogramowanie na licencji [AGPL-3.0](https://github.com/gadziunet/stackmoor/blob/main/LICENSE): możesz go używać, zmieniać i udostępniać. Jeśli rozpowszechniasz zmienioną wersję albo oferujesz ją jako usługę, musisz opublikować swoje zmiany na tej samej licencji.

## Czy można go wystawić do internetu?

Nie. Stackmoor steruje Dockerem, czyli ma pełną kontrolę nad serwerem. Trzymaj go w sieci lokalnej albo za VPN-em. Dla aplikacji [domeny lokalne](/pl/guides/local-domains/) dają HTTPS bez wystawiania czegokolwiek do internetu.

## Czy mogę dalej używać stacków z terminala?

Tak. Stacki to zwykłe foldery z `compose.yaml` w `/opt/stacks/<nazwa>/`. `docker compose` działa w nich jak zawsze.

## Czy da się zarządzać kilkoma serwerami?

Jeszcze nie – Stackmoor zarządza serwerem, na którym działa.

## Kilka kont użytkowników?

Jeszcze nie – jest jedno konto administratora.

## W jakich językach jest panel?

Po angielsku i po polsku. Tłumaczenia są mile widziane – zob. [repozytorium](https://github.com/gadziunet/stackmoor#development).

## Jak powstaje Stackmoor?

Jest pisany z pomocą [Claude](https://claude.ai) od Anthropic. Autor projektuje funkcje, sprawdza każdą zmianę i testuje każde wydanie na prawdziwych serwerach (Debian i Unraid) przed publikacją. Przy każdym pushu działają testy automatyczne.

## Jak wypada na tle innych paneli?

Stackmoor robi mniej niż pełna platforma do Dockera, a więcej tam, gdzie potrzebuje tego domowy serwer:

| | Stackmoor | Dockge | Portainer CE |
|---|---|---|---|
| Stacki Compose w przeglądarce | tak | tak | tak |
| Dane aplikacji automatycznie w folderze stacka | tak | nie | nie |
| Kopie danych aplikacji i baz, z przywracaniem | tak – S3 / B2 | nie | nie |
| Wbudowane domeny lokalne z certyfikatami | tak – Caddy | nie | nie |
| Wiele serwerów | jeszcze nie | tak – agenty | tak |
| Kilka kont użytkowników | jeden admin | jeden admin | tak |
| Licencja | AGPL-3.0 | MIT | zlib |

Na podstawie dokumentacji każdego projektu, październik 2026. Coś jest nieaktualne? [Zgłoś to](https://github.com/gadziunet/stackmoor-docs/issues).
