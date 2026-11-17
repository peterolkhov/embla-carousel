# Autoplay restarts after stop() inside select

This is a reduced reproduction for Embla Carousel and its Autoplay plugin. No React, application state, CDN, package installation or external service is involved.

From this directory:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open http://127.0.0.1:8000 and click **Start**. The default delay is four seconds. The first `select` listener calls `autoplay.stop()`. Its log immediately shows `playing: false`.

Expected: the carousel stays on slide 1 until it is explicitly started again.

Observed: another `autoplay:play` follows the stop, and slide 2 appears four seconds later. The in-flight timer callback restarts playback after the listener returns.

`repro.js` is a standalone, locally built bundle of unmodified upstream core and Autoplay sources from `davidjerleke/embla-carousel` commit `0423b61463dd6f095d7aca810a49bbf194d6c291` (master, version `9.0.0-rc04`) plus the small harness in `entry.ts`. See `LICENSE` and `BUNDLE-SHA256.txt`. It makes no network requests beyond this local HTML and JS.

The separately downloaded, SRI-verified published npm `9.0.0-rc04` core and Autoplay packages were also tested in Chromium. This reproduction does not claim that stable v8 was tested.

Related: [#1264](https://github.com/davidjerleke/embla-carousel/issues/1264) reported stopping from a selection handler but was closed without an isolated reproduction. This page removes its app-specific logic.
