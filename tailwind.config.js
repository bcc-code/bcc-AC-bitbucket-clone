const rem = {
  '0':'0',
  '1':'0.25rem',
  '2':'0.5rem',
  '3':'0.75rem',
  '4':'1rem',
  '5':'1.25rem',
  '6':'1.5rem',
  '8':'2rem',
  '10':'2.5rem',
  '12':'3rem',
  '14':'3.5rem',
  '15':'3.75rem',
  '16':'4rem',
  '18':'4.5rem',
  '20':'5rem',
  '24':'6rem',
  '28':'7rem',
  '32':'8rem',
  '36':' 9rem',
  '40':'10rem',
  '48':'12rem',
  '56':'14rem',
  '64':'16rem',
}
const widthStandard = {
  ...rem,
  'auto':' auto',
  'px':' 1px',
  '1/2':' 50%',
  '1/3':' 33.333333%',
  '2/3':' 66.666667%',
  '1/4':' 25%',
  '2/4':' 50%',
  '3/4':' 75%',
  '1/5':' 20%',
  '2/5':' 40%',
  '3/5':' 60%',
  '4/5':' 80%',
  '1/6':' 16.666667%',
  '2/6':' 33.333333%',
  '3/6':' 50%',
  '4/6':' 66.666667%',
  '5/6':' 83.333333%',
  '1/12':' 8.333333%',
  '2/12':' 16.666667%',
  '3/12':' 25%',
  '4/12':' 33.333333%',
  '5/12':' 41.666667%',
  '6/12':' 50%',
  '7/12':' 58.333333%',
  '8/12':' 66.666667%',
  '9/12':' 75%',
  '10/12':' 83.333333%',
  '11/12':' 91.666667%',
  'xs':'380px',
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  'hd': '1440px',
  'mobile': '380px',
  'tablet': '768px',
  'laptop': '1024px',
  'desktop':'1440px',
/*   'desktop': '1280px' */
}

const heightStandard = {
  ...rem,
  'auto':'auto',
  'px':'1px'
}

module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.tsx',
    './src/**/*.jsx',
  ],
  theme: {
    container: {
      center: true,
    },
    screens: {
      'xs':'380px',
      'sm': '640px',// => @media (min-width: 640px) { ... }
      'md': '768px',// => @media (min-width: 768px) { ... }
      'lg': '1024px',// => @media (min-width: 1024px) { ... }
      'xl': '1280px',// => @media (min-width: 1280px) { ... }
      'hd': '1440px',
      'msm': {'max': '639px'},// => @media (max-width: 639px) { ... }
      'mmd': {'max': '767px'},// => @media (max-width: 767px) { ... }
      'mlg': {'max': '1023px'},// => @media (max-width: 1023px) { ... }
      'mxl': {'max': '1279px'}// => @media (max-width: 1279px) { ... }
    },
    fontFamily: {
      sans: ['Source Sans Pro', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      serif: ['Merriweather', '-apple-system', 'BlinkMacSystemFont', 'serif'],
      mono: ['Source Sans Pro', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      roboto: ['Roboto', '-apple-system', 'BlinkMacSystemFont', 'sans-serif']
    },
    extend: {
      width:widthStandard,
      height:heightStandard,
      minWidth:widthStandard,
      maxWidth:widthStandard,
      minHeight:heightStandard,
      maxHeight:heightStandard,
      fontSize:{
        'mini':'0.5rem',
        'mini-plus':'0.675rem',
        'xxs':'.7rem',
        '2-5xl':'1.7rem',
        '3-5xl':'2rem'
      },
      padding:{
        'quarter':'25%',
        'half':'50%',
        'square':'100%',
        '16/9':'56.25%'
      },
      borderRadius: {
        'xl': '0.75rem',
        'xxl': '1rem',
        '2xl': '2rem',
        '3xl': '3rem',
        '25': '25%'
      },
      height: {
        ...heightStandard,
        'mobile': '674px',
        'tablet': '1024px',
        'laptop': '768px',
      },
      colors: {
        'd4primary': 'var(--primary)',
        'd4secondary': 'var(--secondary)',
        'd4slate-lighter': 'var(--slate-lighter)',
        'd4slate-light': 'var(--slate-light)',
        'd4slate': 'var(--slate)',
        'd4slate-dark': 'var(--slate-dark)',
        'd4gray-light': 'var(--gray-light)',
        'd4gray': 'var(--gray)',
        'd4gray-dark': 'var(--gray-dark)',
        'd4white': 'var(--white)',
        'd4black': 'var(--black)',
        'd4red': 'var(--red)',
        'd4green': 'var(--green)',
        'd4athens': 'var(--athens)',
        'd4cadet-blue':'var(--cadet-blue)',
        'mp-background': 'var(--mp-background)',
        'mp-play-progress': 'var(--mp-play-progress)',
        'mp-duration': 'var(--mp-duration)',
        'mp-text': 'var(--mp-text)'
      },
      opacity:{
        '0': '0',
      '10': '.1',
      '20': '.2',
      '30': '.3',
      '40': '.4',
      '50': '.5',
      '60': '.6',
      '70': '.7',
      '80': '.8',
      '90': '.9',
      '100': '1'
      },    
      lineHeight: {
        '11': '2.75rem',
      }   
    },

  },
  variants: {
    fill: ['hover', 'focus'],
    borderWidth: ['responsive', 'focus'],
    margin:['responsive','first']
  },
  plugins: []
}

