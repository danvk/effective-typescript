declare let obj: {props: {a: string; b: number; }; };
const {a = 'default'} = obj.props;
