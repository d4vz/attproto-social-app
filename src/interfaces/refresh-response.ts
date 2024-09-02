export default interface RefreshResponse {
  did: string;
  didDoc: DidDoc;
  handle: string;
  accessJwt: string;
  refreshJwt: string;
  active: boolean;
}

interface DidDoc {
  '@context': string[];
  id: string;
  alsoKnownAs: string[];
  verificationMethod: VerificationMethodItem[];
  service: ServiceItem[];
}

interface VerificationMethodItem {
  id: string;
  type: string;
  controller: string;
  publicKeyMultibase: string;
}

interface ServiceItem {
  id: string;
  type: string;
  serviceEndpoint: string;
}
