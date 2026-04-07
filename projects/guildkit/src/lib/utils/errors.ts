type GuildKitErrorOptions = {
  /**
   * Error code.
   *
   * `RECRUITER_WITHOUT_ORGS`: Authentication error when the user is a recruiter and do not belong to any organizations.
   */
  code: "RECRUITER_WITHOUT_ORGS";
};

export class GuildKitError extends Error {
  public readonly code;

  constructor(message: string, options: GuildKitErrorOptions) {
    const { code, ...superClassOptions } = options;
    super(message, superClassOptions);
    this.name = "GuildKitError";
    this.code = code;
  }
}
