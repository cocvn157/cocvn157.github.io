/**
 * Central Storefront Configuration (`kits/config.js`)
 * ====================================================
 * Paste your live Payhip or Gumroad product URLs below when ready.
 * Leave values empty ("") while in preview/direct-access mode: the storefront
 * automatically routes CTAs to the Pack Inspector Modal, Bundle Digest Copy,
 * and verified GitHub/Email contact routes (zero dead "#" or 404 links).
 */

window.KITS_STOREFRONT_CONFIG = {
  STOREFRONT_META: {
    brandName: "@cocvn157 // Developer Kits",
    authorName: "Luu Quoc Trung",
    githubHandle: "@cocvn157",
    githubUrl: "https://github.com/cocvn157",
    contactEmail: "cocvn157@gmail.com",
    portfolioUrl: "../",
    license: "MIT",
    defaultPlatformLabel: "Direct Kit Access"
  },

  /**
   * Paste live Gumroad or Payhip checkout URLs here.
   * Example:
   *   pack1: { payhip: "https://payhip.com/b/xxxxx", gumroad: "https://cocvn157.gumroad.com/l/mcp-starter" }
   */
  CHECKOUT_URLS: {
    leadMagnet: {
      payhip: "",
      gumroad: ""
    },
    pack1: {
      payhip: "",
      gumroad: ""
    },
    pack2: {
      payhip: "",
      gumroad: ""
    },
    pack3: {
      payhip: "",
      gumroad: ""
    },
    pack4: {
      payhip: "",
      gumroad: ""
    },
    founderBundle: {
      payhip: "",
      gumroad: ""
    }
  }
};
