# DIRECTION, Reliable Cleaning Service

Cole's creative direction for this rebuild. It outranks everything in this repo except Reliable Cleaning's own words on reliable-clean.com.

## Start here

Reliable Cleaning is a commercial janitorial company in Fort Wayne, since 1976, with 140 employees and 83+ facilities maintained across Northern Indiana, South Central Michigan and North Western Ohio. Their ideal job, in their words, is "cleaning five days a week or more" for medium and large facilities: plants, warehouses, offices, medical, schools. **Every word, number and testimonial comes from their live site, read 9/30 and saved in `client-media/reliable-site-2026-09-30.md`.**

**Why the first build's scroll never made sense:** it showed one generated dusty room getting clean, which is a house cleaning story. Reliable does not clean houses. Their customer is a facility or plant manager, their crews work while that manager's building is empty, and the manager's experience of Reliable is walking in the next morning to a clean building. So the scroll tells that story: **the night shift**, from the moment the building empties to the moment it opens.

**This replaces the current build.** The Next.js build in this repo is discarded, including the dusty room hero, the 3D spray bottle and orbs, the invented numbers (1,200+ facilities, 98% retention, 24/7), the invented email and hours, the three made up testimonials, the invented town list, and the whole sample data operations console. Remove it with `git rm` (src/, public/, next.config.mjs, postcss.config.mjs, tailwind.config.ts, tsconfig.json, package.json, package-lock.json, .github/workflows/deploy.yml), keep the history, and build a static multi page site in this repo (reliableCleaning). It deploys to a new Vercel project, reliable-cleaning, not GitHub Pages.

## What this business is

Their home headline: **"Building long-term partnerships that begin with dependable commercial cleaning."** Their line: "Reliable. It's in our name." Their numbers: **5 decades of experience, 140 employees, 83+ facilities maintained.** Their three core services (Commercial Janitorial, Specializing in Larger Facilities, Day Porter Services), their full service list, their Special Projects and Floor Care lists, their thirteen industries with a paragraph each, their Proven Process (seven stages), their six FAQs, their eight testimonials, their About text including "established in 1976 on the foundation of strong Christian values", their service counties in three states, their quote form fields, their careers page and their eleven blog posts. All in the notes, word for word.

Contact: **(260) 483-3478**, 302 E Wallace St, Fort Wayne, IN 46803, their Facebook page. They publish no email and no hours, so neither appears.

Do not print: an email address, hours, a BBB rating, a founder name, prices, "Covid-19 Disinfecting", or any number or testimonial not in the notes. Never show their stock photos (the AdobeStock image, the Industrial Callout, the three Roll models).

## Their media, in `client-media/site/`

- `Website-Logo.png` (color) and `Reliable-Cleaning-White-Logo.png` (for dark grounds): their logo, a blue building with aqua bubbles, "Reliable" in blue script, "cleaning" bold, "COMMERCIAL JANITORIAL SERVICES" under it. Already wide, so it goes in the nav as it is; clean it to a transparent PNG with Higgsfield if the edges need it, nothing redrawn.
- `20220609_153539-full.jpg`: their own branded SUV with the hatch open, stocked with supplies. The one real photo of their operation. Use it on About and Careers.
- `Updated-Font-Size-1024x576.png`: their Proven Process graphic. Rebuild it live on the Process page; never show the image.
- `Indiana_Ohio-Graphic.svg`: their service area map. Use it on About, recolored to the palette.
- `ISSA-logo.jpeg`, `BSCAI_Logo.png`: the organizations they follow (with the CDC, named in text). `Daily-Pay-orange-on-white-1024x576.png`: the DailyPay benefit on Careers.
Never generate a cleaner, a crew, a customer, their vehicle, their office or a client's building presented as one they clean.

## The look

**Archetype: the night shift.** Commercial cleaning happens after the building empties. The home page runs one night: the building's lights go off as staff leave at 5 PM, Reliable's crew moves through it room by room overnight, each room comes up clean, and at 6 AM the lights come on for the people who work there. A clock in Martian Mono runs the whole time. It is the plain story of what the customer buys: they leave, the work gets done, they come back to it.

