import ReactLoading from 'react-loading';
const types = ['balls', 'bars', 'bubbles', 'cubes', 'cylon', 'spin', 'spinningBubbles', 'spokes'];
const Loading = (props) => {
  let className = '';
  if (props.className) className = props.className;

  return (
    <div className={'loading ' + className}>
      <ReactLoading type={types[4]} color="#333" />
    </div>
  );
};

export default Loading;
