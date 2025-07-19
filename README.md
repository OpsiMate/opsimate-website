# OpsiMate Marketing Website

A modern, responsive marketing website for OpsiMate built with Next.js and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Clean, professional design with blue color theme
- **Responsive**: Fully responsive design that works on all devices
- **Performance Optimized**: Built with Next.js for optimal performance
- **SEO Ready**: Proper meta tags and structured data
- **Component-Based**: Reusable React components for easy maintenance

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Font**: Inter (Google Fonts)
- **Language**: TypeScript

## 📁 Project Structure

```
opsimate-website/
├── components/           # Reusable React components
│   ├── Layout.tsx       # Main layout wrapper
│   ├── Navbar.tsx       # Navigation component
│   ├── Footer.tsx       # Footer component
│   ├── Logo.tsx         # OpsiMate logo component
│   ├── HeroSection.tsx  # Hero section
│   ├── FeaturesSection.tsx    # Features showcase
│   ├── IntegrationsSection.tsx # Integrations display
│   ├── CTASection.tsx   # Call-to-action section
│   └── FeatureCard.tsx  # Individual feature card
├── pages/               # Next.js pages
│   ├── _app.tsx        # App wrapper
│   ├── _document.tsx   # Document structure
│   └── index.tsx       # Homepage
├── styles/             # Global styles
│   └── globals.css     # Tailwind CSS and custom styles
├── public/             # Static assets
│   └── images/         # Images and logos
└── README.md          # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Design System

### Colors

The website uses a blue-themed color palette:

- **Primary Blue**: `#2563eb` (blue-600)
- **Light Blue**: `#3b82f6` (blue-500)
- **Dark Blue**: `#1d4ed8` (blue-700)
- **Accent**: `#4FC3F7` to `#1976D2` (gradient)

### Typography

- **Font Family**: Inter (Google Fonts)
- **Headings**: Bold weights (600-800)
- **Body Text**: Regular weight (400)

## 📝 Content Placeholders

The following areas have placeholders for content that should be added:

### Images & Media
- **Hero Section**: Main product demo video/screenshot
- **Features Section**: Feature illustrations or screenshots
- **Integrations**: Logo images for each integration
- **CTA Section**: Dashboard preview screenshot
- **Company Logos**: Customer/partner logos

### Links & Navigation
- **Documentation**: Link to actual docs site
- **API Reference**: Link to API documentation
- **Blog**: Link to company blog
- **Social Media**: Update with actual social media URLs
- **Contact**: Update with actual contact information

### Content Updates Needed
1. Replace placeholder company logos with actual customer logos
2. Add real product screenshots and demo videos
3. Update social media links in footer
4. Add actual documentation and API links
5. Update contact information and support links

## 🔧 Customization

### Adding New Sections

1. Create a new component in `/components/`
2. Import and add to `/pages/index.tsx`
3. Update navigation links if needed

### Styling Changes

- Modify `/styles/globals.css` for global styles
- Update `/tailwind.config.js` for theme changes
- Component-specific styles are in individual component files

### SEO Optimization

- Update meta tags in `/components/Layout.tsx`
- Add structured data for better search visibility
- Optimize images with proper alt tags

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically on push

### Deploy to Other Platforms

The built files in `.next/` can be deployed to any static hosting service.

## 📱 Responsive Design

The website is fully responsive with breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## ♿ Accessibility

- Semantic HTML structure
- Proper ARIA labels
- Keyboard navigation support
- Color contrast compliance
- Screen reader friendly

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary to OpsiMate.

---

**Need Help?** 
- Check the [Next.js Documentation](https://nextjs.org/docs)
- Review [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- Contact the development team
