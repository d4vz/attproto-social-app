export interface Reply {
  cid: string;
  uri: string;
  value: Value;
}

interface Value {
  $type: string;
  createdAt: string;
  facets: any[];
  langs: string[];
  text: string;
}
