export type TMetaType = 'contract_template | legal_risk | faq | definition | guidance | example';

export interface IPineconeMetadata {
  type: TMetaType;
  category: string;
  title: string;
  tags: string[];
}

export interface IPineconeStore {
  id: string;
  metadata: Record<string, string>;
  text: string;
}
