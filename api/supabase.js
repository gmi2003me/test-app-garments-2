export default function handler(req, res) {
    // Ensure environment variables are set
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
        res.status(500).json({ error: 'Supabase environment variables are not set.' });
        return;
    }

    res.status(200).json({
        supabaseUrl: process.env.SUPABASE_URL,
        supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    });
} 