export interface NavDestination {
  readonly name: string;
  readonly path: string;
  readonly heading: RegExp;
}

export interface NavCategory {
  readonly category: string;
  readonly items: readonly NavDestination[];
}

export interface HeaderUtilityLink {
  readonly name: string;
  readonly href: string;
  readonly target?: string;
}

export interface FooterLink {
  readonly name: string;
  readonly path: string;
  readonly heading: RegExp;
}

export interface FooterSocialLink {
  readonly name: string;
  readonly href: string;
  readonly target?: string;
}

export interface PageMeta {
  readonly path: string;
  readonly heading: RegExp;
}