**Fonts.**
- Display: **Geologica**, 700 and 800. Headlines, stage names, industry names.
- Clock and labels: **Martian Mono**, 400 and 600. The clock, times, counters, small labels, the process stage numbers.
- Body: **Onest**, 400, 500, 700. Body 18 px desktop, 16 px phone.
Their script "Reliable" lives only in their logo; never imitate it in type.

**Palette.** From their logo, and the building at night.
- Night navy `#0A1A2F`: the night ground, the overnight sections, the footer.
- Reliable blue `#1C6FC3`: from the building and "Reliable" in their logo. Buttons, links, the crew marker.
- Bubble aqua `#4FC6E0`: from the bubbles. The progress line, the clean state of each room, small highlights.
- Lit window `#FFF4D6`: warm light in the windows at 6 AM and in the morning sections.
- Morning white `#F7F9FB`: the day ground for inner pages.
- Slate `#5B6B7F`: quiet text, lines.
Back to back sections never share a ground: night navy, morning white, and a blueprint ground (asset 3) alternate.

**Signature interaction: the night shift.** On home, pinned for about four screens. A clean cutaway illustration of a commercial building (asset 1) fills the screen: lobby, offices, restrooms, a breakroom, a production floor and a warehouse bay, drawn in thin lines on night navy. The Martian Mono clock top right reads 5:00 PM and the building is lit and busy; as the visitor scrolls, the lights go down (asset 2, the same drawing dark), the clock runs forward, and a small blue marker with their aqua bubble moves room to room. Each room it reaches brightens from dim to clean aqua and names the work done there from their own service list, one line each: Lobby "Dust Maintenance, Vacuuming", Offices "Janitorial Cleaning, Trash & Recycling Removal", Restrooms "Restroom Cleaning & Disinfecting, Ordering Inventory to Stock Restrooms", Breakroom "Breakroom Cleaning, High Touch Disinfecting", Production floor "Floor Scrubbing, Hard Floor Burnishing", Warehouse "Concrete Stripping & Sealing". At 6:00 AM every window goes warm (asset 1 again, morning version) and one line sets over it: "Quality Commercial Cleaning Since 1976", with the Request a Quote button. On a phone the building is cropped to a tall stack of the same rooms and the marker moves down it. Under reduced motion the finished morning building shows with every room labelled.

Build it as layered images with masks per room (the three versions of asset 1 share one exact composition) plus SVG for the marker and room outlines, driven by scroll with GSAP ScrollTrigger. No video, no WebGL.

**Seam treatment: the shift line.** Sections meet on a thin horizontal line with a Martian Mono time stamp at the left edge (the time of day that section belongs to, "5:00 PM", "11:40 PM", "6:00 AM"), and a small aqua bubble at the right. Same at every seam.

## Higgsfield assets for this build

1. **The building cutaway, three states, one composition.** `nano_banana_pro`, 16:9 and a 9:16 crop version: "a clean architectural cutaway illustration of a two story commercial building in section, showing a lobby, offices, restrooms, a breakroom, a manufacturing floor and a warehouse bay with racking, thin navy and blue line art on dark navy, flat, no people, no text, no logos". Then, from that exact image as the reference and keeping the composition identical: a "lights off, night" version (windows dark, rooms dim) and a "morning" version (every room clean and lit with warm window light). The three must register pixel for pixel so the masks line up; check by overlaying them.
2. **Marker.** A small round marker in Reliable blue with a cluster of aqua bubbles like their logo's bubbles, transparent, flat.
3. **Blueprint ground.** `nano_banana_pro`, "a seamless texture of a faint blue blueprint grid on white paper, even light, no drawings, no text", for the blueprint sections.
4. **Page title art**, flat illustrations in the same line style as asset 1, no people, no text: Services, a floor scrubber machine; Industries, a factory roofline with a loading dock; Process, a clipboard with a checklist; Careers, a supply cart; Contact, a building entrance at dawn.

## The logo

Their logo in the nav at 44 px tall on desktop (color on the morning pages, white on night navy), the building mark alone cropped from it at 36 px on a phone. Never in the hero; the hero is the night shift.

## Pages

The nav: **Services, Industries, Our Process, About, Careers, Contact**, the logo on the left linking home, and a blue **Request a Quote** button that opens the quote modal.

