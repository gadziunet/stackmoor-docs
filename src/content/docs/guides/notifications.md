---
title: Notifications
description: Get a message on your phone or by e-mail when a backup fails, a stack stops, the VPN or a proxy goes down, and more.
---

Stackmoor can tell you when something needs attention – on your phone (Telegram, ntfy, Pushover), by e-mail or through a webhook. Set it up in **Settings → Notifications**.

<figure class="shot" data-shot="notify">
<img class="shot-light" src="/screens/en/notify-light.webp" alt="Settings → Notifications" width="996" height="1173" loading="lazy" decoding="async" />
<img class="shot-dark" src="/screens/en/notify-dark.webp" alt="Settings → Notifications" width="996" height="1173" loading="lazy" decoding="async" />
</figure>

## Add a channel

Click **+ Add channel**, choose the kind and fill in the fields. Passwords and tokens are stored encrypted. **Send test** sends a test message right away – if it doesn't arrive, the reason is shown above the list and in **Latest notifications**.

<figure class="shot" data-shot="notify-form">
<img class="shot-light" src="/screens/en/notify-form-light.webp" alt="Adding a Telegram channel" width="954" height="383" loading="lazy" decoding="async" />
<img class="shot-dark" src="/screens/en/notify-form-dark.webp" alt="Adding a Telegram channel" width="954" height="383" loading="lazy" decoding="async" />
</figure>

| Kind | What you need |
|---|---|
| **Telegram** | Create a bot with **@BotFather** (`/newbot`) and copy its token. Send your bot any message, then click **Find chat ID** and pick your chat. A group works too – add the bot to it first. |
| **ntfy** | Install the ntfy app and subscribe to a topic. On the public `ntfy.sh` anyone who knows the topic can read it, so pick a long, hard-to-guess name – or use your own ntfy server (with an access token if it needs a login). |
| **Pushover** | Your *user key* from pushover.net and the token of an application you create there (*Your Applications → Create*). |
| **E-mail** | Any mail server. For Gmail: `smtp.gmail.com`, **STARTTLS (587)**, your address as the login and an [app password](https://myaccount.google.com/apppasswords). For a mail server in your own network with its own certificate, tick *Accept a self-signed certificate*. |
| **Webhook** | A URL that gets each message as JSON (POST). Works with Discord, Slack, Mattermost and Home Assistant webhooks. |

You can add several channels – messages go to every one that is **on**.

## What you are told about

**Problems** (on by default):

- a backup failed, or the weekly backup check found a problem,
- a stack stopped by itself – its containers stopped and nobody stopped them in the panel (and again when it runs),
- a VPN tunnel is down (and when it is back),
- a [proxy](/guides/proxy/) target doesn't respond (and when it does again),
- an [automatic update](/guides/updates/#automatic-updates) went back to the previous version, or didn't run,
- the server needs a restart after system patches (see [Server](/guides/server/)).

**Information:**

- the server was restarted (with the stacks the panel started) – on by default,
- a new version of Stackmoor is out – on by default,
- a stack was updated automatically, new images for stacks, the nightly backup finished fine – off by default.

**Server name in messages** puts a name at the start of every message, e.g. *Home: VPN office is down* – handy with more servers.

## Good to know

- A stack is reported only when it stays stopped for two checks in a row (about two minutes), so a quick restart doesn't wake you up. Starting, stopping or updating it in the panel never sends a message.
- The same message isn't sent again within 5 minutes. A message that can't be delivered is tried again after a minute and after five minutes.
- Messages use the language you last used in the panel, and the time zone of your browser when you saved the settings.

### Webhook format

```json
{
  "event": "vpn.down",
  "level": "error",
  "title": "Home: VPN office is down",
  "message": "The tunnel office is not working…",
  "server": "Home",
  "at": "2026-11-05T12:00:00.000Z",
  "text": "…",
  "content": "…"
}
```

`level` is `error`, `warn`, `info` or `ok`. `text` and `content` hold the whole message for Slack/Mattermost and Discord.
