import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kyhvckyxwognsanroets.supabase.co'

const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5aHZja3l4d29nbnNhbnJvZXRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0ODU3NzIsImV4cCI6MjA2NTA2MTc3Mn0.iKrlysi1ENuLr5UN1VVc-plWDIoN7Rbl8qxRFe9TGQM'
export const supabase = createClient(supabaseUrl, supabaseKey)