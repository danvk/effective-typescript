declare let obj: {props: {a: string; b: number; }; };
let {a} = obj.props;
if (a === undefined) a = 'default';
