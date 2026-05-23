# MILTON — Monolithic Elegance

A cinematic, highly interactive product landing experience for the MILTON Flagship Tumbler. This project transcends a standard webpage, functioning as a real-time 3D product commercial inspired by ultra-luxury aesthetic principles. 

Designed with stark minimalism, bold editorial typography, and high-fidelity scroll-driven 3D interactions.

## 🌟 Key Features

- **Interactive 3D Centerpiece**: A high-fidelity, real-time 3D model of the MILTON tumbler rendered directly in the browser. 
- **Cinematic Scroll Orchestration**: As the user scrolls, the tumbler dynamically unwraps, rotates, zooms, and explodes to reveal its layered engineering and insulation technology.
- **Physically Based Rendering (PBR)**: UI and 3D elements leverage realistic material physics—frosted glass (backdrop-blur), brushed titanium, matte ceramic, and calculated chrome specular highlights.
- **Dynamic Localization**: Automatically detects the user's location via IP and dynamically converts pricing into their local currency using live exchange rates.
- **Custom Physics & Motion**: Powered by carefully tuned spring physics and custom cubic-beziers (`[0.21, 0.47, 0.32, 0.98]`) for incredibly smooth, deliberate animations—no generic linear easings.
- **Acquisition Flow (Pre-order)**: A sleek, low-friction modal system with state-driven animations for reserving different product finishes (Obsidian, Titanium, Bronze).

## 🛠 Tech Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **3D & WebGL**: [Three.js](https://threejs.org/) + [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) + [Drei](https://github.com/pmndrs/drei)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Build Tool**: [Vite](https://vitejs.dev/)

## 🎨 Design Philosophy

- **The Vibe**: Monolithic Elegance. A perfect balance of stark minimalism, bold typography, and photorealistic 3D elements.
- **Color Palette**: Deep cinematic dark mode (true blacks, graphite) cleanly transitioning into stark pure white for dramatic storytelling contrast.
- **Typography**: Tracked-out modern sans-serifs for micro-copy and technical data, paired with prominent display fonts for hero impact.
- **Space**: The UI embraces massive negative space. If a UI element doesn't serve the story, it doesn't exist.

## 🚀 Getting Started

To run this project locally:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/milton-flagship.git
