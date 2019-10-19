export interface getLicense_repository_licenseInfo {
  __typename: "License";
  /** Short identifier specified by <https://spdx.org/licenses> */
  spdxId: string | null;
  /** The license full name specified by <https://spdx.org/licenses> */
  name: string;
}

export interface getLicense_repository {
  __typename: "Repository";
  /** The description of the repository. */
  description: string | null;
  /** The license associated with the repository */
  licenseInfo: getLicense_repository_licenseInfo | null;
}

export interface getLicense {
  /** Lookup a given repository by the owner and repository name. */
  repository: getLicense_repository | null;
}

export interface getLicenseVariables {
  owner: string;
  name: string;
}
