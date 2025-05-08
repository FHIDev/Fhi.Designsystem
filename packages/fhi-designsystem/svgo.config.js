export default {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
        },
      },
    },
    {
      name: 'removeAttributesBySelector',
      params: {
        selector: '*',
        attributes: ['width', 'height', 'fill'],
      },
    },
    {
      name: 'addAttributesToSVGElement',
      params: {
        attributes: [
          {
            width: '${this.size}',
            height: '${this.size}',
            fill: '${this.color}',
          },
        ],
      },
    },
  ],
};
