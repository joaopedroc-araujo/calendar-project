import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://efzlubjyziaftwidaihs.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmemx1Ymp5emlhZnR3aWRhaWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0MjE5NTMsImV4cCI6MjAyNTk5Nzk1M30.EbWlVKV1SPfLIFekS2p3SiqkHwnWcawAu21MkytlIz0'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);