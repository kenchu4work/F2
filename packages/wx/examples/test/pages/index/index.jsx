// index.js
import { createElement } from '@antv/f2';
import Chart from './chart';

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

Page({
  data: {
    onRenderChart() {
      return <Chart data={data} />;

      // 如果不使用 jsx, 用下面代码效果也是一样的
      // return createElement(Chart, {
      //   data: data,
      // });
    },
  },
});
