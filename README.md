# Supabase + TanStack Table Demo

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://buymeacoffee.com/thisisfel1x)

This project demonstrates how to fetch and filter data from [Supabase](https://supabase.com) on the server side and 
display it in a [TanStack Table](https://tanstack.com/table/v8) with [shadcn/ui](https://ui.shadcn.com) responsively. 

## Motivation

During one of my own projects, I encountered the challenge of efficiently displaying data from my Supabase 
PostgreSQL table in a table format. This includes implementing lazy loading, where only a subset of data based 
on the current page is loaded, as well as calculating the total size of the table. Additionally, 
I wanted to build a basic filtering system.

In this project, I share my approach using TanStack Table and shadcn. I have slightly extended the components 
from [shadcn's data table example](https://ui.shadcn.com/docs/components/data-table) 
into `@/components/ui/basic-data-table`. The Supabase query, along with filtering logic, 
is implemented in `@/components/actions.ts`.

## Features

- **Supabase Integration**: Fetch and manage data efficiently with server-side rendering (SSR).
- **Data Visualization**: Use TanStack Table for flexible and dynamic data display with filtering capabilities.
- **Modern UI**: Styled with [shadcn/ui](https://ui.shadcn.dev) and [TailwindCSS](https://tailwindcss.com) for a clean and modern interface.

## Prerequisites

- Node.js installed
- A Supabase project (Anon Key and Project URL)

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/thisisfel1x/supabase-shadcn-database-example.git
   cd supabase-shadcn-database-example
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Supabase:
    - Add your **Anon Key** and **Project URL** to a `.env.local` file:
      ```env
      NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
      NEXT_PUBLIC_SUPABASE_URL=your-project-url
      ```

4. Ensure you have set up Row-Level Security (RLS) policies in your Supabase database.

5. Define your database schema which should look like in `types/index.ts`:
   ```typescript
   export interface DatabaseSchema {
       name: string;
       company: string;
       age: number;
       date: Date;
   }
   ```
   This is only a demonstrative example. The data was created with FakerJS

6. Start the development server:
   ```bash
   npm run dev
   ```

## Technologies Used

- [Supabase](https://supabase.com) for database and authentication
- [TanStack Table](https://tanstack.com/table/v8) for table and filtering
- [shadcn/ui](https://ui.shadcn.com) and [TailwindCSS](https://tailwindcss.com) for styling

## Support
If you enjoy this project and want to support its development, consider buying me a coffee right [here](https://buymeacoffee.com/thisisfel1x). Your support not only helps me but also contributes to the further improvement of this project. Thank you! :D

## License

This project is licensed under the MIT License. Feel free to use and modify it as you like.