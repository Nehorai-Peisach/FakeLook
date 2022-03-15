const Link = (props) => {
  return (
    <a className={'link ' + props.className} href={props.url}>
      {props.children}
    </a>
  );
};

export default Link;
