# **App Name**: VaSa: Women's Empowerment Hub

## Core Features:

- User Authentication: Secure login/signup using email, phone, Google, and Microsoft with Firebase Auth. Implements inline validation and error handling.
- Dashboard Navigation: Central hub with shortcuts to core features: profile, hiring, job search, team creation, learning, and SOS.
- SOS Emergency Alert: Immediate safety alert system with one-tap confirmation, geolocation capture, and Cloud Function trigger for admin notifications and emergency contacts.
- Profile Management: User profile editing, progress tracking, and skill management, writing to Firestore user documents.
- Job Posting and Search: Job posting form for employers and search functionality for workers with filtering and pagination based on user location using Firestore.
- Learning Hub: Catalog of learning modules (videos/articles) with progress tracking and integration with Firebase Storage or external URLs for video content.
- Team Creation: Team creation form for users, stored in Firestore. Integration for inviting users with a tool that suggests other relevant users and invites existing ones.
- AI Matching Jobs: AI-powered job matching based on user profile and skills.

## Style Guidelines:

- Primary gradient: Light purple (#E0BBE4) to soft lavender (#957DAD) for a calming and supportive feel.
- Secondary accent color: Muted violet (#D291BC) for highlights and calls to action.
- Cards: White with rounded corners for a clean, modern look.
- Font: 'Inter' sans-serif for clear, accessible text. Note: currently only Google Fonts are supported.
- Generous padding (16-20px) and large buttons (min 48x48dp touch target) for accessibility.
- Recommended set of icons, consistent in style, that represent the features of the app.
- Skeleton loading states and graceful error handling for a smooth user experience, especially in low-bandwidth contexts.