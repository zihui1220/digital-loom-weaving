# Digital Loom: Collaborative Generative Weaving

### Live Demo: (https://digital-loom-weaving.onrender.com)

## Project Concept
"Digital Loom" is a networked generative art piece that explores collective aesthetics. By translating individual touch/mouse interactions into a synchronized grid-based tapestry, the work investigates how algorithmic structures can organize random human inputs into a unified visual order.

## Technical Features
* **Real-time Sync**: Built with **Socket.io** for low-latency multi-user interaction.
* **Generative Graphics**: Uses **p5.js** for dynamic Truchet tiling and HSB color mapping.
* **Cloud Hosting**: Deployed on **Render** via Node.js.

## How to Use
1. Open the Live Demo link on multiple devices (phone and laptop).
2. Click, tap, or drag to begin "weaving" your pattern.
3. Observe as your patterns synchronize instantly with other connected users.

## Project Structure
- `index.js`: Node.js server with Socket.io logic.
- `public/sketch.js`: Client-side generative art logic.
- `package.json`: Environment configuration and dependencies.