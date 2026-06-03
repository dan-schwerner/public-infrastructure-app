/**
 * Site-wide configuration. These are the externally-facing values you'll most
 * likely want to update — keep them here so there's a single place to change.
 */
export const SITE = {
  /** Shown as a clickable mailto link in the contact section. */
  email: 'danfalzon26@gmail.com',
  /**
   * "Link to my main profile" target on the homepage.
   * TODO: confirm / update this to your deployed df-portfolio URL once it's live.
   */
  profileUrl: 'https://danfalzon.com',
  /** Where the "open the app" CTAs point (the feedback app route). */
  appPath: '/app',
} as const;
