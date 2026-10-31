---
title: Retention
description: How many backups Stackmoor keeps, with ready-made examples.
---

After every backup, older backups are removed according to three numbers in **Backups → Backup settings → Retention**:

| Setting | Keeps |
|---|---|
| **Daily** | the newest backup of each of the last *N* days that have one |
| **Weekly** | the newest backup of each of the last *N* weeks |
| **Monthly** | the newest backup of each of the last *N* months |

The rules add up: a backup kept by any of them stays. **The newest backup is always kept**, whatever the numbers.

The rules apply to each stack separately, and backups made **before an update** are counted separately from regular ones.

## Examples

### Once a week, kept for a month

| Days | Daily | Weekly | Monthly |
|---|---|---|---|
| one day, e.g. Sunday | `0` | `4` (or `5` to be sure to cover a full month) | `0` |

You can always go back about four weeks.

:::tip
If all days are ticked but *Daily* is `0`, a backup is made every night and the extra ones are removed again the next time – nothing breaks, but data is uploaded for nothing. For weekly backups, tick only one day.
:::

### Every night, one week back

| Days | Daily | Weekly | Monthly |
|---|---|---|---|
| all | `7` | `0` | `0` |

### Every night, plus half a year of history

| Days | Daily | Weekly | Monthly |
|---|---|---|---|
| all | `7` | `4` | `6` |

The default. You can go back to any day of the last week, any week of the last month and any month of the last half year – at most 17 backups per stack, usually fewer because one backup can count for a day, a week and a month at once.

### Every night, a year of monthly backups

| Days | Daily | Weekly | Monthly |
|---|---|---|---|
| all | `14` | `0` | `12` |

## Does more backups cost much more?

Not much. Files that did not change are stored only once, no matter how many backups contain them. What grows the bucket is data that changes – many backups of an app whose files change a lot each day take more space.