1. **Home (`/`).** First screen at 5:00 PM: their headline "Building long-term partnerships that begin with dependable commercial cleaning." large, "Commercial janitorial services across Northern Indiana, South Central Michigan and North Western Ohio" small, Request a Quote and their phone. Then the night shift. Then short bands: their three numbers as Martian Mono counters (5 decades, 140 employees, 83+ facilities); their three core services linking to their pages; two testimonials linking to Testimonials; "Our ideal job is cleaning five days a week or more" with Request a Quote. Keep home short.
2. **Services (`/services/`)**, with pages **Commercial Janitorial (`/services/commercial-janitorial/`)**, **Large Facilities (`/services/large-facilities/`)**, **Day Porter (`/services/day-porter/`)** and **Special Projects & Floor Care (`/services/floor-care/`)**. Each with their paragraphs and lists word for word, and the quote button preselecting the matching "Interested In" option. Services also carries their "State of the Art Cleaning Equipment and Quality Products" paragraph and their full service list.
3. **Industries (`/industries/`).** Their intro and all thirteen industries, each a card with its title art line icon and their paragraph. Industrial & Manufacturing first, marked "This is our specialty!" as they say it.
4. **Our Process (`/process/`).** Their Proven Process rebuilt live: seven stages on one line that the visitor scrolls along, each stage opening its points, the bracket "Business Development works with the client" over the first four and "Area Manager takes care of the client" from Startup on, and the loop from Annual Review back to Ensure Service Level drawn as a return arrow. Then their FAQ about smooth startups and long term partnerships.
5. **About (`/about/`).** Their About text, "Since 1976", the Christian values line, What Makes Us Unique (three), their service area map with the counties listed by state, the organizations they follow, their SUV photo, and links to Testimonials and FAQ.
6. **Testimonials (`/testimonials/`)**, **FAQ (`/faq/`)** and **News & Resources (`/news/`)**, linked from About, the footer and home. Testimonials: all eight word for word. FAQ: all six. News: their eleven post titles as cards linking to their posts on reliable-clean.com (the posts move over when the domain does).
7. **Careers (`/careers/`).** Their Join Our Team text, the eight benefits, the four career paths, their job FAQ, the DailyPay mark, their SUV photo, and Apply Now linking to their JobLink portal in a new tab.
8. **Contact (`/contact/`).** Their address with the map link, the phone as a tap to call link, Facebook, their "Why businesses choose Reliable Cleaning" three points, and the quote form inline (the one page it sits in the page).

Every page has the full nav, the nav indicator, a title band, the quote button, and the footer with the white logo, the address, the phone, the counties line, and links to every page.

## Forms

- **Request a Quote** (a modal from every quote button, inline on Contact), stepped, two things at a time, Back on every step after the first, using their fields:
  1. Interested In (their six options, choose any) and Approximate Number of Employees (their eight options).
  2. Company and your name.
  3. Email and phone.
  4. Message (optional).
  Button "Send". Confirmation: "Thanks. Reliable Cleaning will contact you about your free, no obligation quote."
Careers applications go to their JobLink portal, not a form here. No other forms.

## The admin for this build

Everything in "The admin link" house rule, plus:
- **Quote requests.** Every request with company, name, contact, interests, employee count and message. Status: New, Contacted, Walkthrough scheduled, Proposal sent, Won, Lost (their process stages). An email for each new request, as a setting.
- **Services.** The four service pages' text and lists, editable.
- **Industries.** The thirteen, editable, with order and a show switch.
- **Testimonials.** The eight loaded, editable, with order and a show switch.
- **News.** The eleven posts loaded as title and link, with room to add more.
- **Business info.** Phone, address, map link, Facebook, JobLink link, the three numbers and the counties loaded. Email and hours empty to start.
No example requests.

## Empty on purpose (build notes only, never on the page)

An email address. Office hours. Real photos of their crews at work (none are public; Cole can shoot them). Blog posts rebuilt on this site.

---

# House rules

Everything above is this build. Everything below applies to every Sweet Dreams demo. Both are required.

## Its own look, required on every build

Cole, 9/23: demos built in separate chats came out looking like the same site with a different name on it. Same type, same palette logic, same layout, same scroll moves. That is a failed build even when every other rule in this file is met.

