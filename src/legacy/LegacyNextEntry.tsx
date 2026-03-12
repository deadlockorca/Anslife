'use client';

import dynamic from 'next/dynamic';

const LegacyClientApp = dynamic(() => import('./LegacyClientApp'), { ssr: false });

export default function LegacyNextEntry() {
  return <LegacyClientApp />;
}
