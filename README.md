# wEaTHer Landing Page

A stunning landing page for the Weather Prediction Market platform with GSAP animations and modern design.

## Features

- **GSAP Animations**: Smooth, professional animations for all elements
- **Responsive Design**: Works perfectly on all devices (mobile, tablet, desktop)
- **3D Globe Effect**: Animated rotating globe with floating effect
- **Modern Typography**: Using Space Grotesk, Inter, and Orbitron fonts
- **Gradient Effects**: Beautiful cyan-to-purple gradient themes
- **Particle Background**: Animated particles for immersive experience

## Tech Stack

- **React 18+** - UI framework
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **GSAP** - Animation library
- **Tailwind CSS** - Utility-first CSS
- **React Router** - Client-side routing
- **Privy** - Web3 authentication
- **Google Fonts** - Premium typography

## Getting Started

### Installation

```bash
# Install dependencies
npm install
```

### Environment Setup

Create a `.env` file in the root directory:

```
VITE_PRIVY_APP_ID=your_privy_app_id_here
```

To get your Privy App ID:
1. Go to https://dashboard.privy.io/
2. Create a new app or select an existing one
3. Copy the App ID from the dashboard
4. Paste it in your `.env` file

### Development

```bash
# Run development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
# Build for production
npm run build
```

### Preview

```bash
# Preview production build
npm run preview
```

## Project Structure

```
weatherlanding/
├── src/
│   ├── pages/
│   │   ├── Landing.tsx  # Landing page component
│   │   ├── Login.tsx    # Login page component
│   │   └── Login.css    # Login page styles
│   ├── App.tsx          # Router configuration
│   ├── App.css          # Component styles
│   ├── index.css        # Global styles & Tailwind config
│   └── main.tsx         # App entry point with Privy provider
├── public/              # Static assets
├── .env                 # Environment variables
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
└── package.json         # Dependencies
```

## Routes

- `/` - Landing page
- `/login` - Login page with Privy authentication

## Design Highlights

### Animations

1. **Initial Load Sequence**:
   - Globe scales up from 0 with rotation
   - Title slides down from top
   - Subtitles slide in from left and right
   - CTA button fades in from bottom

2. **Continuous Animations**:
   - Globe rotates 360° every 20 seconds
   - Globe floats up and down
   - Title text glows with pulsing effect
   - Background particles float randomly

### Typography

- **Orbitron**: Main title "wEaTHer" (bold, futuristic)
- **Space Grotesk**: Subtitle "you can change weather" (modern, clean)
- **Orbitron**: Subtitle "bet your weather" (bold emphasis)
- **Inter**: Tagline (readable, professional)

### Color Palette

- **Primary Blue**: `#00d4ff` (weather-blue)
- **Secondary Purple**: `#6366f1` (weather-purple)
- **Dark Background**: `#0a0e1a` (weather-dark)
- **Gradients**: Cyan to Purple transitions

## Customization

### Changing Colors

Edit `tailwind.config.js`:

```js
colors: {
  'weather-blue': '#00d4ff',
  'weather-purple': '#6366f1',
  'weather-dark': '#0a0e1a',
}
```

### Adjusting Animations

Edit animation timings in `src/App.tsx`:

```typescript
// Globe rotation speed
duration: 20, // seconds

// Floating animation speed
duration: 3, // seconds
```

### Modifying Fonts

Change fonts in `src/index.css` Google Fonts import.

## Performance

- **Optimized animations**: Using GSAP's best practices
- **Lazy loading**: Components load on demand
- **Minimal bundle**: Tree-shaking with Vite
- **Fast builds**: Vite's lightning-fast HMR

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Credits

Designed and developed for the Weather Prediction Market platform.
