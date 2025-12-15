import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wsijycoioytxavwegmlx.supabase.co";
const supabaseKey = "sb_publishable_VKSBvZoqboiwJtCtlqNnlg_QMtBFEMR";

export const supabase = createClient(supabaseUrl, supabaseKey);
