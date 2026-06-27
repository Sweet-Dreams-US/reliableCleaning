// Brand media generated with Higgsfield. Served from Higgsfield's public CDN and
// loaded directly in the visitor's browser. Each usage pairs the image with a
// CSS gradient fallback so the design holds up if a remote asset is unavailable.

const CDN = "https://d8j0ntlcm91z4.cloudfront.net/user_3Bs1Gzh2MpZN8Jyqk2W1lFgNYAU";

export const media = {
  // The three cleaning keyframes — same room, transforming as you scroll.
  roomDusty: `${CDN}/hf_20260627_001606_f8f98f62-af4c-4fb2-be7b-223f618e8e0e.png`,
  roomCleaning: `${CDN}/hf_20260627_001609_31cf92b7-f589-48f5-a7e8-162720026fb3.png`,
  roomClean: `${CDN}/hf_20260627_001611_e5359847-3327-425b-bdda-b37ad37430c5.png`,

  // The transformation video (frame 1 -> frame 3, cleaning in between).
  transformVideo: `${CDN}/hf_20260627_001728_f8881185-440d-49cd-aca1-b373f1c85e69.mp4`,

  // Legacy product shot, still used as a small accent.
  sprayBottle: `${CDN}/hf_20260626_211820_b7b9e252-301f-4ac9-9a09-2210422afbcf.png`,
} as const;

// Ordered keyframes for the scroll-driven hero.
export const heroFrames = [
  {
    src: media.roomDusty,
    label: "Before",
    caption: "Dust, clutter, neglect.",
  },
  {
    src: media.roomCleaning,
    label: "In progress",
    caption: "Our crew gets to work.",
  },
  {
    src: media.roomClean,
    label: "After",
    caption: "Spotless, bright, reliable.",
  },
] as const;