1. **Use the fonts this direction names, exactly.** Self host them: download the woff2 files into `fonts/` and load them with `@font-face`. Do not swap a named face for something you like better.
2. **Banned faces on every build unless this direction names them:** Inter, Inter Tight, Roboto, Arial, Helvetica, Poppins, Montserrat, Lato, Open Sans, Nunito, Work Sans, DM Sans, DM Serif, DM Mono, Space Grotesk, Space Mono, Manrope, Figtree, Public Sans, Source Sans, Source Serif 4, Karla, Jost, Outfit, Syne, Oswald, Bebas Neue, Anton, Barlow in every width, Archivo in every width, IBM Plex in every style, JetBrains Mono, Fraunces, Playfair Display, Cormorant in every style, Bodoni Moda, Instrument Serif, Instrument Sans, Bricolage Grotesque, Marcellus, Italiana, Alfa Slab One, Caveat. These are the faces our last hundred demos leaned on. That is why they all look alike.
3. **Use the palette hexes named here, in the roles named here.** "A warm neutral plus one accent" is not a palette. It is the default that made every build look the same.
4. **Build the layout archetype this direction names.** The banned skeleton is: centred hero with a headline and two buttons, a row of three icon cards, an image and text split row, a testimonial carousel, a call to action band, a four column footer. If a section could be dropped into another business's site unchanged, it is not finished.
5. **Moves we have worn out.** Do not use any of these unless this direction asks for it by name: a thin line that draws itself down the page, underlines or marks that fill in as you scroll, 01 / 02 / 03 numbered eyebrow labels, a small uppercase mono label over every heading, a progress strip made of plain rectangles, film grain over the whole page, a scrolling marquee of service names, a giant pale wordmark behind the hero.
6. **Write `DESIGN-CARD.md` before you write any code.** Fonts, every hex with its role, the archetype in one sentence, the signature interaction, how the nav progress indicator works, and the list of Higgsfield assets you are about to make. Read it back against rules 2 and 5 and change anything that matches. Then build to the card.

## Higgsfield, required on every build

Higgsfield is a main tool on every build, not a texture tool. Any earlier line in this packet that limits Higgsfield to texture, or tells you to skip it, is overridden by this section.

**How.** The CLI is `higgsfield` (also `~/.local/node/bin/higgsfield`). Images: `higgsfield generate create gpt_image_2_5 --prompt "..." --aspect_ratio 16:9 --quality high --resolution 2k --wait`. Add `--background transparent` for cut out art. Add `--image-references ./path/file.png` to work from a real file. `nano_banana_pro` takes up to 14 image references and is the one to use when a set has to stay consistent. `flux_kontext` edits an existing image. `image_background_remover` and `bytedance_image_upscale` clean up the client's own photos. Video: `seedance_2_0`, `kling3_0`, `veo3_1`, with `--start-image` to animate a still you already made. `--wait` prints the result URL. Download it with curl into `assets/generated/`. Run `higgsfield model get <model>` if a flag is rejected.

**How much.** Every build makes at least the assets this direction lists, which is usually 6 to 12 images and 1 or 2 short loops. Record every file in `assets/generated/MANIFEST.md`: file name, model, the full prompt, and where it is used on the page. A build with an empty `assets/generated/` is not finished.

**What it is for.** Brand illustration, patterns, grounds, textures, section art, an icon set drawn in one hand, ambient loops of materials and objects for the hero, logo lockups made from the client's real logo file, and clean up, upscale and background removal of the client's own photos.

**What it never makes.** Anything a visitor would take for the client's own work, product, storefront, staff, customers or results. No invented product shots, no invented job photos, no before and after, no people presented as clients, no staff portraits. No other company's logo or trademark. No words: every word on the page is HTML text, never baked into a generated image. The one exception is a logo lockup made from the client's real logo file.

**Quality.** Every output is checked by eye before it goes on the page. Reject and regenerate anything off palette, anything with garbled lettering, extra fingers or melted edges, anything that looks like stock. Prompts name the palette hexes from this direction.

**Video.** Compress with ffmpeg to H.264 MP4 under 4 MB, `muted autoplay loop playsinline`, a poster frame from the first second, and a still in its place under `prefers-reduced-motion`. When a build has a generated loop, `/animated-website` is allowed to use it as its source video.

