import { defineConfig, presetUno, presetIcons, presetWebFonts, transformerDirectives } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      cdn: 'https://esm.sh/'
    }),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Inter:400,500,600,700',
        mono: 'JetBrains Mono:400,500'
      }
    })
  ],
  transformers: [
    transformerDirectives()
  ],
  theme: {
    colors: {
      primary: {
        DEFAULT: '#8f7cff',
        light: '#a99aff',
        dark: '#6b5ce7',
        soft: 'rgba(143, 124, 255, 0.1)',
        lighter: 'rgba(143, 124, 255, 0.16)'
      },
      secondary: {
        DEFAULT: '#7ea6ff',
        light: '#a5c4ff',
        dark: '#4a8aff'
      },
      accent: {
        DEFAULT: '#ffdfe8',
        light: '#fff0f3',
        dark: '#ffc4d0'
      },
      dark: {
        bg: '#0b1020',
        card: '#131b2e',
        border: 'rgba(255, 255, 255, 0.06)'
      },
      light: {
        bg: '#e9e7e6',
        card: 'rgba(255, 255, 253, 0.96)',
        border: 'rgba(255, 255, 255, 0.68)'
      }
    },
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    },
    animation: {
      keyframes: {
        'fade-in': '{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}',
        'slide-up': '{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}',
        'slide-in-left': '{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}}',
        'scale-in': '{from{opacity:0;transform:scale(0.95)}to{opacity:1;transform:scale(1)}}',
        'float': '{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}',
        'shimmer': '{0%{opacity:0.65}50%{opacity:0.78}100%{opacity:0.65}}'
      },
      durations: {
        'fade-in': '0.4s',
        'slide-up': '0.5s',
        'slide-in-left': '0.4s',
        'scale-in': '0.3s',
        'float': '6s',
        'shimmer': '16s'
      },
      timingFns: {
        'fade-in': 'ease-out',
        'slide-up': 'cubic-bezier(0.2, 0.9, 0.2, 1)',
        'slide-in-left': 'ease-out',
        'scale-in': 'ease-out',
        'float': 'cubic-bezier(0.19, 0.9, 0.2, 1)',
        'shimmer': 'ease-in-out'
      },
      counts: {
        'float': 'infinite',
        'shimmer': 'infinite'
      }
    }
  },
  shortcuts: [
    // 布局
    ['flex-center', 'flex items-center justify-center'],
    ['flex-between', 'flex items-center justify-between'],
    ['flex-col', 'flex flex-col'],
    
    // 卡片
    ['card', 'bg-light-card dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border shadow-lg'],
    ['card-hover', 'transition-all duration-300 hover:translate-y--1 hover:shadow-xl'],
    ['glass', 'bg-white/80 dark:bg-dark-card/80 backdrop-blur-md'],
    
    // 按钮
    ['btn', 'inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer'],
    ['btn-primary', 'btn bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg'],
    ['btn-outline', 'btn border border-gray-200 dark:border-gray-700 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800'],
    ['btn-ghost', 'btn bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800'],
    
    // 链接
    ['link', 'text-primary hover:text-primary-dark transition-colors'],
    ['link-underline', 'link relative after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full'],
    
    // 文字
    ['text-title', 'text-gray-900 dark:text-gray-100'],
    ['text-sub', 'text-gray-600 dark:text-gray-400'],
    ['text-muted', 'text-gray-500 dark:text-gray-500'],
    
    // 间距
    ['section-padding', 'px-4 md:px-8 py-12'],
    ['container-md', 'max-w-4xl mx-auto'],
    ['container-lg', 'max-w-6xl mx-auto'],
    
    // 动画
    ['animate-fade', 'animate-fade-in'],
    ['animate-slide', 'animate-slide-up'],
    ['animate-scale', 'animate-scale-in'],
    
    // 标签
    ['tag', 'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'],
    ['tag-primary', 'tag bg-primary/10 text-primary dark:bg-primary/20'],
    
    // 输入框
    ['input-base', 'w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-card focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all'],
    
    // 导航
    ['nav-link', 'px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all'],
    ['nav-link-active', 'nav-link bg-primary/10 text-primary font-semibold'],
    
    // 标题
    ['page-title', 'text-3xl md:text-4xl font-bold text-title mb-2'],
    ['page-subtitle', 'text-lg text-sub mb-8']
  ],
  rules: [
    ['shadow-card', { 'box-shadow': '0 24px 60px rgba(6, 6, 8, 0.08)' }],
    ['shadow-active', { 'box-shadow': '0 8px 22px rgba(22, 22, 22, 0.06) inset' }],
    ['text-gradient', {
      'background': 'linear-gradient(90deg, #ffdfe8 0%, #8f7cff 40%, #7ea6ff 100%)',
      '-webkit-background-clip': 'text',
      'background-clip': 'text',
      '-webkit-text-fill-color': 'transparent'
    }]
  ]
})
