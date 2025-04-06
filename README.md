# Simple Garment CRUD App (HTML, JS, Supabase, Vercel)

This is an ultra-simple web application for managing garment records using only HTML, CSS, vanilla JavaScript, and Supabase for the backend. It is designed to be easily deployed on Vercel.

## Features

*   Create, Read, Update, Delete (CRUD) operations for Garments.
*   Garments have a Type, Color, and Description.
*   Type and Color are selected from predefined lists stored in Supabase.
*   Uses Supabase for data storage.
*   Frontend built with HTML, CSS, and vanilla JavaScript.
*   Uses a Vercel Serverless Function to securely provide Supabase credentials to the frontend.

## Supabase Setup

1.  **Create a Supabase Project:** If you haven't already, create a new project at [supabase.com](https://supabase.com/).

2.  **Get API Credentials:** Navigate to your project's Settings > API. Copy the `Project URL` and the `anon` `public` key. You will need these later.

3.  **Use the SQL Editor:** Go to the SQL Editor in your Supabase dashboard.

4.  **Create Tables:** Run the following SQL queries to create the necessary tables:

    ```sql
    -- Create the table for garment types
    CREATE TABLE garment_types (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    -- Create the table for colors
    CREATE TABLE colors (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    -- Create the main garments table with foreign keys
    CREATE TABLE garments (
        id SERIAL PRIMARY KEY,
        type_id INT NOT NULL REFERENCES garment_types(id),
        color_id INT NOT NULL REFERENCES colors(id),
        description TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    ```

5.  **Populate Dropdown Options:** Run the following SQL queries to populate the `garment_types` and `colors` tables:

    ```sql
    -- Populate garment types
    INSERT INTO garment_types (name)
    VALUES
        ('Shirt'),
        ('Pants'),
        ('Jacket'),
        ('Socks');

    -- Populate colors
    INSERT INTO colors (name)
    VALUES
        ('White'),
        ('Black'),
        ('Dark Blue'),
        ('Light Blue'),
        ('Light Gray'),
        ('Dark Gray'),
        ('Red'),
        ('Pink'),
        ('Yellow'),
        ('Orange'),
        ('Green'),
        ('Beige');
    ```

6.  **Enable Row Level Security (RLS):** For security, it's essential to enable RLS on your tables.
    *   Go to Authentication > Policies.
    *   Enable RLS for the `garments`, `garment_types`, and `colors` tables.

7.  **Create RLS Policies:** Create policies to allow public access (since this is a simple demo and doesn't involve user authentication). Run this SQL or use the policy creator UI:

    ```sql
    -- Allow public read access to garment_types
    CREATE POLICY "Allow public read access to garment types" ON garment_types
    FOR SELECT USING (true);

    -- Allow public read access to colors
    CREATE POLICY "Allow public read access to colors" ON colors
    FOR SELECT USING (true);

    -- Allow public read access to garments
    CREATE POLICY "Allow public read access to garments" ON garments
    FOR SELECT USING (true);

    -- Allow public insert access to garments (anon key can insert)
    CREATE POLICY "Allow public insert access to garments" ON garments
    FOR INSERT WITH CHECK (true);

    -- Allow public update access to garments (anon key can update)
    CREATE POLICY "Allow public update access to garments" ON garments
    FOR UPDATE USING (true) WITH CHECK (true);

    -- Allow public delete access to garments (anon key can delete)
    CREATE POLICY "Allow public delete access to garments" ON garments
    FOR DELETE USING (true);
    ```
    *Note: For a real application, you would create much stricter policies based on user authentication.* 

## Local Development

1.  **Install Vercel CLI:** If you don't have it, install the Vercel CLI globally:
    ```bash
    npm install -g vercel
    ```

2.  **Clone the Repository (if applicable):** If you cloned this code from a repository, navigate into the project directory.

3.  **Create `.env.local`:** Create a file named `.env.local` in the root of the project directory.

4.  **Add Supabase Credentials:** Add your Supabase Project URL and Anon Key to `.env.local`:
    ```
    # .env.local
    SUPABASE_URL="YOUR_SUPABASE_URL"
    SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
    ```
    Replace the placeholders with the actual values you copied earlier.
    *(This file is already created by the assistant, just ensure it has your correct keys)*

5.  **Run Locally:** Start the development server using the Vercel CLI:
    ```bash
    vercel dev
    ```
    This command will start a local server (usually on `http://localhost:3000`), load the environment variables from `.env.local`, and handle the `api/supabase.js` endpoint.

6.  **Open in Browser:** Open `http://localhost:3000` (or the URL provided by `vercel dev`) in your web browser.

## Deployment to Vercel

1.  **Push to Git:** Ensure your code (including `index.html`, `api/supabase.js`, but **excluding** `.env.local` - add it to `.gitignore`!) is pushed to a Git repository (GitHub, GitLab, Bitbucket).

2.  **Import Project on Vercel:** Go to your Vercel dashboard and import the Git repository.

3.  **Configure Project:** Vercel should automatically detect that this is a static project with a Serverless Function. No special framework preset is needed.

4.  **Configure Environment Variables:** In your Vercel project settings, go to "Environment Variables" and add the following:
    *   `SUPABASE_URL`: Your Supabase Project URL.
    *   `SUPABASE_ANON_KEY`: Your Supabase Anon Key.
    Ensure these are available for all environments (Production, Preview, Development).

5.  **Deploy:** Trigger a deployment (this usually happens automatically after the first push to the connected Git branch).

6.  **Access Your App:** Once deployed, Vercel will provide you with a URL to access your live application.

## File Structure

```
/
├── api/
│   └── supabase.js   # Serverless function for Supabase credentials
├── .env.local        # Local environment variables (DO NOT COMMIT)
├── .gitignore        # To ignore .env.local, node_modules etc.
├── index.html        # Main application file (HTML, CSS, JS)
└── README.md         # This file
```

*(You might want to add a `.gitignore` file if you haven't already to prevent committing `.env.local`)* # test-app-garments-2
