You are building one demo website for Sweet Dreams US LLC, then stopping.

Everything you need is already in this folder. Read all of it before you write a line of code.

## What is in the folder

| File | What it is |
| --- | --- |
| `DIRECTION.md` | **Cole's creative direction for this specific site, written by him.** This is the spine of the build. It outranks everything except the client's own words and the rules below. |
| `BRIEF.md` | The whole lead in one file. What they sell and the source of every fact, what the site must do, the tier, what is marked `omit`, Cole's verdicts in his own words, every phone call, and the entire text thread labelled THEM and US. |
| `CHANGES.md` | Only on a rework. **If this file exists it is the job.** Read it first. Every line in it must be visibly true on the preview you deliver. |
| `INDUSTRY.md` | What this system learned across every business in this category: which demos were approved, which were sent back, what these owners ask about, what they never answer. |
| `PAST-DEMOS.md` | Every demo built in this industry with its score, its verdict, its repo and its live URL, best first. |
| `client-media/` | The real photographs and logo files this client actually sent. If a photo is not in here, the client did not send one. |
| `calls/` | Every phone call with this client. The `-transcript.md` files are the whole verbatim call, word for word. **Read them.** The owner describes their own business in their own sentences in there, and a line lifted from how they said it beats anything you would write. Otter's speaker labels are wrong because it does not know who Cole is: work out who is talking from what they say. |
| `.sdbuild` | Identifiers and credentials for the finish step. Never edit it, never print its contents into a file you commit. |

There is no queue to claim and no database to design. The packet is complete.

## What you are allowed to do, plainly

- **Push to GitHub.** The repo already exists and origin is already set.
- **Deploy to Vercel.** The project already exists. Deploy to production, the URL will not change.
- **Use Higgsfield freely** for generated media. It is installed and it is expected, not a last resort. Backgrounds, textures, atmosphere, material studies, short loops, scroll layers.
- **Use fake demo data.** There is no database and you should not build one. Orders, bookings, inventory and inbox entries in the admin panel are sample rows in a local file. That is correct and expected.
- **Use the `/animated-website` and `/scroll-film-studio` skills.** These are the intended way to build, not exotic options. Reach for them first.

## The rules that decide whether Cole sends this

### 1. Sample content is allowed. Unlabelled sample content is not.

If the best sites in this industry carry a thing, this site can carry it too, filled with representative sample content. A menu, a price list, a gallery, a services grid, a process section. An empty site does not sell.

**Three conditions, every time:**

- **It is visibly marked on the page.** A demo bar and a quiet, consistent marker on any block holding sample content, reading like `sample, we will swap this for yours`. The owner must be able to tell in three seconds which parts are theirs and which are stand ins.
- **It is written down.** Every piece of sample content goes in `SAMPLE-CONTENT.md`, one line each, in the words Cole would use when he walks the owner through it. That file becomes what he says on the call and what the client is told when the link goes out.
- **It is plausible for them, not borrowed from a competitor.** Sample prices sit in a believable range for the category and the city. Never lift a real competitor's prices, menu items or copy.

**What is never invented, labelled or not:**

- licences, certifications, insurance figures, bonding, years in business, credentials, awards
- reviews, testimonials, star ratings, customer counts, "trusted by" claims
- any quote attributed to a named person
- health, safety, legal or financial claims
- a real address, phone number or email that is not theirs

Those create a problem that survives the demo. If the industry pattern wants a reviews section, build the section and leave it as a labelled slot that says the real ones go here.

### 2. Their own words are the raw material

The thread beats the form, the form beats the web. Pull the actual phrasing out of their text messages, their phone calls in `BRIEF.md`, their social media captions and their old site if they have one. That is how they frame their own business and it is worth more than anything you would write for them. A line lifted from how the owner described their work on the phone will outperform a line you wrote about them.

### 3. Their own media only, for anything real

Never redraw the client's logo. Never generate a photograph of their real product, storefront, staff or finished work. Generated media is for atmosphere, texture, material, motion and mood.

**If there is no logo, set their name as a piece of type and have fun with it.** A confident wordmark built from the name is the expected answer, not a failure state. It is often better than what they have.

### 4. No dashes. Anywhere on the site.

No em dash, no en dash, no double hyphen, no hyphen used as a pause. Headlines, body copy, buttons, alt text, the admin panel, all of it. Use a full stop, a comma, or two sentences. A hyphen inside a word is fine.

## Before you code

Read `DIRECTION.md` first, then `BRIEF.md` end to end including the whole thread.

Read `PAST-DEMOS.md` and **open the two highest scored demos in this industry.** Take structure that worked. Never take words, never take the palette, never take the layout wholesale.

Then search the open web for four to six of the best sites in the world in this exact category. Not local competitors, the best. For each, note what the first screen does, the single primary action, how many images and what kind, the typefaces, and how mobile actually works.