**Scroll films made of more than one clip are chained frame to frame.** Cole, 9/25: when a scroll film is built from several Higgsfield clips joined into one, the joins must look natural. A cut, a jump in the light, or an object that shifts at a seam is a failed film. This applies to every scroll film that plays clips one after another, in `/scroll-film-studio` or `/animated-website`. A single ambient loop on its own is not covered by this rule.
1. **Clip 1** starts from the still this direction describes, with `--start-image`.
2. **Clip 2 starts on the last frame of clip 1.** Pull that frame at full resolution as a PNG: `ffmpeg -sseof -0.5 -i clip1.mp4 -update 1 -q:v 1 clip1_last.png` (this keeps overwriting until the true last frame). Do not crop, upscale, recolour or edit it. Pass it as `--start-image` for clip 2.
3. **Clip 3 starts on the last frame of clip 2,** and so on for every clip in the film.
4. **Keep every clip in the chain matched:** the same model, aspect ratio and resolution, the same palette hexes and light words in every prompt, and camera movement that carries on in the same direction and speed from where the last clip ended. Each prompt describes only what changes next.
5. **Join them without a stutter.** The first frame of each clip after the first is a copy of the frame before it, so drop it when joining (trim one frame from the start of clips 2 onward), then join with ffmpeg into one film.
6. **Check every seam by eye**, stepping frame by frame across it. If anything jumps (position, light, colour, focus, speed), regenerate that clip from the same start frame. Never cover a bad seam with a crossfade, a flash or a text card.
7. **Record the chain** in `assets/generated/MANIFEST.md`: each clip, the frame it started from, its prompt, and the seam check result.

## The logo lives in the nav, required on every build

1. **The logo never goes in the hero or in the header section of the page.** No big logo centred at the top. The hero leads with the business's own words or its work.
2. **A horizontal version of the logo sits in the sticky nav**, on the left, 28 to 44 px tall on desktop and 24 to 32 px on a phone.
3. **If the real logo is square, round or a badge, it does not go in the nav as it is.** Make a horizontal lockup from the real file with Higgsfield: mark on the left, name on one line to the right, same drawing, same letterforms, same colours, transparent background. Use `gpt_image_2_5` or `nano_banana_pro` with the real logo file as the image reference. Also make a one colour version for dark grounds and a mark only version for the favicon and the phone nav.
4. **Check the lockup against the original, side by side.** If the drawing changed, a letter changed, or the spelling changed, reject it. After three failed tries, trace the mark to SVG (`potrace`) and set the name in the face closest to the original lettering.
5. **No logo file, no invented logo.** Set the name in the display face named in this direction and leave the mark to the client.
6. The full original logo may appear once, at a modest size, in the footer.

## Never tell the client what is missing, required on every build

Cole, 9/24: a demo that tells the owner what he did not send is rude, and we will not send one. Our own builds did it: "Left blank on purpose", "Photos pending" four times, "No job of theirs has been faked", "none has been given", "The list is empty, and that is not a mistake", "Nothing has been guessed".

1. **No copy on any public page about what we do not have.** Not "pending", not "coming soon" for his photos, not "not provided", not "left blank", not "until verified", not "placeholder", not "goes here", not "to be confirmed". No footer disclaimer about the demo. What we do not have is simply not on the page.
2. **No labelled empty slots on the public page.** A gallery, a team row, a reviews block or a photo grid only renders when the admin has something in it. With nothing in it, the section does not exist and the page still reads as finished. Design the page so it looks complete without them: type, Higgsfield art, texture, the owner's own words.
3. **Write to the owner's customer, in the owner's voice.** It is his site. "We" and "our" for the business, "you" for the customer. Never "they", "their listing", "the owner", "this business says".
4. **No commentary about the build.** Nothing that explains our rules, our sources or our honesty. Never "from their own listing", "no filler added", "nothing was guessed".
5. **Where it goes instead.** Everything missing and every question for the client goes in the build notes under "Empty on purpose", and nowhere a visitor can see. The admin can show plain empty states written to the owner ("Your photos show here once you add them"), because the admin is his tool.

## It opens on any phone, required on every build

One owner never saw his demo. He texted "Its blank" and sent a screenshot of an Android browser. The page has to open for a tradesman on an older Android phone tapping a link in a text.

