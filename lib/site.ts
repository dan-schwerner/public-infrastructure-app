/**
 * Site-wide configuration. These are the externally-facing values you'll most
 * likely want to update — keep them here so there's a single place to change.
 */
export const SITE = {
  /** Shown as a clickable mailto link in the contact section. */
  email: 'contact@danielfalzon.mt',
  /** "Link to my main profile" target on the homepage (opens in a new tab). */
  profileUrl: 'https://danielfalzon.mt',
  /** Where the "open the app" CTAs point (the feedback app route). */
  appPath: '/app',
} as const;
