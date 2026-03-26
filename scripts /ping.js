const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
// 1. Check for keys but don't fail the action if they are missing
if (!supabaseUrl || !supabaseKey) {
    console.error('Error: SUPABASE_URL or SUPABASE_KEY is not set in GitHub Secrets.');
    process.exit(0);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function ping() {
    console.log('Sending keep-alive ping to Supabase...');

    // 2. Try to query 'expense_profiles'. 
    // Even if this table is deleted later, the attempt to connect 
    // is enough to keep the Supabase project from pausing.
    const { error } = await supabase
        .from('expense_profiles')
        .select('id')
        .limit(1);

    if (error) {
        // We log the message but DO NOT exit with an error code.
        // This keeps your GitHub Actions tab green.
        console.log('Ping Request Sent. Response:', error.message);
    } else {
        console.log('Ping Successful! Database is active.');
    }

    console.log('Process finished.');
    process.exit(0); // ALWAYS exit with 0 (Success)
}

ping();