1. **Every word is in the HTML.** The page reads top to bottom with JavaScript turned off. Scripts only add motion. Nothing is hidden until a script reveals it: set the "before" state of an animation from the script, never in the CSS.
2. **Light first load.** Under 1.5 MB before the visitor scrolls. Fonts subset, images WebP or AVIF at the size they are shown, video and heavy art lazy loaded.
3. **Check it the way he opens it.** Chrome device emulation at 360 px wide with an Android user agent and "Slow 4G", plus a plain private window, signed out of Vercel. The production URL, not a preview URL.
4. **No wall in front of the page.** No Vercel login, no password on the public page, no cookie gate, no age gate on a page that does not need one.

## More than one page, required on every build

Cole, 9/26, tightened 9/28: demos still came out as one long landing page with a couple of thin pages hung off the nav. A real business site has pages, and the client should see there is more to it than one scroll, even where those pages are mostly empty for now.

1. **The home page is short.** The first screen this direction describes, then three to five short bands, each one a short version of one page with a link to that page, then the footer. The full service list, the full menu, every photo, the full story, the FAQ, the event list and the long explanations live on their pages, not on home. If a band on home runs past about one screen, it belongs on its own page with a short version left on home. A direction's signature interaction stays on home.
2. **The nav leads to pages.** The nav links go to real pages with their own URLs (`/services/`, `/about/`, `/gallery/`, `/contact/` and so on), never to anchors further down the home page. Each page is its own HTML file so it works with JavaScript off and can be shared as a link.
3. **Which pages, and how many.** Use the pages this direction names. Every build has at least four real pages besides home, and never more than six links in the main nav. If the direction names fewer than four, add pages that fit this business, in its own words where it has them: Services or Menu, About, Our Work or Gallery, FAQ, Events, Service Area, Contact. A store keeps its shop, collection and product pages on top of these. Events keep their event pages.
4. **What goes on each page.** Everything real that belongs on that page goes there: every service with every detail on Services, the full story on About, every photo on Gallery, every question on FAQ. Nothing on a page is invented to fill it.
5. **A thin page shows the demo notice.** A page, or the main section of a page, whose content is waiting on the owner (a menu that does not exist yet, an event list with no events, an about page with no story, a gallery with one photo) still gets the full site: nav, progress indicator, a designed title band with its Higgsfield art, whatever real lines we have for it, the page's call to action and the footer. Where the missing content would sit, it carries this notice, in Cole's words: **"This is a demo, and this page will be complete for the full live website."** Set it as a designed part of the page in this site's type and colours, a card or band that belongs to the site, never a browser alert, never a banner across the top, never the old demo bar, never in the nav. At most one notice per page. A page that already has its real content does not show it, and it disappears from a page once the owner fills that page in the admin. The notice never names what the owner did not send ("no photos yet", "menu pending", "not provided", "coming soon", "under construction"). This notice is the one allowed exception to "no labelled empty slots", and it overrides any line in a direction saying a thin page should read as finished on its own.
6. **The admin fills them.** Every page with editable content has a matching screen in the admin (the services list, the about text, the gallery, the FAQ, the events). What the owner adds there shows on that page.
7. **Contact page and forms.** The Contact page is the one place a form may sit inline, because the visitor chose that page for it. Every call to action button anywhere else opens the form modal where it is clicked and never navigates to the Contact page, as the "Forms open in a modal" rule says. The nav's Contact link is the only way to the Contact page.
8. **Phone nav.** On a phone the page links sit in a menu that opens from a clearly marked button in the sticky nav, with the main call to action still visible without opening it. The current page is marked in the nav on every size.
9. **Check them all.** Every page is checked at 1440, 390 and 360 px, with JavaScript off, and on the production URL, the same as the home page. Every nav link on every page works, every call to action opens the modal without changing the URL, and every thin page shows the notice once.

## The admin link, required on every build

Cole sends every demo as two links: the homepage and the admin. The admin is how the owner sees they could run this site without a programmer. It is part of the build, not an extra.

