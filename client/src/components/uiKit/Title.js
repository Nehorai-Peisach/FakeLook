const Title = (props) => {
  return <span className={'title ' + props.className}>{props.children}</span>;
};

export default Title;
