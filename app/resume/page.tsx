import { Suspense } from 'react';
import ResumePageClient from '../../components/resume/ResumePageClient';

export default function ResumePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResumePageClient />
    </Suspense>
  );
}