Write `PLAN.md` in the folder before you build and ship it in the repo: the idea in one sentence, the palette with exact hex and where each colour is used, the exact fonts and scale, every section in order justified against the industry pattern, the media plan, mobile written on its own, and what the admin panel needs for this specific owner.

## The build, and the thing that has been going wrong

**Every demo so far has felt like the same template with different words.** That is the problem this whole process exists to fix. The test: if this layout would work for a different business with the words swapped out, it is wrong and you start again.

Distinction comes from the idea in `DIRECTION.md` executed as a real mechanism, not from a colour change.

### The technique that works

Look at `https://exquisite-energy.vercel.app/` before you start. It is the standard. What it actually does:

- **GSAP with ScrollTrigger, plus Lenis for smooth scroll**, vendored locally into `vendor/` rather than loaded from a CDN, so the page still works in two years.
- **Scroll drives a sequence, not just fades.** The page opens on a named first state, pins one element while the content moves past it, and resolves into a finished state at the end. The motion tells one story across several sections.
- **A canvas layer** for the effect that could not be done with elements.
- **`clip-path` masks** so media appears inside shapes and letterforms instead of inside rectangles.
- **Overlapping layers**, media sitting partly behind and partly in front of type, changing as you scroll.
- **`prefers-reduced-motion` respected** throughout.
- Three typefaces doing three jobs: a display face, a body face, and a handwritten accent used sparingly.

**It will not always be a full bleed background.** Often the better version is a small piece of generated media that overlaps the type and changes as you scroll. One idea, executed completely, is the goal. Pick the mechanism that belongs to this business and build that one properly rather than applying six effects.

### Forbidden, all of these have lost demos already

- No horizontal side scrolling sections. No fake mobile app chrome or bottom tab bars.
- No sticky top nav with `backdrop-blur` over a translucent background.
- No `max-w-6xl mx-auto` as the page's only spine.
- No nav links at `text-[11px] uppercase tracking-[0.18em]`.
- No centered hero of headline, subhead and two buttons.
- No uniform grid of rounded cards with soft shadows.
- No countdown timers, no "only 2 left", no invented urgency.
- No page that is only text.

### Mobile

Write it first at 375px. No horizontal scroll anywhere. 48px tap targets, 17px minimum body, 16px inputs so iOS does not zoom, native `<input type="date">`. Full bleed bands use `max-width: 100vw`, never `100vw` alone, which causes the creep that makes a site feel broken. Check 320, 375, 390 and 430. The scroll sequence needs its own mobile version, usually simpler, never just the desktop one squeezed.

### The admin panel

`/admin` must exist and must render. One button to enter, no passcode, ever, on a demo. Sample data in a local file. Build what this owner actually needs to run their business, taken from what they said in the thread. An `/admin` that 404s is a failed build.

## Deploy, then verify it with your eyes

Deploy to production, then **open the deployed URL signed out and look at it.** A 200 response is not verification. An SSO wall, an authentication page, a 404 or a default starter page all mean it is not done.

Take two screenshots of the deployed site, signed out:

- `shots/desktop.png` at **1440 by 900**
- `shots/mobile.png` at **375 by 812**

Commit and push everything before finishing.

## Finishing, which is the only way this reaches Cole

```bash
./finish \
  --url         https://<slug>.vercel.app \
  --desktop     shots/desktop.png \
  --mobile      shots/mobile.png \
  --idea        "the one sentence from PLAN.md" \
  --empty-slots N \
  --samples     M
```

`./finish` verifies the URL is really serving the site, checks both screenshots are the right dimensions, uploads them, and records the build so it lands on Cole's approval card with your one sentence, the count of labelled empty slots, and the count of labelled sample blocks from `SAMPLE-CONTENT.md`.

If it cannot reach the network it writes `FINISH.json` in the folder instead and tells you so. That is a complete outcome, not a failure. The scheduled runner picks that file up and files it. Do not retry in a loop and do not write to the platform any other way.

If `./finish` refuses, the refusal is correct and it tells you why. It refuses to overwrite a site that is already live for a paying client, and it refuses to overwrite a demo that is already approved, sent or viewed. Stop and report what it said.

Write `NOTES.md` last: what the research found, what you sourced from the open web and where, what is a labelled empty slot, what is labelled sample content, and anything you were unsure about.

## Never

- **Never message, email or text the client.** Not once, not a draft that could be mistaken for one. You build, Cole sends.
- **Never mark anything approved.** That is Cole's click and only Cole's.
- **Never touch another business's folder or repo.**
- **Never move this folder into `SweetDreamsClients/`.** That happens later, when the client signs, and it is not part of the build.

## When you are done

Say, in a few lines: the live URL, the one sentence idea, what the scroll mechanism is, how many labelled empty slots and what each waits for, how many labelled sample blocks, what you took from the open web, and anything you would change with more information. Then stop. One demo per chat.
