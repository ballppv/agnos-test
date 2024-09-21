import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    // fontFamily: {
    //   primaryFont: [''],
    // },
    extend: {
      screens: {
        sm: '320px',
        mobile: '375px',
        '2sm': '425px',
        '3sm': '500px',
        md: '768px',
        '2md': '900px',
        lg: '1024px',
        '3lg': '1200px',
        '4lg': '1300px',
        '5lg': '1400px',
        xl: '1440px',
        '2xl': '1600px',
        '4xl': '1920px',
      },
      fontSize: {
        '3xs': ['8px', '12px'],
        '2xs': ['10px', '12px'],
        xs: ['12px', '18px'],
        sm: ['14px', '21px'],
        md: ['16px', '24px'],
        '2md': ['18px', '27px'],
        lg: ['20px', '30px'],
        xl: ['24px', '36px'],
        '2xl': ['28px', '34px'],
      },
      maxWidth: {
        'maximum-web': '1920px',
      },
      animation: {
        'slide-down': 'slideDown 0.5s ease-in-out',
      },
      boxShadow: {
        'custom-1': '0px 0px 32px 0px rgba(148, 148, 148, 0.24)',
      },
      colors: {
        primary: {
          DEFAULT: '#df082a',
          'sompo-red': '#df082a',
          white: '#ffffff',
          'light-platinum': '#eff4f5',
          'light-red': '#fff1f1',
          black: '#000000',
        },
        secondary: {
          dark: {
            red: '#9e2222',
            platinum: '#94989c',
          },
          medium: {
            red: '#eeaaaa',
            platinum: '#c8ced2',
          },
        },
        tertiary: {
          dark: {
            purple: '#874ca9',
            orange: '#af6a19',
          },
          medium: {
            purple: '#a780d1',
            orange: '#fc9e31',
          },
          light: {
            purple: '#d2bdff',
            orange: '#ffc47f',
          },
        },
        base: {
          primary: '#ffffff',
          secondary: '#181819',
        },
        grey: {
          50: '#e8e8e8',
          100: '#d1d1d1',
          200: '#bababa',
          300: '#a3a3a3',
          400: '#8b8b8c',
          500: '#747475',
          600: '#5d5d5e',
          700: '#464647',
          800: '#2f2f30',
          950: '#181819',
        },
        red: {
          50: '#fde3e8',
          100: '#facbd5',
          200: '#f593a7',
          300: '#f1607d',
          400: '#ec2c53',
          500: '#cb1237',
          600: '#a40f2c',
          700: '#7a0b21',
          800: '#500716',
          950: '#2a040b',
        },
        stat: {
          green: {
            100: '#e5f9ef',
            300: '#b2eed0',
            500: '#00c661',
          },
          yellow: {
            100: '#fff8e9',
            300: '#feeabe',
            500: '#fbba27',
          },
          red: {
            100: '#fde6ec',
            300: '#f8b5c5',
            500: '#e9083f',
          },
        },
        divider: {
          'light-red': '#facbd5',
          grey: {
            1: '#e8e8e8',
            2: '#d1d1d1',
          },
          red: '#ec2c53',
        },
        deco: {
          yellow: '#fbbe4b',
          pink: '#ffebef',
          red: '#9B2222',
        },
      },
      textColor: {
        primary: '#181819',
        secondary: '#2f2f30',
        sub: '#747475',
        white: '#ffffff',
        red: '#DF082A',
        placeholder: '#a3a3a3',
        disabled: '#bababa',
        'sompo-primary': '#df082a',
      },
      backgroundColor: {
        white: '#FFFFFF',
        red: {
          DEFAULT: '#DF082A',
          50: '#fde3e8',
          100: '#facbd5',
          200: '#f593a7',
          300: '#f1607d',
          400: '#ec2c53',
          500: '#cb1237',
          600: '#a40f2c',
          700: '#7a0b21',
          800: '#500716',
          950: '#2a040b',
        },
        'light-red': '#fde3e8',
        grey: {
          1: '#f8f8f8',
          2: '#f4f4f4',
          3: '#e8e8e8',
          pink: '#f2eeee',
        },
        disabled: '#e8e8e8',
        'custom-1': 'rgba(241, 234, 255, 0.56)',
      },
      borderColor: {
        grey: {
          DEFAULT: '#d1d1d1',
          1: '#e8e8e8',
        },
        red: '#DF082A',
      },
    },
  },
  plugins: [],
}

export default config