1. **Route, and no code.** The admin lives at `/admin` and opens straight away. It is a demo: no access code, no passcode, no login screen, no password field anywhere. The public site never links to the admin; Cole sends the link. Because the admin is open, it only ever holds the business's public contact details, never the owner's private phone or email.
2. **Where changes are saved.** In the browser, with `localStorage`, on that device only. No Supabase, no keys, no env file, no server. A one line notice sits at the top of the admin: "Demo mode. Changes are saved on this device until your site goes live." When the client signs, the same admin moves onto the shared FreeWebsites project.
3. **The public site reads the same store.** An edit in the admin shows on the public site in that browser. A form sent from the public site lands in the admin inbox in that browser. That round trip is the demo: fill in the form, open the admin, see it arrive.
4. **It starts with only what is real.** Every service, price, product, hour and event already on the public site is loaded into the admin. Nothing else. No example inquiries, no sample orders, no test rows marked "example", no demo customers. An empty list gets a designed empty state that says what will appear there.
5. **Every build gets these:**
   - **Inquiries.** Every form on the site lands here. Status: New, Contacted, Won or Booked, Closed. A notes field, a filter by status, a CSV export.
   - **Business info.** Phone, email, address, social links.
   - **Hours**, for any business with open hours. Weekly hours plus closure dates, driving a "Closed today" or "Open now" line on the site.
   - **Announcement bar.** On or off, text, optional link, start and end date.
   - **Photos.** Add, reorder, caption and hide the photos in each gallery on the site.
6. **Then by the kind of business,** as this direction names: services with prices, a menu with a sold out switch, products with variants and stock, collections, orders with status and tracking, events that each get their own simple landing page, drop and pre order management, locations, partners, FAQ, team.
7. **Stores and events get real pages.** Each product has its own product page, each collection its own collection page, each event its own simple landing page, all driven by the admin.
8. **Plain and fast.** Same fonts and colours as the site, but the admin is a working tool: clear lists, big tap targets, works at 390 px wide, one save button per screen that is always in reach.
9. **Health and clinical businesses** get the inquiry inbox with a name and a reason to call, and nothing clinical, same as the public form.

## House rules, all sites

1. No dashes anywhere in the copy. No em dash, no en dash, no double hyphen, no hyphen used as a pause. A hyphen inside a word is fine.
2. No metaphor. No wording written to make something sound special. Say what the thing is.
3. Branding has to feel real. More than one typeface, real emphasis, real animation, a drawn mark of our own. Bland default type is a failed build.

## Sticky nav and scroll progress, required on every build

1. The navigation is sticky. It stays on screen the whole way down the page.
2. Directly under the nav sits a scroll progress indicator running the full width of the viewport, tracking how far down the page the visitor is.
3. That indicator is branded to this business. Never a plain coloured bar, never a default accent stripe. It is built out of something that already belongs to this brand and it fills, draws or changes state as the page scrolls.
4. It has to read at a glance on a phone as well as on a desktop, and it respects prefers-reduced-motion by showing its state without animating between steps.

For this build: the indicator is a thin aqua line under the nav with a tiny Martian Mono clock riding its leading edge that reads the time of the night as the visitor scrolls, from 5:00 PM at the top of the page to 6:00 AM at the bottom, with a small bubble trail behind it. On a phone the line is 4 px and the clock shows hours only. Under reduced motion the line fills and the clock is hidden.

## Before and after images, required on every build

If a build shows a before and after comparison, whether as a slider, a wipe or a pair, the two images must be the exact same photograph position. Same camera spot, same height, same lens, same framing, same crop, aligned to the pixel so nothing in the frame moves when the handle moves. The only thing that changes is the work.

Two different angles in a slider is a failed build. The visitor reads it as a trick, because it is one.

If the client has not sent a matched pair, the comparison does not get built and nothing on the page mentions it. The pair goes on the ask list in the build notes.

No before and after on this build. They have no matched pairs of the same space from the same spot. No slider.

## Layout density, required on every build

Two real failures from our own builds drive this rule. One site put a whole form in the left third of the screen with the remaining two thirds empty black. Another put a giant pale wordmark in the middle of a white screen and dropped the only readable sentence into the bottom left corner at body size. Both read as unfinished.

**Height.** A section is as tall as its content needs and no taller. Default ceiling is 100vh. A section goes past that only when it actually holds more, a long list or a catalogue. Never pad a section to make room for an animation. Shorter is better every time.

**Width.** No column of content parked in the left third with the rest of the screen empty. Either centre the column, or build a real second column and use the width. If the viewport is wider than 1100px and the content occupies less than half of it, the layout has failed. A text column runs 45 to 75 characters.

**Type size.** Body copy is never under 17px on desktop or 16px on mobile. A pull line or a statement that carries a section is at least 28px and usually much larger. Nothing that matters sits small in a corner of a large empty field.

