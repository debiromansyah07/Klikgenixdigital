# Supabase Setup for KlixGenix.ID

## 1. Create Supabase Project

1. Go to [Supabase](https://supabase.com)
2. Create a new project
3. Note down your project URL and anon key

## 2. Environment Variables

Add to your `.env` file:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 3. Install Dependencies

```bash
npm install @supabase/supabase-js
```

## 4. Database Schema

Run these SQL commands in Supabase SQL Editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE user_profiles (
  user_id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  avatar TEXT,
  bio TEXT,
  location TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notification settings
CREATE TABLE notification_settings (
  user_id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email_notifications JSONB DEFAULT '{
    "productUpdates": true,
    "securityAlerts": true,
    "paymentReminders": true,
    "promotions": false,
    "newsletter": false
  }'::jsonb,
  push_notifications JSONB DEFAULT '{
    "appUpdates": true,
    "accountActivity": true,
    "maintenanceAlerts": true,
    "newFeatures": false
  }'::jsonb,
  sms_notifications JSONB DEFAULT '{
    "securityAlerts": true,
    "paymentAlerts": true,
    "emergencyOnly": false
  }'::jsonb,
  preferences JSONB DEFAULT '{
    "frequency": "daily",
    "quietHours": false,
    "quietStart": "22:00",
    "quietEnd": "08:00"
  }'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscriptions
CREATE TABLE subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  plan TEXT NOT NULL CHECK (plan IN ('PREMIUM', 'EXCLUSIVE', 'EDUCATION')),
  status TEXT NOT NULL CHECK (status IN ('active', 'cancelled', 'expired')),
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  auto_renewal BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payments
CREATE TABLE payments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  subscription_id UUID REFERENCES subscriptions(id),
  amount DECIMAL(10,2),
  currency TEXT DEFAULT 'IDR',
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  payment_method TEXT CHECK (payment_method IN ('card', 'bank', 'ewallet')),
  payment_gateway TEXT,
  gateway_transaction_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- App usage tracking
CREATE TABLE app_usage (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  app_name TEXT NOT NULL,
  app_category TEXT,
  access_method TEXT CHECK (access_method IN ('extension', 'credentials')),
  usage_count INTEGER DEFAULT 1,
  last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, app_name)
);
```

## 5. Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_usage ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can view own profile" ON user_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for notification_settings
CREATE POLICY "Users can view own notifications" ON notification_settings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notification_settings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own notifications" ON notification_settings FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for subscriptions
CREATE POLICY "Users can view own subscriptions" ON subscriptions FOR SELECT USING (auth.uid() = user_id);

-- RLS Policies for payments
CREATE POLICY "Users can view own payments" ON payments FOR SELECT USING (auth.uid() = user_id);

-- RLS Policies for app_usage
CREATE POLICY "Users can view own app usage" ON app_usage FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own app usage" ON app_usage FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own app usage" ON app_usage FOR UPDATE USING (auth.uid() = user_id);
```

## 6. Storage Buckets

Create storage buckets in Supabase Storage:

1. **avatars** - for user profile pictures
   - Public: false
   - File size limit: 5MB
   - Allowed file types: image/\*

```sql
-- Storage policies for avatars bucket
CREATE POLICY "Users can view own avatar" ON storage.objects FOR SELECT USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can upload own avatar" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can update own avatar" ON storage.objects FOR UPDATE USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can delete own avatar" ON storage.objects FOR DELETE USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
```

## 7. Authentication Setup

Configure Supabase Auth:

1. **Email/Password**: Enable in Auth settings
2. **OAuth Providers**: Configure Google, Facebook if needed
3. **Email Templates**: Customize confirmation and reset emails
4. **Redirect URLs**: Add your domain URLs

## 8. Functions (Optional)

Create edge functions for:

1. **Payment webhooks**
2. **Email notifications**
3. **Usage analytics**

## 9. Integration Code

Update `client/lib/supabase.ts`:

```typescript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

## 10. Testing

Test the integration:

1. Create a test user
2. Test profile updates
3. Test notification settings
4. Verify RLS policies work

## Security Checklist

- [ ] RLS enabled on all tables
- [ ] Proper policies for each table
- [ ] Storage bucket policies configured
- [ ] Environment variables secured
- [ ] CORS configured properly
- [ ] Auth redirect URLs whitelisted

## Deployment

For production:

1. Update environment variables
2. Configure custom domain
3. Set up SSL certificate
4. Configure backup schedule
5. Set up monitoring and alerts
