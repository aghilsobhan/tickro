import {createClient} from '@supabase/supabase-js'
const supabaseUrl = 'https://lkbsscifrtavdgwbbbpi.supabase.co';
const supabaseKey = 
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxrYnNzY2lmcnRhdmRnd2JiYnBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAwNTUzNTUsImV4cCI6MjAyNTYzMTM1NX0.Oc1sUiitgTIwyH-xuWqzgxYmCsRQ_5D9frZQ84jizhw";
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase;