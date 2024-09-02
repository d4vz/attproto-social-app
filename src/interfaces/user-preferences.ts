export interface UserPreferences {
  preferences: PreferencesItem[];
}

interface PreferencesItem {
  $type: string;
  birthDate?: string;
  tags?: string[];
  items?: ItemsItem[];
}

interface ItemsItem {
  id: string;
  value: string;
  targets?: string[];
  actorTarget?: string;
  expiresAt?: string;
  type?: string;
  pinned?: boolean;
}