**Scroll sections where the text changes.** The text sits in the optical centre of the viewport, at a size that reads at a glance, on a field that is not mostly empty. One state is one viewport at most.

**Pinned stages.** Scroll length while pinned is at most 100vh per state and at most 300vh total.

**Mobile.** It has to fit cleanly, and that is checked, not assumed. No horizontal scroll at any width. 16px side gutters. Tap targets at least 44px. Type scales down but never below 16px for body. Check the page at 390px wide before calling it done.

## Section backgrounds and seams, required on every build

Branded backgrounds are wanted. A patterned or textured ground is one of the best things on a site. What kills it is two sections that do not meet cleanly. Our own Moody build put a flat black block on top of a purple splatter ground, so the splatter only showed as a ragged frame around the outside and the pattern was cut mid motif at the seam. That is the failure this rule exists to stop.

**No two touching sections share the same background.** If two sections in a row want the same ground, they are one section. Never three sections of the same value in a row anywhere on the page.

**A patterned ground owns its whole section.** Full bleed, edge to edge, top to bottom. It never appears only as a border, a frame or a margin around a flat block sitting on top of it.

**No flat panel floating on a patterned section.** Either the whole section is the pattern, or the whole section is flat.

**One seam treatment for the whole site.** Pick how two sections meet and use that same treatment at every seam.

**Cut a pattern at a full edge.** No accidental sliver of a third colour showing between two sections.

**Check the rhythm.** View the whole page at 25 percent zoom. The bands of ground should read as a deliberate alternation. If the page reads as blocks stacked at random, reorder the sections.

## Forms open in a modal, required on every build

Any contact, quote, estimate, request or lead form is opened by a button and appears in a modal over the page. It is not laid out inline down a section. The only exception is a dedicated contact page where the form is the whole point of the page.

**Steps.** More than four fields means the form is stepped, two or three fields at a time with a Next button. Ask the easy thing first and the personal thing last. Never open with name and phone.

**Progress and going back.** Show which step this is. Every step after the first has a Back button that keeps what was already typed.

**Required fields.** Only what is actually required. Phone or email, one of the two, never both forced.

**The button.** It says what happens, in his own words where we have them.

**Mechanics.** Native `<dialog>` with `showModal()`, or a div with `role="dialog"` and `aria-modal="true"`. Focus moves to the first field on open. Escape closes it. Focus is trapped inside while open. Focus returns to the opening button on close. Background scroll locked. Backdrop click closes.

**Mobile.** Below 700px the modal is a full screen sheet. 16px gutters, fields at least 44px tall, the Next button always reachable and never hidden behind the keyboard.

**It opens on a click and only on a click.** No modal on page load, no exit intent, no timer, no scroll trigger, no chat bubble that opens itself.

**One modal, reused.** Every button that needs the form opens the same modal.

**A button never takes the visitor to a form page.** Cole, 9/28: builds had their contact, quote and request buttons navigating to a separate page. Every button that asks for the form opens the modal right where it was clicked, on every page, including the call to action button in the sticky nav and every button on the home page. Where a direction says a button "goes to" a form page, "opens Request", or leads to Contact or Quote, build it as that button opening the modal, prefilled the same way. The only thing that goes to the form page is the page's own link in the nav (and the footer). Check it: click every call to action on every page and confirm none of them changes the URL.

**Still no database.** The form sends nothing to any server. It saves the entry in the browser so it shows up in the admin inbox, as "The admin link" section says, and nothing more.

## The database line, required on every build

A demo has no database. It is static. Every word, price, product, hour, review and photo on it is something the client gave us or something already on their live site. No seeded records, no placeholder rows, no example customers, no sample orders, no invented inventory, no fake reviews.

If a feature only makes sense with stored data and the client has not given us that data, it does not get built. It is left off the public page and named in the build notes under "Empty on purpose." The admin can hold it, with an empty state written to the owner.

The admin is the one place a demo saves anything, and only in the visitor's own browser, exactly as "The admin link" section says.

A demo never connects to the FreeWebsites Supabase project, never carries its keys, and never ships an env file pointing at it.

When a client signs, the site moves onto the shared FreeWebsites Supabase project and only then gets real tables, real rows and real writes.

For this build: nothing is sent to any server. Quote requests are saved in the browser for the admin only, as the admin rule says.

