// Brand media generated with Higgsfield. These are served from Higgsfield's
// public CDN and load directly in the visitor's browser. Each usage in the UI
// pairs the image with a CSS gradient fallback so the design holds up even if a
// remote asset is unavailable.

const CDN = "https://d8j0ntlcm91z4.cloudfront.net/user_3Bs1Gzh2MpZN8Jyqk2W1lFgNYAU";

export const media = {
  heroOffice: `${CDN}/hf_20260626_211819_d72ba915-973f-4949-84af-19212ea61a55.png`,
  sprayBottle: `${CDN}/hf_20260626_211820_b7b9e252-301f-4ac9-9a09-2210422afbcf.png`,
  droplet: `${CDN}/hf_20260626_211821_bd3488c7-8081-4e7a-9eae-3f7ff31fed4b.png`,
  // Ambient hero video (image-to-video).
  heroVideo: `${CDN}/hf_20260626_212548_b9ddc520-77cf-45f1-8eb1-cbe4c46a939b.mp4`,
  // Textured 3D spray-bottle mesh (image-to-3D, GLB) for the scroll showcase.
  bottleModel:
    "https://d3u0tzju9qaucj.cloudfront.net/7d051b5a-7bfe-49fe-a484-24e7b3a9458a/0cea7b4a-6997-4d26-b567-e3d6f758b282.glb",
} as const;
