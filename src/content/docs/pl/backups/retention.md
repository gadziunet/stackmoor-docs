---
title: Rotacja
description: Ile kopii trzyma Stackmoor – z gotowymi przykładami.
---

Po każdej kopii starsze są usuwane według trzech liczb w **Ustawienia → Backup → Rotacja**:

| Ustawienie | Zostawia |
|---|---|
| **Dziennych** | najnowszą kopię z każdego z ostatnich *N* dni, w których była kopia |
| **Tygodniowych** | najnowszą kopię z każdego z ostatnich *N* tygodni |
| **Miesięcznych** | najnowszą kopię z każdego z ostatnich *N* miesięcy |

Reguły się sumują: kopia, którą zostawia którakolwiek z nich, zostaje. **Najnowsza kopia zostaje zawsze**, niezależnie od liczb.

Reguły działają dla każdego stacka osobno, a kopie **przed aktualizacją** są liczone osobno od zwykłych.

## Przykłady

### Raz w tygodniu, przez miesiąc

| Dni | Dziennych | Tygodniowych | Miesięcznych |
|---|---|---|---|
| jeden dzień, np. niedziela | `0` | `4` (albo `5`, żeby na pewno pokryć cały miesiąc) | `0` |

Zawsze możesz cofnąć się o około cztery tygodnie.

:::tip
Jeśli zaznaczone są wszystkie dni, a *Dziennych* to `0`, kopia robi się co noc, a nadmiarowe są usuwane przy następnej – nic się nie psuje, ale dane są wysyłane niepotrzebnie. Przy kopiach raz w tygodniu zaznacz tylko jeden dzień.
:::

### Co noc, tydzień wstecz

| Dni | Dziennych | Tygodniowych | Miesięcznych |
|---|---|---|---|
| wszystkie | `7` | `0` | `0` |

### Co noc i pół roku historii

| Dni | Dziennych | Tygodniowych | Miesięcznych |
|---|---|---|---|
| wszystkie | `7` | `4` | `6` |

Ustawienie domyślne. Możesz wrócić do dowolnego dnia z ostatniego tygodnia, dowolnego tygodnia z ostatniego miesiąca i dowolnego miesiąca z ostatniego pół roku – najwyżej 17 kopii na stack, zwykle mniej, bo jedna kopia może się liczyć naraz jako dzienna, tygodniowa i miesięczna.

### Co noc i rok kopii miesięcznych

| Dni | Dziennych | Tygodniowych | Miesięcznych |
|---|---|---|---|
| wszystkie | `14` | `0` | `12` |

## Czy więcej kopii dużo kosztuje?

Niewiele. Niezmienione pliki są zapisywane tylko raz, niezależnie od tego, w ilu kopiach się znajdują. Bucket rośnie przez dane, które się zmieniają – wiele kopii aplikacji, której pliki zmieniają się codziennie, zajmuje więcej miejsca.
