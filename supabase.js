import { createClient } from "@supabase/supabase-js";


const supabaseUrl = "https://lyzmoviqogblxgtdkhgw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5em1vdmlxb2dibHhndGRraGd3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzUxODAyOSwiZXhwIjoyMDk5MDk0MDI5fQ.kKW-eWyJzazZ0gx2hd8uIi3FYbljxJnQgNyFf9DJcWY";


export const supabase = createClient(supabaseUrl,supabaseKey);