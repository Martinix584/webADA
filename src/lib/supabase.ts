import { createClient } from '@supabase/supabase-js';

// In a real application, you must set these in your .env.local file
const supabaseUrl = process.env.SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || 'placeholder_key';

export const supabase = createClient(supabaseUrl, supabaseKey);
