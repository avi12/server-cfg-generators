export enum CvarType {
  Text = "text",
  Number = "number",
  Checkbox = "checkbox",
  Select = "select",
  Email = "email"
}

export interface CvarOption {
  text: string;
  value: string | number;
}

export interface CvarItem {
  cvar: string;
  type: CvarType;
  tutorial: string;
  defaultValue?: string | number | boolean;
  options?: CvarOption[];
  specialValues?: CvarOption[];
}

export interface CvarSection {
  title: string;
}

export type CvarEntry = CvarItem | CvarSection;

export type CvarValueMap = Record<string, string | number | boolean | CvarOption | undefined>;

export function isCvarSection(entry: CvarEntry): entry is CvarSection {
  return "title" in entry;
}
