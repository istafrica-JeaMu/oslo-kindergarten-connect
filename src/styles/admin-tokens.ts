
// Design tokens for consistent admin UI
export const adminTokens = {
  colors: {
    primary: {
      50: '#f0fdfa',
      100: '#ccfbf1', 
      500: '#14b8a6',
      600: '#0d9488',
      700: '#0f766e',
      800: '#115e59',
      900: '#134e4a'
    },
    secondary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985'
    },
    gray: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a'
    }
  },
  spacing: {
    xs: '0.5rem',   // 8px
    sm: '0.75rem',  // 12px
    md: '1rem',     // 16px
    lg: '1.5rem',   // 24px
    xl: '2rem',     // 32px
    '2xl': '3rem',  // 48px
    '3xl': '4rem'   // 64px
  },
  borderRadius: {
    sm: '0.375rem', // 6px
    md: '0.5rem',   // 8px
    lg: '0.75rem',  // 12px
    xl: '1rem'      // 16px
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
  }
} as const;

export const adminClasses = {
  // Page containers
  page: 'min-h-screen bg-gray-50 p-6',
  container: 'space-y-6',
  
  // Cards
  card: 'bg-white rounded-lg shadow-sm border border-gray-200',
  cardContent: 'p-6',
  cardHeader: 'px-6 py-4 border-b border-gray-200',
  
  // Headers
  pageTitle: 'text-3xl font-bold text-slate-900',
  pageDescription: 'text-slate-600',
  sectionTitle: 'text-xl font-semibold text-slate-900',
  
  // Buttons
  primaryButton: 'bg-teal-600 hover:bg-teal-700 text-white',
  secondaryButton: 'bg-gray-100 hover:bg-gray-200 text-gray-900',
  outlineButton: 'border border-gray-300 hover:bg-gray-50',
  
  // Forms
  input: 'border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500',
  label: 'text-sm font-medium text-gray-700 mb-2 block',
  
  // Layout
  flexBetween: 'flex items-center justify-between',
  flexCenter: 'flex items-center',
  spacingY: 'space-y-4',
  spacingX: 'space-x-4'
} as const;
