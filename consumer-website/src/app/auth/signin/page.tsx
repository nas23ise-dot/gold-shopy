'use client';

import React from 'react';
import SignInForm from '@/components/auth/SignInForm';

// Add this to prevent static prerendering
export const dynamic = 'force-dynamic';

export default function SignInPage() {
  return (
    <div>
      <SignInForm />
    </div>
  );
}
