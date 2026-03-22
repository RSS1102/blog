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
      // 柔和樱花粉色系
      primary: {
        DEFAULT: '#ff9eb5',
        light: '#ffb6c1',
        dark: '#ff7a9b',
        soft: 'rgba(255, 158, 181, 0.12)',
        muted: 'rgba(255, 158, 181, 0.6)'
      },
      secondary: {
        DEFAULT: '#a8d8ea',
        light: '#c5e8f4',
        dark: '#7ec8e3'
      },
      accent: {
        DEFAULT: '#ffdfe8',
        light: '#fff5f7',
        dark: '#ffc4d0',
        warm: '#ffe4c4',
        lavender: '#e8d5f2',
        mint: '#d4f0e7',
        peach: '#ffdab9'
      },
      warm: {
        bg: '#fefcf9',
        card: 'rgba(255, 253, 250, 0.96)',
        cream: '#fff8f0',
        rose: '#ffeef2'
      },
      dark: {
        bg: '#1e1a2e',
        card: 'rgba(35, 30, 50, 0.95)',
        border: 'rgba(255, 255, 255, 0.08)',
        soft: '#2a2538'
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
        'float-slow': '{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-15px) rotate(2deg)}',
        'shimmer': '{0%{opacity:0.65}50%{opacity:0.78}100%{opacity:0.65}}',
        'twinkle': '{0%,100%{opacity:0.3;transform:scale(0.8)}50%{opacity:1;transform:scale(1.2)}'
      },
      durations: {
        'fade-in': '0.4s',
        'slide-up': '0.5s',
        'slide-in-left': '0.4s',
        'scale-in': '0.3s',
        'float': '6s',
        'float-slow': '8s',
        'shimmer': '16s',
        'twinkle': '3s'
      },
      timingFns: {
        'fade-in': 'ease-out',
        'slide-up': 'cubic-bezier(0.2, 0.9, 0.2, 1)',
        'slide-in-left': 'ease-out',
        'scale-in': 'ease-out',
        'float': 'cubic-bezier(0.19, 0.9, 0.2, 1)',
        'float-slow': 'cubic-bezier(0.19, 0.9, 0.2, 1)',
        'shimmer': 'ease-in-out',
        'twinkle': 'ease-in-out'
      },
      counts: {
        'float': 'infinite',
        'float-slow': 'infinite',
        'shimmer': 'infinite',
        'twinkle': 'infinite'
      }
    }
  },
  shortcuts: [
    // 布局
    ['flex-center', 'flex items-center justify-center'],
    ['flex-between', 'flex items-center justify-between'],
    ['flex-col', 'flex flex-col'],

    // 卡片 - 梦幻渐变边框
    ['card', 'bg-warm-card dark:bg-dark-card rounded-2xl border border-white/60 dark:border-dark-border shadow-lg hover:shadow-xl transition-all duration-300'],
    ['card-hover', 'hover:-translate-y-1 hover:shadow-xl'],
    ['glass', 'bg-white/80 dark:bg-dark-card/80 backdrop-blur-xl'],

    // 按钮
    ['btn', 'inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-200 cursor-pointer'],
    ['btn-primary', 'btn bg-primary text-white hover:bg-primary-dark shadow-lg hover:shadow-xl'],
    ['btn-outline', 'btn border-2 border-primary/30 text-primary bg-transparent hover:bg-primary/10 hover:border-primary/50'],
    ['btn-ghost', 'btn bg-transparent hover:bg-warm-bg/80 dark:hover:bg-dark-soft/50'],

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
    ['animate-float', 'animate-float'],

    // 标签 - 简洁圆润
    ['tag', 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all'],
    ['tag-primary', 'tag bg-primary/15 text-primary-dark dark:bg-primary/25 dark:text-primary-light'],
    ['tag-blue', 'tag bg-secondary/15 text-secondary-dark dark:bg-secondary/25'],
    ['tag-green', 'tag bg-accent-mint/30 text-emerald-600 dark:text-emerald-400'],
    ['tag-orange', 'tag bg-accent-peach/30 text-orange-600 dark:text-orange-400'],
    ['tag-purple', 'tag bg-accent-lavender/30 text-purple-600 dark:text-purple-400'],

    // 输入框
    ['input-base', 'w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-card focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all'],

    // 导航
    ['nav-link', 'px-4 py-2 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-primary/10 dark:hover:text-primary-light dark:hover:bg-primary/15 transition-all'],
    ['nav-link-active', 'nav-link bg-primary/15 text-primary-dark dark:text-primary-light font-semibold'],

    // 标题
    ['page-title', 'text-3xl md:text-4xl font-bold text-title mb-2'],
    ['page-subtitle', 'text-lg text-sub mb-8'],

    // 阴影
    ['shadow-soft', '0 8px 32px rgba(255, 158, 181, 0.1)'],
    ['shadow-soft-lg', '0 16px 48px rgba(255, 158, 181, 0.15)']
  ],
  rules: [
    // 渐变文字
    ['text-gradient-warm', {
      'background': 'linear-gradient(135deg, #ff9eb5 0%, #e8d5f2 40%, #a8d8ea 100%)',
      '-webkit-background-clip': 'text',
      'background-clip': 'text',
      '-webkit-text-fill-color': 'transparent'
    }],
    ['text-gradient-sakura', {
      'background': 'linear-gradient(135deg, #ffb6c1 0%, #ff9eb5 30%, #e8d5f2 70%, #a8d8ea 100%)',
      '-webkit-background-clip': 'text',
      'background-clip': 'text',
      '-webkit-text-fill-color': 'transparent'
    }]
  ]
})
