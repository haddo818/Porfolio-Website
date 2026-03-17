import { createClient } from "@supabase/supabase-js";
import { projectId, publicAnonKey } from "../../utils/supabase/info";

const supabaseUrl = `https://${projectId}.supabase.co`;

export const supabase = createClient(supabaseUrl, publicAnonKey);

export const INTEREST_IDS = ["bass", "band", "handaxe", "animation"] as const;
export type InterestId = (typeof INTEREST_IDS)[number];

export interface InterestLikeRow {
  id: string;
  interest_id: string;
  session_id: string;
  created_at?: string;
}
