# Legal Wafed - Foreign Workers in Libya

A multilingual web application to guide foreign workers through legal procedures in Libya.

## Technical Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Internationalization**: Custom implementation supporting English, French, and Arabic
- **Accessibility**: Built-in screen reader support and text-to-speech functionality

## Features Implemented

- Multi-language support (English, French, Arabic) with dynamic switching
- RTL layout support for Arabic language
- Text-to-speech functionality for all content
- Interactive decision tree workflows for:
  - Foreign workers seeking employment in Libya
  - Entry legitimacy correction
  - Initial work visa process
  - Employer change procedures
  - Work permit renewal process
  - Leaving Libya procedures
- Responsive design for all screen sizes
- Accessible UI components with ARIA support
- Clear visual feedback for user interactions
- Step-by-step guidance through legal procedures

## User Stories

### As a Foreign Worker Outside Libya
- I want to understand the process of working in Libya
- I want to know what documents I need
- I want to follow the correct legal procedures for entry

### As a Worker in Libya
- I want to check if my entry status is legitimate
- I want to know how to change employers legally
- I want to understand the work permit renewal process
- I want to know the proper procedure for leaving the country

### As a Non-Native Speaker
- I want to access information in my preferred language
- I want to hear the text read aloud for better understanding
- I want clear visual cues to guide me through the process

### As a Mobile User
- I want to access the application on my phone
- I want a responsive interface that works on any screen size
- I want to easily navigate through different sections

## Text-to-Speech

The "Listen" buttons use the [VoiceRSS](https://www.voicerss.org) API, which
provides consistent English, French and Arabic voices on every device. Get a
free API key at https://www.voicerss.org/registration.aspx and set it in a
`.env` file (see `.env.example`):

```bash
VITE_VOICERSS_KEY=your-key-here
```

Without a key (or if the request fails), the app automatically falls back to
the browser's built-in `speechSynthesis`, whose voices vary by device and may
be missing for Arabic.

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Deployment

The application is deployed on Netlify and can be accessed at: https://wafed-legal.super-novae.org