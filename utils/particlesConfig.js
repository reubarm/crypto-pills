export const config = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 800
      }
    },
    line_linked: {
      enable: false
    },
    color: {
      value: '#ffffff'
    },
    shape: {
      type: 'circle',
    },
    opacity: {
      animation: {
        enable: true,
        speed: 1,
        minimumValue: 0,
        sync: false,
      },
      value: 1,
      random: {
        enable: false
      }
    },
    size: {
      value: 2,
      random: {
        enable: true,
        minimumValue: 1
      },
      animation: {
        enable: false,
      },
    },
    move: {
      enable: true,
      speed: 1,
      straight: false,
      direction: "none",
      random: true,
    },
  },
  retina_detect: false
}