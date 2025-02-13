import { Canvas, Chart, Interval, Axis } from '@antv/f2';

const data = [{
  country: 'Europe',
  year: '1750',
  value: 163,
  percent: 0.24511278195488723
}, {
  country: 'Asia',
  year: '1750',
  value: 502,
  percent: 0.7548872180451128
}, {
  country: 'Europe',
  year: '1800',
  value: 203,
  percent: 0.24224343675417662
}, {
  country: 'Asia',
  year: '1800',
  value: 635,
  percent: 0.7577565632458234
}, {
  country: 'Europe',
  year: '1850',
  value: 276,
  percent: 0.2543778801843318
}, {
  country: 'Asia',
  year: '1850',
  value: 809,
  percent: 0.7456221198156682
}, {
  country: 'Europe',
  year: '1900',
  value: 408,
  percent: 0.3011070110701107
}, {
  country: 'Asia',
  year: '1900',
  value: 947,
  percent: 0.6988929889298893
}, {
  country: 'Europe',
  year: '1950',
  value: 547,
  percent: 0.2806567470497691
}, {
  country: 'Asia',
  year: '1950',
  value: 1402,
  percent: 0.7193432529502309
}, {
  country: 'Europe',
  year: '1999',
  value: 729,
  percent: 0.16708686683474674
}, {
  country: 'Asia',
  year: '1999',
  value: 3634,
  percent: 0.8329131331652533
}, {
  country: 'Europe',
  year: '2050',
  value: 628,
  percent: 0.10651289009497965
}, {
  country: 'Asia',
  year: '2050',
  value: 5268,
  percent: 0.8934871099050203
}, {
  country: 'Europe',
  year: '2100',
  value: 828,
  percent: 0.10227272727272728
}, {
  country: 'Asia',
  year: '2100',
  value: 7268,
  percent: 0.8977272727272727
}];

const context = document.getElementById('container').getContext('2d');
const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart data={data}>
      <Axis field="year" />
      <Axis field="percent" />
      <Interval x="year" y="percent" color="country" adjust="stack" />
    </Chart>
  </Canvas>
);

const chart = new Canvas(props);
chart.render();